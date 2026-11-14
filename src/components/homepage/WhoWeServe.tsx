"use client";

const serveItems = [
    { title: "Industrial Sectors",    desc: "High-reliability control loops, sensor telemetry, and safety-critical edge processing.",                                                img: "/images/serve_industrial.png"    },
    { title: "Smart Infrastructure",  desc: "Connected V2X nodes, cloud routing, intelligent traffic hubs, and network telemetry.",                                                img: "/images/serve_infrastructure.png" },
    { title: "Automotive Embedded",   desc: "Cockpit architectures, advanced ADAS modeling, infotainment layers, and AUTOSAR integrations.",                                       img: "/images/serve_automotive.png"    },
    { title: "Semiconductor Domain",  desc: "Silicon validation, firmware adaptation, hardware abstraction layers, and compiler tooling.",                                          img: "/images/serve_semiconductor.png" },
    { title: "OEMs & Tier-1s",        desc: "Production scale deployments, validation verification programs, and strategic Build-Operate-Transfer centers.",                        img: "/images/serve_oems.png"          },
];

export default function WhoWeServe() {
    return (
        <section className="home-domain-section" id="who-we-serve-section" aria-labelledby="domain-heading">
            <div className="container">
                <header className="home-domain-heading">
                    <h2 id="domain-heading">Delivering Domain Expertise</h2>
                    <p>We design specialized technology architectures and high-integrity systems across primary embedded and digital mobility domains.</p>
                </header>
                <div className="home-domain-grid">
                    {serveItems.map((item, i) => (
                        <article className={`home-domain-card home-domain-card--${i + 1}`} key={item.title}>
                            <img src={item.img} alt={item.title} loading="lazy" />
                            <div className="home-domain-card__overlay">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <style jsx global>{`
                .home-theme .home-domain-section { padding: 96px 24px; background: var(--bg); }
                .home-theme .home-domain-section .container { width: min(100%, 1200px); max-width: 1200px; margin-inline: auto; padding: 0; }
                .home-theme .home-domain-heading { max-width: 720px; margin: 0 auto 40px; text-align: center; }
                .home-theme .home-domain-heading h2 { margin: 0 0 14px; color: var(--navy); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: clamp(30px, 3vw, 40px); font-weight: 700; line-height: 1.2; text-wrap: balance; }
                .home-theme .home-domain-heading p { max-width: 640px; margin: 0 auto; color: var(--body); font-size: 16px; line-height: 1.65; }
                .home-theme .home-domain-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; }
                .home-theme .home-domain-card--1, .home-theme .home-domain-card--2, .home-theme .home-domain-card--3 { grid-column: span 2; }
                .home-theme .home-domain-card--4, .home-theme .home-domain-card--5 { grid-column: span 3; }
                .home-theme .home-domain-card { position: relative; aspect-ratio: 16 / 10; min-width: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 16px; background: #0B1320; box-shadow: 0 1px 2px rgba(11,19,32,.06), 0 8px 24px rgba(11,19,32,.06); transition: transform 180ms ease, box-shadow 180ms ease; }
                .home-theme .home-domain-card:hover { z-index: 1; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(11,19,32,.16); }
                .home-theme .home-domain-card > img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 240ms ease; }
                .home-theme .home-domain-card:hover > img { transform: scale(1.03); }
                .home-theme .home-domain-card__overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; background: linear-gradient(to top, rgba(0,58,87,.92) 0%, rgba(0,58,87,.35) 55%, rgba(0,58,87,0) 100%); }
                .home-theme .home-domain-card__overlay h3 { margin: 0 0 8px; color: #FFFFFF; font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: 20px; font-weight: 700; line-height: 1.3; text-wrap: balance; }
                .home-theme .home-domain-card__overlay p { margin: 0; color: rgba(255,255,255,.92); font-size: 15px; line-height: 1.5; }
                @media (max-width: 900px) and (min-width: 601px) {
                    .home-theme .home-domain-grid { grid-template-columns: repeat(2, 1fr); }
                    .home-theme .home-domain-card--1, .home-theme .home-domain-card--2, .home-theme .home-domain-card--3, .home-theme .home-domain-card--4 { grid-column: span 1; }
                    .home-theme .home-domain-card--5 { grid-column: span 2; }
                }
                @media (max-width: 600px) {
                    .home-theme .home-domain-section { padding: 64px 20px; }
                    .home-theme .home-domain-grid { grid-template-columns: 1fr; }
                    .home-theme .home-domain-card--1, .home-theme .home-domain-card--2, .home-theme .home-domain-card--3, .home-theme .home-domain-card--4, .home-theme .home-domain-card--5 { grid-column: span 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .home-theme .home-domain-card, .home-theme .home-domain-card > img { transition: none; }
                    .home-theme .home-domain-card:hover, .home-theme .home-domain-card:hover > img { transform: none; }
                }
            `}</style>
        </section>
    );
}
