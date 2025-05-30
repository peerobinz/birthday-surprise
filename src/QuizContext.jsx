import { createContext, useState } from "react";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [answers, setAnswers] = useState([
    "18/04/2001",             // วันเกิดแฟน
    "KFC",                    // ร้าน Fast Food ที่ชอบ
    "เกาะล้าน",              // ที่เที่ยวต่างจังหวัดครั้งแรก
    "03/09/2023",             // วันครบรอบ
    "รัก" // คุณรักแฟนมั้ย
  ]);

  return (
    <QuizContext.Provider value={{ answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
}