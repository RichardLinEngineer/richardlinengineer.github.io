# Richard Lin - Personal Website

🔗 **Live Site:** [richardlin05.github.io](https://richardlin05.github.io/)

Personal portfolio showcasing my academic background, technical projects, and ways to connect — built from scratch as part of my journey into web development and frontend engineering.

I'm a **Temple University Electrical & Computer Engineering undergraduate**, **IEEE Temple University President**, **IEEE-HKN Secretary**, and **Temple STEPS Ambassador**, interested in **AI, robotics, embedded systems, and sustainable energy**.

## Features
- **Home** — Introduction and biography
- **Projects** — Showcase of technical work
- **Resume** — Academic achievements, skills, and experience
- **Contact** — Connect via email, LinkedIn, GitHub, WeChat, or Line
- **Language Toggle** — Switch between English and Chinese (中文)

## Built With
- **Languages & Markup:** HTML5, CSS3, JavaScript
- **Icons:** [Font Awesome 6](https://fontawesome.com/)
- **Hosting & Deployment:** GitHub Pages
- **Dynamic Elements:**
  - `fetch` API for dynamic navbar and footer loading
  - Custom JavaScript for language translation, navbar interactions, and a responsive mobile menu

## Project Structure
```
richardlinengineer.github.io/
├── css/
│   └── styles.css              # Global styles
├── images/
│   ├── github.svg              # GitHub icon
│   ├── line.jpg                # Line icon
│   ├── linkedin.svg            # LinkedIn icon
│   ├── logo.png                # Site logo
│   ├── richardlin.jpg          # Profile photo
│   └── wechat.jpg              # WeChat icon
├── js/
│   ├── lang.json               # English/Chinese translation strings
│   └── scripts.js              # Navbar, language toggle, mobile menu logic
├── pages/
│   ├── contact.html            # Contact page
│   ├── projects.html           # Projects page
│   └── resume.html             # Resume page
├── partials/
│   ├── nav.html                # Shared navbar loaded dynamically
│   └── footer.html             # Shared footer loaded dynamically
├── resume/
│   ├── Richard_Lin_Resume.pdf  # Downloadable resume
│   └── Richard_Lin_Resume.tex  # LaTeX source
├── .gitignore                  # Git ignored files
├── LICENSE                     # MIT License
├── README.md                   # Project documentation
├── favicon.ico                 # Browser tab icon
└── index.html                  # Entry point / homepage
```

## Getting Started
```bash
git clone https://github.com/richardlin05/richardlin05.github.io.git
```
Open `index.html` in a browser to view locally. Customize content in the HTML files or edit translations in `js/lang.json`.


## Translations
Supports English and Chinese (中文) via `lang.json`. Users can switch languages from the navbar; preference is saved with `localStorage`.

## Contact
- 📧 Email: richard.rich.lin@gmail.com
- ![LinkedIn Logo](/images/linkedin.svg) LinkedIn: [linkedin.com/in/richardlin05](https://www.linkedin.com/in/richardlin05/)
- ![GitHub Logo](/images/github.svg) GitHub: [github.com/richardlin05](https://github.com/richardlin05/)

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.