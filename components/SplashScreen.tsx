import React from 'react';

interface SplashScreenProps {
  onEnter: () => void;
  isExiting: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter, isExiting }) => {
  const containerClasses = `
    absolute inset-0 flex flex-col justify-center items-center bg-black z-50
    transition-opacity duration-500 ease-in-out
    ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}
  `;

  return (
    <div className={containerClasses}>
      <h2 className="splash-screen text-2xl md:text-4xl text-rose-200 font-dosis text-center px-4 mb-8">
        Maaaapppinnn Maulll Yahhh Cintaaakuuu Sayanggkuu Calyaaa❤️......
      </h2>
      <button
        onClick={onEnter}
        className="intro-button bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full px-10 py-4 text-xl transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-rose-500/50"
      >
       PENCET 👉👈
      </button>
    </div>
  );
};

export default SplashScreen;
