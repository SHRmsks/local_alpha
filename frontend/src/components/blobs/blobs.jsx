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
            width: [300, 700],
            height: [700, 300],
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
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <Blob
                xValue={["25vw"]}
                yValue={["75vh"]}
                className={"bg-iper-gold"}
            />
            <Blob
                xValue={["90vw"]}
                yValue={["10vh"]}
                className={"bg-iper-blue opacity-40"}
            />
            <Blob
                xValue={["10vw"]}
                yValue={["-10vh"]}
                className={"bg-blue-200"}
            />
        </div>
    );
}
