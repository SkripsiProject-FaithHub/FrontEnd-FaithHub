import React from "react";
import { useQuery } from "react-query";
import newRequests from "../utils/newRequest";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "../components/UserInfo";
import Write from "../icons/Write";
import SyncLoader from "react-spinners/SyncLoader";
import NothingHere from "../components/NothingHere";

const Myanswers = () => {
  const [openId, setOpenId] = React.useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token},
  };
  const { isLoading, data } = useQuery("getMyQuestions", () =>
    newRequests
      .get(`http://localhost:9001/api/question/getUserQuestion`, config)
      .then((res) => res.data)
  );  
  // console.log(data);

  if (isLoading)
    return (
      <div className="h-screen mt-[10%] w-[100%] text-center">
        <SyncLoader size={10} color="#7E22CE" />
      </div>
    );

  return (
    <div
      className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-8 my-8 "
    >
      {data.length > 0 &&
        data.map((question, index) => (
          
          <div
            key={index}
            className=" w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400 "
          >
            <div className="w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 hover:bg-gray-100 transition-all ">
              <div className="left-section space-y-1 text-center">
                <Arrowup id={question.doubtDetails.questionId} />
                <h3 className="text-sm md:text-base">
                  {question?.doubtDetails.upvote?.length || 0}
                </h3>
                <Arrowdown id={question.doubtDetails.questionId} />
              </div>
              <div className="right-section w-full">
                <h1 className="text-base md:text-lg">{question?.doubtDetails.questionTitle}</h1>
                <p className="text-sm md:text-base">{question?.doubtDetails.description}</p>
                <hr />
                <UserInfo
                  openId={openId}
                  index={index + 1}
                  setOpenId={setOpenId}
                  question={question}
                />
              </div>
            </div>
            {/* nested comment       */}
            {openId.find((ele) => ele === index + 1) && (
              <>
                {question?.replies?.map((answer, index) => {
                  console.log("answer", answer);
                  return (
                    <div key={answer._id} className="flex items-center gap-4">
                      {/* fix this */}
                      <img
                        className="h-4 md:h-6 w-4 md:w-6"
                        src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                        alt=""
                      />
                      <div
                        className="   bg-white
      max-w-xl  p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2"
                      >
                        <p>{answer?.reply}</p>
                        <UserInfo answer={answer} />
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        ))}
      {data.length === 0 && <NothingHere />}
    </div>
  );
};

export default Myanswers;
