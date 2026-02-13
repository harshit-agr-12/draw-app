import { Shapes } from "@/components/Canvas";

export function draw(
  canvas: HTMLCanvasElement,
  shapeTypeRef: React.MutableRefObject<string>,
  existingCanvas: any,
  setExistingCanvas: React.Dispatch<React.SetStateAction<any>>,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let mouseDown = false;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";

  // Helper function to draw arrow
  const drawArrow = (x1: number, y1: number, x2: number, y2: number) => {
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(
      x2 - headlen * Math.cos(angle - Math.PI / 6),
      y2 - headlen * Math.sin(angle - Math.PI / 6),
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headlen * Math.cos(angle + Math.PI / 6),
      y2 - headlen * Math.sin(angle + Math.PI / 6),
    );
    ctx.stroke();
  };

  // Helper function to render all shapes
  const renderShapes = () => {
    ctx.strokeStyle = "black";
    existingCanvas.forEach((shape: Shapes) => {
      if (shape.type === "rectangle") {
        ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
      } else if (shape.type === "ellipse") {
        ctx.beginPath();
        ctx.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, shape.rotation, shape.startAngle, shape.endAngle);
        ctx.stroke();
      } else if (shape.type === "line") {
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
      } else if (shape.type === "arrow") {
        drawArrow(shape.x1, shape.y1, shape.x2, shape.y2);
      } else if (shape.type === "text") {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(shape.text, shape.x, shape.y);
      }
    });
  };

  renderShapes();

  let x = 0;
  let y = 0;

  // Create text input for text tool
  const createTextInput = (posX: number, posY: number) => {
    // Remove any existing input
    const existingInput = document.getElementById("canvas-text-input");
    if (existingInput) {
      existingInput.remove();
    }

    const input = document.createElement("input");
    input.type = "text";
    input.id = "canvas-text-input";
    input.style.position = "fixed";
    input.style.left = `${posX}px`;
    input.style.top = `${posY - 20}px`;
    input.style.background = "transparent";
    input.style.border = "1px solid white";
    input.style.outline = "none";
    input.style.color = "white";
    input.style.fontSize = "20px";
    input.style.fontFamily = "Arial";
    input.style.padding = "2px 4px";
    input.style.minWidth = "100px";
    input.style.zIndex = "1000";

    document.body.appendChild(input);
    input.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const text = input.value.trim();
        if (text) {
          const newShape: Shapes = {
            type: "text",
            x: posX,
            y: posY,
            text: text,
          };
          existingCanvas.push(newShape);
          
          // Re-render to show the new text
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          renderShapes();
        }
        input.remove();
      } else if (e.key === "Escape") {
        input.remove();
      }
    };

    const handleBlur = () => {
      const text = input.value.trim();
      if (text) {
        const newShape: Shapes = {
          type: "text",
          x: posX,
          y: posY,
          text: text,
        };
        existingCanvas.push(newShape);
        
        // Re-render to show the new text
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderShapes();
      }
      input.remove();
    };

    input.addEventListener("keydown", handleKeyDown);
    input.addEventListener("blur", handleBlur);
  };

  const handleMouseDown = (e: MouseEvent) => {
    const currentShape = shapeTypeRef.current;
    
    // For text, just handle click, not drag
    if (currentShape === "text") {
      createTextInput(e.clientX, e.clientY);
      return;
    }
    
    mouseDown = true;
    x = e.clientX;
    y = e.clientY;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!mouseDown) return;
    mouseDown = false;

    const w = e.clientX - x;
    const h = e.clientY - y;
    const currentShape = shapeTypeRef.current;

    // Skip text - it's handled in mousedown
    if (currentShape === "text") return;

    let newShape: Shapes;

    if (currentShape === "rectangle") {
      newShape = {
        type: "rectangle",
        x: x,
        y: y,
        w: w,
        h: h,
      };
    } else if (currentShape === "ellipse") {
      newShape = {
        type: "ellipse",
        x: x + w / 2,
        y: y + h / 2,
        radiusX: Math.abs(w) / 2,
        radiusY: Math.abs(h) / 2,
        rotation: 0,
        startAngle: 0,
        endAngle: Math.PI * 2,
      };
    } else if (currentShape === "line") {
      newShape = {
        type: "line",
        x1: x,
        y1: y,
        x2: e.clientX,
        y2: e.clientY,
      };
    } else if (currentShape === "arrow") {
      newShape = {
        type: "arrow",
        x1: x,
        y1: y,
        x2: e.clientX,
        y2: e.clientY,
      };
    } else {
      return;
    }

    existingCanvas.push(newShape);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (mouseDown) {
      const w = e.clientX - x;
      const h = e.clientY - y;
      const currentShape = shapeTypeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      renderShapes();

      ctx.strokeStyle = "black";
      if (currentShape === "rectangle") {
        ctx.strokeRect(x, y, w, h);
      } else if (currentShape === "ellipse") {
        ctx.beginPath();
        ctx.ellipse(
          x + w / 2,
          y + h / 2,
          Math.abs(w) / 2,
          Math.abs(h) / 2,
          0,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      } else if (currentShape === "line") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
      } else if (currentShape === "arrow") {
        drawArrow(x, y, e.clientX, e.clientY);
      }
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
    // Clean up any remaining text input
    const existingInput = document.getElementById("canvas-text-input");
    if (existingInput) {
      existingInput.remove();
    }
  };
}
