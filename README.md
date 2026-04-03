# Wedding Website Project

This repository contains the front-end codebase and data collection tools for a personalized wedding website. It is built using standard web technologies (HTML, CSS, JS) and is configured for seamless deployment on Netlify.

## 📂 File Structure

Here's an overview of the important files and directories in this project:

```text
d:\Study\self\wedding-web
├── index.html                  # The main entry point for the wedding website.
├── css/                        # Contains stylesheets.
│   └── style.css               # The primary layout and styling rules.
├── js/                         # Contains modular JavaScript files for interactive features.
│   ├── animate.js              # Animations handling (scroll animations, etc).
│   ├── config.js               # General configuration.
│   ├── countdown.js            # Wedding day countdown timer logic.
│   ├── lightbox.js             # Image lightbox popup logic.
│   ├── particles.js            # Particle background effects.
│   ├── player.js               # Background music player logic.
│   ├── slideshow.js            # Image slideshow/carousel logic.
│   └── ui.js                   # UI interaction logic.
├── Images/                     # Directory for all image assets used on the website.
└── netlify.toml                # Configuration file for deployment to Netlify (handles headers, caching, etc).
```

## 🚀 What to Do

### 1. Update Website Content
You need to populate the website with your own details:
* **Text & Details**: Open `index.html` and replace the placeholder text with your actual details.
* **Images**: Place your images (e.g., bride, groom, gallery photos) inside the `Images/` directory. Be sure to compress them and reference them correctly in the HTML or `js/images.js` (if applicable).
* **Music**: Update `js/player.js` or the HTML audio tags with the requested background music.

### 2. Local Development & Testing
Since this is a static site to view it locally, simply open the `index.html` file in your preferred web browser. Alternatively, you can use a local development server like Live Server (VS Code extension) or Python's `http.server` to view it:
```bash
# Using Python
python -m http.server 8000

```
Then navigate to `http://localhost:8000` in your browser.

### 3. Deployment
The project is already configured for deployment on **Netlify** via the `netlify.toml` file.
1. Create a GitHub repository and push your code.
2. Log into Netlify and create a "New site from Git".
3. Select your repository. Netlify will automatically detect the settings and deploy it.
4. Your website will be live!

## 🎨 Customization
* **Styles**: You can edit `css/style.css` to modify the colors and layout. The current theme seems to be "Lavender & blush pink".
* **Interactivity**: You can tweak the JavaScript files in the `js/` folder to modify the behavior of the countdown or the particle background.

