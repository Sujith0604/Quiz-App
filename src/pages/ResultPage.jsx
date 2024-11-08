import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ResultPage = ({ score, reset, index }) => {
  return (
    <div className=" flex flex-col h-screen items-center justify-center gap-5">
      <div className=" flex flex-col justify-center gap-10 items-center h-[400px] w-[400px] border rounded-full">
        <h1 className=" text-3xl font-bold">SCORE</h1>

        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={score * 20}
            maxValue={100}
            text={`${score * 20}%`}
          />{" "}
        </div>
      </div>
      <div className=" flex flex-col gap-10">
        <div className=" text-xl p-4 bg-green-200 w-[400px] flex items-center justify-center gap-5 rounded-2xl">
          <div className=" h-[25px] w-[25px] rounded-full bg-green-700"></div>
          <span>{score} Correct</span>{" "}
        </div>
        <div className=" text-xl p-4 bg-red-200 w-[400px] flex items-center justify-center gap-5 rounded-2xl">
          <div className=" h-[25px] w-[25px] rounded-full bg-red-700"></div>
          {index + 1 - score} wrong
        </div>
      </div>

      <div>
        <button
          className="bg-red-600 p-4 w-[300px] rounded-full text-xl uppercase font-bold text-white"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
