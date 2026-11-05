# AWS Student Builder Challenge — Project Submission

> **Before publishing:** replace every `[TODO]` item, capture the two AWS console screenshots below, and verify the live Amplify URL. This draft deliberately does not claim an AWS deployment that has not been completed.

## Project: A portfolio that responds to curiosity

**Live portfolio:** [TODO: AWS Amplify URL]  
**Source code:** https://github.com/szuryuu/my-personal-website

This project is a Hugo portfolio for Shafwan Ilham Dzaky, an Informatics student and DevOps-focused engineer based in Yogyakarta, Indonesia. It presents the work, skills, career timeline, and certifications behind my interest in automated infrastructure, reliable delivery, and cloud-native systems.

The site keeps the experience deliberately lightweight: Hugo generates static HTML, CSS, JavaScript, and assets; visitors do not need an account, and the page works without a backend runtime.

## Creative feature: a portfolio that reacts to exploration

Instead of treating the portfolio as a static résumé, I made it react to what visitors explore:

- Hovering my identity, a selected project, or a timeline item opens an organic image-bloom reveal in the pinned skills panel.
- The Certifications page supports filtering by specialty and year. Hovering a credential follows the cursor with its certificate preview, rotating through a fixed sequence of 23 distinct reveal animations.
- The main page also includes a live dual-timezone clock for Yogyakarta and the visitor's local time.

This reflects how I work as an engineer: explore the system, make relationships visible, and keep the underlying implementation small and dependable. The feature is implemented with native browser APIs and vanilla JavaScript—no animation framework or server is required.

## Portfolio content

The site includes the challenge's required portfolio sections:

- **About Me:** my DevOps focus, location, cloud-native interests, and experience.
- **Skills / Tech Superpowers:** infrastructure, delivery, reliability, and build skills including Terraform, Kubernetes, GitHub Actions, Prometheus, Go, and Linux.
- **Projects / Achievements:** selected infrastructure, DevOps, AI, and developer-tooling projects, plus a career timeline and certifications.

## AWS deployment plan

### AWS service to use: AWS Amplify Hosting

AWS Amplify Hosting will build and publish this Hugo static site from the GitHub repository. `amplify.yml` defines the Hugo production build and `public` output directory. Amplify provides the managed hosting, HTTPS endpoint, and CDN-backed delivery needed to keep the portfolio publicly available during the judging window.

| Setting | Value |
| --- | --- |
| Repository | `szuryuu/my-personal-website` |
| Framework | Hugo (extended) |
| Build command | `hugo --gc --minify` |
| Publish directory | `public` |
| Build artifact | Static HTML, CSS, JavaScript, fonts, certificates, and images |
| Live URL | [TODO: paste Amplify default or custom-domain URL] |

### Deployment steps

1. In AWS Amplify, choose **New app → Host web app** and connect GitHub.
2. Select `szuryuu/my-personal-website` and the submission branch.
3. Confirm the Hugo build command is `hugo --gc --minify` and the publish directory is `public`.
4. Deploy, open the generated HTTPS URL, and test the repository link, project links, certification filters, hover reveals, and mobile layout.
5. Copy the final URL above and keep the app active through the judging window.

## Screenshots to attach to the hackathon project

| Screenshot | What it must show | File |
| --- | --- | --- |
| Portfolio home | About Me, Skills, and Selected Work | `docs/screenshots/portfolio-home.png` — recapture from the live URL before submission |
| Creative feature | A hover bloom reveal in action | `docs/screenshots/creative-feature.png` — recapture from the live URL before submission |
| AWS Amplify app | Amplify app overview with the deployed URL and successful status | `[TODO: screenshots/amplify-overview.png]` |
| AWS Amplify build | Build history/log showing a successful Hugo deployment | `[TODO: screenshots/amplify-build.png]` |

## Lessons learned

- A portfolio can be memorable without a large framework: Hugo and native browser APIs were enough for responsive layouts, filtering, clocks, and animated reveals.
- Static-site deployment keeps the architecture easy to understand and operate. The deployment has a single generated output directory, which makes it a good fit for managed static hosting.
- Interaction should reward curiosity, not block navigation. The core portfolio content remains readable while the reveals add a second layer for visitors who explore.
- Shipping is part of the project. A working public URL, build logs, screenshots, and concise documentation make the technical work easier for others to evaluate.

## Challenges encountered

- **Making interactions expressive without slowing the site down.** I used CSS transforms, clip paths, and small vanilla-JavaScript event handlers instead of a client-side framework.
- **Keeping the portfolio usable across screen sizes.** The desktop view uses a sticky two-column layout, while narrow screens collapse to a single column.
- **Creating variety without randomness.** The certificate preview cycles through a fixed set of 23 effects so every credential gets a distinct reveal and the behavior stays repeatable.
- **Preparing a production deployment.** The final submission requires confirming the Amplify build settings, testing the public URL, and capturing AWS evidence after deployment.

## Final submission checklist

- [ ] Replace the live URL with the AWS Amplify URL.
- [ ] Capture and attach all four screenshots above.
- [ ] Confirm the GitHub, project, certificate, and navigation links work from the public site.
- [ ] Verify the creative feature has a visible, unobtrusive discovery hint on the live site.
- [ ] Keep the Amplify app deployed and accessible for the full judging window.
- [ ] Confirm personal eligibility, the one-entry limit, and originality with the challenge organizer.
