import React, { useState } from 'react';
import HeartBurstAnimation from './components/HeartBurstAnimation';
import FloatingWords from './components/FloatingWords';
import SplashScreen from './components/SplashScreen';
import { INITIAL_PHRASES, DEFAULT_MAIN_TEXT } from './constants';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);

  const handleIntroFinish = () => {
    setIntroExiting(true);
    setTimeout(() => {
        setShowIntro(false);
    }, 600); // Duration of fade-out animation + buffer
  };

  return (
    <>
      {showIntro && (
        <SplashScreen onEnter={handleIntroFinish} isExiting={introExiting} />
      )}
      
      {!showIntro && (
        <main className="relative h-screen w-screen overflow-hidden bg-black flex justify-center items-center text-white">
          <HeartBurstAnimation />
          
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none fade-enter fade-enter-active">
            <div className="w-[90vmin] h-[90vmin] relative">
              <FloatingWords phrases={INITIAL_PHRASES} />
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20 fade-enter fade-enter-active">
              <h1 key={DEFAULT_MAIN_TEXT} className="font-bold font-dosis text-rose-100 main-title">
                {DEFAULT_MAIN_TEXT}
              </h1>
          </div>
        </main>
      )}
    </>
  );
};

export default App;
