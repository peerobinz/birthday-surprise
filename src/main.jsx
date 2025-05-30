import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./intro.jsx";
import QuizPage from "./QuizPage.jsx";
import GiftBox from "./GiftBox.jsx";
import { QuizProvider } from "./QuizContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/quiz/:number" element={<QuizPage />} />
          <Route path="/gift" element={<GiftBox />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  </StrictMode>
);