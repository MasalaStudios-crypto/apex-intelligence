// Language Selector - Dropdown Toggle & Language Switching
document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  const currentLangDisplay = document.getElementById('currentLang');
  const langOptions = document.querySelectorAll('.lang-option');

  // Toggle dropdown on button click
  langToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
    langToggle.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.remove('show');
      langToggle.classList.remove('active');
    }
  });

  // Handle language selection
  langOptions.forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.getAttribute('data-lang');
      
      // Update current language display
      currentLangDisplay.textContent = selectedLang.toUpperCase();
      
      // Remove active class from all options
      langOptions.forEach(opt => opt.classList.remove('active'));
      
      // Add active class to selected option
      this.classList.add('active');
      
      // Call i18n switchLanguage function
      if (window.apexI18n && typeof window.apexI18n.switchLanguage === 'function') {
        window.apexI18n.switchLanguage(selectedLang);
      }
      
      // Close dropdown
      langDropdown.classList.remove('show');
      langToggle.classList.remove('active');
    });
  });

  // Initialize with current language from i18n
  const currentLang = localStorage.getItem('apex_language') || 'en';
  currentLangDisplay.textContent = currentLang.toUpperCase();
  
  // Mark current language as active
  langOptions.forEach(opt => {
    if (opt.getAttribute('data-lang') === currentLang) {
      opt.classList.add('active');
    }
  });
});
