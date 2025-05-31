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
      border: 1px solid #444;
      border-radius: 16px;
      padding: 1rem;
      max-width: 220px;
      background-color: var(--card-bg, #fff);
      color: var(--card-text, #000);
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      font-family: 'Segoe UI', sans-serif;
      text-align: center;
      transition: 0.3s ease;
    }

    img {
      width: 80px;
      height: 80px;
      display: block;
      margin: 0 auto 0.5rem;
    }

    h2 {
      font-size: 1.2rem;
      margin: 0.3em 0;
    }

    .types {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.4em;
      margin: 0.5em 0 1em;
    }

    .type {
      padding: 0.3em 0.6em;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: bold;
      background-color: #ddd;
      color: #333;
      text-transform: capitalize;
    }

    .stat {
      text-align: left;
      font-size: 0.85rem;
      padding: 0.2em 0;
    }

    .stat span {
      font-weight: bold;
    }

    /* Example color coding for types */
    .type.Électrik { background: #FFCE4B; color: #222; }
    .type.Plante   { background: #78C850; color: #fff; }
    .type.Poison   { background: #A040A0; color: #fff; }
    .type.Feu      { background: #F08030; color: #fff; }
    .type.Eau      { background: #6890F0; color: #fff; }
    .type.Vol      { background: #A890F0; color: #000; }
    
    /* Add more type classes as needed */
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
      <img src="${this.avatar}" alt="Avatar de ${this.name}" />
      <h2>${this.name}</h2>
      <div class="types">
        ${this.types.map(type => html`<span class="type ${type}">${type}</span>`)}
      </div>
      <div class="stat">❤️ <span>HP:</span> ${this.stats.hp}</div>
      <div class="stat">⚔️ <span>Attaque:</span> ${this.stats.attack}</div>
      <div class="stat">🛡️ <span>Défense:</span> ${this.stats.defense}</div>
      <div class="stat">🌟 <span>Atq. Spé.:</span> ${this.stats.specialAttack}</div>
      <div class="stat">🔰 <span>Déf. Spé.:</span> ${this.stats.specialDefense}</div>
      <div class="stat">⚡ <span>Vitesse:</span> ${this.stats.speed}</div>
    `;
  }
}

customElements.define('user-card', UserCard);
