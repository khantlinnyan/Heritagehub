import Layout from "@/components/layout";
import { fetchDetailPlace } from "@/lib/data/place";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import CldImg from "@/components/atoms/cld-img";

// Lucide-react icons
import {
  MapPin,
  Clock,
  Wallet,
  Calendar,
  Sparkles,
  Hourglass,
  Hand,
  AlertCircle,
  Footprints,
  ArrowLeftCircle,
  ArrowLeft,
} from "lucide-react";
import DynamicMap from "@/components/ui/dynamic-map";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// A new component to render the detail cards cleanly
const DetailCard = ({ icon, label, children }) => (
  <div className="flex items-start space-x-4 px-4 py-2 ">
    <div className="mt-1 text-primary flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <div className="mt-1 text-lg font-medium text-gray-800">{children}</div>
    </div>
  </div>
);

// A new component to render the badges
const Badge = ({ icon, text, className = "" }) => (
  <span
    className={`inline-flex items-center space-x-2 px-4 py-1.5 text-sm font-medium rounded-full ${className}`}
  >
    {icon}
    <span>{text}</span>
  </span>
);

export default async function PlacePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await auth();
  const { id } = params;

  if (!user.userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
      </div>
    );
  }

  const place = await fetchDetailPlace(user.userId, id);

  if (!place) {
    notFound();
  }

  const photoPublicId = place.photoUrl.split("/").pop();

  return (
    <Layout>
      <Button
        variant="ghost"
        className="fixed top-4 left-4 lg:top-7 lg:left-24"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-6 w-6" />
          Back
        </Link>
      </Button>
      <article className="min-h-screen">
        <section className="relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-b-3xl">
          <CldImg
            width={2880}
            height={2880}
            src={photoPublicId}
            alt={place.name}
            className="object-cover"
            crop="fill"
            gravity="auto"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
              {place.name}
            </h1>
            <p className="mt-3 text-lg md:text-xl font-light max-w-3xl drop-shadow-md">
              {place.description}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4  z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10 bg-white/50 rounded-2xl shadow-xs hover:shadow-sm transition-shadow duration-300">
            <DetailCard icon={<MapPin size={24} />} label="Region">
              {place.region}
            </DetailCard>
            <DetailCard icon={<Clock size={24} />} label="Suggested Time">
              {place.suggestedTime}
            </DetailCard>
            <DetailCard icon={<Wallet size={24} />} label="Budget">
              {place.budget.join(", ")}
            </DetailCard>
            <DetailCard
              icon={<Footprints size={24} />}
              label="Exploration Style"
            >
              {place.explorationStyle.join(", ")}
            </DetailCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-xs space-y-4">
                <h2 className="text-3xl font-bold">History of {place.name}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {place.briefHistory}
                </p>
                {place.historicalInterests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    <h3 className="sr-only">Historical Interests:</h3>
                    {place.historicalInterests.map((interest, index) => (
                      <Badge
                        key={index}
                        text={interest}
                        // icon={<Calendar size={16} />}
                        className="bg-primary/10 text-primary"
                      />
                    ))}
                  </div>
                )}
              </div>

              {place.rules && (
                <div className="bg-white p-8 rounded-2xl shadow-xs">
                  <h2 className="text-3xl font-bold flex items-center space-x-3">
                    <AlertCircle size={28} className="text-orange-500" />
                    <span>Rules & Tips</span>
                  </h2>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {place.rules}
                  </p>
                </div>
              )}

              <div className="bg-white p-8 rounded-2xl shadow-xs">
                <h2 className="text-3xl font-bold mb-6">More Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <Sparkles size={24} className="text-teal-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Category
                      </p>
                      <p className="font-semibold text-gray-900">
                        {place.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Hourglass size={24} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pace</p>
                      <p className="font-semibold text-gray-900">
                        {place.pace.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Hand size={24} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Mobility
                      </p>
                      <p className="font-semibold text-gray-900">
                        {place.mobility.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 h-[400px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-xs">
                <DynamicMap
                  coordinates={place.coordinates.coordinates}
                  name={place.name}
                />
              </div>
            </aside>
          </div>
        </section>
      </article>
    </Layout>
  );
}
