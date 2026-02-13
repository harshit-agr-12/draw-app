"use client"
import { ShapeContext } from "@/hooks/shapeContext";
import { useContext, useEffect } from "react";

export function ToolBar() {


  const { shapeType, setShapeType } = useContext(ShapeContext);

  // Debug: This will log when shapeType actually changes
  useEffect(() => {
    console.log("shapeType changed to:", shapeType);
  }, [shapeType]);

  function changeShape(Type: string) {
    console.log("Setting shape to:", Type);
    setShapeType(Type);
    // Don't log shapeType here - it won't be updated yet!
  }

  const shapes = [
    { type: "rectangle" },
    { type: "ellipse" },
    { type: "line" },
    { type: "arrow" },
    { type: "text" },
    { type: "select" },
  ];

  return (
    <div className="text-white absolute top-10 left-0 m-4 flex flex-col gap-2">
      {shapes.map((shape) => (
        <button
          key={shape.type}
          className={`p-2 rounded-lg cursor-pointer ${
            shapeType === shape.type ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-800"
          }`}
          onClick={() => changeShape(shape.type)}
        >
          {shape.type}
        </button>
      ))}
    </div>
  );
}