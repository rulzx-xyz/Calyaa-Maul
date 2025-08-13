import React, { useState, useEffect, useRef } from 'react';

interface FloatingWordsProps {
  phrases: string[];
}

interface WordPosition {
  x: string;
  y: string;
  delay: string;
}

/**
 * Calculates the positions for words to form a heart shape.
 * @param count - The number of words to position.
 * @param width - The width of the container.
 * @param height - The height of the container.
 * @returns An array of position objects for each word.
 */
const getHeartPositions = (count: number, width: number, height: number): WordPosition[] => {
    if (width === 0 || height === 0 || count === 0) return [];
    
    const size = Math.min(width, height) * 0.9;
    const scale = size / 35; 
    const centerX = (width / 2) - (width * 0.07); // Shift left by 7% of the container width
    const centerY = height / 2;

    const positions: WordPosition[] = [];
    
    for (let i = 0; i < count; i++) {
        const t = (i / (count - 1)) * 2 * Math.PI;
        
        // Parametric equation for a heart curve
        const rawX = 16 * Math.pow(Math.sin(t), 3);
        const rawY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        
        const x = centerX + rawX * scale;
        const y = centerY - rawY * scale * 1.05;

        positions.push({
            x: `${x.toFixed(2)}px`,
            y: `${y.toFixed(2)}px`,
            delay: `${(i * 50)}ms` // Staggered animation delay
        });
    }
    return positions;
};


const FloatingWords: React.FC<FloatingWordsProps> = ({ phrases }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<WordPosition[]>([]);

    useEffect(() => {
        const calculatePositions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setPositions(getHeartPositions(phrases.length, width, height));
            }
        };

        calculatePositions(); // Initial calculation

        const resizeObserver = new ResizeObserver(calculatePositions);

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [phrases.length]); // Recalculate if the number of phrases changes

    return (
        <div ref={containerRef} className="w-full h-full relative">
            <div className="heart-container w-full h-full">
                {positions.length > 0 && phrases.map((phrase, index) => (
                    <div
                        key={`${phrase}-${index}`}
                        className="word-wrapper-static absolute -translate-x-1/2 -translate-y-1/2 opacity-0"
                        style={{
                            left: positions[index]?.x,
                            top: positions[index]?.y,
                            animationDelay: positions[index]?.delay,
                        }}
                    >
                        <div 
                            className="font-dosis whitespace-nowrap floating-text text-rose-200"
                            style={{ textShadow: '0 0 8px #f43f5e' }}
                        >
                            {phrase}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FloatingWords;