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
    `สุขสันต์วันเกิดนะคนเก่งของเรา 🥰
ขอบคุณที่เป็นแสงสว่างในทุกวันของเรา
ขอให้ปีนี้เต็มไปด้วยรอยยิ้ม เสียงหัวเราะ
และความรักที่อบอุ่นเหมือนตอนที่อยู่ด้วยกัน 💖`,

    `ทุกวันที่ได้อยู่กับเธอ
คือวันที่พิเศษที่สุดของเราเลย
ขอบคุณที่เข้าใจ อยู่ข้างกันในทุกช่วงเวลา
เธอคือของขวัญที่ดีที่สุดของชีวิตเรา 🎁`,

    `สุดท้ายนี้...
ไม่ว่าอนาคตจะเป็นยังไง
เราจะอยู่ข้างเธอเสมอ
รักเธอมากที่สุดเลยนะ 💫💗`,
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
          <h2>💌 จดหมายถึงเธอ - หน้า {page + 1}</h2>
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
