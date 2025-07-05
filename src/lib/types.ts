export interface Preferences {
  regions: string[];
  duration: number;
  travelMonth: string;
  historicalInterests: string[];
  sitePreference: string;
  festivals: string[];
  pace: string;
  activities: string[];
  explorationStyle: string;
  budget: string;
  accommodation: string;
  transport: string[];
  mobility: string;
  visaAssistance: boolean;
  cuisine: boolean;
  culturalExperiences: string[];
  specialRequests: string[];
}

export interface ItineraryItem {
  placeId: string;
  time: string;
  notes: string;
  name: string;
  description: string;
  photoUrl: string;
  coordinates: { longitude: number; latitude: number };
}

export interface Itinerary {
  id: string;
  title: string;
  duration: number;
  items: ItineraryItem[];
  checklist: { task: string; completed: boolean }[];
}
