import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./GiftBox.css";

export default function GiftBox() {
  const [opened, setOpened] = useState(false); // เปิดกล่องของขวัญ
  const [showEnvelope, setShowEnvelope] = useState(false); // แสดงซองจดหมาย
  const [showLetter, setShowLetter] = useState(false); // เปิดจดหมาย
  const [showConfetti, setShowConfetti] = useState(false);
  const [page, setPage] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const letterPages = [
    `สุขสันต์วันเกิดนะคนเก่งของเค้า 🥰
ขอบคุณที่คอยอยู่ข้างกกันเสมอมา ขอให้วันเกิดปีนี้ของเธอ
เต็มไปด้วยรอยยิ้ม เสียงหัวเราะ ความสุขมากมาย
และความรักที่อบอุ่นเหมือนตอนที่เราอยู่ด้วยกัน 💖`,

    `ตั้งแต่ปีนี้จะเป็นปีที่หนักมากๆ สำหรับเราทั้งคู่ 
    เธอจะผ่านมันไปได้แน่ๆ เพราะงั้นอย่ากังวลเลย
    เธอจะมีเค้าอยู่ในทุกๆความสำเร็จต่อจากนี้เสมอ🎁`,

    `สุดท้ายนี้...
ไม่ว่าวันข้างหน้าจะเกิดอะไรขึ้น ขอให้จำไว้ว่า
เค้าจะรักเธอ เหมือนวันแรกที่เค้าตกหลุมรักเธอเสมอ
Happy Birthday to you, my love! 🎂💝`,
  ];

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenGift = () => {
    setOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setTimeout(() => setShowEnvelope(true), 500);
  };

  const handleOpenEnvelope = () => {
    setShowLetter(true);
  };

  const goNext = () => {
    if (page < letterPages.length - 1) setPage(page + 1);
  };

  const goBack = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleRestart = () => {
    setOpened(false);
    setShowEnvelope(false);
    setShowLetter(false);
    setPage(0);
  };

  return (
    <div className="gift-container">
      <h1>🎁 ของขวัญพิเศษสำหรับเธอ</h1>

      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {!opened ? (
        <div className="gift-box" onClick={handleOpenGift}>
          🎁
        </div>
      ) : !showLetter ? (
        <div className="envelope" onClick={handleOpenEnvelope}>
          💌 <p className="click-text">(คลิกเพื่อเปิดจดหมาย)</p>
        </div>
      ) : (
        <div className="letter-card">
          <h2>💌 จดหมายถึงเธอ </h2>
          <p className="letter-content">{letterPages[page]}</p>

          <div className="nav-buttons">
            <button onClick={goBack} disabled={page === 0} className="open-btn-back">
              ← ก่อนหน้า
            </button>

            {page < letterPages.length - 1 ? (
              <button onClick={goNext} className="open-btn">
                ถัดไป →
              </button>
            ) : (
              <button onClick={handleRestart} className="open-btn">
                🔁 กลับไปหน้าแรก
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
