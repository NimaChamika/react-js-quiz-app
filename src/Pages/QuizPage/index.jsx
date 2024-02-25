import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FeedbackDialog from "Utils/FeedbackDialog";
import { PathsUrls } from "Utils/Data";
import WithDailyEntries from "./WithGetQuizLstAPI";
import styles from "./index.module.css";

function QuizPage() {
  // #region HOOKS
  const [openQuizIntroDialog, setOpenQuizIntroDialog] = useState(false);
  const navigate = useNavigate();
  // #endregion

  // #region UTIL FNS
  function startBtnClick() {
    setOpenQuizIntroDialog(true);
  }
  // #endregion

  // #region QUIZ INTRO DIALOG

  let quizIntroDialogContent;
  if (openQuizIntroDialog) {
    quizIntroDialogContent = (
      <FeedbackDialog
        data={{
          title: "Good Luck...!",
          msg: `The quiz bank contains more than 100 questions, presented in a random 
          order for you. Feel free complete them at your own pace.`,
        }}
        onClose={closeQuizIntroDialog}
      />
    );
  }

  function closeQuizIntroDialog() {
    setOpenQuizIntroDialog(false);

    navigate(PathsUrls.quiz, { replace: "true" });
  }
  // #endregion

  return (
    <Box className={styles.parentDiv}>
      <div className={styles.welcomeContentParentDiv}>
        <div>
          <Typography variant="h4">Hello...!</Typography>
          <Typography variant="h5">QUIZ PAG</Typography>
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
          <Button
            variant="contained"
            className={styles.btn}
            onClick={startBtnClick}
          >
            Start
          </Button>
          <Button variant="outlined" className={styles.btn}>
            Create Quiz
          </Button>
        </div>
      </div>
      {quizIntroDialogContent}
    </Box>
  );
}

export default WithDailyEntries(QuizPage);
