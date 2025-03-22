import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function Blob({ xValue, yValue, className }) {
    const variants = {
        animate: {
            borderRadius: [
                "42% 58% 63% 37% / 45% 52% 48% 55%",
                "67% 33% 52% 48% / 36% 65% 35% 64%",
                "55% 45% 40% 60% / 70% 30% 65% 35%",
                "28% 72% 65% 35% / 42% 58% 38% 62%",
                "45% 55% 70% 30% / 55% 45% 60% 40%",
                "33% 67% 58% 42% / 63% 37% 42% 58%",
                "50% 50% 34% 66% / 37% 63% 70% 30%",
                "42% 58% 63% 37% / 45% 52% 48% 55%",
            ],
            width: [700, 400, 550, 450, 600, 400, 500, 700],
            height: [400, 600, 550, 600, 450, 700, 500, 400],
            x: xValue,
            y: yValue,
        },
    };
    const transition = {
        default: {
            duration: 80,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
        },
        borderRadius: {
            duration: 80,
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
                xValue={[
                    "25vw",
                    "40vw",
                    "55vw",
                    "70vw", // UP
                    "85vw", // UP
                    "90vw", // UP
                    "85vw", // UP
                    "70vw", // UP
                    "55vw",
                    "40vw",
                    "25vw",
                    "17.5vw",
                    "10vw", // Down
                    "-5vw", // Down
                    "-10vw", // Down
                    "-5vw", // Down
                    "10vw", // Down
                    "17.5vw",
                    "25vw",
                ]}
                yValue={[
                    "75vh",
                    "70vh",
                    "75vh",
                    "55vh", // UP
                    "40vh", // UP
                    "25vh", // UP
                    "10vh", // UP
                    "-5vh", // UP
                    "-10vh",
                    "-5vh",
                    "-10vh",
                    "0vh",
                    "10vh", // Down
                    "25vh", // Down
                    "40vh", // Down
                    "55vh", // Down
                    "65vh", // Down
                    "70vh",
                    "75vh",
                ]}
                className={"bg-iper-gold"}
            />
            <Blob
                xValue={[
                    "90vw", // UP
                    "85vw", // UP
                    "70vw",
                    "55vw",
                    "40vw",
                    "25vw",
                    "10vw",
                    "5vw", // Down
                    "-10vw", // Down
                    "05vw", // Down
                    "-10vw", // Down
                    "-5vw", // Down
                    "-10vw", // Down
                    "-5vw", // Down
                    "10vw",
                    "25vw",
                    "40vw",
                    "55vw",
                    "70vw",
                    "85vw", // UP
                    "90vw", // UP
                    "85vw",
                    "90vw",
                    "90vw",
                ]}
                yValue={[
                    "10vh",
                    "-5vh",
                    "0vh",
                    "-5vh",
                    "-10vh",
                    "-5vh",
                    "-10vh",
                    "-5vh", // Down
                    "-10vh", // Down
                    "5vh", // Down
                    "20vh", // Down
                    "35vh", // Down
                    "50vh", // Down
                    "75vh", // Down
                    "80vh",
                    "85vh",
                    "90vh",
                    "80vh",
                    "70vh",
                    "60vh",
                    "50vh",
                    "40vh",
                    "30vh",
                    "10vh",
                ]}
                className={"bg-iper-blue opacity-40"}
            />
            <Blob
                xValue={[
                    "10vw",
                    "25vw",
                    "40vw",
                    "55vw",
                    "70vw",
                    "80vw",
                    "90vw", // Down
                    "85vw", // Down
                    "90vw", // Down
                    "85vw", // Down
                    "90vw", // Down
                    "85vw", // Down
                    "70vw",
                    "55vw",
                    "40vw",
                    "25vw",
                    "10vw",
                    "5vw", // Down
                    "-10vw", // Down
                    "05vw", // Down
                    "-10vw", // Down
                    "-5vw", // Down
                    "-10vw", // Down
                    "-5vw", // Down
                    "10vw",
                ]}
                yValue={[
                    "-10vh",
                    "-5vh",
                    "0vh",
                    "-5vh",
                    "0vh",
                    "5vh",
                    "20vh", // Down
                    "35vh", // Down
                    "50vh", // Down
                    "65vh", // Down
                    "80vh", // Down
                    "90vh", // Down
                    "85vh",
                    "80vh",
                    "85vh",
                    "80vh",
                    "85vh",
                    "75vh", // UP
                    "60vh", // UP
                    "45vh", // UP
                    "30vh", // UP
                    "15vh", // UP
                    "0vh", // UP
                    "-5vh", // UP
                    "-10vh",
                ]}
                className={"bg-blue-200"}
            />
            <Blob
                xValue={[
                    "-5vw",
                    "-10vw", // Down
                    "-5vw", // Down
                    "-10vw",
                    "-5vw",
                    "-10vw",
                    "-5vw",
                    "0vw",
                    "5vw",
                    "10vw",
                    "20vw",
                    "30vw",
                    "40vw",
                    "50vw",
                    "60vw",
                    "70vw",
                    "80vw",
                    "90vw", // Down
                    "85vw", // Down
                    "90vw", // Down
                    "85vw", // Down
                    "90vw", // Down
                    "85vw", // Down
                    "70vw",
                    "60vw",
                    "50vw",
                    "40vw",
                    "30vw",
                    "20vw",
                    "10vw",
                    "5vw", // Down
                    "-10vw", // Down
                    "05vw", // Down
                    "-10vw", // Down
                    "-5vw", // Down
                ]}
                yValue={[
                    "45vh", // UP
                    "35vh", // UP
                    "25vh", // UP
                    "15vh",
                    "5vh",
                    "0vh", // UP
                    "-5vh", // UP
                    "-10vh",
                    "-5vh",
                    "-10vh",
                    "-5vh",
                    "0vh",
                    "-5vh",
                    "0vh",
                    "-5vh",
                    "0vh",
                    "5vh",
                    "0vh",
                    "5vh",
                    "20vh", // Down
                    "35vh", // Down
                    "50vh",
                    "65vh", // Down
                    "80vh", // Down
                    "90vh", // Down
                    "85vh",
                    "80vh",
                    "85vh",
                    "80vh",
                    "85vh",
                    "80vh",
                    "85vh",
                    "75vh", // UP
                    "60vh", // UP
                    "45vh",
                ]}
                className={"bg-yellow-200"}
            />
            <Blob
                xValue={[
                    "70vw",
                    "60vw",
                    "50vw",
                    "40vw",
                    "30vw",
                    "20vw",
                    "10vw",
                    "5vw",
                    "0vw",
                    "-5vw",
                    "-10vw",
                    "-5vw",
                    "-10vw",
                    "-5vw",
                    "-10vw",
                    "-10vw",
                    "-5vw",
                    "5vw",
                    "10vw",
                    "20vw",
                    "30vw",
                    "40vw",
                    "50vw",
                    "60vw",
                    "70vw",
                    "85vw",
                    "90vw",
                    "85vw",
                    "90vw",
                    "85vw",
                    "90vw",
                    "80vw",
                    "70vw",
                ]}
                yValue={[
                    "60vh", // UP
                    "75vh", // UP
                    "85vh",
                    "80vh",
                    "85vh",
                    "80vh",
                    "85vh",
                    "80vh",
                    "85vh",
                    "90vh", // Down
                    "80vh", // Down
                    "65vh", // Down
                    "50vh",
                    "35vh", // Down
                    "20vh", // Down
                    "5vh",
                    "0vh",
                    "5vh",
                    "0vh",
                    "-5vh",
                    "0vh",
                    "-5vh",
                    "0vh",
                    "-5vh",
                    "-10vh",
                    "-5vh",
                    "0vh", // UP
                    "5vh",
                    "15vh",
                    "25vh", // UP
                    "35vh", // UP
                    "45vh", // UP
                    "60vh",
                ]}
                className={"bg-gray-300"}
            />
        </div>
    );
}
