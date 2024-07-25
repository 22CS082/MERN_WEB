import { Analytics } from "../components/Analytics";

import { useAuth } from "../store/auth";

 const About = () => {
    const {user}=useAuth();
    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>
                                Welcome {" "}
                                {user ? `${user.username} to our website` : ' to our website'}
                            </p>
                            <h1>Why Choose Us?</h1>
                            <p><strong>Comprehensive Tutorials</strong></p>
                            <p>Detailed step-by-step tutorials on various programming languages. Covering beginner to advanced levels with hands-on coding examples and projects.</p>

                            <p><strong>Language Overviews</strong></p>
                            <p>In-depth introductions to different programming languages. Includes the history, evolution, and key features of each language, along with comparisons between languages and their use cases.</p>

                            <p><strong>Project-Based Learning</strong></p>
                            <p>Building complete projects from scratch. Practical application of language features and frameworks, with collaborative coding sessions and group projects.</p>

                            <p><strong>Interactive Content</strong></p>
                            <p>Live streams and Q&A sessions with instructors. Interactive coding challenges and competitions, along with community-driven</p>

                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn primary-btn">connect now</button>
                                </a>
                                <a href="/services">
                                    <button className="btn secondary-btn">learn more</button>
                                </a>
                            </div>
                        </div>

                        {/* hero images  */}
                        <div className="hero-image">
                            <img
                                src="/images/about.png"
                                alt="coding together"
                                width="500"
                                height="auto"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Analytics />
        </>);
};
export default About;