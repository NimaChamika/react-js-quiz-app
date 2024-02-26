import { Typography } from "@mui/material";
import { useGetQuizLstQuery } from "Services/FirebaseApi";
import { feedbackMsg } from "Utils/Data";
import FeedbackDialog from "Utils/FeedbackDialog";

function WithDailyEntries(OldComponent) {
  function NewComponent() {
    const {
      isLoading: isLoadingGetQuizListAPI,
      isSuccess: isSuccessGetQuizListAPI,
      data: getQuizListAPIResponse,
      error: getQuizListAPIError,
      refetch: refetchGetQuizListAPI,
    } = useGetQuizLstQuery();

    let apiContent;

    if (isLoadingGetQuizListAPI) {
      apiContent = <Typography>{feedbackMsg.loadingMsg}</Typography>;
    } else if (getQuizListAPIError) {
      apiContent = (
        <FeedbackDialog
          data={{ title: "Error", msg: feedbackMsg.errorMsg }}
          callbackFn={refetchGetQuizListAPI}
        />
      );
    } else if (isSuccessGetQuizListAPI) {
      if (getQuizListAPIResponse.length === 0) {
        apiContent = <Typography>{feedbackMsg.noRecordsMsg}</Typography>;
      }
    }

    return (
      <OldComponent
        quizLst={getQuizListAPIResponse ?? []}
        feedbackContent={apiContent}
      />
    );
  }
  return NewComponent;
}

export default WithDailyEntries;
