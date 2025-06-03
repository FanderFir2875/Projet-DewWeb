import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

/**
 * Composant héritant de LitElement : ThemeToggle
 * change le theme css entre une apparence sombre ou claire.
 */
class ThemeToggle extends LitElement {
  static styles = css`
    button {
      padding: 10px;
      font-size: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  `;

  //Constructeur initialisant le theme de base a clair (light)
  constructor() {
    super();
    this.theme = 'light';
  }

  //toggle du theme sombre || clair
  toggleTheme() {
    const isDark = this.theme === 'dark'; //constante bool
    this.theme = isDark ? 'light' : 'dark'; //affecte le theme en sombre ou clair si isDark.

    //change les propriétées style des element du DOM (style de user-card)
    document.documentElement.style.setProperty('--card-bg', isDark ? 'white' : '#333'); 
    document.documentElement.style.setProperty('--card-text', isDark ? 'black' : 'white');
  }

  //affiche le composant
  render() {
    return html`
      <button @click="${this.toggleTheme}">
        Changer le thème (${this.theme === 'light' ? 'Clair' : 'Sombre'})
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
