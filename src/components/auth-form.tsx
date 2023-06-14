import { Box, TextField, Button, Grid, Link } from "@mui/material";
import * as React from "react";
import { Copyright } from "./copyright";

/**
 * An authentication form.
 *
 * TODO: Retrieve the actual value of the form fields on load instead of initializing them to empty strings
 *
 * @param handleSubmit A function that handles the form submission
 *
 * @returns A JSX element that can be used for login
 */
export function SignInForm({
  handleSubmit,
}: {
  handleSubmit: (e, email, password) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(e) => handleSubmit(e, email, password)}
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => {
          setEmail(e.target.value);
        }}
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        type="submit"
        data-testid="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign in
      </Button>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>{`Don't have an account? Contact your Administator`}</Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
