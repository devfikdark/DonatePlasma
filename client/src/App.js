import { Button, Typography } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Typography variant="h3">Hello there</Typography>
        <Button>hello</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
