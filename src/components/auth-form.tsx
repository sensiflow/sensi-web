import { Box, TextField, Button, Grid, Link } from "@mui/material";
import * as React from "react";
import { AuthType } from "../pages/auth/auth-type";
import { Copyright } from "./copyright";

/**
 * An authentication form. This provides different fields depending on the type of the form.
 * 
 * @param handleSubmit A function that handles the form submission
 * @param type The type of the form (Login or Register)
 * @param redirectHref The href to redirect to when the user clicks on the link~
 * 
 * @returns A JSX element that can be used for login or register
 */
export function AuthForm(
  {handleSubmit, type, redirectHref}: {
    handleSubmit: (e, firstName, lastName, email, password) => void,
    type: AuthType,
    redirectHref: string
  }
){
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onFirstNameSubmit = e=>{ setFirstName(e.target.value) }
  const onLastNameSubmit =  e=>{ setLastName(e.target.value) }

  const redirectType = type === AuthType.Login ? 'Sign Up' : 'Sign In';
  
    return(
    <Box component="form" noValidate onSubmit={e => handleSubmit(e, firstName, lastName, email, password)} sx={{ mt: 1 }}>
      <FullNameInput
        isRegisterAction={type === AuthType.Register}
        onFirstNameSubmit={onFirstNameSubmit}
        onLastNameSubmit={onLastNameSubmit}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={e=>{setEmail(e.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={e=>{setPassword(e.target.value)}}
      />
      <Button
        type="submit"
        data-testid="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {type}
      </Button>
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Link href={redirectHref} variant="body2">
            {`Don't have an account? ${redirectType}`}
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  )
}

function FullNameInput({isRegisterAction, onFirstNameSubmit, onLastNameSubmit}: 
  {
    isRegisterAction: boolean
    onFirstNameSubmit: (event) => void,
    onLastNameSubmit: (event) => void,
  }){
  return (
    isRegisterAction ? <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            onChange={onFirstNameSubmit}
        />  
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            onChange={onLastNameSubmit}
        />
      </Grid>
    </Grid> : <></>
  )
}