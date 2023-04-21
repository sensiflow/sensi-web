import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { Container, CssBaseline, Box, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { register } from '../../api/fake/fake-api';
import { AuthForm } from '../../components/auth-form';
import { paths } from '../../app-paths';
import { AuthType } from './auth-type';

const theme = createTheme();

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, firstName:string, lastName: string, email: string, password: string) => {
    event.preventDefault();
    register({firstName, lastName, email, password})
  };

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
        <Box
          sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <AuthForm 
              handleSubmit={handleSubmit}
              type={AuthType.Register}
              redirectHref={paths.login}
            />
        </Box>
    </Container>
    </ThemeProvider>
  );
}

