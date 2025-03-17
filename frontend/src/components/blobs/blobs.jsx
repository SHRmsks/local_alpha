import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function CustomPathMotion() {
    const t = useMotionValue(0);
    useEffect(() => {
        const controls = animate(t, 360, {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        });
        return controls.stop;
    }, [t]);

    const toRad = (deg) => (deg * Math.PI) / 180;

    const A = 600,
        B = 390;
    const a = 3,
        b = 2;
    const delta = Math.PI / 2;

    const x = useTransform(t, (v) => {
        const rad = toRad(v);
        return A * Math.sin(a * rad + delta);
    });
    const y = useTransform(t, (v) => {
        const rad = toRad(v);
        return B * Math.sin(b * rad);
    });

    return (
        <motion.div
            style={{
                x,
                y,
            }}
            animate={{
                borderRadius: [
                    "100% 100% 100% 100% / 100% 100% 100% 100%",
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                ],
            }}
            transition={{
                borderRadius: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                },
            }}
            className="absolute h-96 w-96 bg-iper-gold opacity-70"
        />
    );
}
