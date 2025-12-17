import logo from "../assets/logo2.png";

function About() {
    return (
        <div className="about-page">

            {/* HERO */}
            <section className="about-hero text-center py-5">
                <div className="container">
                    <img
                        src={logo}
                        alt="Planora logo"
                        style={{ height: "70px" }}
                        className="mb-3"
                    />

                    <p className="lead text-muted">
                        Discover, plan and share real travel experiences created by travelers.
                    </p>
                </div>
            </section>

            {/* FEATURES */}
            <section className="container my-5">
                <h2 className="text-center mb-4">Main Features</h2>

                <div className="row g-4">
                    {[
                        "Browse plans by city",
                        "Accent-insensitive search",
                        "Create, edit and delete plans",
                        "Structured activities by category",
                        "Voting system for popular plans",
                        "Responsive and mobile-friendly UI",
                    ].map((feature, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card h-100 shadow-sm text-center p-3">
                                <div className="card-body">
                                    <p className="fw-semibold mb-0">{feature}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TECH STACK */}
            <section className="container my-5 text-center">
                <h2 className="mb-4">Tech Stack</h2>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    {["React", "React Router", "Firebase", "Axios", "Bootstrap", "Vite"].map(
                        (tech) => (
                            <span key={tech} className="badge bg-dark px-3 py-2">
                                {tech}
                            </span>
                        )
                    )}
                </div>
            </section>

            {/* TEAM */}
            <section className="container my-5">
                <h2 className="text-center mb-4">Team</h2>

                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm text-center p-3">
                            <h5 className="mb-1">Anderson Valencia</h5>
                            <p className="text-muted mb-2">Web Developer</p>
                            <div className="d-flex justify-content-center gap-3">
                                <a href="https://github.com/avalenciacs" target="_blank">GitHub</a>
                                <a href="https://www.linkedin.com/in/anderson-valencia-885ba1143/" target="_blank">LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm text-center p-3">
                            <h5 className="mb-1">Nombre del compañero</h5>
                            <p className="text-muted mb-2">Web Developer</p>
                            <div className="d-flex justify-content-center gap-3">
                                <a href="https://github.com/fransorkin " target="_blank">GitHub</a>
                                <a href=" https://www.linkedin.com/in/francisco-sorkin/" target="_blank">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOT NOTE */}
            <section className="container text-center text-muted mb-5">
                <p>
                    Planora was developed as part of a web development bootcamp and designed
                    with scalability and future features in mind.
                </p>
            </section>

        </div>
    );
}

export default About;