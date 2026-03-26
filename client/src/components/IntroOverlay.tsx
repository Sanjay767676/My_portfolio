import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { TextAnimate } from "@/components/magicui/text-animate";

interface IntroOverlayProps {
    onComplete: () => void;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</>";

function ScrambleChar({ char, delay, duration }: { char: string, delay: number, duration: number }) {
    const charRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!charRef.current) return;

        const element = charRef.current;
        const finalChar = char;
        let iterations = 0;
        const maxIterations = 30; // More iterations for slower feel

        const tl = gsap.timeline({ delay });

        tl.to({}, {
            duration: duration,
            onUpdate: () => {
                if (iterations < maxIterations) {
                    element.innerText = characters[Math.floor(Math.random() * characters.length)];
                    iterations++;
                } else {
                    element.innerText = finalChar;
                    tl.kill();
                }
            },
            onComplete: () => {
                element.innerText = finalChar;
                element.style.color = "#ffffff";
            }
        });

        return () => { tl.kill(); };
    }, [char, delay, duration]);

    return <span ref={charRef} className="inline-block text-white">{char}</span>;
}

function ScrambleText({ text, delay = 0, duration = 3.0, className = "" }: { text: string, delay?: number, duration?: number, className?: string }) {
    return (
        <div className={className}>
            {text.split("").map((char, i) => (
                <ScrambleChar key={i} char={char} delay={delay + i * 0.1} duration={duration} />
            ))}
        </div>
    );
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showSkip, setShowSkip] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2500);
        const skipTimer = setTimeout(() => setShowSkip(true), 1500);
        const exitTimer = setTimeout(() => setIsExiting(true), 6000);
        const finalTimer = setTimeout(() => onComplete(), 6800);

        return () => {
            clearTimeout(subtitleTimer);
            clearTimeout(skipTimer);
            clearTimeout(exitTimer);
            clearTimeout(finalTimer);
        };
    }, [onComplete]);

    const handleSkip = () => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden pointer-events-auto cursor-pointer"
                    onClick={handleSkip}
                >
                    <div className="flex flex-col items-center">
                        <div className="inline-block relative">
                            <ScrambleText
                                text="</Sanjay>"
                                delay={0.5}
                                duration={3.0}
                                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter whitespace-nowrap font-serif"
                            />

                            {showSubtitle && (
                                <div className="flex justify-end mt-1 md:mt-2 lg:mt-3">
                                    <TextAnimate
                                        animation="blurInUp"
                                        by="character"
                                        className="text-lg md:text-2xl lg:text-3xl text-white font-medium tracking-normal font-serif"
                                    >
                                        Build.Innovate.Secure
                                    </TextAnimate>
                                </div>
                            )}
                        </div>
                    </div>

                    {showSkip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-12 text-gray-600 text-sm tracking-[0.2em] uppercase animate-pulse"
                        >
                            Click anywhere to enter
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
