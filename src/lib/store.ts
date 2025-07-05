import { create } from "zustand";
import { produce } from "immer";
import { Preferences, Itinerary } from "./types";

interface AppState {
  preferences: Preferences;
  setPreferences: (prefs: Partial<Preferences>) => void;
  itinerary: Itinerary | null;
  setItinerary: (itinerary: Itinerary) => void;
}

export const useAppStore = create<AppState>((set) => ({
  preferences: {
    regions: ["Bagan"],
    duration: 1,
    travelMonth: "",
    historicalInterests: [],
    sitePreference: "iconic",
    pace: "slow",
    activities: [],
    explorationStyle: "guided",
    budget: "mid-range",
    accommodation: "near sites",
    visaAssistance: false,
    cuisine: false,
    culturalExperiences: [],
  },
  setPreferences: (prefs) =>
    set(
      produce((state) => {
        state.preferences = { ...state.preferences, ...prefs };
      })
    ),
  itinerary: null,
  setItinerary: (itinerary) => set({ itinerary }),
}));
