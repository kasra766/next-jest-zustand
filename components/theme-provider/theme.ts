import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: { color: "unset", textDecoration: "unset" },
      },
    },
  },
});

export default theme;
