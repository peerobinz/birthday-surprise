import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { QuizContext } from "./QuizContext";
import Confetti from "react-confetti";
import "./QuizPage.css";

const questions = [
{
    question: "1. วันเกิดแฟน",
    choices: ["18/04/2001", "17/04/2000", "19/04/2002"],
    correct: "18/04/2001",
  },
  {
    question: "2. ร้านอาหาร Fast Food ที่แฟนชอบที่สุด",
    choices: ["KFC", "McDonald's", "Burger King"],
    correct: "KFC",
  },
  {
    question: "3. ที่ที่ไปเที่ยวต่างจังหวัดด้วยกันครั้งแรก",
    choices: ["เกาะล้าน", "เกาะสีชัง", "พัทยา"],
    correct: "เกาะสีชัง",
  },
  {
    question: "4. วันครบรอบ",
    choices: ["03/09/2023", "03/08/2020", "03/09/2022"],
    correct: "03/09/2023",
  },
  {
    question: "5. คุณรักแฟนคุณมั้ย",
    choices: ["รักมากที่สุด", "รักบ้างบางเวลา", "รักน้อยมาก"],
    correct: "รักมากที่สุด",
  },
];

export default function QuizPage() {
  const { number } = useParams();
  const qNum = parseInt(number);
  const navigate = useNavigate();
  const { answers, setAnswers } = useContext(QuizContext);
  const [answer, setAnswer] = useState(answers[qNum - 1] || "");
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // ขนาดหน้าจอสำหรับ confetti
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answer !== questions[qNum - 1].correct) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
      return;
    }

    setIsCorrect(true);
    setShowConfetti(true);

    const updated = [...answers];
    updated[qNum - 1] = answer;
    setAnswers(updated);

    setTimeout(() => {
      setIsCorrect(false);
      setShowConfetti(false);
      if (qNum < questions.length) {
        navigate(`/quiz/${qNum + 1}`);
      } else {
        navigate("/gift");
      }
    }, 5000); // 2 วิ ให้ confetti เล่นเต็มที่
  };

  return (
    <>
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <div
        className={`quiz-container ${isWrong ? "shake" : ""} ${
          isCorrect ? "correct" : ""
        }`}
      >
        <h2 className="quiz-question">{questions[qNum - 1].question}</h2>

        {isWrong && (
          <div className="error-message">คำตอบผิด ลองใหม่อีกครั้งนะครับ! ❌</div>
        )}

        <form onSubmit={handleSubmit}>
          {questions[qNum - 1].choices.map((choice, index) => (
            <label key={index} className="quiz-choice">
              <input
                type="radio"
                name="answer"
                value={choice}
                checked={answer === choice}
                onChange={() => setAnswer(choice)}
                required
              />
              {choice}
            </label>
          ))}
          <br />
          <button className="quiz-button" type="submit">
            {qNum === questions.length ? "ดูของขวัญ 🎁" : "ถัดไป ➡️"}
          </button>
        </form>
      </div>
    </>
  );
}
