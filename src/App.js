import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaUserTie, FaBook, FaHome, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import './App.css';
/*
function DraggableCard({ repo }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: repo.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="project-card">
        <h3>{repo.name}</h3>
        <p>{repo.description || "No description"}</p>
        <p className="language">Language: {repo.language || "N/A"}</p>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </div>
  );
}
  */
export default function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/GursavakhJhutty/repos")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered);
      })
      .catch((err) => console.error("Failed to fetch repos:", err));
  }, []);

  const [activeTab, setActiveTab] = useState("featured");

  const [selectedPage, setSelectedPage] = useState("home");


  const featuredRepos = repos
    .filter((repo) => !repo.fork)
    .slice(1, 5);

  const allRepos = repos.filter((repo) => !repo.fork);
  /*
  const skills = [
    "Java", "Spring Framework", "Maven", "JavaScript", "HTML", "CSS", "APIs",
    "MySQL", "MongoDB", "IPFS", "Git", "GitHub", "GitLab", "Rust", "Solidity"
  ];
  */
  const skillGroups = [
  {
    category: "Software Engineering",
    skills: [
      "Java", "Spring Boot", "Maven", "REST APIs", "Git", "GitHub", "GitLab", "MySQL", "MongoDB"
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      "JavaScript", "React", "HTML", "CSS", "Tailwind CSS", "Vite", "GitHub Pages"
    ]
  },
  {
    category: "Data Science & ML",
    skills: [
      "Python", "Pandas", "NumPy", "scikit-learn", "XGBoost", "PyTorch", "Jupyter Notebook"
    ]
  },
  {
    category: "DevOps & Infra",
    skills: [
      "Docker", "GitHub Actions", "Firebase", "VS Code", "IPFS"
    ]
  },
  {
    category: "Blockchain & Systems",
    skills: [
      "Solidity", "Rust", "Smart Contracts", "IPFS", "MetaMask"
    ]
  }
];

  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <div className="toggle-switch" onClick={() => setDarkMode(!darkMode)}>
            <div className={`toggle-thumb ${darkMode ? 'dark' : 'light'}`}>
              {darkMode ? (
                <FaMoon className="toggle-icon" />
              ) : (
                <FaSun className="toggle-icon" />
              )}
            </div>
          </div>
          <div className="search-wrapper">
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>
        <nav className="nav">
          <button
            className={`nav-item ${selectedPage === "home" ? "active" : ""}`}
            onClick={() => setSelectedPage("home")}
          >
            <FaHome /><span>Home</span>
          </button>
          <button
            className={`nav-item ${selectedPage === "experience" ? "active" : ""}`}
            onClick={() => setSelectedPage("experience")}
          >
            <FaUserTie /><span>Experience</span>
          </button>
          <button
            className={`nav-item ${selectedPage === "education" ? "active" : ""}`}
            onClick={() => setSelectedPage("education")}
          >
            <FaBook /><span>Education</span>
          </button>
          <button
            className={`nav-item ${selectedPage === "contact" ? "active" : ""}`}
            onClick={() => setSelectedPage("contact")}
          >
            <FaEnvelope /><span>Contact</span>
          </button>
        </nav>
      </header>

      <div className="content">
          {selectedPage === "home" && (
            <aside className="sidebar">
              <>
                <div className="profile-card">
                  <div className="profile-top">
                    <img
                      src="https://github.com/GursavakhJhutty.png"
                      alt="Profile"
                      className="profile-img-inline"
                    />
                    <div className="profile-info-inline">
                      <h2>Gursavakh Jhutty</h2>
                      <p className="profile-meta-line">Ogden, Utah</p>
                      <p className="profile-meta-line">Pursuing a Ph.D in Data Science</p>
                    </div>
                  </div>

                  <p className="profile-title">Software Developer & Creative Technologist</p>

                  <div className="profile-meta">
                    <p>Focus: Full-Stack Dev, AI, Blockchain, Automation</p>
                  </div>

                  <div className="profile-links">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">📄 Resume</a>
                    <a href="https://github.com/GursavakhJhutty" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
                  </div>

                  <button className="connect-btn">Connect</button>
                </div>

                <div className="skills-card">
                  <h2>Skills</h2>
                  {skillGroups.map((group, index) => (
                    <details key={index} className="skill-group">
                      <summary>{group.category}</summary>
                      <div className="skills-grid">
                        {group.skills.map(skill => (
                          <span key={skill} className="skill-badge">{skill}</span>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </>
            </aside>
          )}

        <main className="main-content">
          {selectedPage === "home" && (
            <>
              <section id="about" className="section">
                <h2>You're here so I might as well tell you.</h2>
                <p>
                  I’m a developer who builds with purpose. Whether it's a trading algorithm that interacts with live forex markets, a TTRPG character engine built from scratch, or a full-stack AI-enhanced dashboard, every project I create is rooted in curiosity and a desire to push the boundaries of what I can do with software.
                </p>

                <p>
                  My core expertise lies in Java, JavaScript, and backend system design. I’ve engineered full-stack web applications, integrated real-time APIs, deployed machine learning models into live trading platforms, and even worked with decentralized technologies like IPFS and Solidity. I value clarity, resilience, and craftsmanship in code... and I’m constantly leveling up.
                </p>

                <p>
                  I graduated with a Computer Science degree and a habit of never settling. I'm deeply motivated by tough problems, underserved communities, and overlooked opportunities. Whether it’s simplifying RPG mechanics for online gameplay, automating data pipelines, or exploring sustainable energy with thorium-based proposals.
                </p>

                <p>
                  Right now, I’m focused on building software that feels responsive, intentional, and empowering, the kinda tools that people *want* to use. I’m especially interested in collaborative tech, AI-assisted workflows, and turning solo side projects into products that actually ship.
                </p>
              </section>

              <section id="portfolio" className="section">
                <h2>Projects</h2>
                <div className="tabs">
                  <button
                    className={activeTab === "featured" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("featured")}
                  >
                    Featured
                  </button>
                  <button
                    className={activeTab === "all" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("all")}
                  >
                    All Projects
                  </button>
                </div>

                <div className="projects-grid">
                  {(activeTab === "featured" ? featuredRepos : allRepos).map((repo) => (
                    <motion.div
                      key={repo.id}
                      layout
                      drag
                      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      whileTap={{ scale: 1.05 }}
                      className="featured-card"
                    >
                      <h3>{repo.name}</h3>
                      <p className="description">{repo.description || "No description provided."}</p>

                      {repo.topics?.length > 0 && (
                        <div className="topics">
                          {repo.topics.map((topic) => (
                            <span key={topic} className="topic-badge">{topic}</span>
                          ))}
                        </div>
                      )}

                      <div className="meta">
                        <span>Language: {repo.language || "N/A"}</span>
                        <span>Stars: {repo.stargazers_count}</span>
                        <span>Forks: {repo.forks_count}</span>
                        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>

                      <div className="links">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                        {repo.homepage && (
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Live Demo</a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {selectedPage === "experience" && (
            <div className="experience-layout">
              <aside className="experience-graph">
                <div className="income-terminal-graph">
                  <pre>
          {`
              |
          2023|          ●────── $3k/mo (Freelance)
          2021|                  ●────── $9k/mo (Landslide)
          2020|    ●────── $1.5k/mo (Retail + Side Dev)
          2019| ●────── $800/mo (Campus Job)
              |
              └────────────────────────────────────────▶
                 ↑       ↑       ↑      ↑
                Low     Mod     High   Elite
          `}
                  </pre>
                </div>
              </aside>


            <section id="experience" className="section">
              <h2>Experience</h2>
              <div className="timeline">
                <div className="timeline-item">
                  <h3 className="job-title">Freelance Software Developer</h3>
                  <p className="company-date">Remote · 2023 – Present</p>
                  <ul className="job-details">
                    <li>Built full-stack applications in React, Node, and Express with MongoDB and MySQL backends.</li>
                    <li>Developed custom AI-powered dashboards and TTRPG tools used by live player groups.</li>
                    <li>Designed REST APIs and integrated third-party services like Gemini and MetaTrader 5.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h3 className="job-title"> Data Scientist – Landslide Political</h3>
                  <p className="company-date">Salt Lake City, UT · 2021 – 2023 </p>
                  <ul className="job-details">
                    <li>Managed 50+ data analysts during peak campaign cycles using automated systems.</li>
                    <li>Developed internal tooling to reduce misprints and optimize signature reading and handling.</li>
                    <li>Balanced logistics, stakeholder service, and data insight choices during high-pressure seasons.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h3 className="job-title"> Blockchain Engineer – DAOMiner via Binance</h3>
                  <p className="company-date">Remote · 2020 – 2021 </p>
                  <ul className="job-details">
                    <li>Designed and developed blockchain infrastructure, wrote and optimized smart contracts for production.</li>
                    <li>Collaborated with team leads to implement decentralized solutions to external crypto opportunities.</li>
                    <li>Worked with research teams to find and reach out to external crypto brands to onload them to our platform.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h3 className="job-title"> Sales Representative - BM Sales Consultants</h3>
                  <p className="company-date">Atlanta, GA · 2019 - 2020</p>
                  <ul className="job-details">
                    <li>Managed and added 653 new users for our client during my time at BM.</li>
                    <li>These additional clients generated $211,000 in revenue per year for the forseeable future.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          )}

          {selectedPage === "education" && (
            <section id="education" className="section education-section">
              <h2 className="education-title">Education</h2>

              <ul className="education-list">
                {/* Massey University */}
                <li className="education-item">
                  <h4 className="school-name">Massey University, M.S. in Information Science with Research track to Ph.D (Current) (2025)</h4>
                  <h3 className="classes-title">First Semester Classes:</h3>
                  <ul className="classes-list multi-column">
                    <li className="class-item">Studies in Parallel and Distributed Systems</li>
                    <li className="class-item">Studies in Operating Systems and Architecture</li>
                    <li className="class-item">Studies in Intelligent Systems</li>
                    <li className="class-item">Multivariate Analysis for Big Data</li>
                    <li className="class-item">Practical Data Mining</li>
                    <li className="class-item">Advanced Machine Learning</li>
                  </ul>
                </li>
                {/* WGU */}
                <li className="education-item">
                  <h4 className="school-name">Western Governors University, B.S. in Computer Science (2025)</h4>
                  <h3 className="classes-title">Classes Taken:</h3>
                  <ul className="classes-list multi-column">
                    {/* General Education */}
                    <li className="class-item">Ethics in Technology</li>
                    <li className="class-item">Natural Science Lab</li>
                    <li className="class-item">Introduction to Systems Thinking and Applications</li>

                    {/* Mathematics & Statistics */}
                    <li className="class-item">Applied Probability and Statistics</li>
                    <li className="class-item">Calculus I</li>
                    <li className="class-item">Discrete Mathematics I</li>
                    <li className="class-item">Discrete Mathematics II</li>

                    {/* Data & Databases */}
                    <li className="class-item">Data Management - Foundations</li>
                    <li className="class-item">Data Management - Applications</li>

                    {/* Operating Systems & IT Foundations */}
                    <li className="class-item">Operating Systems</li>
                    <li className="class-item">Operating Systems for Computer Scientists</li>
                    <li className="class-item">Linux Foundations</li>
                    <li className="class-item">Information Technology Management</li>
                    <li className="class-item">Network and Security - Foundations</li>
                    <li className="class-item">Fundamentals of Information Security</li>
                    <li className="class-item">Secure Systems Analysis & Design</li>

                    {/* Programming & Software Engineering */}
                    <li className="class-item">Scripting and Programming - Foundations</li>
                    <li className="class-item">Scripting and Programming - Applications</li>
                    <li className="class-item">Web Development Foundations</li>
                    <li className="class-item">Web Development</li>
                    <li className="class-item">Java Fundamentals</li>
                    <li className="class-item">Java Frameworks</li>
                    <li className="class-item">Back-End Programming</li>
                    <li className="class-item">Advanced Java</li>
                    <li className="class-item">Software Design and Quality Assurance</li>
                    <li className="class-item">Software Engineering</li>
                    <li className="class-item">Full Stack Engineering</li>
                    <li className="class-item">Version Control</li>

                    {/* Computer Science Core */}
                    <li className="class-item">Introduction to Computer Science</li>
                    <li className="class-item">Computer Architecture</li>
                    <li className="class-item">Data Structures and Algorithms I</li>
                    <li className="class-item">Data Structures and Algorithms II</li>
                    <li className="class-item">Computer Science Project Development with a Team</li>

                    {/* Artificial Intelligence & Advanced Topics */}
                    <li className="class-item">Introduction to AI for Computer Scientists</li>
                    <li className="class-item">Artificial Intelligence Optimization for Computer Scientists</li>
                    <li className="class-item">Advanced AI and ML</li>
                    <li className="class-item">Practical Applications of Prompt</li>

                    {/* Business & IT Management */}
                    <li className="class-item">Business of IT</li>
                    <li className="class-item">Business of IT - Applications</li>
                  </ul>
                </li>
                {/* Yandex Data Science Fellowship */}
                <li className="education-item">
                  <h4 className="school-name">Yandex Data School, Data Science Fellow (2023)</h4>
                  <h3 className="classes-title">Classes Taken:</h3>
                  <ul className="classes-list multi-column">
                    {/* First Semester */}
                    <li className="class-item">Algorithms and Data Structures</li>
                    <li className="class-item">Probability Theory (Half-Semester)</li>
                    <li className="class-item">Linear Algebra or Discrete Mathematics (Half-Semester)</li>
                    <li className="class-item">Programming in Python</li>

                    {/* Second Semester */}
                    <li className="class-item">Machine Learning, Part 1</li>
                    <li className="class-item">Fundamentals of Statistics in Machine Learning</li>

                    {/* Third Semester */}
                    <li className="class-item">Machine Learning, Part 2</li>
                    <li className="class-item">Natural Language Processing</li>
                    <li className="class-item">Computer Vision</li>

                    {/* Fourth Semester */}
                    <li className="class-item">Deep Learning</li>
                    <li className="class-item">Reinforcement Learning</li>
                    <li className="class-item">Self-Driving Cars</li>
                    <li className="class-item">Information Retrieval</li>
                  </ul>
                </li>
                {/* Southern Utah University */}
                <li className="education-item">
                  <h4 className="school-name">Southern Utah University, B.A. in Political Science (2021)</h4>
                  <h3 className="classes-title">Classes Taken:</h3>
                  <ul className="classes-list multi-column">
                    <li className="class-item">POLS 2100 – Introduction to International Relations</li>
                    <li className="class-item">POLS 2200 – Introduction to Comparative Politics</li>
                    <li className="class-item">POLS 3010 – Current Political Issues</li>
                    <li className="class-item">POLS 3100 – Parties, Elections, and Voting Behavior</li>
                    <li className="class-item">POLS 3410 – Public Administration</li>
                    <li className="class-item">POLS 3440 – Introduction to the Middle East</li>
                    <li className="class-item">POLS 3500 – Identity Politics</li>
                    <li className="class-item">POLS 3620 – National Security Policy</li>
                    <li className="class-item">POLS 3670 – Comparative Public Policy</li>
                    <li className="class-item">POLS 4300 – Special Topics in World Affairs</li>
                    <li className="class-item">POLS 4330 – Special Topics in Comparative Politics</li>
                    <li className="class-item">POLS 4600 – Theories of International Relations</li>
                    <li className="class-item">POLS 4610 – International Law and Organization</li>
                    <li className="class-item">POLS 4660 – American Foreign Policy</li>
                    <li className="class-item">POLS 4700 – International Conflict</li>
                  </ul>
                </li>
              </ul>
            </section>
          )}

          {selectedPage === "contact" && (
            <section id="contact" className="section">
              <h2>Contact</h2>
              <h3>Email: <a href="mailto:Gursavakh@proton.me">Gursavakh@proton.me</a></h3>
              <h3>Linkedin: <a href="https://www.linkedin.com/in/gursavakh-jhutty-432591255/">Linkedin</a></h3>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
