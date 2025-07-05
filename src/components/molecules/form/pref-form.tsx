// app/preferences/form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { generateItinerary } from "@/app/preferences/create/action";
import { ProgressBar } from "@/components/atoms/progressbar";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/molecules/form-section";
import { CheckboxGroup } from "@/components/molecules/checkbox-group";
import { RadioCardGroup } from "@/components/molecules/radio-card-group";
import { SelectField } from "@/components/molecules/select-field";
import {
  REGIONS,
  HISTORICAL_INTERESTS,
  FESTIVALS,
  ACTIVITIES,
  TRANSPORT_OPTIONS,
  CULTURAL_EXPERIENCES,
  MONTHS,
  DURATION_OPTIONS,
  PACE_OPTIONS,
  SITE_PREFERENCE_OPTIONS,
  BUDGET_OPTIONS,
  ACCOMMODATION_OPTIONS,
  MOBILITY_OPTIONS,
  EXPLORATION_STYLE_OPTIONS,
} from "@/lib/form-constant";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const schema = z.object({
  duration: z.number().min(1).max(14),
  travelMonth: z.string().min(1, "Please select a month"),
  historicalInterests: z.array(z.string()).optional(),
  sitePreference: z.string().optional(),
  festivals: z.array(z.string()).optional(),
  pace: z.enum(["slow", "moderate", "fast"]).optional(),
  activities: z.array(z.string()).optional(),
  explorationStyle: z.enum(["guided", "independent", "mixed"]).optional(),
  budget: z.enum(["budget", "mid-range", "luxury"]).optional(),
  accommodation: z
    .enum(["near sites", "city center", "unique stays"])
    .optional(),
  transport: z.array(z.string()).optional(),
  mobility: z.enum(["none", "some", "wheelchair"]).optional(),
  visaAssistance: z.boolean().optional(),
  cuisine: z.boolean().optional(),
  culturalExperiences: z.array(z.string()).optional(),
  specialRequests: z.string().max(500).optional(),
});

export default function PrefForm() {
  const { setPreferences, setItinerary } = useAppStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      regions: ["Bagan"],
      duration: 7,
      travelMonth: "",
      historicalInterests: [],
      sitePreference: "iconic",
      pace: "slow",
      activities: [],
      budget: "mid-range",
      accommodation: "near sites",
      visaAssistance: false,
      cuisine: false,
      culturalExperiences: [],
    },
    resolver: zodResolver(schema),
  });

  const formValues = watch();

  const progress = Math.min(
    100,
    Math.round(
      (Object.entries(formValues).filter(([key, value]) => {
        if (key === "regions") return value.length > 0;
        if (key === "duration") return value > 0;
        if (key === "travelMonth") return value !== "";
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "string") return value.trim() !== "";
        if (typeof value === "boolean") return value;
        return false;
      }).length /
        9) *
        100
    )
  );

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setPreferences(data);
      console.log(data);
      const response = await generateItinerary(data);
      console.log(response);
      if (response.success) {
        setItinerary(response.data);
        // router.push(`/plan/${response.data.id}`);
      } else {
        alert(response.error || "Failed to generate itinerary");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleCheckboxChange = (
    field: keyof typeof formValues,
    value: string,
    checked: boolean
  ) => {
    const currentValues = (formValues[field] as string[]) || [];
    setValue(
      field,
      checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-50 p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-typography-950 mb-2">
          Plan Your Myanmar Journey
        </h1>
        <p className="text-typography-700">
          Tell us your preferences and we'll create a personalized itinerary
        </p>
      </header>

      <ProgressBar progress={progress} className="mb-6" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Accordion
          type="multiple"
          defaultValue={["destination"]}
          className="space-y-4"
        >
          {/* Destination & Timeframe Section */}
          <FormSection
            value="destination"
            title="Destination & Timeframe"
            number={1}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="space-y-6">
              <SelectField
                options={DURATION_OPTIONS}
                value={formValues.duration.toString()}
                onChange={(value) => setValue("duration", parseInt(value))}
                label="How many days? *"
                placeholder="Select duration"
                className="w-full"
              />

              <SelectField
                options={MONTHS.map((month) => ({
                  value: month,
                  label: month,
                }))}
                value={formValues.travelMonth}
                onChange={(value) => setValue("travelMonth", value)}
                label="When are you visiting? *"
                placeholder="Select month"
                error={errors.travelMonth?.message}
                tooltip="Best times: Nov-Feb (cool & dry). Avoid monsoon season (Jul-Sep) for optimal travel."
                className="w-full"
              />
            </div>
          </FormSection>

          {/* Historical & Cultural Interests Section */}
          <FormSection
            value="interests"
            title="Historical & Cultural Interests"
            number={2}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="space-y-6">
              <CheckboxGroup
                options={HISTORICAL_INTERESTS}
                selected={formValues.historicalInterests || []}
                onChange={(value, checked) =>
                  handleCheckboxChange("historicalInterests", value, checked)
                }
                label="What historical periods fascinate you?"
                gridClassName="grid-cols-1 sm:grid-cols-2 gap-3"
              />

              <RadioCardGroup
                options={SITE_PREFERENCE_OPTIONS}
                value={formValues.sitePreference || "iconic"}
                onChange={(value) => setValue("sitePreference", value)}
                label="What type of sites do you prefer?"
                gridClassName="grid-cols-1 sm:grid-cols-3 gap-3"
              />
            </div>
          </FormSection>

          {/* Travel Style Section */}
          <FormSection
            value="style"
            title="Travel Style & Preferences"
            number={3}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="space-y-6">
              <RadioCardGroup
                options={PACE_OPTIONS}
                value={formValues.pace || "moderate"}
                onChange={(value) => setValue("pace", value)}
                label="What's your preferred pace?"
                gridClassName="grid-cols-1 sm:grid-cols-3 gap-3"
              />

              <RadioCardGroup
                options={EXPLORATION_STYLE_OPTIONS}
                value={formValues.explorationStyle || "guided"}
                onChange={(value) => setValue("explorationStyle", value)}
                label="Preferred exploration style"
                gridClassName="grid-cols-1 sm:grid-cols-3 gap-3"
              />

              <CheckboxGroup
                options={ACTIVITIES}
                selected={formValues.activities || []}
                onChange={(value, checked) =>
                  handleCheckboxChange("activities", value, checked)
                }
                label="Activities you're interested in"
                gridClassName="grid-cols-1 sm:grid-cols-2 gap-3"
              />
            </div>
          </FormSection>

          {/* Practical Details Section */}
          <FormSection
            value="practical"
            title="Practical Details"
            number={4}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="space-y-6">
              <RadioCardGroup
                options={BUDGET_OPTIONS}
                value={formValues.budget || "mid-range"}
                onChange={(value) => setValue("budget", value)}
                label="What's your budget range?"
                gridClassName="grid-cols-1 sm:grid-cols-3 gap-3"
              />

              <CheckboxGroup
                options={CULTURAL_EXPERIENCES}
                selected={formValues.culturalExperiences || []}
                onChange={(value, checked) =>
                  handleCheckboxChange("culturalExperiences", value, checked)
                }
                label="Cultural experiences you'd like"
                gridClassName="grid-cols-1 sm:grid-cols-2 gap-3"
              />

              {/* <div>
                <Label
                  htmlFor="specialRequests"
                  className="text-gray-900 block mb-3 font-medium"
                >
                  Any special requests?
                </Label>
                <Input
                  id="specialRequests"
                  {...register("specialRequests")}
                  placeholder="Dietary restrictions, special needs, etc."
                  className="w-full max-w-[500px]"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formValues.specialRequests?.length || 0}/500 characters
                </p>
              </div> */}
            </div>
          </FormSection>
        </Accordion>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg w-full sm:w-auto transition-colors shadow-md"
            disabled={progress < 50 || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Generate My Itinerary"
            )}
            {progress < 50 && (
              <span className="ml-2 text-sm font-normal">
                (Complete at least 50%)
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
