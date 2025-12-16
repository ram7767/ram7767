// ==================== SCRIPT.JS ====================
// Save this entire file as: script.js

// Load portfolio data from data.json
async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

// Apply theme
function applyTheme(theme) {
  const root = document.documentElement;

  // Map the theme properties from your JSON to the CSS variables
  root.style.setProperty('--primary-color', theme.accentPurple);
  root.style.setProperty('--secondary-color', theme.accentLightPurple);
  root.style.setProperty('--accent-color', theme.highlight);
  root.style.setProperty('--text-color', theme.textPrimary);
  root.style.setProperty('--text-light', theme.textSecondary);
  root.style.setProperty('--bg-light', theme.secondaryBg);
  root.style.setProperty('--bg-white', theme.cardBg);
  root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.accentPurple} 0%, ${theme.accentLightPurple} 100%)`);
  root.style.setProperty('--gradient-skill', `linear-gradient(90deg, ${theme.accentPurple}, ${theme.accentLightPurple})`);
}

// Load portfolio content
function loadPortfolio(data) {
  // Apply theme
  applyTheme(data.theme);

  // Set short name in tab title
  document.title = data.shortName || data.name || 'Portfolio';

  // Update favicon if provided in data
  if (data.favicon) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = data.favicon;
    } else {
      // Create favicon link if it doesn't exist
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.type = 'image/x-icon';
      newFavicon.href = data.favicon;
      document.head.appendChild(newFavicon);
    }
  }

  // Update resume button functionality with resume file from data
  const resumeBtn = document.getElementById('resume-btn');
  const resumeBtnMobile = document.getElementById('resume-btn-mobile');

  if (data.resumeFile) {
    const downloadResume = function(e) {
      e.preventDefault();
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = data.resumeFile;
      link.download = 'Resume-' + (data.name || 'User') + '.pdf';
      link.target = '_blank'; // Open in new tab to allow download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (resumeBtn) {
      resumeBtn.onclick = downloadResume;
    }

    if (resumeBtnMobile) {
      resumeBtnMobile.onclick = downloadResume;
    }
  }

  // Load personal info
  document.getElementById('short-name-text').textContent = data.shortName;
  document.getElementById('hero-name').textContent = data.name;
  document.getElementById('hero-title').textContent = data.title;
  document.getElementById('hero-bio').textContent = data.tagline;
  document.getElementById('hero-img').src = data.profilePic;

  // Load stats
  if (data.stats) {
    document.getElementById('app-launches').textContent = data.stats.appLaunches;
    document.getElementById('performance-improvement').textContent = data.stats.performanceImprovement;
    document.getElementById('bug-reduction').textContent = data.stats.bugReduction;
    document.getElementById('user-satisfaction').textContent = data.stats.userSatisfaction;
  }

  // Load about
  document.getElementById('about-title').textContent = "About Me";
  document.getElementById('about-desc').textContent = data.about.intro;
  document.getElementById('about-passion').textContent = data.about.details;

  // Load skills
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = '';
  data.skills.forEach((skill, index) => {
    const colorClass = `color-${(index % 9) + 1}`; // 9 different colors
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-tagline ${colorClass}">${skill.tagline || ''}</div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%" data-width="${skill.level}"></div>
            </div>
        `;
    skillsContainer.appendChild(skillItem);
  });

  // Load projects (using testimonials as projects)
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  data.testimonials.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.name}" class="project-image">
            <div class="project-content">
                <h3>${project.name}</h3>
                <p>${project.review}</p>
                <div class="tech-tags">
                    <span class="tech-tag">${project.role}</span>
                </div>
                <div class="project-links">
                    <a href="${project.appLink}" target="_blank">View Project →</a>
                </div>
            </div>
        `;
    projectsContainer.appendChild(projectCard);
  });

  // Load experience
  const experienceContainer = document.getElementById('experience-container');
  experienceContainer.innerHTML = '';
  data.experience.forEach(exp => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
            <h3>${exp.position}</h3>
            <div class="subtitle">${exp.subtitle || ''}</div>
            <div class="company">${exp.company}</div>
            <div class="date">${exp.years}</div>
            <p>${exp.description}</p>
        `;
    experienceContainer.appendChild(timelineItem);
  });

  // Load clients section
  const clientsContainer = document.getElementById('clients-container');
  if (clientsContainer && data.clients) {
    clientsContainer.innerHTML = '';
    data.clients.forEach(client => {
      const clientItem = document.createElement('div');
      clientItem.className = 'client-item';
      clientItem.innerHTML = `
        <img src="${client.logo}" alt="${client.company_name}" class="client-logo" title="${client.company_name}">
      `;
      clientsContainer.appendChild(clientItem);
    });
  }

  // Load contact info
  const contactInfo = document.getElementById('contact-info');
  contactInfo.innerHTML = '';
  const contactItems = [
    { icon: '📧', label: 'Email', value: data.email },
    { icon: '📍', label: 'Location', value: data.location }
  ];
  contactItems.forEach(item => {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    contactItem.innerHTML = `
            <div class="contact-icon">${item.icon}</div>
            <div>
                <strong>${item.label}</strong><br>
                ${item.value}
            </div>
        `;
    contactInfo.appendChild(contactItem);
  });

  // Load social links
  const socialLinks = document.getElementById('social-links');
  socialLinks.innerHTML = '';
  Object.keys(data.socialLinks).forEach(platform => {
    const link = data.socialLinks[platform];
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';

    // Determine icon based on platform
    let iconClass = '';
    switch(platform.toLowerCase()) {
      case 'github':
        iconClass = 'fab fa-github';
        break;
      case 'linkedin':
        iconClass = 'fab fa-linkedin';
        break;
      case 'facebook':
        iconClass = 'fab fa-facebook';
        break;
      case 'twitter':
        iconClass = 'fab fa-twitter';
        break;
      case 'instagram':
        iconClass = 'fab fa-instagram';
        break;
      case 'dribbble':
        iconClass = 'fab fa-dribbble';
        break;
      case 'behance':
        iconClass = 'fab fa-behance';
        break;
      case 'youtube':
        iconClass = 'fab fa-youtube';
        break;
      default:
        iconClass = 'fas fa-link'; // generic link icon
    }

    a.innerHTML = `<i class="${iconClass}"></i>`;
    a.title = platform.charAt(0).toUpperCase() + platform.slice(1); // Show platform name on hover
    socialLinks.appendChild(a);
  });

  // Footer text
  document.getElementById('footer-text').textContent =
    `© 2024 ${data.name}. All rights reserved.`;

  // Animate skill bars after loading
  setTimeout(() => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }, 500);
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      e.target.reset();
    });
  }

  // Resume button functionality
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // The resume link will be updated after data is loaded
    });
  }

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const resumeBtnMobile = document.getElementById('resume-btn-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Mobile resume button functionality will be handled in the main resume function below
});

// Skill bar animation on scroll
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
    }
  });
}, observerOptions);

// Initialize
async function init() {
  const data = await loadData();
  if (data) {
    loadPortfolio(data);

    // Observe skill bars after loading
    setTimeout(() => {
      document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
      });
    }, 100);
  }
}

// Start the app
init();