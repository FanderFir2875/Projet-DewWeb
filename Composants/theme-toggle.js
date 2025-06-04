/**
 * Composant héritant de HTMLElement : ThemeToggle
 * change le theme css entre une apparence sombre ou claire.
 */
class ThemeToggle extends HTMLElement {

  //Constructeur initialisant le theme de base a clair (light)
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    //Encapsulation du css
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './Composants/StyleSheets/ThemeToggle.css');
    this.shadowRoot.appendChild(link);

    this.theme = 'light';

    //encapsulation du bouton
    this.button = document.createElement('button');
    this.shadowRoot.appendChild(this.button);
  }

  //toggle du theme sombre || clair
  toggleTheme() {
    const isDark = this.theme === 'dark'; //constante bool
    this.theme = isDark ? 'light' : 'dark'; //affecte le theme en sombre ou clair si isDark.

    //change les propriétées style des element du DOM (style de user-card)
    document.documentElement.style.setProperty('--card-bg', isDark ? 'white' : '#333'); 
    document.documentElement.style.setProperty('--card-text', isDark ? 'black' : 'white');

    //change le texte du bouton
    this.button.innerText = `Changer le thème (${this.theme === 'light' ? 'Clair' : 'Sombre'})`;
  }

  //affiche le composant
  connectedCallback() {
    this.button.innerText =`Changer le thème (${this.theme === 'light' ? 'Clair' : 'Sombre'})`;

    //Event listener
    this.button.addEventListener('click', this.toggleTheme.bind(this));
  }
}

customElements.define('theme-toggle', ThemeToggle);
