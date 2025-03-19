import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function Blobs() {
    return (
        <motion.div
            animate={{
                x: [
                    -800, -650, -500, -300, -200, -100, 0, 100, 200, 350, 500,
                    650, 800, 750, 650, 500, 300, 200, 100, 0, -100, -200, -350,
                    -500, -650, -800,
                ],
                y: [
                    600, 500, 400, 300, 350, 400, 450, 500, 450, 300, 200, 50,
                    0, -100, -200, -350, -450, -500, -400, -300, -350, -400,
                    -450, -300, 0, 600,
                ],
                borderRadius: [
                    "100% 100% 100% 100% / 100% 100% 100% 100%",
                    "70% 30% 30% 70% / 60% 40% 60% 40%",
                    "40% 60% 70% 30% / 40% 70% 30% 60%",
                    "30% 70% 40% 60% / 70% 30% 50% 50%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "50% 50% 50% 50% / 20% 80% 20% 80%",
                    "25% 75% 50% 50% / 60% 40% 60% 40%",
                    "80% 20% 50% 50% / 40% 60% 40% 60%",
                    "50% 50% 30% 70% / 70% 30% 70% 30%",
                ],
                width: [250, 320, 450, 600, 520, 380, 250],
                height: [600, 520, 430, 350, 250, 380, 600],
                scale: [1, 1.05, 1.1, 1.05, 1, 0.95, 0.9, 0.95, 1],
                rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
                default: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                },
                borderRadius: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                },
                x: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                },
                y: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                },
                scale: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                },
                rotate: {
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                },
            }}
            className="absolute bg-iper-gold opacity-50"
        />
    );
}
