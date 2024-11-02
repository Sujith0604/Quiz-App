import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-between h-screen flex-col bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 p-4">
      <div className=" text-3xl font-bold">upraised</div>
      <div className=" h-[300px] w-[300px] text-red-500 border rounded-full flex items-center justify-center bg-white">
        <h1 className=" text-5xl  font-bold uppercase">Quiz App</h1>
      </div>

      <button
        className="bg-red-600 p-4 w-[300px] rounded-full text-xl uppercase font-bold text-white"
        onClick={() => navigate("/quiz")}
      >
        Start
      </button>
    </div>
  );
};

export default StartPage;
