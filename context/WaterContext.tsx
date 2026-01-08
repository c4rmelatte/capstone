// WaterContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getWaterItems } from "../services/waterService";
import { WaterContextType, WaterItem } from "../types/water.d";

const WaterContext = createContext<WaterContextType>({
  waterItems: [],
  loading: true,
  fetchWaterItems: async () => {},
});

export const useWater = () => useContext(WaterContext);

export const WaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [waterItems, setWaterItems] = useState<WaterItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWaterItems = async () => {
    setLoading(true);
    const data = await getWaterItems();
    setWaterItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWaterItems();
  }, []);

  return (
    <WaterContext.Provider value={{ waterItems, loading, fetchWaterItems }}>
      {children}
    </WaterContext.Provider>
  );
};
