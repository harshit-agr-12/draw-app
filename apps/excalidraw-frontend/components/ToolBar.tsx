


export function ToolBar({ setShapeType} : {
    setShapeType: React.Dispatch<React.SetStateAction<string>>,
} ){

    function changeShape(shapeType: string){
        console.log("shapeType", shapeType)

        setShapeType(shapeType);

    }


    const shapes = [
        {
            type : "circle",
            x : Number,
            y : Number,
            radius : Number,
        },
        {
            type : "rectangle",
            x : Number,
            y : Number,
            w : Number,
            h : Number,
        },
        {
            type : "line",
            x1 : Number,
            y1 : Number,
            x2 : Number,
            y2 : Number,
        },
        {
            type : "arrow",
            x1 : Number,
            y1 : Number,
            x2 : Number,
            y2 : Number,
        },
        {
            type : "text",
            x : Number,
            y : Number,
            text : String,
        },
        {
            type : "select",
        }
    ]

    return<div className="text-white absolute top-10 left-0 m-4 flex flex-col gap-2">
        {/* <Lock /> */}
        {shapes.map((shape) => {
            return <button key={shape.type} className="bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-800 " onClick={() => changeShape(shape.type)}>
                {shape.type}
            </button>
        })}
    </div>
}   