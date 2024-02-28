import { useState } from "react";
import { Button, Typography } from "@mui/material";
import styles from "./index.module.css";

function AnswerContent({ currentQuiz }) {
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  // eslint-disable-next-line no-unused-vars
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  function changeSelectedAnswer(index) {
    console.log(index);
    setSelectedAnswer(index);
  }

  // eslint-disable-next-line no-unused-vars
  function submitBtnClick() {
    setIsAnswerSubmitted(true);
  }

  return (
    <div className={styles.answerContentParentDiv}>
      <div
        className={styles.answerContent}
        style={{ pointerEvents: isAnswerSubmitted ? "none" : "auto" }}
      >
        {currentQuiz.ans.map((item, index) => {
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() => {
                changeSelectedAnswer(index);
              }}
              sx={{
                backgroundColor: selectedAnswer === index ? "red" : "white",
              }}
            >
              <Typography variant="body2" textTransform="initial">
                {item}
              </Typography>
            </Button>
          );
        })}
      </div>

      <div className={styles.answerContentBtnParentDiv}>
        {isAnswerSubmitted ? (
          <>
            <Button variant="contained">Explanation</Button>
            <Button variant="contained">Next</Button>
          </>
        ) : (
          <Button variant="contained" onClick={submitBtnClick}>
            Submit
          </Button>
        )}

        <Button variant="contained">Finish</Button>
      </div>
    </div>
  );
}

export default AnswerContent;
