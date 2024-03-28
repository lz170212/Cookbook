import React from 'react';
import clsx from 'clsx';
import {useDroppable} from '@dnd-kit/core';
export default function Cell({className, children,id}) {
    const {setNodeRef} =useDroppable({
        id:id,
    });
  return (
    <div id={id }ref={setNodeRef} className={clsx('flex items-center justify-center border-b border-r',className)}>
        {children}
    </div>
  );
};
