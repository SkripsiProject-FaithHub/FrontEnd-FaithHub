import React from "react";
// import Arrowup from "../icons/Arrowup";
// import Arrowdown from "../icons/Arrowdown";
// import UserInfo from "./UserInfo";
// import { useQuery } from "react-query";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Loading from "./Loading";
// import NothingHere from "./NothingHere";
// // import Comment from "../icons/Comment";
import Write from "../icons/Write";
import Send from "../icons/Send";
// import { useParams } from "react-router-dom";
// // import newRequests from "../utils/newRequest";

// const Content = () => {
//   const {topic} = useParams();
//   const [openId, setOpenId] = React.useState([]);
//   // const navigate = useNavigate();
//   const [answer, setAnswer] = React.useState("");

//   const fetchQuestions = async () => {
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: { Authorization: "Bearer " + token},
//     };
//     // console.log(config);
//     const res = await axios.get("http://localhost:9001/api/question/fetchAll", config);
//     // console.log(res);
//     return res.data;
//   };



//   const { isLoading, data } = useQuery("getAllQuestions", fetchQuestions);
  
  
//   if (isLoading) return <Loading />;

//   return (
//     <div
//       className="md:w-[60%] flex flex-col items-center gap-y-5 
//     md:gap-8 my-8 "
//     >
//       <Toaster />
//       {data.length > 0 &&
//         data.map((question, index) => {
//           // console.log(question.doubtDeta.questionId);onId);
//           return (
//             <div
//               key={index}
//               className="w-[96%] md:w-[80%] mx-12 flex flex-col 
//               items-end  p-3 md:p-4 rounded-md bg-purple-100
//                dark:bg-slate-400"
//               // onClick={() => navigate(`/question/${question.doubtDetails.questionId}`)}
//               // style={{ cursor: "pointer" }}
//             >
//               <div
//                 className="w-full bg-white dark:bg-[#1E212A]
              
//               p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
//               >
//                 <div className="left-section space-y-1 text-center">
//                   <Arrowup id={question.doubtDetails.questionId} />
//                   <h3 className="text-sm md:text-base">
//                     {question?.doubtDetails.upVotes?.length || 0}
//                   </h3>
//                   <Arrowdown id={question.doubtDetails.questionId} />
//                 </div>
//                 <div className="right-section w-full">
//                   <h1 className="text-base md:text-lg dark:text-white">
//                     {question?.doubtDetails.questionTitle}
//                   </h1>
//                   <p className="text-sm md:text-base">
//                     {question?.doubtDetails.description}
//                   </p>
//                   <hr />
//                   <UserInfo
//                     openId={openId}
//                     index={index + 1}
//                     setOpenId={setOpenId}
//                     question={question}
//                   />
//                 </div>
//               </div>
//             {/* nested comment       */}
//             {openId.find((ele) => ele === index + 1) && (
//                 <>
//                   {question?.replies?.map((answer, index) => {
//                     console.log("answer", answer);
//                     return (
//                       <div key={answer._id} className="flex items-center gap-4">
//                         {/* fix this */}
//                         <img
//                           className="h-4 md:h-6 w-4 md:w-6"
//                           src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
//                           alt=""
//                         />
//                         <div
//                           className="   bg-white dark:bg-[#32353F] dark:text-white
//           max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2"
//                         >
//                           <p className="text-inherit">{answer?.reply}</p>
//                           <UserInfo answer={answer} />
//                         </div>
//                       </div>
//                     );
//                   })}
//                   {/* nested comment       */}
//                   <div
//                     className="w-full bg-white dark:bg-slate-900 flex items-center gap-4
//        px-5 py-2 rounded-lg shadow-md  mt-2"
//                   >
//                     <Write />
//                     <input
//                       onChange={(e) => setAnswer(e.target.value)}
//                       className="w-full h-10 border-none outline-none 
//           rounded-md py-1 px-2 "
//                       type="text"
//                       value={answer}
//                       placeholder="Write a comment"
//                     />
//                     <Send
//                       questionId={question._id}
//                       answer={answer}
//                       setAnswer={setAnswer}
//                     />
//                   </div>
//                 </>
//               )}
              
//             </div>
//           );
//         })}
//       {data.length === 0 && <NothingHere />}
//     </div>
//   );
// };

// export default Content;
// Content.jsimport React from "react";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "./UserInfo";
import { useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./Loading";
import NothingHere from "./NothingHere";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const Content = () => {
  const location = useLocation();
  const tags = new URLSearchParams(location.search).get("tags");
  const [openId, setOpenId] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const config = {
      headers: { Authorization: "Bearer " + token }
    };
    const body = { tags: tags };
    // console.log(body);
    let url = `http://localhost:9001/api/question/fetchAll`;
  let res;

  if (tags) {
    url = "http://localhost:9001/api/question/getQuestionbyTags";
  
    res = await axios.post(url, body, config);
    console.log(res);
  } else {
    res = await axios.get(url, config);
    
  }

  return res.data;
  };
  const navigateToContent = (questionId) => {
    navigate({
      pathname: "/question",
      search: `?questionId=${questionId}`
    });
  };
  const { isLoading, data } = useQuery(["getQuestions", tags], fetchQuestions);
// const { isLoading, data } = useQuery("getQuestions", fetchQuestions);
  

  // console.log(tags);
  if (isLoading) return <Loading />;

  return (
    <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8 ">
      <Toaster />
      {data && data.length > 0 ? (
        data.map((question, index) => (
          <div
            key={index}
            className="w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400 "
            onClick={() => navigate(`/question/${question.doubtDetails.questionId}`)}
              style={{ cursor: "pointer" }}
            // onClick={() => navigateToContent(question.doubtDetails.questionId)}
            //   style={{ cursor: "pointer" }}
          >
            <div className=" w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 hover:bg-gray-200 transition-all ">
              <div className="left-section space-y-1 text-center">
                <Arrowup id={question.doubtDetails.questionId} />
                <h3 className="text-sm md:text-base">
                  {question?.doubtDetails.upVotes?.length || 0}
                </h3>
                <Arrowdown id={question.doubtDetails.questionId} />
              </div>
              <div className="right-section w-full">
                <h1 className="text-base md:text-lg dark:text-white">
                  {question?.doubtDetails.questionTitle}
                </h1>
                <p className="text-sm md:text-base"> {parse(truncateText(question?.doubtDetails.description, 150))}</p>
                <hr />
                <UserInfo openId={openId} index={index + 1} setOpenId={setOpenId} question={question} />
              </div>
            </div>
            {/* {openId.find((ele) => ele === index + 1) && (
              <>
                {question?.replies?.map((answer, index) => (
                  <div key={answer._id} className="flex items-center gap-4">
                    <img
                      className="h-4 md:h-6 w-4 md:w-6"
                      src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                      alt=""
                    />
                    <div className="bg-white dark:bg-[#32353F] dark:text-white max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2">
                      <p className="text-inherit">{answer?.reply}</p>
                      <UserInfo answer={answer} />
                    </div>
                  </div>
                ))}
                <div className="w-full bg-white dark:bg-slate-900 flex items-center gap-4 px-5 py-2 rounded-lg shadow-md mt-2">
                  <Write />
                  <input
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full h-10 border-none outline-none rounded-md py-1 px-2"
                    type="text"
                    value={answer}
                    placeholder="Write a comment"
                  />
                  <Send questionId={question._id} answer={answer} setAnswer={setAnswer} />
                </div>
              </>
            )} */}
          </div>
        ))
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

export default Content;
