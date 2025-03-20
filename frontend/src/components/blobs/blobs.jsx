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
                    "-55vw",
                    "-42vw",
                    "-26vw",
                    "-10vw",
                    "0vw",
                    "10vw",
                    "26vw",
                    "42vw",
                    "34vw",
                    "26vw",
                    "10vw",
                    "0vw",
                    "-10vw",
                    "-26vw",
                    "-32vw",
                    "-46vw",
                    "-55vw",
                    "-48vw",
                    "-55vw",
                ]}
                yValue={[
                    "60vh",
                    "56vh",
                    "51vh",
                    "46vh",
                    "37vh",
                    "46vh",
                    "42vh",
                    "19vh",
                    "0vh",
                    "-37vh",
                    "-51vh",
                    "-46vh",
                    "-37vh",
                    "-46vh",
                    "-42vh",
                    "-19vh",
                    "0vh",
                    "37vh",
                    "60vh",
                ]}
                className={"bg-iper-gold"}
            />
            <Blob
                xValue={[
                    "10vw",
                    "0vw",
                    "-10vw",
                    "-26vw",
                    "-32vw",
                    "-46vw",
                    "-55vw",
                    "-48vw",
                    "-55vw",
                    "-42vw",
                    "-26vw",
                    "-10vw",
                    "0vw",
                    "10vw",
                    "26vw",
                    "42vw",
                    "34vw",
                    "26vw",
                    "10vw",
                ]}
                yValue={[
                    "-51vh",
                    "-46vh",
                    "-37vh",
                    "-46vh",
                    "-42vh",
                    "-19vh",
                    "0vh",
                    "37vh",
                    "60vh",
                    "56vh",
                    "51vh",
                    "46vh",
                    "37vh",
                    "46vh",
                    "42vh",
                    "19vh",
                    "0vh",
                    "-37vh",
                    "-51vh",
                ]}
                className={"bg-iper-blue"}
            />
        </div>
    );
}
