"use client";
import { motion } from "framer-motion";
import { useState } from "react";
const AnimatedBlob = () => {
    const [toggle, setToggle] = useState(false);
    const variants = {
        initial: {
            d: "M40.2,-44.6C51.8,-34.3,61.2,-22,63.5,-9.5C65.9,3.1,61.3,15.6,53.1,25.5C44.9,35.4,33,42.6,20.5,46.4C8.1,50.1,-4.8,50.3,-17.6,47.2C-30.3,44.2,-42.7,37.8,-49.4,28.3C-56.2,18.8,-57.3,6.2,-54.8,-5.9C-52.3,-18,-46.2,-30.5,-36.7,-39.8C-27.2,-49.1,-13.6,-55.1,-0.7,-54.4C12.1,-53.7,24.3,-46.8,40.2,-44.6Z",
        },
        morphed: {
            d: "M37.2,-41.5C47.8,-33.2,54.8,-22.6,57.1,-11.7C59.4,-0.8,56.9,10.5,50.3,21C43.7,31.5,33.1,41.3,21,46.7C8.8,52,-4.9,52.8,-17.4,48.8C-29.9,44.9,-41.2,36.3,-49.3,25.5C-57.4,14.7,-62.3,1.7,-58.3,-9.4C-54.4,-20.5,-41.5,-29.8,-30.5,-38.5C-19.6,-47.2,-9.8,-55.2,1.3,-56.5C12.4,-57.7,24.7,-52.2,37.2,-41.5Z",
        },
    };
    return (
        <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setToggle(!toggle)}
        >
            <motion.path
                fill="#FF0066"
                variants={variants}
                initial="initial"
                animate={toggle ? "morphed" : "initial"}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                transform="translate(100 100)"
            />
        </svg>
    );
};
export default AnimatedBlob;
