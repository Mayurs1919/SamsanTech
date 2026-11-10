"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const valueData = [
    { need: "COCKPIT / IVI / CLUSTER ENGINEERING", response: "Android Automotive, QNX/Linux, Virtual SDK Cloud-Based , HMI, middleware, validation" },
    { need: "CONNECTED VEHICLE / TELEMATICS PLATFORM", response: "TCU, cloud telemetry, OTA, IoT gateway, diagnostics" },
    { need: "FASTER ENGINEERING LIFECYCLE", response: "GenAI requirements, test generation, traceability, code/test acceleration" },
    { need: "AUTOMOTIVE-DOMAIN CAPACITY", response: "Strategic staffing, CoE, BOT, managed teams" },
    { need: "PRODUCTION-GRADE QUALITY", response: "ASPICE, ISO 26262, cybersecurity, MISRA, V&V discipline" },
];

function ValueRow({ need, response, index }: { need: string; response: string; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(rowRef, { once: true, amount: 0.2 });
    const shouldReduce = useReducedMotion();
    const animate = isInView && !shouldReduce;

    return (
        <div
            ref={rowRef}
            className={`comparison-row${animate ? " is-revealed" : ""}`}
            style={{ "--row-index": index } as CSSProperties}
        >
            <div className="spec-key" data-label="Customer need">{need}</div>
            <div className="spec-val" data-label="SAMSAN solution">{response}</div>
        </div>
    );
}

export default function ValueTable() {
    return (
        <section className="home-value-section" aria-labelledby="value-heading">
            <div className="container">
                <div className="home-value-heading">
                    <h2 id="value-heading">Where SAMSAN Creates Value</h2>
                    <p>How we align our specialized automotive engineering capabilities with your critical program requirements.</p>
                </div>

                <div className="spec-table value-table-responsive-wrapper">
                    <div className="comparison-row comparison-header">
                        <div className="spec-key">Customer need</div>
                        <div className="spec-val">SAMSAN solution</div>
                    </div>
                    {valueData.map((row, index) => (
                        <ValueRow key={row.need} need={row.need} response={row.response} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
