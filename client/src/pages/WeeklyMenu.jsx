import { useEffect, useState, useRef } from "react";
import WeekCalendar from "../components/WeekCalendar";
import MenuList from "../components/MenuList";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function WeeklyMenu() {
  const [allMenuCalendar, setAllMenuCalendar] = useState([]);
  const [removedSuccess, setRemovedSuccess] = useState(false);
  const sensors = useSensors(
    /*useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),*/
    useSensor(MouseSensor, {
      activationConstraint: { delay: 150, tolerance: 100 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (e) => {
    const { active, over } = e;
    let menu = active.data.current.menuInfo;
    if (active.id !== over.id) {
      if (active.id.includes("_")) {
        const oldCell = active.id;
        const timeInfo = oldCell.split("_");
        let menuToRemove = {
          menu: { _id: menu._id },
          day: timeInfo[0],
          time: timeInfo[1],
        };
        handleRemoveMenu(menuToRemove);
        menu = { menu: menu };
      }

      const split = over.id.split("_");

      saveMenuInDB(menu, split[0], split[1]);
    }
  };
  const saveMenuInDB = async (menu, day, time) => {
    try {
      const res = await fetch("/api/recipe/save-weekly-menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: day,
          time: time,
          menu: menu.menu._id,
        }),
      });
      setAllMenuCalendar((prev) => [
        ...prev,
        { menu: menu.menu, day: day, time: time },
      ]);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleRemoveMenu = async (menuToRemove) => {
    try {
      const res = await fetch("/api/recipe/remove-weekly-menu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: menuToRemove.day,
          time: menuToRemove.time,
          menu: menuToRemove.menu._id,
        }),
      });
      setAllMenuCalendar(
        allMenuCalendar.filter(
          (menu) =>
            menu.day !== menuToRemove.day ||
            menu.time !== menuToRemove.time ||
            menu.menu._id !== menuToRemove.menu._id
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="ml-10 flex flex-col items-center">
      <h1 className="mt-10">Weekly Menu</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <WeekCalendar
          setAllMenuCalendar={setAllMenuCalendar}
          allMenuCalendar={allMenuCalendar}
          handleRemoveMenu={handleRemoveMenu}
          removedSuccess={removedSuccess}
          setRemovedSuccess={setRemovedSuccess}
        ></WeekCalendar>
        <MenuList></MenuList>
      </DndContext>
    </div>
  );
}
