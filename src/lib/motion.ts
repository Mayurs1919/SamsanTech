import type { Variants } from "framer-motion";

// Reusable physics settings
export const springTransitions = {
    default: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
    },
    gentle: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
    },
    stiff: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
    },
};

export const easeTransitions = {
    smooth: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
    quiet: {
        duration: 0.6,
        ease: "easeOut" as const,
    },
};

// Reusable animation variants
// When using these, Framer Motion automatically respects prefers-reduced-motion media query
// if we customize the variants using the useReducedMotion hook inside our components.
export const fadeUpVariants = (shouldReduce: boolean | null = false): Variants => ({
    hidden: { 
        opacity: 0, 
        y: shouldReduce ? 0 : 20 
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduce 
            ? { duration: 0.05 } 
            : springTransitions.default,
    },
});

export const fadeInVariants = (shouldReduce: boolean | null = false): Variants => ({
    hidden: { 
        opacity: 0 
    },
    visible: {
        opacity: 1,
        transition: shouldReduce 
            ? { duration: 0.05 } 
            : { duration: 0.4, ease: "easeOut" },
    },
});

export const scaleInVariants = (shouldReduce: boolean | null = false): Variants => ({
    hidden: { 
        opacity: 0, 
        scale: shouldReduce ? 1 : 0.95, 
        y: shouldReduce ? 0 : 15 
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: shouldReduce 
            ? { duration: 0.05 } 
            : springTransitions.gentle,
    },
});

export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};
