import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "./icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import TaskCard from "./TaskCard";


function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: true,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-white
      border
      w-[300px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      bg-white
      border
      w-[300px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}

        className="
      
      text-md
      cursor-grab
      rounded-md
      p-3
      font-bold
      border
      flex
      items-center
      justify-center
      "
      >
        <div className="flex gap-2">
          <div className="px-3 py-1 text-xs text-azul bg-blue-100 rounded-full dark:bg-azulQuasePreto dark:text-white">
            {tasksIds && tasksIds.length}
          </div>
          {column.id}
        </div>

      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-2 p-1 overflow-x-hidden overflow-y-auto scroll bg-slate-50">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      {/* <button
        className="flex gap-2 items-center border-columnBackgroundColor border rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button> */}
    </div>
  );
}

export default ColumnContainer;
