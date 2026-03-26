"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationBy = "character" | "word" | "line";
type AnimationType = "blurInUp" | "fadeInUp";

interface TextAnimateProps extends HTMLMotionProps<"span"> {
    text?: string;
    children?: string;
    animation?: AnimationType;
    by?: AnimationBy;
    delay?: number;
    duration?: number;
    once?: boolean;
    className?: string;
}

const animationVariants: Record<AnimationType, Variants> = {
    blurInUp: {
        hidden: {
            filter: "blur(10px)",
            opacity: 0,
            y: 20
        },
        visible: {
            filter: "blur(0px)",
            opacity: 1,
            y: 0
        },
    },
    fadeInUp: {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0
        },
    },
};

export function TextAnimate({
    text,
    children,
    animation = "fadeInUp",
    by = "character",
    delay = 0,
    duration = 0.5,
    once = true,
    className,
    ...props
}: TextAnimateProps) {
    const content = text || children || "";
    const segments = by === "character"
        ? content.split("")
        : by === "word"
            ? content.split(" ")
            : [content];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: duration / segments.length,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = animationVariants[animation];

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            className={cn("inline-block", className)}
            {...props}
        >
            {segments.map((segment, i) => (
                <motion.span
                    key={i}
                    variants={itemVariants}
                    transition={{ duration }}
                    className="inline-block whitespace-pre"
                >
                    {segment}
                </motion.span>
            ))}
        </motion.span>
    );
}
