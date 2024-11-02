import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuestionAndAnswer from "./components/QuestionAndAnswer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuestionAndAnswer />} />
      </Routes>
    </div>
  );
};

export default App;
