import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#343454",
      dark: "#F9C152",
      light: "#eceff1",
    },
    secondary: {
      main: "#F9C152",
    },
    success: {
      main: "#4caf50",
    },
  },

  typography: {
    fontSize: 16,
    h3: {
      fontWeight: 700,
      fontSize: "2.2rem",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
});
