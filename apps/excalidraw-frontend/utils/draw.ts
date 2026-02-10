import { Shapes } from "@/components/Canvas";

export function draw(
  canvas: HTMLCanvasElement,
  shapeType: string = "rectangle",
  existingCanvas: any,
setExistingCanvas: React.Dispatch<React.SetStateAction<any>>,
) {


  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let mouseDown = false;
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  existingCanvas.forEach((shape : Shapes) => {
    if (shape.type === "rectangle") {
      ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "line") {
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.stroke();
    } else if (shape.type === "arrow") {
      const headlen = 10; // length of head in pixels
      const angle = Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1);
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.lineTo(
        shape.x2 - headlen * Math.cos(angle - Math.PI / 6),
        shape.y2 - headlen * Math.sin(angle - Math.PI / 6),
      );
      ctx.moveTo(shape.x2, shape.y2);
      ctx.lineTo(
        shape.x2 - headlen * Math.cos(angle + Math.PI / 6),
        shape.y2 - headlen * Math.sin(angle + Math.PI / 6),
      );
      ctx.stroke();
    } else if (shape.type === "text") {
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(shape.text, shape.x, shape.y);
    }
  });

  let x = 0;
  let y = 0;

  canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    x = e.clientX;
    y = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    existingCanvas.push({
      type: shapeType,
      x: x,
      y: y,
      w: e.clientX - x,
      h: e.clientY - y,
      radius: Math.sqrt(
        Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2),
      ),
      x1: x,
      y1: y,
      x2: e.clientX - x,
      y2: e.clientY - y,
      text: "hello",
    } as Shapes);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      const w = e.clientX - x;
      const h = e.clientY - y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log("existingCanvas", existingCanvas);

      ctx.strokeStyle = "white";
      existingCanvas.forEach((shape : Shapes) => {
        if (shape.type === "rectangle") {
          ctx.strokeStyle = "white";
          ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
        } else if (shape.type === "circle") {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.strokeStyle = "white";
          ctx.stroke();
        } else if (shape.type === "line") {
          ctx.beginPath();
          ctx.moveTo(shape.x1, shape.y1);
          ctx.lineTo(shape.x2, shape.y2);
          ctx.strokeStyle = "white";
          ctx.stroke();
        } else if (shape.type === "arrow") {
          const headlen = 10; // length of head in pixels
          const angle = Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1);
          ctx.beginPath();
          ctx.moveTo(shape.x1, shape.y1);
          ctx.lineTo(shape.x2, shape.y2);
          ctx.lineTo(
            shape.x2 - headlen * Math.cos(angle - Math.PI / 6),
            shape.y2 - headlen * Math.sin(angle - Math.PI / 6),
          );
          ctx.moveTo(shape.x2, shape.y2);
          ctx.lineTo(
            shape.x2 - headlen * Math.cos(angle + Math.PI / 6),
            shape.y2 - headlen * Math.sin(angle + Math.PI / 6),
          );
          ctx.strokeStyle = "white";
          ctx.stroke();
        } else if (shape.type === "text") {
          ctx.fillStyle = "white";
          ctx.font = "20px Arial";
          ctx.fillText(shape.text, shape.x, shape.y);
        }
      });
      ctx.strokeStyle = "white";
      if (shapeType === "rectangle") {
        ctx.strokeRect(x, y, w, h);
      } else if (shapeType === "circle") {
        ctx.beginPath();
        ctx.arc(
          x,
          y,
          Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)),
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = "white";
        ctx.stroke();
      } else if (shapeType === "line") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(e.clientX-x, e.clientY-y);
        ctx.strokeStyle = "white";
        ctx.stroke();
      } else if (shapeType === "arrow") {
        const headlen = 10; // length of head in pixels
        const angle = Math.atan2(h, w);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(e.clientX-x, e.clientY-y);
        ctx.lineTo(
          e.clientX - headlen * Math.cos(angle - Math.PI / 6),
          e.clientY - headlen * Math.sin(angle - Math.PI / 6),
        );
        ctx.moveTo(e.clientX-x, e.clientY-y);
        ctx.lineTo(
          e.clientX - headlen * Math.cos(angle + Math.PI / 6),
          e.clientY - headlen * Math.sin(angle + Math.PI / 6),
        );
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
    }
  });
}
