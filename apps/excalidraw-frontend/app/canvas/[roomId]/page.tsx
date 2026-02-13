
import {  ShapeProvider } from "@/hooks/shapeContext";
import { ToolBar } from "@/components/ToolBar";
import { Canvas } from "@/components/Canvas";

  export default async function Page({params} :{
    params: {
      roomId: string
    }
  }) {

  const roomId = (await params).roomId;

  return (
    <ShapeProvider>
      <ToolBar />
      <Canvas roomId={roomId} />
    </ShapeProvider>
  );
}