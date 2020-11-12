import React, { useState } from "react";
import Questions from "./components/questions";
import TitlePage from "./components/titlePage";

const App: React.FC = () => {
  const [openQuestions, setOpenQuestions] = useState(false);

  const handleToQuestions = () => {
    setOpenQuestions(true);
  };

  return (
    <>
      {!openQuestions ? (
        <TitlePage toQuestions={handleToQuestions} />
      ) : (
        <Questions />
      )}
    </>
  );
};

export default App;
