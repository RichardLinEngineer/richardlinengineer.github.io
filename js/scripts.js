fetch("/nav.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    initNavbar();
  })
  .catch(error => console.log("Error loading navbar:", error));

fetch("/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => console.log("Error loading footer:", error));


let translations = {};
let currentLang = "en";

fetch("/js/lang.json")
  .then(response => response.json())
  .then(data => {
    translations = data;
    const savedLang = localStorage.getItem("siteLang");
    if(savedLang && ["en", "zh"].includes(savedLang)){
      currentLang = savedLang;
    }else{
      const  browserLang = (navigator.language || "en").toLowerCase();
      currentLang = browserLang.startsWith("zh") ? "zh" : "en";
    }
    setLanguage(currentLang);
  })
  .catch(error  => console.log("Error loading translations:", error));

function setLanguage(lang){
  if(!translations || !translations[lang]){
    return;
  }
  currentLang = lang;
  const translatableElements = document.querySelectorAll("[data-key]");
  translatableElements.forEach(el =>{
    const key = el.dataset.key;
    if(translations[currentLang] && translations[currentLang][key]){
      el.textContent = translations[currentLang][key];
    }
  });
  localStorage.setItem("siteLang", currentLang);
  updateLanguageDropdown();
}

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

function initNavbar(){
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuOverlay = document.querySelector(".menu-overlay");

  if(menuToggle && navLinks && menuOverlay){
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuOverlay.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if(icon){
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    menuOverlay.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuOverlay.classList.remove("active");

      const icon = menuToggle.querySelector("i");
      if(icon){
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  }

  const languageToggleBtn = document.querySelector(".language-toggle-btn");
  const languageDropdown = document.querySelector(".language-dropdown");
  if(languageToggleBtn && languageDropdown){
    languageToggleBtn.addEventListener("click", (e) =>{
      e.stopPropagation();
      languageDropdown.classList.toggle("active");
      languageToggleBtn.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if(!languageToggleBtn.contains(e.target) && !languageDropdown.contains(e.target)){
        languageDropdown.classList.remove("active");
        languageToggleBtn.classList.remove("active");
      }
    });
  }

  const langOptions = document.querySelectorAll(".lang-option")
  langOptions.forEach(option => {
    option.addEventListener("click", () => {
      const selectedLang = option.dataset.lang;
      if(selectedLang !== currentLang){
        setLanguage(selectedLang);
      }
      if(languageDropdown){
        languageDropdown.classList.remove("active");
      }
      if(languageDropdown){
        languageToggleBtn.classList.remove("active");
      }
    });
  });
}