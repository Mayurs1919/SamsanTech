"use client";

import React, { useEffect, useRef } from "react";

interface SamsanAnimatedLogoProps {
    className?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    life: number;
    maxLife: number;
}

export default function SamsanAnimatedLogo({
    className = "",
    style = {},
    width = "auto",
    height = "60px",
}: SamsanAnimatedLogoProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let isVisible = true;

        // Bounding box of source image logo
        const SRC_W = 1024;
        const SRC_H = 329;

        // Exact socket positions for left and right dots inside letter 'a's
        const LEFT_REST = { x: 273.5, y: 166.5, r: 18.5 };
        const RIGHT_REST = { x: 772.0, y: 166.5, r: 17.5 };

        // Trails history (capped size for performance)
        const leftTrail: { x: number; y: number; alpha: number }[] = [];
        const rightTrail: { x: number; y: number; alpha: number }[] = [];

        // Spark particles pool
        let particles: Particle[] = [];

        // Animation timing settings
        const LOOP_DURATION = 3800; // 3.8s total loop
        const MOVE_DURATION = 2300; // 2.3s active motion

        const LEFT_START_TIME = 200; // Left dot exits first at 0.2s
        const RIGHT_START_TIME = 600; // Right dot follows at 0.6s

        let startTime: number | null = null;

        // Cache canvas sizes so we NEVER call getBoundingClientRect inside requestAnimationFrame!
        let cachedWidth = 0;
        let cachedHeight = 0;

        const updateCanvasSize = () => {
            const rect = container.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance
            const w = Math.round(rect.width * dpr);
            const h = Math.round(rect.height * dpr);

            if (w !== cachedWidth || h !== cachedHeight) {
                cachedWidth = w;
                cachedHeight = h;
                canvas.width = w;
                canvas.height = h;
            }
        };

        updateCanvasSize();

        // ResizeObserver for zero-layout-thrashing resizing
        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });
        resizeObserver.observe(container);

        // Pause animation when off-screen
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible && !animationFrameId) {
                    startTime = null;
                    animationFrameId = requestAnimationFrame(render);
                }
            },
            { threshold: 0.05 }
        );
        intersectionObserver.observe(container);

        // Smooth cubic ease-in-out curve
        const easeInOutCubic = (u: number): number => {
            return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        };

        // Infinity curve equation for Left Dot
        const getLeftDotPos = (progress: number) => {
            if (progress <= 0 || progress >= 1) return { ...LEFT_REST };
            const uEased = easeInOutCubic(progress);
            const theta = uEased * 2 * Math.PI;

            const dx = -240 * Math.sin(theta);
            const dy = -90 * Math.sin(2 * theta);
            return {
                x: LEFT_REST.x + dx,
                y: LEFT_REST.y + dy,
                r: LEFT_REST.r,
            };
        };

        // Infinity curve equation for Right Dot
        const getRightDotPos = (progress: number) => {
            if (progress <= 0 || progress >= 1) return { ...RIGHT_REST };
            const uEased = easeInOutCubic(progress);
            const theta = uEased * 2 * Math.PI;

            const dx = 240 * Math.sin(theta);
            const dy = 90 * Math.sin(2 * theta);
            return {
                x: RIGHT_REST.x + dx,
                y: RIGHT_REST.y + dy,
                r: RIGHT_REST.r,
            };
        };

        const addSpark = (x: number, y: number) => {
            if (particles.length >= 24) return;
            if (Math.random() > 0.45) return;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 1.5;
            particles.push({
                x: x + (Math.random() - 0.5) * 6,
                y: y + (Math.random() - 0.5) * 6,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 1.5 + Math.random() * 2,
                alpha: 0.9,
                life: 0,
                maxLife: 15 + Math.random() * 15,
            });
        };

        const render = (timestamp: number) => {
            if (!isVisible) {
                animationFrameId = 0;
                return;
            }

            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) % LOOP_DURATION;

            if (cachedWidth <= 0 || cachedHeight <= 0) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.save();
            ctx.scale(cachedWidth / SRC_W, cachedHeight / SRC_H);
            ctx.clearRect(0, 0, SRC_W, SRC_H);

            // Left dot progress calculation
            let leftProgress = 0;
            if (elapsed >= LEFT_START_TIME && elapsed <= LEFT_START_TIME + MOVE_DURATION) {
                leftProgress = (elapsed - LEFT_START_TIME) / MOVE_DURATION;
            }
            const leftPos = getLeftDotPos(leftProgress);
            const isLeftMoving = leftProgress > 0 && leftProgress < 1;

            // Right dot progress calculation
            let rightProgress = 0;
            if (elapsed >= RIGHT_START_TIME && elapsed <= RIGHT_START_TIME + MOVE_DURATION) {
                rightProgress = (elapsed - RIGHT_START_TIME) / MOVE_DURATION;
            }
            const rightPos = getRightDotPos(rightProgress);
            const isRightMoving = rightProgress > 0 && rightProgress < 1;

            // Update trails
            if (isLeftMoving) {
                leftTrail.unshift({ x: leftPos.x, y: leftPos.y, alpha: 1 });
                addSpark(leftPos.x, leftPos.y);
            }
            if (isRightMoving) {
                rightTrail.unshift({ x: rightPos.x, y: rightPos.y, alpha: 1 });
                addSpark(rightPos.x, rightPos.y);
            }

            if (leftTrail.length > 20) leftTrail.pop();
            if (rightTrail.length > 20) rightTrail.pop();

            // Decay trails when at rest
            leftTrail.forEach((t) => (t.alpha *= 0.9));
            rightTrail.forEach((t) => (t.alpha *= 0.9));

            // 1. Draw Glowing Trails (Grouped shadow state for GPU acceleration)
            ctx.shadowColor = "rgba(243, 113, 37, 0.7)";
            ctx.shadowBlur = 8;
            ctx.lineCap = "round";

            const drawTrail = (trail: { x: number; y: number; alpha: number }[]) => {
                for (let i = 0; i < trail.length - 1; i++) {
                    const p1 = trail[i];
                    const p2 = trail[i + 1];
                    const factor = (1 - i / trail.length) * p1.alpha;
                    if (factor <= 0.02) continue;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(243, 113, 37, ${factor * 0.8})`;
                    ctx.lineWidth = 12 * factor;
                    ctx.stroke();
                }
            };

            drawTrail(leftTrail);
            drawTrail(rightTrail);

            // 2. Draw Sparks & Particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                p.alpha = 0.9 * (1 - p.life / p.maxLife);
            });
            particles = particles.filter((p) => p.life < p.maxLife && p.alpha > 0);

            if (particles.length > 0) {
                ctx.shadowBlur = 4;
                particles.forEach((p) => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 175, 75, ${p.alpha})`;
                    ctx.fill();
                });
            }

            // Helper to render glowing dot
            const drawDot = (pos: { x: number; y: number; r: number }, isMoving: boolean) => {
                ctx.save();
                ctx.shadowColor = "rgba(243, 113, 37, 0.9)";
                ctx.shadowBlur = isMoving ? 14 : 6;

                const grad = ctx.createRadialGradient(
                    pos.x - pos.r * 0.2,
                    pos.y - pos.r * 0.2,
                    pos.r * 0.1,
                    pos.x,
                    pos.y,
                    pos.r
                );
                grad.addColorStop(0, "#FF8A3D");
                grad.addColorStop(0.7, "#F37125");
                grad.addColorStop(1, "#D95209");

                ctx.beginPath();
                ctx.arc(pos.x, pos.y, pos.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();
            };

            // 3. Render left and right dots
            drawDot(leftPos, isLeftMoving);
            drawDot(rightPos, isRightMoving);

            ctx.restore();
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`samsan-animated-logo-container ${className}`}
            style={{
                position: "relative",
                display: "inline-block",
                width: width,
                height: height,
                aspectRatio: "1024 / 329",
                verticalAlign: "middle",
                ...style,
            }}
        >
            {/* STATIC BASE LOGO (Transparent Wordmark + Tagline + Underline) */}
            <img
                src="/images/samsan_logo_base_transparent.png"
                alt="SAMSAN — in step with the NEXT"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "contain",
                }}
            />

            {/* OVERLAY CANVAS FOR DOT ANIMATION */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
