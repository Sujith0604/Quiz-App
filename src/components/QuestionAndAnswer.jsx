import { useState } from "react";
import { data } from "../assets/data";
import ResultPage from "../pages/ResultPage";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuestionAndAnswer = () => {
  let [index, setIndex] = useState(0);
  let [questions, setQuestions] = useState(data[index]);
  let [score, setScore] = useState(0);
  let [resultPage, setResultPage] = useState(false);
  let [lock, setLock] = useState(false);
  const [clickedOption, setClickedOption] = useState(0);
  let navigate = useNavigate();

  const nextQuestion = () => {
    if (lock) {
      setClickedOption(0);
      if (index === data.length - 1) {
        setResultPage(true);
      } else if (index < data.length - 1) {
        setIndex(++index);
        setQuestions(data[index]);
        setLock(false);
      }
    }
  };

  ///correct or not
  const handleClick = (i, isCorrect) => {
    if (lock === false) {
      setClickedOption(i + 1);
      if (isCorrect) {
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        setLock(true);
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
      <div className=" flex flex-col w-[100%] items-center justify-between gap-5 md:w-[80%] border rounded-3xl  p-4 ">
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={index * 20}
            maxValue={100}
            text={`${index + 1}/${data.length}`}
          />{" "}
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
                onClick={() => handleClick(i, answer.isCorrect)}
                key={i}
                className={`p-4 border w-[300px] gap-5  rounded-2xl ${
                  clickedOption == i + 1 ? " bg-green-200" : null
                }`}
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
