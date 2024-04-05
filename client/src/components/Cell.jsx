import React from "react";
import clsx from "clsx";
import { useDroppable } from "@dnd-kit/core";
import MenuItem from "./MenuItem";
export default function Cell({
  className,
  id,
  allMenu,
  children,
  openPopUp,
  setClickedMenu,
  handleRemoveMenu,
}) {
  const { setNodeRef } = useDroppable({
    id: id,
  });
  if (allMenu !== undefined) {
    let i = 0;
    while (i < allMenu?.length) {
      let menu = allMenu[i];
      if (menu.day + "_" + menu.time === id) {
        children = (
          <MenuItem
            cellId={id}
            name={menu.menu.name}
            id={menu.menu._id}
            menuInfo={menu.menu}
            openPopUp={openPopUp}
            setClickedMenu={setClickedMenu}
            loc="cell"
            handleRemoveMenu={handleRemoveMenu}
          ></MenuItem>
        );
      }
      i = i + 1;
    }
  }
  return (
    <div
      id={id}
      ref={setNodeRef}
      className={clsx(
        "flex items-center justify-center border-b border-r",
        className
      )}
    >
      {children}
    </div>
  );
}
