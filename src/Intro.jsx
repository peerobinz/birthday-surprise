import { useNavigate } from "react-router-dom";
import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <h1 className="intro-title">🎉 ยินดีต้อนรับ!</h1>
      <p className="intro-description">
        เรามีคำถาม 5 ข้อให้เธอตอบ เพื่อไปพบกับเซอร์ไพรซ์สุดพิเศษ! 🎁
      </p>
      <button className="intro-button" onClick={() => navigate("/quiz/1")}>
        เริ่มเลย 💕
      </button>
    </div>
  );
}
