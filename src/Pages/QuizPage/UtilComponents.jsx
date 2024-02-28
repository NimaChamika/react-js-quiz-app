/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FeedbackDialog from "Utils/FeedbackDialog";
import { useNavigate } from "react-router-dom";
import { PathsUrls } from "Utils/Data";
import styles from "./index.module.css";

function AnswerContent({
  currentQuiz,
  updateQuizResultCount,
  getCurrentQuizResult,
}) {
  // #region HOOKS
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [canOpenFeedbackDialog, setCanOpenFeedbackDialog] = useState({
    state: false,
    data: null,
    isCancelBtnActive: false,
    callBackFn: null,
  });

  const navigate = useNavigate();
  const theme = useTheme();
  // #endregion

  // #region ANSWER LIST CONTENT
  const answerLstContent = currentQuiz.ans.map((item, index) => {
    return (
      <Box
        key={index}
        onClick={() => {
          changeSelectedAnswer(index);
        }}
        sx={{
          backgroundColor: getAnswerBtnColor(index),
          cursor: "pointer",
          "&:hover": {
            opacity: "0.5",
          },
        }}
        className={styles.answer}
      >
        <Typography variant="body2" textTransform="initial">
          {item}
        </Typography>
      </Box>
    );
  });

  function getAnswerBtnColor(index) {
    if (isAnswerSubmitted) {
      if (index === selectedAnswer) {
        return selectedAnswer === currentQuiz.correctIdx
          ? theme.palette.success.main
          : theme.palette.error.main;
      }
      return index === currentQuiz.correctIdx
        ? theme.palette.success.main
        : theme.palette.secondary.main;
    }
    return selectedAnswer === index
      ? theme.palette.warning.main
      : theme.palette.secondary.main;
  }

  function changeSelectedAnswer(index) {
    setSelectedAnswer(index);
  }
  // #endregion

  // #region BUTTON LIST CONTENT
  const buttonLstContent = (
    <>
      {isAnswerSubmitted ? (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={explanationBtnClick}
          >
            Explanation
          </Button>
          <Button variant="contained" color="secondary">
            Next
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={submitBtnClick}
          disabled={selectedAnswer < 0}
          color="secondary"
        >
          Submit
        </Button>
      )}

      <Button variant="contained" onClick={finishBtnClick} color="secondary">
        Finish
      </Button>
    </>
  );

  function submitBtnClick() {
    if (selectedAnswer === currentQuiz.correctIdx) {
      updateQuizResultCount(true);
    } else {
      updateQuizResultCount(false);
    }

    setIsAnswerSubmitted(true);
  }

  function explanationBtnClick() {
    setCanOpenFeedbackDialog({
      state: true,
      data: {
        title: "Explanation",
        msg: currentQuiz.exp,
      },
      isCancelBtnActive: false,
      callBackFn: () => {
        closeFeedbackDialog();
      },
    });
  }

  function finishBtnClick() {
    let title;
    let msg;

    const result = getCurrentQuizResult();

    if (result.completedQuizCount === 0) {
      title = "Confirm Finish";
      msg =
        "You have unanswered questions. Are you sure you want to finish the quiz?";
    } else {
      title = "Bravo!";
      msg = `Your result : ${result.correctAnswerCount}/${result.completedQuizCount}.\nAre you sure you want to finish the quiz?`;
    }

    setCanOpenFeedbackDialog({
      state: true,
      data: {
        title,
        msg,
      },
      isCancelBtnActive: true,
      callBackFn: (state) => {
        if (state) {
          navigate(PathsUrls.welcome, { replace: "true" });
        }
        closeFeedbackDialog();
      },
    });
  }

  // #endregion

  // #region FEEDBACK DIALOG
  let feedbackDialogContent;

  if (canOpenFeedbackDialog.state) {
    feedbackDialogContent = (
      <FeedbackDialog
        data={canOpenFeedbackDialog.data}
        onClose={canOpenFeedbackDialog.callBackFn}
        isCancelBtnActive={canOpenFeedbackDialog.isCancelBtnActive}
      />
    );
  }

  function closeFeedbackDialog() {
    setCanOpenFeedbackDialog({
      state: false,
      data: null,
      isCancelBtnActive: false,
      callBackFn: null,
    });
  }
  // #endregion

  // #region UTIL FNS

  // #endregion

  return (
    <div className={styles.answerContentParentDiv}>
      <div
        className={styles.answerContent}
        style={{ pointerEvents: isAnswerSubmitted ? "none" : "auto" }}
      >
        {answerLstContent}
      </div>
      <div className={styles.answerContentBtnParentDiv}>{buttonLstContent}</div>
      {feedbackDialogContent}
    </div>
  );
}

export default AnswerContent;
