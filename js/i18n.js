// APEX Intelligence - Internationalization Engine
// Supports 6 languages: EN, ES, ZH, DE, AR, FR
// Features: Language switching, RTL support, dynamic content, localStorage persistence

class ApexI18n {
  constructor() {
    this.currentLang = 'en';
    this.translations = {};
    this.supportedLanguages = ['en', 'es', 'zh', 'de', 'ar', 'fr', 'hi', 'bn', 'ur', 'pt-BR', 'ru', 'ja', 'ko', 'id', 'vi', 'tl', 'sw', 'yo', 'ha', 'am', 'it', 'nl', 'tr', 'th', 'fa', 'pa', 'ms', 'pl', 'uk', 'el'];
  // Initialize the i18n system
  async init() {
    // Check for language in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    // Priority: URL param > localStorage > browser language > default (en)
    if (urlLang && this.supportedLanguages.includes(urlLang)) {
      this.currentLang = urlLang;
    } else {
      const storedLang = localStorage.getItem('apex_language');
      if (storedLang && this.supportedLanguages.includes(storedLang)) {
        this.currentLang = storedLang;
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
          this.currentLang = browserLang;
        }
      }
    }

    // Load translations for current language
    await this.loadTranslations(this.currentLang);
    
    // Apply translations to page
    this.applyTranslations();
    
    // Set up language switcher
    this.setupLanguageSwitcher();
    
    // Update HTML lang and dir attributes
    this.updateHtmlAttributes();
  }

  // Load translation file from JSON
  async loadTranslations(lang) {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      this.translations = await response.json();
      return true;
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      // Fallback to English if loading fails
      if (lang !== 'en') {
        return await this.loadTranslations('en');
      }
      return false;
    }
  }

  // Apply translations to all elements with data-i18n attribute
  applyTranslations() {
    // Update meta tags
    if (this.translations.meta) {
      document.title = this.translations.meta.title || document.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && this.translations.meta.description) {
        metaDesc.content = this.translations.meta.description;
      }
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          // Support HTML in translations (e.g., <br> tags)
          element.innerHTML = translation;
        }
      }
    });

    // Update dynamic content (numbers, currency)
    this.updateDynamicContent();
  }

  // Get nested translation by dot notation key
  getTranslation(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], this.translations);
  }

  // Update dynamic content like numbers and currency
  updateDynamicContent() {
    // Format numbers with locale-specific formatting
    document.querySelectorAll('[data-i18n-number]').forEach(element => {
      const number = parseFloat(element.getAttribute('data-i18n-number'));
      element.textContent = this.formatNumber(number);
    });

    // Format currency
    document.querySelectorAll('[data-i18n-currency]').forEach(element => {
      const amount = parseFloat(element.getAttribute('data-i18n-currency'));
      const currency = element.getAttribute('data-currency') || 'USD';
      element.textContent = this.formatCurrency(amount, currency);
    });
  }

  // Format number according to locale
  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.getLocaleCode(), options).format(number);
  }

  // Format currency according to locale
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat(this.getLocaleCode(), {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Get full locale code (e.g., 'en-US', 'es-ES')
  getLocaleCode() {
    const localeMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'zh': 'zh-CN',
      'de': 'de-DE',
      'ar': 'ar-SA',
      'fr': 'fr-FR'
    };
    return localeMap[this.currentLang] || 'en-US';
  }

  // Update HTML lang and dir attributes
  updateHtmlAttributes() {
    const html = document.documentElement;
    html.setAttribute('lang', this.currentLang);
    
    // Set text direction for RTL languages
    if (this.rtlLanguages.includes(this.currentLang)) {
      html.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      html.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
    }
  }

  // Switch to a new language
  async switchLanguage(newLang) {
    if (!this.supportedLanguages.includes(newLang)) {
      console.error(`Unsupported language: ${newLang}`);
      return false;
    }

    this.currentLang = newLang;
    
    // Save to localStorage
    localStorage.setItem('apex_language', newLang);
    
    // Update URL parameter
    const url = new URL(window.location);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
    
    // Load new translations
    await this.loadTranslations(newLang);
    
    // Apply translations
    this.applyTranslations();
    
    // Update HTML attributes
    this.updateHtmlAttributes();
    
    // Update language switcher UI
    this.updateLanguageSwitcherUI();
    
    return true;
  }

  // Setup language switcher dropdown
  setupLanguageSwitcher() {
    const languageNames = {
      'en': 'English',
      'es': 'Español',
      'zh': '简体中文',
      'de': 'Deutsch',
      'ar': 'العربية',
      'fr': 'Français'
    };

    // Create language switcher if it doesn't exist
    let switcher = document.getElementById('language-switcher');
    if (!switcher) {
      switcher = document.createElement('div');
      switcher.id = 'language-switcher';
      switcher.className = 'language-switcher';
      
      const select = document.createElement('select');
      select.id = 'language-select';
      select.className = 'language-select';
      select.setAttribute('aria-label', 'Select language');
      
      this.supportedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = languageNames[lang];
        if (lang === this.currentLang) {
          option.selected = true;
        }
        select.appendChild(option);
      });
      
      select.addEventListener('change', (e) => {
        this.switchLanguage(e.target.value);
      });
      
      switcher.appendChild(select);
      
      // Insert into navigation
      const nav = document.querySelector('nav') || document.querySelector('.nav');
      if (nav) {
        nav.appendChild(switcher);
      }
    }
    
    this.updateLanguageSwitcherUI();
  }

  // Update language switcher UI
  updateLanguageSwitcherUI() {
    const select = document.getElementById('language-select');
    if (select) {
      select.value = this.currentLang;
    }
  }
}

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.apexI18n = new ApexI18n();
  });
} else {
  window.apexI18n = new ApexI18n();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApexI18n;
}
