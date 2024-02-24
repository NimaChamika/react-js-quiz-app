import { Box, Button, Typography } from "@mui/material";
import styles from "./index.module.css";

function WelcomePage() {
  return (
    <Box className={styles.parentDiv}>
      <div className={styles.welcomeContentParentDiv}>
        <div>
          <Typography variant="h4">Hello...!</Typography>
          <Typography variant="h5">
            Welcome to JS Tricky Quiz Challenge.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Brace yourself for a mind-bending journey through the intricate
            corners of JavaScript, where every question will keep you on your
            coding toes.
          </Typography>
          <Typography variant="body2">
            Are you ready to dive into the world of JavaScript? sharpen your
            coding prowess, challenge your knowledge, and relish the
            satisfaction of improving your skills in one of the most dynamic
            programming languages out there.
          </Typography>
        </div>

        <div className={styles.btnParentDiv}>
          <Button variant="contained" className={styles.btn}>
            Start
          </Button>
          <Button variant="outlined" className={styles.btn}>
            Create Quiz
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default WelcomePage;
