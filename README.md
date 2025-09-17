# Portfolio Website

A modern, responsive Jekyll portfolio site designed for cybersecurity professionals. This site is 100% data-driven through YAML files, allowing you to update content without touching HTML or Liquid templates.

## ⚠️ Important Notice

**This site is personal and proprietary. Do not copy, fork, or reuse without explicit permission.**

## 🎯 Features

- **Dark theme by default** with optional light mode toggle
- **100% data-driven** - all content managed through `_data/*.yml` files
- **Fully responsive** design optimized for all devices
- **Accessibility compliant** with WCAG AA standards
- **SEO optimized** with JSON-LD structured data
- **Print-friendly** stylesheet for PDF export
- **GitHub Pages compatible** - no custom plugins

## 📁 Content Management

All site content is managed through YAML files in the `_data/` directory. Simply edit these files to update your portfolio:

### Core Site Settings (`_data/site.yml`)
```yaml
name: "Your Name"
role: "Your Role"
tagline: "Your tagline"
download_resume_path: "/assets/resume/Resume.pdf"
primary_email: "your@email.com"
```

### Navigation
Update the `nav` section in `_data/site.yml` to add/remove navigation items:
```yaml
nav:
  - label: "About"
    href: "#about"
  - label: "Skills" 
    href: "#skills"
```

### Hero Section (`_data/intro.yml`)
```yaml
name: "Your Name"
title: "Your Title"
tagline: "Your professional tagline"
ctas:
  - label: "Download Resume/CV"
    href: "/assets/resume/Resume.pdf"
    style: "primary"
    download: true
```

### About Section (`_data/about.yml`)
```yaml
summary: |
  Your personal introduction (3-4 lines recommended)
highlights:
  - "Key achievement or skill"
  - "Another important highlight"
```

### Skills (`_data/skills.yml`)
```yaml
filters_enabled: true
categories:
  - name: "Category Name"
    color: "blue"  # blue, green, purple, orange, red
    items: ["Skill1", "Skill2", "Skill3"]
```

### Work Experience (`_data/experience.yml`)
```yaml
items:
  - company: "Company Name"
    role: "Your Role"
    location: "City, State"
    start: "2024-01"  # YYYY-MM format
    end: "Present"    # or YYYY-MM
    bullets:
      - "Achievement or responsibility"
    skills: ["Skill1", "Skill2"]
```

### Projects (`_data/projects.yml`)
```yaml
cards:
  - name: "Project Name"
    blurb: "Brief description"
    tech: ["Tech1", "Tech2"]
    tags: ["Tag1", "Tag2"]
    links:
      - label: "Demo"
        url: "https://example.com"
        icon: "external"
```

## 🎨 Customization

### Theme Colors
Edit CSS custom properties in `assets/css/main.scss`:
```scss
:root {
  --accent-primary: #58a6ff;    // Primary accent color
  --accent-success: #2ea043;    // Success color
  --accent-danger: #f85149;     // Danger color
}
```

### Resume/CV
1. Place your resume PDF in `assets/resume/Resume.pdf`
2. Update the path in `_data/site.yml`:
   ```yaml
   download_resume_path: "/assets/resume/Resume.pdf"
   ```

### Images
- **Hero photo**: Add to `assets/img/hero-photo.jpg` and update `_data/intro.yml`
- **About photo**: Add to `assets/img/about-photo.jpg` and update `_data/about.yml`
- **Project screenshots**: Add to `assets/img/projects/` and reference in `_data/projects.yml`
- **Favicon**: Replace `assets/img/favicon.ico`
- **Social preview**: Replace `assets/img/social-preview.jpg` (1200x630px)

## 🔧 Section Management

Sections automatically hide when their corresponding YAML file is empty or missing data:

- **About**: Requires `summary` in `_data/about.yml`
- **Skills**: Requires `categories` in `_data/skills.yml`
- **Experience**: Requires `items` in `_data/experience.yml`
- **Education**: Requires `items` in `_data/education.yml`
- **Projects**: Requires `cards` in `_data/projects.yml`
- **Organizations**: Requires `items` in `_data/orgs.yml`
- **Volunteer**: Requires `items` in `_data/volunteer.yml`
- **Certificates**: Requires `items` in `_data/certs.yml`
- **Blog**: Requires `external` in `_data/blog.yml`
- **Contact**: Always shown if `_data/contact.yml` exists

## 📱 Responsive Design

The site is optimized for:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

## ♿ Accessibility Features

- **Semantic HTML** with proper landmarks
- **Skip to content** link
- **Focus indicators** for keyboard navigation
- **ARIA labels** and descriptions
- **Color contrast** meets WCAG AA standards
- **Reduced motion** support
- **Screen reader** friendly

## 🖨️ Print Styles

The site includes optimized print styles for clean PDF export:
- Removes interactive elements
- Optimizes layout for single-page printing
- Ensures proper contrast and readability

## 🚀 Performance

- **Lazy loading** for images
- **Optimized fonts** with font-display: swap
- **Minimal JavaScript** for core functionality
- **CSS custom properties** for efficient theming
- **Compressed assets** in production

## 🔍 SEO Features

- **JSON-LD structured data** for Person and WebSite
- **Open Graph** and Twitter Card meta tags
- **Semantic HTML** structure
- **Optimized meta descriptions**
- **Sitemap** generation via jekyll-sitemap

## 🎯 Common Tasks

### Adding a New Project
1. Edit `_data/projects.yml`
2. Add project entry to `cards` array
3. Add project image to `assets/img/projects/` (optional)

### Updating Skills
1. Edit `_data/skills.yml`
2. Add/remove items from category arrays
3. Skills filter will update automatically

### Changing Theme Colors
1. Edit CSS variables in `assets/css/main.scss`
2. Update both light and dark theme values

### Adding Social Links
1. Edit `_data/site.yml`
2. Add entries to `socials` array
3. Supported icons: linkedin, github, twitter, mail, website

## 🐛 Troubleshooting

### YAML Syntax Errors
- Use a YAML validator to check syntax
- Ensure proper indentation (2 spaces)
- Quote strings containing special characters

### Images Not Loading
- Check file paths are correct
- Ensure images are in `assets/img/` directory
- Verify image file extensions match YAML references

### Sections Not Appearing
- Check that required data exists in corresponding YAML file
- Verify YAML syntax is correct
- Ensure section is included in `_data/site.yml` navigation

## 📄 License

This portfolio site is personal and proprietary. **Do not copy, fork, or reuse without explicit permission.**

---

**Need help?** Check the commented examples in each `_data/*.yml` file for guidance on formatting and available options.
