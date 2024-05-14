import PlusIcon from "./icons/PlusIcon";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,

  DragOverlay,

  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols = [
  {
    id: "Pendente",
    title: "Pendente",
  },
  {
    id: "Em Andamento",
    title: "Em Andamento",
  },
  {
    id: "Cancelada",
    title: "Cancelada",
  },
  {
    id: "Finalizada",
    title: "Finalizada",
  },
  {
    id: "Interrompida",
    title: "Interrompida",
  },

  {
    id: "Concluida",
    title: "Concluida",
  },
];



function KanbanBoard({ tarefas, criarTarefa, setTarefaEspecifica, openVisualizar, setOpenVisualizar }) {
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(tarefas);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="

        w-[full]
        max-w-[1200px]
        h-full

        overflow-x-scroll
        scroll
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-1">
          <div className="flex gap-1">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.status == col.id)}
                />
              ))}
            </SortableContext>
          </div>

        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.status === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(status) {
    const newTask = {
      id: generateId(),
      status,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id_tarefa !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id_tarefa !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.status !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  async function updateStatus(id_tarefa, novoStatus) {
    console.log('===> id', id_tarefa)
    console.log('===> status', novoStatus)
    let token = window.localStorage.getItem('$TOKEN');

    try {
      const response = await fetch(`http://localhost:33331/tarefa/${id_tarefa}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      const data = await response.json();
      if (data.error) {
        console.log('Erro ao enviar dados:', data.error);
      } else {
        console.log('sucesso');
      }
    } catch (error) {
      console.error(error);
      console.log('Ocorreu um erro ao enviar os dados do formulário.');
    }

  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    // Verifica se estamos movendo uma tarefa para uma nova coluna
    if (isActiveATask && isOverAColumn) {
      updateStatus(activeId, overId);
    }

    // Resto do código para reordenar tarefas dentro da coluna, se necessário
  }


  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id_tarefa === activeId);
        const overIndex = tasks.findIndex((t) => t.id_tarefa === overId);

        if (tasks[activeIndex].status != tasks[overIndex].status) {
          // Fix introduced after video recording
          tasks[activeIndex].status = tasks[overIndex].status;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id_tarefa === activeId);

        tasks[activeIndex].status = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
