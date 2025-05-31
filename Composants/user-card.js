import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

class UserCard extends LitElement {
  static properties = {
    name: { type: String },
    avatar: { type: String },
    stats: { type: Object },
    types: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 1rem;
      max-width: 250px;
      background-color: var(--card-bg, white);
      color: var(--card-text, black);
      transition: all 0.3s ease;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: block;
      margin: auto;
    }

    h2 {
      text-align: center;
      margin: 0.5em 0 0.2em;
    }

    .types {
      display: flex;
      justify-content: center;
      gap: 0.5em;
      flex-wrap: wrap;
      margin-bottom: 1em;
    }

    .type {
      background-color: #eee;
      padding: 0.2em 0.5em;
      border-radius: 5px;
      font-size: 0.8em;
    }

    .stat {
      font-size: 0.85em;
      margin: 0.2em 0;
    }
  `;

  constructor() {
    super();
    this.name = 'Inconnu';
    this.avatar = '';
    this.stats = {};
    this.types = [];
  }

  render() {
    return html`
      <img src="${this.avatar}" alt="${this.name}" />
      <h2>${this.name}</h2>
      <div class="types">
        ${this.types.map(type => html`<span class="type">${type}</span>`)}
      </div>
      <div class="stat">❤️ HP: ${this.stats.hp}</div>
      <div class="stat">⚔️ Attaque: ${this.stats.attack}</div>
      <div class="stat">🛡️ Défense: ${this.stats.defense}</div>
      <div class="stat">🌟 Atq. Spé.: ${this.stats.specialAttack}</div>
      <div class="stat">🔰 Déf. Spé.: ${this.stats.specialDefense}</div>
      <div class="stat">⚡ Vitesse: ${this.stats.speed}</div>
    `;
  }
}

customElements.define('user-card', UserCard);
