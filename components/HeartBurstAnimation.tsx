
import React from 'react';

const HeartIcon: React.FC = () => (
  <svg className="heart" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
  </svg>
);

// Pre-calculated positions and sizes for the bubbles
const bubblesData = [
  { top: '8%', left: '60%', size: '11vmin', delay: '0s', rotate: -4 },
  { top: '83%', left: '14%', size: '20vmin', delay: '0.15s', rotate: 22 },
  { top: '25%', left: '49%', size: '4vmin', delay: '0.3s', rotate: -5 },
  { top: '63%', left: '93%', size: '3vmin', delay: '0.45s', rotate: 50 },
  { top: '7%', left: '56%', size: '18vmin', delay: '0.6s', rotate: -29 },
  { top: '10%', left: '68%', size: '5vmin', delay: '0.75s', rotate: 35 },
  { top: '68%', left: '1%', size: '5vmin', delay: '0.9s', rotate: -5 },
  { top: '61%', left: '51%', size: '11vmin', delay: '1.05s', rotate: 40 },
  { top: '24%', left: '45%', size: '11vmin', delay: '1.2s', rotate: -35 },
  { top: '13%', left: '10%', size: '19vmin', delay: '1.35s', rotate: 28 },
  { top: '76%', left: '7%', size: '14vmin', delay: '1.5s', rotate: -3 },
  { top: '22%', left: '8%', size: '17vmin', delay: '1.65s', rotate: 48 },
  { top: '23%', left: '81%', size: '16vmin', delay: '1.8s', rotate: -33 },
  { top: '77%', left: '88%', size: '3vmin', delay: '1.95s', rotate: 40 },
  { top: '41%', left: '1%', size: '9vmin', delay: '2.1s', rotate: -29 },
  { top: '51%', left: '51%', size: '8vmin', delay: '2.25s', rotate: 19 },
  { top: '37%', left: '65%', size: '11vmin', delay: '2.4s', rotate: -29 },
  { top: '11%', left: '83%', size: '18vmin', delay: '2.55s', rotate: 14 },
  { top: '64%', left: '86%', size: '12vmin', delay: '2.7s', rotate: -10 },
  { top: '39%', left: '24%', size: '19vmin', delay: '2.85s', rotate: 46 },
];

const HeartBurstAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {bubblesData.map((bubble, index) => (
        <div
          key={index}
          className="bubble absolute rounded-full"
          style={{
            top: bubble.top,
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: bubble.delay,
            transform: `translate(0, 0.5em) scale(0)`,
            transformOrigin: 'center bottom',
            boxShadow: `inset 0 0 0 calc(${bubble.size} / 2) transparent`
          }}
        >
            <div style={{
                animationDelay: bubble.delay,
                transform: `scale(0.5) rotate(${bubble.rotate}deg)`
            }} className="heart opacity-0 fill-transparent">
               <HeartIcon />
            </div>
        </div>
      ))}
    </div>
  );
};

export default HeartBurstAnimation;
