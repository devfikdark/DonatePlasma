import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { NotificationContainer } from "react-notifications";
import "./App.css";
import Header from "./components/Header.component";
import RegisterPage from "./pages/Register.page";
import LoginPage from "./pages/Login.page";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
      <NotificationContainer />
    </ThemeProvider>
  );
}

export default App;
