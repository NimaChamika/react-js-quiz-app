import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import QuizPage from "Pages/QuizPage";
import WelcomePage from "Pages/WelcomePage";
import { PathsUrls } from "Utils/Data";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes>
          <Route exact path={PathsUrls.welcome} element={<WelcomePage />} />
          <Route path={PathsUrls.quiz} element={<QuizPage />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(92, 72, 163)",
    },
    secondary: {
      main: "#192B4A",
    },
    highlight: "#d1ac00",
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default App;
