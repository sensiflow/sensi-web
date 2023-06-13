import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {SignInForm} from '../../components/auth-form';
import {paths} from '../../app-paths';
import {useAuth} from "../../logic/context/auth-context";
import {APIError, errorFallback} from "../utils";
import {appToast, ToastType} from "../../components/toast";


const theme = createTheme();

export default function Login() {
    const navigate = useNavigate()
    const { login , isLoggedIn } = useAuth()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, email, password) => {
        try{
            event.preventDefault();
            await login({email, password})
        }catch (e) {
            if(e.status === APIError.BAD_REQUEST){ appToast(ToastType.WARNING, "Invalid Credentials"); return }
            errorFallback(e, navigate)
        }

    };

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate(paths.dashboard.home)
    }
  }, [isLoggedIn])

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <SignInForm 
              handleSubmit={handleSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

