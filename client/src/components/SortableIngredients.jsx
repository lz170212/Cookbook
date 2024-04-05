import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { FaMinusSquare } from "react-icons/fa";

export default function SortableIngredients(props) {
    const {index, item, handleInputFieldChange,handleInputFieldDelete} = props;
    let sortableId = index +1 ;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: sortableId, data:{type:"ingredients"}});

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
  return (
    <div  ref={setNodeRef} style={style} key={index} className="flex items-center gap-3 my-1">
      <button className="h-10 w-[6vw] hover:w-[8vw] hover:font-bold " {...attributes} {...listeners}>
        ⣿
      </button>
      <input
        key={index+"_input"}
        type="text"
        className="h-10 w-[40vw] lg:w-[35vw] rounded-md px-2"
        value={item}
        onChange={(e) => {
          handleInputFieldChange(e, "ingredients", index);
        }}
      />
      
      <FaMinusSquare
        key={index+"_remove"}
        className="cursor-pointer rounded-md text-2xl hover:text-red-500"
        onClick={() => {
          handleInputFieldDelete(index, "ingredients");
        }}
      />
    </div>
  );
}
