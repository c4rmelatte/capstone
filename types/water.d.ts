import { ImageSourcePropType } from "react-native";

export interface WaterItem {
  id: string;
  name: string;
  type: string;
  price: string;
  imageKey: keyof typeof import("@/constants/Images").default; // strongly typed to your Images keys
  image?: ImageSourcePropType; // optional if you want to directly assign an image object
  isAvailable: boolean;
  description: string;
  rating: number;
  ratingCount: number;
}

export interface WaterContextType {
  waterItems: WaterItem[];
  loading: boolean;
  fetchWaterItems: () => Promise<void>;
}
