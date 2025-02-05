import { createContext, useState } from 'react';

export const SimilarContext = createContext();

export const SimilarProvider = ({ children }) => {
  const storedSimilar = JSON.parse(sessionStorage.getItem('similarData')) || { memo: '', answer: '', image: '' };
  const [similarData, setSimilarData] = useState(storedSimilar);

  const updateSimilar = (memo, answer, image) => {
    const newSimilarData = { memo, answer, image };
    setSimilarData(newSimilarData);
    sessionStorage.setItem('similarData', JSON.stringify(newSimilarData)); // sessionStorage에 저장
  };

  return <SimilarContext.Provider value={{ similarData, updateSimilar }}>{children}</SimilarContext.Provider>;
};
