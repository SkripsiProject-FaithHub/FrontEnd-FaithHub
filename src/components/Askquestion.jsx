// import React, { useEffect, useState, useRef, useMemo } from "react";
// import Add from "../icons/Add";
// import Share from "../icons/Share";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { duration } from "moment";
// import JoditEditor from "jodit-react";
// import parse from "html-react-parser";


// const Askquestion = () => {
//   const token = localStorage.getItem("token");
//   const naviate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { title, description, tags } = e.target;
//     const body = {
//       questionTitle: title.value,
//       description: description.value,
//       tags: tags.value.split(","),
//     };
//     console.log(body);
//     const config = {
//       headers: { Authorization: "Bearer " + token},
//     };
//     // let spamScore;
//     // let notSpamScore;
//     // let label_0;
//     // let label_1;

//     // const response = await query({ inputs: title.value });
//     // console.log("response", response);
//     // label_0 = response[0][0].label;
//     // // label_1 = response[0][0].label;

//     // if (label_0 === "LABEL_0") {
//     //   toast.error("Your question seems to be a spam", (duration = 2000));
//     //   return;
//     // }
//     // spamScore = Number(response[0][0].score);
//     // notSpamScore = Number(response[0][1].score);

//     // console.log(spamScore * 100);
//     // if (spamScore > notSpamScore) {
//     //   toast.error("Your question seems to be a spam", (duration = 2000));
//     //   return;
//     // }

//     const res = await axios.post(
//       `http://localhost:9001/api/question/create`,
//       body,
//       config
//     );
//     if (res.status === 201) {
//       toast.success("Question added successfully", (duration = 2000));
//       setTimeout(() => {
//         naviate("/");
//       }, 2000);
//     }
//   };

//   // async function query(data) {
//   //   const response = await fetch(
//   //     "https://api-inference.huggingface.co/models/shahrukhx01/bert-mini-finetune-question-detection",
//   //     {
//   //       headers: {
//   //         Authorization: "Bearer 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",
//   //       },
//   //       method: "POST",
//   //       body: JSON.stringify(data),
//   //     }
//   //   );
//   //   const result = await response.json();
//   //   return result;
//   // }
//   const commentConfig = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Enter your comment here...",
//       buttons: [
//         "bold",
//         "italic",
//         "ul",
//         "ol",
//         "link",
//         "underline",
//         "font",
//         "align",
//         "fontsize",
//         "redo",
//         "undo",
//         "image"
//       ],
//       // uploader: {
//       //   insertImageAsFile: true, // Ensure images are inserted as files, not base64 URIs
//       //   url: 'http://localhost:9001/api/uploadImage', // Your server endpoint for image upload
//       //   format: 'json', // Format of the response
//       //   // headers: {
//       //   //   Authorization: `Bearer ${token}`, // Optional: if your endpoint requires authorization
//       //   // },
//       // },
//     }),
//     []
//   );

//   return (
//     <div className="h-full md:w-[50%]">
//       <Toaster />
//       <div
//         className="md:mx-12 flex flex-col items-center 
//       gap-4 mb-12 border-2 border-gray-300 p-4 pb-6 rounded-md bg-white-300 
//       dark:bg-[#1E212A] mt-12 shadow-md "
//       >
//         <h1
//           className="text-2xl font-bold text-center
//         text-blue-600 
//         "
//         >
//           Ask a Question
//         </h1>

//         <form onSubmit={handleSubmit} className="form w-full ">
//           <div className="title">
//             <label className="text-gray-800 text-start dark:text-white">
//               Question Title
//             </label>
//             <input
//               name="title"
//               className="mt-2 w-full h-10 px-3 rounded outline-none border-2 border-gray-300
//                 shadow-sm "
//               type="text"
//             />
//           </div>
//           <div className="desc mt-3">
//             <label className="text-gray-800 text-start dark:text-white">
//               Question Description
//             </label>
//             {/* <textarea
//               name="description"
//               className="mt-2 w-full h-24 px-3 py-2 rounded outline-none border-2 border-gray-300 shadow-sm"
//               type="text"
//             /> */}
//             <div style={{ width: "50%" }}>
//         <JoditEditor
//           // ref={editor}
//           value={newReply}
//           config={commentConfig}
//           onChange={(content) => setNewReply(content)}
//           // onBlur={(newContent) => setNewReply(newContent)}
//           // tabIndex={1}
          
//         />
//       </div>
//           </div>
//           <div className="tages mt-3">
//             <label className="text-gray-800 text-start dark:text-white">
//               Tags
//             </label>
//             <input
//               name="tags"
//               placeholder="Enter tags seperated by comma"
//               className="mt-2 w-full h-10 px-3 rounded outline-none border-2 border-gray-300  shadow-sm"
//               type="text"
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-8 w-[230px] mx-auto text-center flex justify-center items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 cursor-pointer hover:bg-blue-900 transition-all active:bg-blue-800 "
//           >
//             {/* <Share /> */}
//             <span className="text-white ">Ask</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Askquestion;


import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";

const Askquestion = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, tags } = e.target;
    const body = {
      questionTitle: title.value,
      description: newDescription,
      tags: tags.value.split(","),
    };
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `http://localhost:9001/api/question/create`,
        body,
        config
      );
      if (res.status === 201) {
        toast.success("Question added successfully", { duration: 2000 });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error("Failed to add question. Please try again later.");
    }
  };

  const commentConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your question description here...",
      buttons: [
        "bold",
        "italic",
        "ul",
        "ol",
        "link",
        "underline",
        "font",
        "align",
        "fontsize",
        "redo",
        "undo",
        "image",
      ],
    }),
    []
  );

  return (
    <div className="h-full md:w-[50%]">
      <Toaster />
      <div className="md:mx-12 flex flex-col items-center gap-4 mb-12 border-2 border-gray-300 p-4 pb-6 rounded-md bg-white-300 dark:bg-[#1E212A] mt-12 shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-600">Ask a Question</h1>
        <form onSubmit={handleSubmit} className="form w-full">
          <div className="title">
            <label className="text-gray-800 text-start dark:text-white">Question Title</label>
            <input
              name="title"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-2 border-gray-300 shadow-sm"
              type="text"
            />
          </div>
          <div className="desc mt-3">
            <label className="text-gray-800 text-start dark:text-white">Question Description</label>
            <div style={{ width: "100%" }}>
              <JoditEditor
                value={newDescription}
                config={commentConfig}
                onChange={(content) => setNewDescription(content)}
              />
            </div>
          </div>
          <div className="tags mt-3">
            <label className="text-gray-800 text-start dark:text-white">Tags</label>
            <input
              name="tags"
              placeholder="Enter tags separated by comma"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-2 border-gray-300 shadow-sm"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-[230px] mx-auto text-center flex justify-center items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 cursor-pointer hover:bg-blue-900 transition-all active:bg-blue-800"
          >
            <span className="text-white">Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Askquestion;
