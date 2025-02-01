'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      console.log(pages[i].dataset.page)
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        console.log(navigationLinks[i])
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('./assets/js/data.json')
    .then(response => response.json())
    .then(data => {
      // Update the DOM with the data
      document.getElementById('name').textContent = data.name;
      document.getElementById('title').textContent = data.title;
      document.getElementById('email').textContent = data.email;
      document.getElementById('email').href = `mailto:${data.email}`;
      document.getElementById('phone').textContent = data.phone;
      document.getElementById('phone').href = `tel:${data.phone}`;
      document.getElementById('location').textContent = data.location;

      populateSocialLinks(data.socialLinks);

      document.getElementById('about-intro').textContent = data.about.intro;
      document.getElementById('about-details').textContent = data.about.details;

      populateServices(data.services);

      populateTestimonials(data.testimonials)

      populateEducation(data.education);

      populateExperience(data.experience);

      populateSkills(data.skills);

      populateClients(data.clients);

      populateAchievements(data.achievements);

    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
    });
  setupModalActions();

});

function populateSocialLinks(socialLinks) {
  const socialList = document.querySelector(".social-list");
  socialList.innerHTML = Object.entries(socialLinks)
    .map(([platform, url]) => `
      <li class="social-item">
        <a href="${url}" class="social-link">
          <ion-icon name="logo-${platform}"></ion-icon>
        </a>
      </li>
    `)
    .join("");
}

function populateServices(services) {
  const servicesContainer = document.querySelector(".service-list");
  servicesContainer.innerHTML = services.map(service => `
    <li class="service-item">
      <div class="service-icon-box">
        <img src="${service.icon}" alt="${service.title}" width="40">
      </div>
      <div class="service-content-box">
        <h4 class="h4 service-item-title">${service.title}</h4>
        <p class="service-item-text">${service.description}</p>
      </div>
    </li>
  `).join("");
}

function populateEducation(education) {
  const educationContainer = document.getElementById("education-list");
  if (!educationContainer) return;

  educationContainer.innerHTML = education.map(edu => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${edu.institution}</h4>
      <span>${edu.years}</span>
      <p class="timeline-text">${edu.degree}</p>
    </li>
  `).join("");
}

function populateExperience(experience) {
  const experienceContainer = document.getElementById("experience-list");
  if (!experienceContainer) return;

  experienceContainer.innerHTML = experience.map(exp => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${exp.position}</h4>
      <span>${exp.years}</span>
      <p class="timeline-text">${exp.description}</p>
    </li>
  `).join("");
}

function populateSkills(skills) {
  const skillsContainer = document.querySelector(".skills-list");
  skillsContainer.innerHTML = skills.map(skill => `
    <li class="skills-item">
      <div class="title-wrapper">
        <h5 class="h5">${skill.name}</h5>
        <data value="${skill.level}">${skill.level}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
      </div>
    </li>
  `).join("");
}



function populateTestimonials(testimonials) {
  const container = document.getElementById("testimonials-container");
  if (!container) {
    console.error("Container with ID 'testimonials-container' not found!");
    return;
  }

  container.innerHTML = ""; // Clear previous content

  testimonials.forEach((testimonial, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("testimonials-item");
    listItem.dataset.index = index;

    listItem.innerHTML = `
      <div class="content-card">
        <figure class="testimonials-avatar-box">
          <img src="${testimonial.image}" alt="${testimonial.name}" width="60"  height="70" data-testimonials-avatar>
        </figure>
        <h4 class="h4 testimonials-item-title" data-testimonials-title>${testimonial.name}</h4>
        <div class="testimonials-text" data-testimonials-text>
          <img src="${testimonial.quoteIcon}" alt="Quote Icon" width="20">
          <p>${testimonial.review}</p>
        </div>
      </div>
    `;

    listItem.addEventListener("click", () => openModal(testimonial));
    container.appendChild(listItem);
  });
}

function setupModalActions() {
  const modal = document.querySelector(".modal-container");
  const closeButton = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active"); // Ensure overlay is hidden
  }

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

function openModal(testimonial) {
  const modal = document.querySelector(".modal-container");
  const overlay = document.querySelector("[data-overlay]");

  document.querySelector("[data-modal-img]").src = testimonial.image;
  document.querySelector("[data-modal-title]").textContent = testimonial.name;
  document.querySelector("[data-modal-text] p").textContent = testimonial.review;

  modal.classList.add("active");
  overlay.classList.add("active"); // Ensure overlay is visible
}


function populateClients(clients) {
  const clientsContainer = document.querySelector(".clients-list");
  clientsContainer.innerHTML = clients
    .map(client => `
      <li class="clients-item">
        <a href="${client.reference}"><img src="${client.logo}"  alt="${client.company_name}"></a>
      </li>
    `)
    .join("");
}

function populateAchievements(achievements) {
  const achievementsContainer = document.querySelector(".achievements-list");
  achievementsContainer.innerHTML = achievements
    .map(achievement => `  
      <li class="achievements-item">
       <div class="achievements-icon-box">
         <img src="${achievement.image}" alt="${achievement.title}" width="60">
      </div>
      <div class="achievements-content-box">
        <h4 class="h4 achievements-item-title">${achievement.title}</h4>
        <p class="achievements-item-text">
        ${achievement.description}
        </p>
        </div>
      </li>  
    `)
    .join("");
}
