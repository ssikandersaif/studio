export interface CropPrice {
  id: string;
  name: string;
  variety: string;
  mandi: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
}

export interface WeatherData {
  current: {
    temp: number;
    description: string;
    icon: string;
    humidity: number;
    wind: number;
    recommendation: string;
  };
  forecast: {
    day: string;
    temp: number;
    description: string;
    icon: string;
  }[];
}

export interface AgriculturalOfficer {
  id: string;
  name: string;
  title: string;
  district: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: {
    crops: string[];
    states: string[];
  };
  link: string;
}

export type WeatherServiceInput = {
  lat: number;
  lon: number;
};

export type WeatherServiceOutput = {
  weather: WeatherData;
  locationName: string;
};
