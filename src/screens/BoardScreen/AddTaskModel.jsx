import { Dialog, Typography, Stack, IconButton, Chip, OutlinedInput, Button} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import ModalHeader from "../../components/layout/ModalHeader"


const AddTaskModel = ({tabName, onClose, addTask, loading}) => {
    const[text, setText]= useState("")
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
        <Stack p={2}>
            <ModalHeader title={"Add Task"} onClose={onClose}/>
            <Stack mt={3} spacing={2}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
                <Typography> Status</Typography>
                <Chip size="small" label={tabName} />
            </Stack>
            <OutlinedInput value={text} onChange={e=>setText(e.target.value)}placeholder="task"/>
            <Button disabled={loading} onClick={() => addTask(text)} variant="contained">
             Add Task
          </Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddTaskModel 
