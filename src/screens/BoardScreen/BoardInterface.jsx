
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModel from "./AddTaskModel";
import { useState, useCallback } from "react";
import useApp from "../../hooks/useApp";
import useStore from "../../store";
import { serverTimestamp } from "firebase/firestore";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(() => structuredClone(boardData || {
  todos: [],
  inProgress: [],
  completed: [],
}));
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();

  const handleOpenAddTaskModal = useCallback((status) => {
    setAddTaskTo(status);
  }, []);
   
 const handleUpdateTask = useCallback(
  async (tab, taskId, updatedTask) => {
    const dClone = structuredClone(tabs);
    const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
    if (taskIdx > -1) {
      dClone[tab][taskIdx] = { ...dClone[tab][taskIdx], ...updatedTask };
    }

    try {
      await updateBoardData(boardId, dClone);
      setTabs(dClone);
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    }
  },
  [tabs, boardId, updateBoardData, updateLastUpdated]
);


  const handleUpdateBoardData = async (dClone) => {
    setLoading(true);
    await updateBoardData(boardId, dClone);
    setTabs(dClone);
    updateLastUpdated();
    setToastr("Board updated!");
  };

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToastr("Task cannot be empty!");
    setLoading(true);
    const dClone = structuredClone(tabs);
    if (!Array.isArray(dClone[addTaskTo])) {
      dClone[addTaskTo] = [];
    }

    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID() });

    try {
       handleUpdateBoardData(dClone);
       setAddTaskTo("")
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      if (taskIdx > -1) dClone[tab].splice(taskIdx, 1);

      try {
        handleUpdateBoardData(dClone);
      } catch (err) {
        console.log(err);
      }
    },
    [tabs, boardId, updateBoardData, updateLastUpdated]
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  let sourceCol, targetCol;

  for (const key in tabs) {
    if (tabs[key].some((task) => task.id === active.id)) sourceCol = key;
    if (tabs[key].some((task) => task.id === over.id)) targetCol = key;
  }

  if (!sourceCol || !targetCol) return;

  const sourceTasks = [...tabs[sourceCol]];
  const targetTasks = [...tabs[targetCol]];
  const task = sourceTasks.find((t) => t.id === active.id);

  if (!task) return;

  const newTabs = structuredClone(tabs);

  if (sourceCol === targetCol) {
    const oldIndex = newTabs[sourceCol].findIndex((t) => t.id === active.id);
    const newIndex = newTabs[sourceCol].findIndex((t) => t.id === over.id);
    newTabs[sourceCol] = arrayMove(newTabs[sourceCol], oldIndex, newIndex);
  } else {
    
    newTabs[sourceCol] = newTabs[sourceCol].filter((t) => t.id !== active.id);
   
    const overIndex = newTabs[targetCol].findIndex((t) => t.id === over.id);
    if (overIndex === -1) {
      newTabs[targetCol].push(task);
    } else {
      newTabs[targetCol].splice(overIndex, 0, task);
    }
  }

  try {
    await updateBoardData(boardId, newTabs);
    setTabs(newTabs);
    updateLastUpdated();
  } catch (err) {
    console.log(err);
  }
};


  return (
    <>
      {!!addTaskTo && (
        <AddTaskModel
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <Grid container px={4} mt={2} spacing={6}>
          {Object.keys(statusMap).map((status) => (
            <SortableContext
              key={status}
              items={Array.isArray(tabs[status]) ? tabs[status].map((t) => t.id) : []}
              strategy={verticalListSortingStrategy}
            >
              <BoardTab
                status={status}
                tasks={tabs[status]}
                name={statusMap[status]}
                openAddTaskModal={handleOpenAddTaskModal}
                removeTask={handleRemoveTask}
                onUpdateTask={handleUpdateTask}
              />
            </SortableContext>
          ))}
        </Grid>
      </DndContext>
    </>
  );
};

export default BoardInterface;
