import "../homepage.css";

export function Homepage(): JSX.Element {
    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <h1>Daniel Ku</h1>
                <p className="header__subtitle">Software Developer · MCS @ UIUC</p>
            </header>

            {/* Navigation */}
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item"><a className="nav__link" href="#about">About</a></li>
                    <li className="nav__item"><a className="nav__link" href="#experience">Experience</a></li>
                    <li className="nav__item"><a className="nav__link" href="#projects">Projects</a></li>
                    <li className="nav__item"><a className="nav__link" href="#contact">Contact</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="content">
                {/* About Section */}
                <section id="about" className="section">
                    <h2 className="section__title">About</h2>
                    <p>
                        I build practical, reliable software products across the stack with a focus on clean user
                        experiences and robust engineering fundamentals.
                    </p>
                    <p><strong>Education:</strong> MCS (2025–), BS CS (Honors, 2024), University of Illinois Urbana–Champaign</p>
                </section>

                {/* Experience Section */}
                <section id="experience" className="section">
                    <h2 className="section__title">Experience</h2>

                    <h3 className="section__subtitle">Founder, Software Developer</h3>
                    <p><strong>Rotarygolf.info</strong> · Taipei, Taiwan | Jun 2025 – Present</p>
                    <p>
                        Built a full‑stack golf tournament system (React/TypeScript/PostgreSQL) with OCR scoring, role‑based auth, real‑time leaderboards, and automated awards; serving a 50‑member club with plans to scale across Taipei.
                    </p>

                    <h3 className="section__subtitle">Software Developer</h3>
                    <p><strong>Luca Park Share</strong> · Remote | May 2025 – Present</p>
                    <p>
                        Implemented OAuth login, reservations, and notifications; designed REST APIs and database schema for accounts, bookings, and payments; delivered an admin dashboard for usage and dispute monitoring.
                    </p>

                    <h3 className="section__subtitle">Deep‑tech Research Intern</h3>
                    <p><strong>Steel Perlot</strong> · New York, NY | May 2022 – Aug 2022</p>
                    <p>
                        Supported a $1.5M Web3 incubation program, organized conference events to source talent, and performed technical diligence on startups, markets, and competitive landscapes.
                    </p>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section">
                    <h2 className="section__title">Featured Projects</h2>

                    <h3 className="section__subtitle">IoT Bicycle Hazard Detection (CS 437)</h3>
                    <p>
                        Real‑time bicycle hazard detection on Raspberry Pi using SSD‑MobileNet‑v2 optimized with Coral Edge TPU and quantization; integrated ESP32‑S3 smart taillight with BLE, 8×8 LED matrix, and audio alerts.
                    </p>

                    <h3 className="section__subtitle">Finite Volume Shallow Water Simulator (CS 555)</h3>
                    <p>
                        Implemented finite volume methods for shallow water equations across water‑drop and dam‑break scenarios, comparing triangular vs. uniform meshes with animated Python/Matplotlib visualizations.
                    </p>
                </section>
            </main>

            {/* Contact Section */}
            <section id="contact" className="contact">
                <h2 className="contact__title">Get In Touch</h2>
                <p>I’m always interested in thoughtful collaborations and impactful product work.</p>
                <div className="contact__links">
                    <a className="contact__link" href="mailto:dcku2@illionis.edu">Email</a>
                    <a className="contact__link" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className="contact__link" href="#" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Daniel Ku. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Homepage;


