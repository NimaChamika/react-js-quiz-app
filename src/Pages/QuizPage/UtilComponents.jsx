/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FeedbackDialog from "Utils/FeedbackDialog";
import { useNavigate } from "react-router-dom";
import { PathsUrls } from "Utils/Data";
import styles from "./index.module.css";

function AnswerContent({ currentQuiz, currentQuizIndex }) {
  // #region HOOKS
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [canOpenFeedbackDialog, setCanOpenFeedbackDialog] = useState({
    state: false,
    data: null,
    isCancelBtnActive: false,
    callBackFn: null,
  });

  const completedQuizIndexLst = useRef([]);
  const correctAnswerCount = useRef(0);

  const navigate = useNavigate();
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
        return selectedAnswer === currentQuiz.correctIdx ? "green" : "red";
      }
      return index === currentQuiz.correctIdx ? "green" : "white";
    }
    return selectedAnswer === index ? "orange" : "white";
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
            color="success"
            onClick={explanationBtnClick}
          >
            Explanation
          </Button>
          <Button variant="contained">Next</Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={submitBtnClick}
          disabled={selectedAnswer < 0}
        >
          Submit
        </Button>
      )}

      <Button variant="contained" onClick={finishBtnClick}>
        Finish
      </Button>
    </>
  );

  function submitBtnClick() {
    if (selectedAnswer === currentQuiz.correctIdx) {
      correctAnswerCount.current += 1;
      completedQuizIndexLst.current.push(currentQuizIndex);
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
    });
  }

  function finishBtnClick() {
    let title;
    let msg;

    if (completedQuizIndexLst.current.length === 1) {
      title = "Confirm Finish";
      msg =
        "You have unanswered questions. Are you sure you want to finish the quiz?";
    } else {
      title = "Bravo!";
      msg = `Your result : ${correctAnswerCount.current}/${completedQuizIndexLst.current.length}.\nAre you sure you want to finish the quiz?`;
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
        isCancelBtnActive
      />
    );
  }

  function closeFeedbackDialog() {
    setCanOpenFeedbackDialog({
      state: false,
      data: null,
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
