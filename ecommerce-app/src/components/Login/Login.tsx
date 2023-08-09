import React from "react";
import "./Login.css";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  //IconButton,
} from "@mui/material";
//import VisibilityOff from "@mui/material";

export default function Login() {
  return (
    <Grid
      mt={6}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={6} className="login-card">
        <Typography variant="h3" component="h2">
          Sign in
        </Typography>
        <Grid container mt={6} rowSpacing={1}>
          <TextField
            id="email"
            label="enter email"
            type="email"
            variant="outlined"
            className="input-field"
            fullWidth
          />
          <TextField
            id="password"
            label="enter password"
            type="password"
            variant="outlined"
            className="input-field"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  eye
                  {/* <IconButton>{VisibilityOff}</IconButton> */}
                </InputAdornment>
              ),
            }}
          />
          <Grid container justifyContent="center">
            <Button variant="contained" className="submit-btn">
              Sumbit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
