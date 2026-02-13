"use client"
import { draw } from "@/utils/draw";
import { useContext, useEffect, useRef, useState } from "react";
import { ShapeContext } from "@/hooks/shapeContext";

  type rectagle = {
    type: "rectangle";
    x: number;
    y: number;
    w: number;
    h: number;
  };

  type ellipse = {
    type: "ellipse";
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    rotation: number; //Math.PI / 4 for 45 degrees
    startAngle: number; // 0
    endAngle: number; // Math.PI * 2 for full circle
  };

  type line = {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };

  type arrow = {
    type: "arrow";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };

  type text = {
    type: "text";
    x: number;
    y: number;
    text: string;
  };

  export type Shapes = rectagle | ellipse | line | arrow | text;




export function Canvas({roomId} : {
  roomId : string
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {shapeType} = useContext(ShapeContext);
    const shapeTypeRef = useRef(shapeType);
    const [existingCanvas, setExistingCanvas] = useState<Shapes[]>([]);



    useEffect(() => {
        shapeTypeRef.current = shapeType;
        console.log("shapeTypeRef updated to:", shapeType);
    }, [shapeType]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cleanup = draw(canvas, shapeTypeRef, existingCanvas, setExistingCanvas);

        return cleanup;
    }, []);

    return (<div className="bg-white h-full w-full">
        <canvas height={1000} width={2000}  ref={canvasRef} ></canvas>
    </div>)
}