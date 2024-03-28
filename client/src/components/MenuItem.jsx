import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import clsx from 'clsx';
export default function MenuItem({id,name}) {
    const { attributes, listeners, setNodeRef, transform ,isDragging} =
    useDraggable({
        id: id,
        data: { name: name }
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
      className={clsx("rounded-md bg-slate-200 p-2 shadow-md flex items-center justify-center", isDragging && 'opacity-50')}
    >
      <span>{name}</span>
    </div>
  );
}


