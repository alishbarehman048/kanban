import { useState, useEffect } from "react";
import { Typography, Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditTaskModal from "./EditTaskModal"; 

const Task = ({ id, text, removeTask, cardData, updateTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
  };

  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    console.log("openEdit changed:", openEdit);
  }, [openEdit]);

  return (
    <div ref={setNodeRef} style={style}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography
          p={1}
          width="100%"
          border="1px solid"
          borderColor="#777980"
          bgcolor="#45474E"
          {...attributes}
          {...listeners}
        >
          {text}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setOpenEdit(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={removeTask}>
          <DeleteIcon />
        </IconButton>
      </Stack>

      {openEdit && (
        <EditTaskModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          task={cardData}
          onUpdate={(id, updatedTask) => {
            updateTask(id, updatedTask);
            setOpenEdit(false);
          }}
        />
      )}
    </div>
  );
};

export default Task;
