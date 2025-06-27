import { AppBar,Toolbar, Button, Stack, useMediaQuery, IconButton} from '@mui/material'
import LogoImg from "../../assets/logo.svg";
{/*import LogoImg from "../../assets/PLANORA.svg"*/}
import ImageEl from "../../components/util/ImageEl";
import LogoutIcon from '@mui/icons-material/ExitToApp';
import CreateBoardIcon from "@mui/icons-material/AddCircle";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
auth

const TopBar = ({openModal}) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  return (
  <AppBar position='static'>
    <Toolbar sx={{ justifyContent:
      'space-between',}}>
        <ImageEl sx={{
          height:'25px',
        }}
        src={LogoImg} alt="planora" />
        <Stack direction='row' spacing={2}>
            {isXs ? (
            <>
              <IconButton onClick={openModal} color="primary">
                <CreateBoardIcon />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button onClick={openModal} variant="contained">
                Create board
              </Button>
              <Button
                onClick={() => signOut(auth)}
                startIcon={<LogoutIcon />}
                color="inherit"
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
    </Toolbar>
  </AppBar>
  )
}

export default TopBar