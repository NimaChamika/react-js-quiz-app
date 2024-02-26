import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FeedbackDialog from "Utils/FeedbackDialog";
import { PathsUrls } from "Utils/Data";
import WithDailyEntries from "./WithGetQuizLstAPI";
import styles from "./index.module.css";

function QuizPage({ quizLst }) {
  // #region HOOKS
  const [currentQuizIndex, setCurrentQuizIndex] = useState(-1);

  const [openQuizExplanationDialog, setOpenQuiExplanationDialog] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizLst.length > 0) {
      setCurrentQuizIndex(randomNumber(0, quizLst.length));
    }
  }, [quizLst]);

  // #endregion

  // #region UTIL FNS
  function startBtnClick() {
    setOpenQuiExplanationDialog(true);
  }

  // MIN(INCLUDED) MAX(EXCLUDED)
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // #endregion

  // #region QUESTION CONTENT
  let questionContent;

  if (quizLst.length > 0 && currentQuizIndex >= 0) {
    const currentQuiz = quizLst[currentQuizIndex];

    console.log(currentQuiz);

    questionContent = (
      <div className={styles.questionContentParentDiv}>
        <div>
          <Typography variant="h4">{`#${currentQuizIndex.toString().padStart(4, "0")}`}</Typography>
          <Typography variant="h5">{currentQuiz.quiz}</Typography>
          <Typography
            variant="body2"
            sx={{ marginTop: "20px", whiteSpace: "pre-wrap" }}
          >
            <code>{currentQuiz.code}</code>
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
    );
  }
  // #endregion

  // #region EXPLANATION DIALOG

  let explanationDialogContent;

  if (openQuizExplanationDialog) {
    explanationDialogContent = (
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
    setOpenQuiExplanationDialog(false);

    navigate(PathsUrls.quiz, { replace: "true" });
  }
  // #endregion

  return (
    <Box className={styles.parentDiv}>
      {questionContent}
      {explanationDialogContent}
    </Box>
  );
}

export default WithDailyEntries(QuizPage);
