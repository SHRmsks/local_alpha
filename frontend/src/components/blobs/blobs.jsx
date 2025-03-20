import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function Blob({ xValue, yValue, className }) {
    const variants = {
        animate: {
            borderRadius: [
                "100% 100% 100% 100% / 100% 100% 100% 100%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
            ],
            width: [250, 600],
            height: [600, 250],
            x: xValue,
            y: yValue,
        },
    };
    const transition = {
        default: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
        },
        borderRadius: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
        },
        x: {
            duration: 80,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
        },
        y: {
            duration: 80,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
        },
    };

    return (
        <motion.div
            animate={"animate"}
            variants={variants}
            transition={transition}
            className={`${className} absolute opacity-50`}
        />
    );
}

export default function Blobs() {
    return (
        <div>
            <Blob
                xValue={[
                    -800, -500, -200, 0, 200, 500, 800, 650, 800, 500, 200, 0,
                    -200, -500, -800, -650, -800, -700, -800,
                ]}
                yValue={[
                    600, 550, 500, 400, 500, 450, 200, 0, -400, -600, -550,
                    -500, -400, -500, -450, -200, 0, 400, 600,
                ]}
                className={"bg-iper-gold"}
            />
        </div>
    );
}
