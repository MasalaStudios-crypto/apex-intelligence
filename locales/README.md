# Localization Files

This directory contains language translation files for the Apex Intelligence platform.

## Available Languages

The following languages are currently supported:

- **Amharic** (am.json)
- **Arabic** (ar.json)
- **Bengali** (bn.json)
- **German** (de.json)
- **Greek** (el.json)
- **English** (en.json) - *Reference language*
- **Spanish** (es.json)
- **Persian** (fa.json)
- **French** (fr.json)
- **Hausa** (ha.json)
- **Hindi** (hi.json)
- **Indonesian** (id.json)
- **Italian** (it.json)
- **Japanese** (ja.json)
- **Korean** (ko.json)
- **Malay** (ms.json)
- **Dutch** (nl.json)
- **Punjabi** (pa.json)
- **Polish** (pl.json)
- **Portuguese (Brazil)** (pt-BR.json)
- **Russian** (ru.json)
- **Swahili** (sw.json)
- **Thai** (th.json)
- **Tagalog** (tl.json)
- **Turkish** (tr.json)
- **Ukrainian** (uk.json)
- **Urdu** (ur.json)
- **Vietnamese** (vi.json)
- **Yoruba** (yo.json)
- **Chinese** (zh.json)

## Translation Process

All translations were generated using a bulk translation approach with Google Sheets, based on the English reference file (en.json). Each language file contains key-value pairs where:

- **Keys** remain in English (for code consistency)
- **Values** are translated to the target language

## Community Contributions Welcome! 🌍

We understand that machine translations may not always capture cultural nuances, idioms, or technical terminology perfectly. **We warmly invite native speakers and language experts to review and improve these translations.**

### How to Contribute

1. **Review**: Check the translation file for your language
2. **Identify**: Find any errors, awkward phrasing, or better alternatives
3. **Fork & Edit**: Fork this repository and make your corrections
4. **Submit**: Create a pull request with your improvements
5. **Describe**: Clearly explain what you changed and why

### What to Look For

- ✅ Grammar and spelling errors
- ✅ Cultural appropriateness
- ✅ Technical terminology accuracy
- ✅ Natural phrasing and idiomatic expressions
- ✅ Consistency across similar terms
- ✅ Proper formatting and special characters

### Guidelines

- Keep the same JSON structure and keys
- Only modify the translation values, not the keys
- Ensure special characters are properly escaped
- Test your changes if possible
- Be respectful of existing translations while suggesting improvements

## Adding New Languages

If you'd like to add a new language:

1. Copy the `en.json` file and rename it with the appropriate [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
2. Translate all values to your target language
3. Submit a pull request with your new language file

## Questions or Suggestions?

Feel free to open an issue if you have questions about the localization system or suggestions for improvement.

---

**Thank you for helping make Apex Intelligence accessible to users worldwide! 🙏**
