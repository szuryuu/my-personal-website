# Szuryuu

Personal portfolio site for Shafwan Ilham Dzaky. A Hugo static site with a two-column sticky layout, selected work, career timeline, and filterable certifications.

## Features

- **Two-column sticky layout**  
  Identity, skills, and contact stay pinned while the bio and work list scroll. The layout collapses to one column on narrow viewports.
- **Live dual-timezone clock**  
  Displays Yogyakarta and visitor local time without a server runtime.
- **Selected work and timeline**  
  A curated portfolio list and interactive career timeline, powered by local Hugo data.
- **Filterable certifications**  
  Filter credentials by specialty and year; certificate previews use a cycle of 23 image-reveal hover effects.

## Tech Stack

| Category | Technologies |
| :-- | :-- |
| **Framework** | Hugo (extended) |
| **Templates** | Go templates |
| **Styling** | CSS custom properties |
| **Interactivity** | Vanilla JavaScript |
| **Deployment** | Static HTML, CSS, JS, and assets |

## Getting Started

### Prerequisites

- [Hugo extended](https://gohugo.io/installation/)
- Git

### Install

```bash
git clone git@github.com:szuryuu/my-personal-website.git
cd my-personal-website
```

### Develop

```bash
hugo server
```

The site is available at `http://localhost:1313`.

### Build

```bash
hugo --gc --minify
```

Hugo writes the production site to `public/`. It is excluded from Git because it is a generated artifact.

## Project Structure

```
.
├── assets/
│   ├── css/main.css                 # Global styles and responsive layout
│   └── js/site.js                   # Clock, tabs, filters, and hover effects
├── content/
│   ├── _index.md                    # Home page metadata
│   └── certifications/_index.md     # Certifications page metadata
├── data/
│   └── portfolio.json               # Projects, timeline, and certification data
├── layouts/
│   ├── _default/baseof.html          # Shared document shell
│   ├── certifications/list.html      # Certifications page
│   └── index.html                    # Portfolio home page
├── static/                           # Icons, certificates, previews, and fonts
├── hugo.toml                         # Hugo configuration
└── README.md
```
