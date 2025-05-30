import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./GiftBox.css";

export default function GiftBox() {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
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

  const handleOpen = () => {
    setOpened(true);
    setShowConfetti(true);

    // ปิด confetti หลัง 3 วินาที
    setTimeout(() => {
      setShowConfetti(false);
    }, 100000);
  };

  return (
    <div className="gift-container">
      <h1>🎁 ของขวัญพิเศษสำหรับเธอ</h1>
      <br />
      <br />

      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {!opened ? (
        <div className="gift-box" onClick={handleOpen}>
          🎁
        </div>
      ) : (
        <>
          <div className="surprise-text">🎉 เซอร์ไพรส์!</div>
          <p className="surprise-subtext">
            ขอบคุณที่อยู่เคียงข้างกันทุกวันนะ รักเธอมาก ๆ 💖
          </p>
          <a
            href="https://youtu.be/dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="surprise-link"
          >
            คลิกดูวิดีโอพิเศษ 🎬
          </a>
          <button
            className="open-btn"
            style={{ marginTop: "2rem", backgroundColor: "#6a1b9a" }}
            onClick={() => setOpened(false)}
          >
            ← กลับ
          </button>
        </>
      )}
    </div>
  );
}
