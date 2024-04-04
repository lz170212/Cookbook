import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { AiFillCloseCircle } from "react-icons/ai";
import clsx from "clsx";
export default function MenuItem({
  cellId,
  id,
  name,
  loc,
  openPopUp,
  menuInfo,
  setClickedMenu,
  handleRemoveMenu,
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: cellId,
      data: { id: id, name: name, menuInfo: menuInfo },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "rounded-md bg-slate-200  shadow-md flex items-center justify-center",
        isDragging && "opacity-50",
        loc === "list" && "p-2",
        loc === "cell" && "w-[160px] h-[50px] text-ellipsis"
      )}
    >
      <div
        onClick={() => {
          if (loc === "cell") {
            openPopUp();
            let time = cellId.split("_");
            setClickedMenu({ menu: menuInfo, day: time[0], time: time[1] });
          }
        }}
      >
        <span>{name}</span>
      </div>
      {loc === "cell" ? (
        <button
          id="button"
          onClick={() =>
            handleRemoveMenu({
              menu: menuInfo,
              day: cellId.split("_")[0],
              time: cellId.split("_")[1],
            })
          }
        >
          <AiFillCloseCircle className="h-5 w-5 opacity-80 hover:opacity-20 cursor-pointer"></AiFillCloseCircle>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
