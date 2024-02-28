import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import FeedbackDialog from "Utils/FeedbackDialog";
import { PathsUrls } from "Utils/Data";
import WithDailyEntries from "./WithGetQuizLstAPI";
import styles from "./index.module.css";
import AnswerContent from "./UtilComponents";

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

  const completedQuizIndexLst = useRef([]);
  const correctAnswerCount = useRef(0);

  // #endregion

  // #region UTIL FNS

  // MIN(INCLUDED) MAX(EXCLUDED)
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function updateQuizResultCount(isCorrectAnswer) {
    if (isCorrectAnswer) {
      correctAnswerCount.current += 1;
    }
    completedQuizIndexLst.current.push(currentQuizIndex);
  }

  function getCurrentQuizResult() {
    return {
      correctAnswerCount: correctAnswerCount.current,
      completedQuizCount: completedQuizIndexLst.current.length,
    };
  }
  // #endregion

  // #region QUESTION CONTENT
  let questionContent;

  if (quizLst.length > 0 && currentQuizIndex >= 0) {
    const currentQuiz = quizLst[currentQuizIndex];

    questionContent = (
      <div className={styles.questionContentParentDiv}>
        <div className={styles.questionContent}>
          <Typography variant="h4">{`#${currentQuizIndex.toString().padStart(4, "0")}`}</Typography>
          <Typography variant="h5">{currentQuiz.quiz}</Typography>
          <Typography
            variant="body2"
            sx={{
              marginTop: "20px",
              whiteSpace: "pre-wrap",
              backgroundColor: "rgb(146, 133, 192)",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <code>{currentQuiz.code}</code>
          </Typography>
        </div>

        <div className={styles.questionContentBtnParentDiv}>
          <Button variant="outlined" size="small">
            Report Issue
          </Button>
        </div>
      </div>
    );
  }
  // #endregion

  // #region ANSWER CONTENT
  let answerContent;

  if (quizLst.length > 0 && currentQuizIndex >= 0) {
    answerContent = (
      <AnswerContent
        currentQuiz={quizLst[currentQuizIndex]}
        updateQuizResultCount={updateQuizResultCount}
        getCurrentQuizResult={getCurrentQuizResult}
      />
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
    <div className={styles.parentDiv}>
      {questionContent}
      {answerContent}
      {explanationDialogContent}
    </div>
  );
}

export default WithDailyEntries(QuizPage);
