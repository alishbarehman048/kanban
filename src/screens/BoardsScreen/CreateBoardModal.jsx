import { useState } from 'react';
import { Dialog, Stack, Typography, Box, Button, TextField } from '@mui/material';
import ModalHeader from '../../components/layout/ModalHeader';
import { colors } from '../../theme';
import useApp from '../../hooks/useApp';
import useStore from "../../store";


const CreateBoardModal = ({closeModel}) => {
  const { createBoard }= useApp()
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () =>{
    const tName = name.trim();
    if (!tName) return setToastr("You need to enter board name");
    if (!/^[a-zA-Z0-9\s]{1,20}$/.test(tName))
      return setToastr(
        "Board name cannot contain special characters and should not be more than 20 chars"
      );
     try{
          setLoading(true)
          await   createBoard( {name, color}) ;
          closeModel();  
        } catch(err){
                setLoading(false)
                console.log(err);
            }
  }

  return (
    <Dialog open onClose={closeModel} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader onClose={closeModel} title="Create a Board" />
        <Stack my={5} spacing={3}>
          <TextField
            value={name}
            onChange={(e) => { setName(e.target.value);}}
            label="Board Name"
          />
          <Stack spacing={1.5} direction="row">
            <Typography>Color:</Typography>
            {colors.map((clr, idx) => (
              <Box
                key={clr}
                onClick={() => setColor(idx)}
                height={25}
                width={25}
                sx={{
                  backgroundColor: clr,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: color===idx?"3px solid white": "none",
                  outline:`2px solid ${clr}`
                  
                }}
              />
            ))}
          </Stack>
        </Stack>
        <Button disabled={loading}
         onClick={handleCreate} 
         variant="contained" 
         size="large">Create</Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
