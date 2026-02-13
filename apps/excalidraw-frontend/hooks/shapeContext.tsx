"use client"
import { createContext, useState } from "react";

export const ShapeContext = createContext<{
  shapeType: string;
  setShapeType: React.Dispatch<React.SetStateAction<string>>;
}>({
  shapeType: "rectangle",
  setShapeType: () => {},
});
  
export const ShapeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shapeType, setShapeType] = useState<string>("rectangle");

  return (
    <ShapeContext.Provider value={{ shapeType, setShapeType }}>
      {children}
    </ShapeContext.Provider>
  );
}