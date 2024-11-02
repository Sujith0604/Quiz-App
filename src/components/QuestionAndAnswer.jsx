import { useRef, useState } from "react";
import { data } from "../assets/data";
import ResultPage from "../pages/ResultPage";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../App.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const QuestionAndAnswer = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(data[index]);
  const [score, setScore] = useState(0);
  const [resultPage, setResultPage] = useState(false);
  const [lock, setLock] = useState(false);
  const navigate = useNavigate();

  let optionRef = useRef(null);

  const nextQuestion = (e) => {
    if (lock) {
      if (index === data.length - 1) {
        setResultPage(true);
        optionRef.current.classList.remove("correct");
        optionRef.current.classList.remove("wrong");
        e.target.classList.remove("correct");
        e.target.classList.remove("wrong");
      } else if (index < data.length - 1) {
        setIndex((prev) => prev + 1);
        setQuestions(data[index]);
        setLock(false);
        e.target.classList.remove("correct");
        e.target.classList.remove("wrong");
        optionRef.current.classList.remove("correct");
        optionRef.current.classList.remove("wrong");
      }
    }
  };

  ///correct or not
  const handleClick = (e, isCorrect) => {
    if (lock === false) {
      if (isCorrect) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        //add css
        e.target.classList.add("wrong");
        setLock(true);
        optionRef.current.classList.add("correct");
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestions(data[index]);
    setScore(0);
    setResultPage(false);
    setLock(false);
    navigate("/");
  };

  if (resultPage)
    return <ResultPage score={score} reset={reset} index={index} />;

  return (
    <div className="flex flex-col md:items-center items-end justify-center h-screen font-mono">
      <img
        className=" md:hidden w-full bg-cover"
        src="/images/celebration.jpg"
      />
      <div className=" flex flex-col w-[100%] items-center justify-between gap-5 md:w-[80%] border rounded-3xl h-[80%] p-4 ">
        <div className=" w-[200px] ">
          <ProgressBar
            completed={index * 20}
            maxCompleted={100}
            bgColor="#00ff00"
            height="50px"
          />
        </div>

        <div className=" flex flex-col gap-10">
          <h1 className="text-xl  md:text-2xl">
            {index + 1}. {questions.question}
          </h1>
        </div>
        <div className=" text-xl flex  items-start justify-center flex-col gap-5 ">
          {questions?.answerOption.map((answer, i) => {
            return (
              <button
                ref={optionRef}
                onClick={(e) => handleClick(e, answer.isCorrect)}
                key={i}
                className={`p-4 border w-[300px] gap-5  rounded-2xl`}
              >
                {answer.answerText}
              </button>
            );
          })}
        </div>

        <div onClick={(e) => nextQuestion(e)}>
          <button className="bg-red-600 p-4 w-[300px] rounded-full text-xl uppercase font-bold text-white flex gap-5 items-center justify-center">
            <span>Next</span>
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
