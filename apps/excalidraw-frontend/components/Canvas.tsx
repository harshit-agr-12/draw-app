"use client"
import { draw } from "@/utils/draw";
import { useEffect, useRef, useState } from "react";
import { ToolBar } from "./ToolBar";

  type rectagle = {
    type: "rectangle";
    x: number;
    y: number;
    w: number;
    h: number;
  };

  type circle = {
    type: "circle";
    x: number;
    y: number;
    radius: number;
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

  export type Shapes = rectagle | circle | line | arrow | text;




export function Canvas({roomId} : {
    roomId : string
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shapeType, setShapeType] = useState("rectangle");
    const [existingCanvas, setExistingCanvas] = useState<Shapes[]>([]);


    useEffect(() => {
        if (canvasRef.current) {
            draw(canvasRef.current, shapeType , existingCanvas , setExistingCanvas);
        
        }
}, [canvasRef, shapeType, existingCanvas])

    return (<div className="bg-black h-full w-full">
        <div className="float-center bg-amber-600" >
            <button className="bg-amber-400 absolute p-2 rounded-lg" onClick={() => {
                if(canvasRef.current){
                    const link = canvasRef.current.toDataURL("image/png");
                    const a = document.createElement("a");
                    a.href = link;
                    a.download = "canvas.png";
                    a.click();
                }
            }}>Download</button>
        </div>
        <div className="float-right">
            <ToolBar setShapeType={setShapeType}  />
        </div>
        <canvas height={1000} width={2000}  ref={canvasRef} ></canvas>
    </div>)
}