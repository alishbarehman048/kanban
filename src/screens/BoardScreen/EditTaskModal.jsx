import { Dialog, Typography, Stack, IconButton, Chip, OutlinedInput, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModalHeader from "../../components/layout/ModalHeader";

const EditTaskModal = ({ open, onClose, task, onUpdate, loading }) => {
  const [text, setText] = useState(task?.text || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (task) {
      setText(task.text || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const handleSubmit = () => {
    onUpdate(task.id, {
      ...task,
      text,
      description,
      dueDate,
      file,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Edit Task" onClose={onClose} />
        <Stack spacing={2} mt={2}>
          <OutlinedInput value={text} onChange={e => setText(e.target.value)} placeholder="Task title" />
          <TextField multiline rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <TextField type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <Button disabled={loading} variant="contained" onClick={handleSubmit}>Save Changes</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default EditTaskModal;
