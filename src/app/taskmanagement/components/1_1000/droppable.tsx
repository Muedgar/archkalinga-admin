import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function OneDroppable({ id, children }: {id: string, children: React.ReactNode}) {
  const { isOver, over, setNodeRef } = useDroppable({ id });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
       {children}
    </div>
  );
}
