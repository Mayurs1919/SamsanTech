"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/theme-light/Button";
import { CtaBand } from "@/components/theme-light/CtaBand";
import { Eyebrow } from "@/components/theme-light/Eyebrow";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";

import { CAREER_JOBS as rawJobs, type Job } from "@/data/careers";



// Experience level sort order
const EXP_ORDER: Record<string, number> = {
    "0-2 Years": 0,
    "2-5 Years": 1,
    "5-8 Years": 2,
    "8+ Years":  3
};

// Default sort: by experience level ascending, then A-Z within each tier
const initialJobs: Job[] = [...rawJobs].sort((a, b) => {
    const expDiff = EXP_ORDER[a.experience] - EXP_ORDER[b.experience];
    return expDiff !== 0 ? expDiff : a.title.localeCompare(b.title);
});

const careerStats = [
    { value: "15+", label: "Open Positions", sublabel: "Across all domains", target: 15, suffix: "+" },
    { value: "5", label: "Engineering Domains", sublabel: "SDV, ADAS, Cloud & more", target: 5, suffix: "" },
    { value: "4+", label: "Global Offices", sublabel: "India, Korea, Germany, USA", target: 4, suffix: "+" },
    { value: "48h", label: "Fast Response", sublabel: "Avg. interview scheduling", target: 48, suffix: "h" },
];

function AnimatedCounter({ target, suffix, duration = 1600 }: { target: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || hasStarted) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            setHasStarted(true);
            observer.disconnect();
            const startTime = performance.now();
            const tick = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * target));
                if (progress < 1) requestAnimationFrame(tick);
                else setCount(target);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.3 });
        observer.observe(element);
        return () => observer.disconnect();
    }, [duration, hasStarted, target]);

    return <span ref={elementRef}>{count}{suffix}</span>;
}

function CareersStatsStrip({ shouldReduce }: { shouldReduce: boolean | null }) {
    return (
        <section className="careers-stats-band" aria-label="SAMSAN career statistics">
            <div className="tl-container">
                <div className="careers-section-heading">
                    <Eyebrow>By the numbers</Eyebrow>
                    <h2>Why Engineers Choose SAMSAN</h2>
                </div>
                <div className="careers-stats-grid">
                    {careerStats.map((stat, index) => (
                        <motion.div
                            className="careers-stat"
                            key={stat.label}
                            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduce ? 0 : 0.5, delay: index * 0.08 }}
                        >
                            <strong className="careers-stat-value">
                                {shouldReduce ? stat.value : <AnimatedCounter target={stat.target} suffix={stat.suffix} />}
                            </strong>
                            <div className="careers-stat-label">{stat.label}</div>
                            <div className="careers-stat-sublabel">{stat.sublabel}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CareerJobCard({ job, index, shouldReduce }: { job: Job; index: number; shouldReduce: boolean | null }) {
    const [skillsExpanded, setSkillsExpanded] = useState(false);
    const visibleSkills = skillsExpanded ? job.skills : job.skills.slice(0, 6);
    const remainingSkills = job.skills.length - 6;
    const categoryLabel = job.category === "HMI Development"
        ? "HMI development"
        : job.category.replace(/\b\w/g, (letter, offset) => offset === 0 ? letter : letter.toLowerCase());

    return (
        <motion.article
            className="job-card-v2"
            key={job.id}
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduce ? 0 : 0.5, delay: index * 0.08 }}
        >
            <div className="job-card-top">
                <span className="job-category">{categoryLabel}</span>
                <span className="job-experience">{job.experience}</span>
            </div>
            <h3 className="job-card-title-v2">{job.title}</h3>
            <div className="job-meta">
                <span>{job.city}, {job.country}</span>
                <span>{job.type}</span>
            </div>
            <p className="job-summary">{job.description}</p>
            <div className="job-skills" id={`job-skills-${job.id}`}>
                {visibleSkills.map(skill => <span className="job-skill-tag" key={skill}>{skill}</span>)}
                {remainingSkills > 0 && (
                    <button
                        type="button"
                        className="job-skill-tag job-skills-more"
                        aria-expanded={skillsExpanded}
                        aria-controls={`job-skills-${job.id}`}
                        onClick={() => setSkillsExpanded(value => !value)}
                    >
                        {skillsExpanded ? "Show less" : `+${remainingSkills} more`}
                    </button>
                )}
            </div>
            <div className="job-card-divider" />
            <div className="job-card-actions">
                <Button type="button" variant="outline" className="job-details-btn">View details</Button>
                <Button className="job-apply-btn" href={`/contact?type=careers&role=${job.slug}`}>
                    Apply Now <span aria-hidden="true">→</span>
                </Button>
            </div>
        </motion.article>
    );
}

export default function CareersClient({ fontClassName = "" }: { fontClassName?: string }) {
    const shouldReduce = useReducedMotion();

    const countries = ["All Countries", "India"];
    const cities = ["All Cities", "Pune", "Bangalore"];
    const experiences = ["All Experience", "0-2 Years", "2-5 Years", "5-8 Years", "8+ Years"];
    const categories = ["All Categories", "Embedded Engineering", "HMI Development", "Connectivity", "Validation & Testing", "Systems Engineering"];
    const types = ["All Types", "Full-time"];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedExp, setSelectedExp] = useState("All Experience");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedType, setSelectedType] = useState("All Types");

    const filteredJobs = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        return initialJobs.filter(job => {
            const matchesSearch = !query || job.title.toLowerCase().includes(query) || job.description.toLowerCase().includes(query) || job.skills.some(skill => skill.toLowerCase().includes(query));
            const matchesCountry = selectedCountry === "All Countries" || job.country.includes(selectedCountry);
            const matchesCity = selectedCity === "All Cities" || job.city.includes(selectedCity);
            const matchesExperience = selectedExp === "All Experience" || job.experience === selectedExp;
            const matchesCategory = selectedCategory === "All Categories" || job.category === selectedCategory;
            const matchesType = selectedType === "All Types" || job.type === selectedType;
            return matchesSearch && matchesCountry && matchesCity && matchesExperience && matchesCategory && matchesType;
        });
    }, [searchQuery, selectedCountry, selectedCity, selectedExp, selectedCategory, selectedType]);

    const handleResetFilter = () => {
        setSearchQuery("");
        setSelectedCountry("All Countries");
        setSelectedCity("All Cities");
        setSelectedExp("All Experience");
        setSelectedCategory("All Categories");
        setSelectedType("All Types");
    };

    return (
        <div className={`theme-light-corp careers-theme ${fontClassName}`}>
            <Hero
                className="careers-page-hero"
                align="center"
                eyebrow="Now hiring — engineering roles"
                title={<>Shape the Future of <span>Software‑Defined Vehicles</span></>}
                description={<>Join specialized engineering CoEs across <strong>SDV</strong>, <strong>Android Automotive</strong>, <strong>V2X</strong>, AI/ML, and Autonomous Systems. Build high-impact technology with global automotive leaders.</>}
            >
                <div className="careers-hero-actions">
                    <Button href="#job-openings" variant="primary">View Open Positions <span aria-hidden="true">→</span></Button>
                    <Button href="/contact" variant="ghost-on-dark">Talk to Recruiting</Button>
                </div>
            </Hero>

            <CareersStatsStrip shouldReduce={shouldReduce} />

            <Section variant="white" className="careers-culture">
                <div className="tl-container">
                    <div className="careers-section-heading">
                        <Eyebrow>Our culture & ethos</Eyebrow>
                        <h2>Life at SAMSAN</h2>
                        <p>We build an environment where engineering excellence, domain innovation, and career progression thrive together.</p>
                    </div>
                    <div className="culture-card-grid">
                        <motion.article className="culture-card-enhanced" initial={shouldReduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: shouldReduce ? 0 : 0.5 }}>
                            <div className="culture-card-title"><span className="culture-card-number">01</span><h3>Empowering Work Environment</h3></div>
                            <p>At SAMSAN, we foster a flexible work culture that empowers engineering teams to own complex automotive projects. Work directly on cutting-edge embedded software for tier-1 suppliers and global OEMs.</p>
                        </motion.article>
                        <motion.article className="culture-card-enhanced" initial={shouldReduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.08 }}>
                            <div className="culture-card-title"><span className="culture-card-number">02</span><h3>Integral Part of Our Growth</h3></div>
                            <p>As SAMSAN scales its domain CoEs across SDV, Android Automotive, and V2X, you will drive key technological milestones and directly influence industry-defining software architecture.</p>
                        </motion.article>
                        <motion.article className="culture-card-enhanced culture-card-combined" initial={shouldReduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.16 }}>
                            <div className="culture-card-title"><span className="culture-card-number">03</span><h3>Continuous Technical Learning</h3></div>
                            <p>We cultivate a culture of ongoing skill enrichment through domain workshops, platform certifications, hands-on lab access, and high-tech engineering mentorship.</p>
                            <div className="culture-card-secondary-title"><span className="culture-card-number">04</span><h3>High Performance Recognition</h3></div>
                            <p>At SAMSAN, exceptional engineering output is recognized and rewarded. As you contribute your domain expertise, you accelerate your leadership trajectory.</p>
                        </motion.article>
                    </div>
                    <div className="careers-values">
                        <div className="careers-values-heading"><span>Our Engineering</span><strong>VALUES</strong></div>
                        <div className="value-node-item"><span className="value-node-number">01</span><div><h5>COLLABORATION</h5><p>One team, clear ownership, zero surprises.</p></div></div>
                        <div className="value-node-item"><span className="value-node-number">02</span><div><h5>ASPIRATION</h5><p>Think big. Deliver excellence. Continuous innovation.</p></div></div>
                        <div className="value-node-item"><span className="value-node-number">03</span><div><h5>RESPECT</h5><p>Respect is earned. Transparency is paramount.</p></div></div>
                    </div>
                </div>
            </Section>

            <Section variant="white" className="careers-jobs" id="job-openings" aria-labelledby="careers-jobs-heading">
                <div className="tl-container">
                    <div className="careers-section-heading">
                        <Eyebrow>Current opportunities</Eyebrow>
                        <h2 id="careers-jobs-heading">Open Positions</h2>
                        <p>Find your next engineering role at SAMSAN</p>
                    </div>
                    <form className="careers-filter-card" onSubmit={event => { event.preventDefault(); setSearchQuery(query => query.trim()); }} aria-label="Filter open positions">
                        <div className="careers-filter-heading"><strong>Filters</strong><button type="button" onClick={handleResetFilter}><span className="filter-clear-desktop">Clear all</span><span className="filter-clear-mobile">Clear filters</span></button></div>
                        <input
                            type="search"
                            className="jobs-search-input"
                            aria-label="Search open positions"
                            placeholder="Search job title or skill (e.g. Android, AOSP, Python…)"
                            value={searchQuery}
                            onChange={event => setSearchQuery(event.target.value)}
                        />
                        <select aria-label="Filter by country" value={selectedCountry} onChange={event => setSelectedCountry(event.target.value)}>
                            {countries.map(country => <option key={country} value={country}>{country}</option>)}
                        </select>
                        <select aria-label="Filter by location" value={selectedCity} onChange={event => setSelectedCity(event.target.value)}>
                            {cities.map(city => <option key={city} value={city}>{city === "All Cities" ? "All Locations" : `${city}, India`}</option>)}
                        </select>
                        <select aria-label="Filter by experience" value={selectedExp} onChange={event => setSelectedExp(event.target.value)}>
                            {experiences.map(experience => <option key={experience} value={experience}>{experience === "All Experience" ? "All Experience Levels" : experience}</option>)}
                        </select>
                        <select aria-label="Filter by domain" value={selectedCategory} onChange={event => setSelectedCategory(event.target.value)}>
                            {categories.map(category => <option key={category} value={category}>{category === "All Categories" ? "All Domains" : category}</option>)}
                        </select>
                        <select aria-label="Filter by job type" value={selectedType} onChange={event => setSelectedType(event.target.value)}>
                            {types.map(type => <option key={type} value={type}>{type === "All Types" ? "All Job Types" : type}</option>)}
                        </select>
                        <Button type="submit" className="careers-search-submit">Search</Button>
                    </form>
                    <div className="careers-results-summary" aria-live="polite">
                        <p>All Jobs <span>{filteredJobs.length}</span></p>
                        <span>Sorted by experience · {new Date().getFullYear()}</span>
                    </div>
                    <div className="jobs-grid">
                        {filteredJobs.length > 0 ? filteredJobs.map((job, index) => <CareerJobCard key={job.id} job={job} index={index} shouldReduce={shouldReduce} />) : (
                            <div className="no-jobs-state">
                                <p>No positions match your current filters.</p>
                                <a href="mailto:india@samsanlabs.com">india@samsanlabs.com</a>
                                <div><Button type="button" className="careers-no-results-reset" onClick={handleResetFilter}>Reset All Filters</Button></div>
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            <CtaBand
                eyebrow="Talent network"
                title="Don't see a matching role?"
                description="Send your resume directly to our talent acquisition team for upcoming embedded engineering openings."
                primaryLabel="Submit General Resume"
                primaryHref="mailto:india@samsanlabs.com"
                secondaryLabel="View Engineering Offerings"
                secondaryHref="/contact"
            />
        </div>
    );
}
