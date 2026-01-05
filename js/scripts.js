fetch("/nav.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch(error => console.log("Error loading navbar:", error));

fetch("/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => console.log("Error loading footer:", error));

  // =====================
// Load Navbar and Footer
// =====================
fetch("/nav.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    initNavbar(); // initialize menu toggle inside the loaded navbar
  })
  .catch(error => console.log("Error loading navbar:", error));

fetch("/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => console.log("Error loading footer:", error));

// =====================
// Load Translations JSON
// =====================
let translations = {};   // global object to store JSON
let currentLang = 'en';  // default language

fetch("/js/lang.json")
  .then(response => response.json())
  .then(data => {
    translations = data;
    setLanguage(currentLang); // set initial language
  })
  .catch(error => console.log("Error loading translations:", error));

// =====================
// Set Language Function
// =====================
function setLanguage(lang) {
  currentLang = lang;
  if(!translations[lang]) return;

  const data = translations[lang];

  Object.keys(data).forEach(key => {
    const el = document.getElementById(key);
    if(el) el.innerHTML = data[key];
  });

  updateLanguageDropdown();
}

// =====================
// Update Dropdown UI
// =====================
function updateLanguageDropdown() {
  const langOptions = document.querySelectorAll('.lang-option');
  if(!langOptions) return;

  langOptions.forEach(opt => {
    const checkIcon = opt.querySelector('i');
    if(opt.getAttribute('data-lang') === currentLang){
      opt.classList.add('active-lang');
      if(checkIcon) checkIcon.style.visibility = 'visible';
    } else {
      opt.classList.remove('active-lang');
      if(checkIcon) checkIcon.style.visibility = 'hidden';
    }
  });
}

// =====================
// Initialize Navbar (menu toggle & language dropdown)
// =====================
function initNavbar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-overlay');

  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', function(){
      navLinks.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      const icon = this.querySelector('i');
      if(icon){
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function(){
      navLinks.classList.remove('active');
      menuOverlay.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if(icon){
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', function(){
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if(icon){
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Language Dropdown
  const languageToggleBtn = document.querySelector('.language-toggle-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  const langOptions = document.querySelectorAll('.lang-option');

  if(languageToggleBtn && languageDropdown && langOptions.length > 0){
    // Open/close dropdown
    languageToggleBtn.addEventListener('click', function(e){
      e.stopPropagation();
      languageDropdown.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e){
      if(!languageToggleBtn.contains(e.target) && !languageDropdown.contains(e.target)){
        languageDropdown.classList.remove('active');
        languageToggleBtn.classList.remove('active');
      }
    });

    // Handle language selection
    langOptions.forEach(option => {
      option.addEventListener('click', function(){
        const selectedLang = this.getAttribute('data-lang');
        if(selectedLang && selectedLang !== currentLang){
          setLanguage(selectedLang);
        }
        languageDropdown.classList.remove('active');
        languageToggleBtn.classList.remove('active');
      });
    });
  }
}