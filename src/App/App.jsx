import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import WelcomePage from "Pages/WelcomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          {/* <Route path={PathsUrls.pastDraws} element={<PastDrawsPage />} />
          <Route path={PathsUrls.dailyEntries} element={<DailyEntriesPage />} /> */}
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
