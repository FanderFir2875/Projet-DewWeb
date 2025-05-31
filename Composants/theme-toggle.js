import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';


class ThemeToggle extends LitElement {
  static styles = css`
    button {
      padding: 10px;
      font-size: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.theme = 'light';
  }

  toggleTheme() {
    const isDark = this.theme === 'dark';
    this.theme = isDark ? 'light' : 'dark';
    document.documentElement.style.setProperty('--card-bg', isDark ? 'white' : '#333');
    document.documentElement.style.setProperty('--card-text', isDark ? 'black' : 'white');
  }

  render() {
    return html`
      <button @click="${this.toggleTheme}">
        Changer le thème (${this.theme === 'light' ? 'Clair' : 'Sombre'})
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
