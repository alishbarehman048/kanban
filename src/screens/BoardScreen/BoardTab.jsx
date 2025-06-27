import {memo} from 'react'
import { Grid,Stack, Typography,IconButton,Box } from "@mui/material"
import AddIcon from "@mui/icons-material/AddCircleOutlined"
import Task from './Task'

const BoardTab = ({name,  tasks, status, openAddTaskModal, removeTask, onUpdateTask }) => {
  return (
    <>
     <Grid item xs={12} sm={4} >
      <Box sx={{width: "300px", borderRadius: 2, }}>
        <Stack p={3} bgcolor={"#000"}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Typography fontWeight={400} variant="h6" alignItems='center'>{name}</Typography>
                <IconButton onClick={() => openAddTaskModal(status)}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Stack>
          <Stack spacing={2} mt={3}>
          {Array.isArray(tasks) && tasks.map(task => (
          <Task
          key={task.id}
          text={task.text}
          cardData={task}
          id={task.id}
          removeTask={() => removeTask(status, task.id)}
          updateTask={(id, updatedTask) => onUpdateTask(status, id, updatedTask)}


          />
         ))}


          </Stack>
        </Stack>
        </Box>
       </Grid>
    </>
  )
}
export default memo(BoardTab)