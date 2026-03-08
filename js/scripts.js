// Load Navbar
// Fetch the navbar html and insert it into the page
fetch("/nav.html")
  .then(response => response.text())
  .then(data => {
    // Insert the fetched navbar html into the page
    document.getElementById("navbar").innerHTML = data;

    // Initialize navbar interaction (menu toggle, Language dropdown)
    initNavbar();
  })
  .catch(error => console.log("Error loading navbar:", error));

// Load Footer
// Fetch the footer html and insert it into the page
fetch("/footer.html")
  .then(response => response.text())
  .then(data => {
    // Insert the fetched footer html into the page
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => console.log("Error loading footer:", error));

// Load Translations
// Object to store Language strings from JSON
let translations = {};

// Default Language
let currentLang = "en";

fetch("/js/lang.json")
  .then(response => response.json())
  .then(data => {
    // Store JSON translation data
    translations = data;

    // Check if user previously selected a language
    const savedLang = localStorage.getItem("siteLang");
    if(savedLang && ["en", "zh"].includes(savedLang)){
      currentLang = savedLang;
    }else{
      // Otherwise, detect browser language
      const  browserLang = (navigator.language || "en").toLowerCase();
      currentLang = browserLang.startsWith("zh") ? "zh" : "en";
    }

    // Apply the selected language to the page
    setLanguage(currentLang);
  })
  .catch(error  => console.log("Error loading translations:", error));

// Set Page Language
// Update all elements with "data-key" to the selected language
function setLanguage(lang){
  // Exit if translations are missing
  if(!translations || !translations[lang]){
    return;
  }

  currentLang = lang;

  // Replace text content for all translatable elements
  const translatableElements = document.querySelectorAll("[data-key]");
  translatableElements.forEach(el =>{
    const key = el.dataset.key;
    if(translations[currentLang] && translations[currentLang][key]){
      el.innerHTML = translations[currentLang][key];
    }
  });
  // Remember selected language in LocalStorage
  localStorage.setItem("siteLang", currentLang);

  // Update the visual state of the language dropdown
  updateLanguageDropdown();
}

// Update Language Dropdown
// Highlights the currently active language and shows/hides check icon
function updateLanguageDropdown(){
  const langOptions = document.querySelectorAll(".lang-option");

  langOptions.forEach(option =>{
    const optionLang = option.dataset.lang;
    const checkIcon = option.querySelector("i");

    if(optionLang === currentLang){
      option.classList.add("active-lang");
      if(checkIcon){
        checkIcon.style.visibility = "visible";
      }
    }else{
      option.classList.remove("active-lang");
      if(checkIcon){
        checkIcon.style.visibility = "hidden";
      }
    }
  });
}

// Initialize Navbar Interactions
// Handles hamburger menu, overlay clicks and language dropdown toggling
function initNavbar(){
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuOverlay = document.querySelector(".menu-overlay");

  // Hamburger Menu Toggle
  if(menuToggle && navLinks && menuOverlay){
    menuToggle.addEventListener("click", () => {
      // show/hide menu links
      navLinks.classList.toggle("active");
      // show/hide menu overlay
      menuOverlay.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if(icon){
        // switch hamburger to X
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    // Close menu when overlay is clicked
    menuOverlay.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuOverlay.classList.remove("active");

      const icon = menuToggle.querySelector("i");
      if(icon){
        // reset icon back to hamburger
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  }

  // Language Dropdown Toggle
  const languageToggleBtn = document.querySelector(".language-toggle-btn");
  const languageDropdown = document.querySelector(".language-dropdown");

  if(languageToggleBtn && languageDropdown){
    languageToggleBtn.addEventListener("click", (e) =>{
      e.stopPropagation();
      languageDropdown.classList.toggle("active");
      languageToggleBtn.classList.toggle("active");
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if(!languageToggleBtn.contains(e.target) && !languageDropdown.contains(e.target)){
        languageDropdown.classList.remove("active");
        languageToggleBtn.classList.remove("active");
      }
    });
  }

  // Language Selection
  const langOptions = document.querySelectorAll(".lang-option")
  langOptions.forEach(option => {
    option.addEventListener("click", () => {
      const selectedLang = option.dataset.lang;
      if(selectedLang !== currentLang){
        // Update page language
        setLanguage(selectedLang);
      }

      // Close dropdown after selection
      if(languageDropdown){
        languageDropdown.classList.remove("active");
      }
      if(languageDropdown){
        languageToggleBtn.classList.remove("active");
      }
    });
  });
}