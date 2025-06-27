import { useState } from "react";
import { Container,Stack, OutlinedInput, Button, TextField, Typography } from "@mui/material"
import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/util/ImageEl";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import useStore from '../../store'


const initForm = {
    email:'',
    password:'',
}
export const AuthScreen = () => {
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const { setToastr} = useStore()
    const[form, setForm]= useState(initForm);
    const authText= isLogin?"do not have an account?" : "Already have an account"

    const handleChange= event =>
    {
        setForm(oldForm => ({...oldForm, [event.target.name]: event.target.value,

        }))
    }
    const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      const msg = err.code.split("auth/")[1].split("-").join(" ");
      setToastr(msg);
      setLoading(false);
    }
  
    };

  return (<Container maxWidth="xs" sx={{
    mt: 10
 }}>
    <Stack mb={6} spacing={4} alignItems={"center"} textAlign={"center"}>
      <ImageEl  src={LogoImg} alt="Planora" />
      <Typography color="rgba(255,255,255,.6)">
        Acess your tasks, Anywhere, Anytime.
      </Typography>
      </Stack>
      <Stack spacing={2}>
      <TextField value={form.email} name="email" onChange={handleChange} label="email" />
      <TextField value={form.password}  name="password" type="password" onChange={handleChange} label="password" />
      <Button disabled={!form.email.trim() || !form.password.trim() || loading} onClick={handleAuth} size="large" variant="contained">{isLogin? "Login": "Register"} </Button>
      </Stack>
      <Typography sx={{cursor:"pointer"}} onClick={()=> setIsLogin(o=>!o)} textAlign={"center"} mt={3}>{authText}</Typography>
    </Container>
  )
};

export default AuthScreen