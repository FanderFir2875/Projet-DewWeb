import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

/**
 * Composant héritant de LitElement : UserCard
 * une carte representant une entité (exemple: un pokemon)
 */
class UserCard extends LitElement {

  //liste des propriétés des elements
  static properties = {
    name: { type: String },
    avatar: { type: String },
    stats: { type: Object },
    types: { type: Array }
  };

  //style
  static styles = css`
    :host {
      display: block;
      border: 1px solid #444;
      border-radius: 16px;
      padding: 1rem;
      max-width: 220px;
      background-color: var(--card-bg2, #fff);
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

    .extra {
      margin-top: 1rem;
    }

    .type.Acier      { background: #B8B8D0; color: #000; }
    .type.Combat     { background: #C03028; color: #fff; }
    .type.Dragon     { background: #7038F8; color: #fff; }
    .type.Fée        { background: #EE99AC; color: #000; }
    .type.Insecte    { background: #A8B820; color: #000; }
    .type.Normal     { background: #A8A878; color: #000; }
    .type.Psy        { background: #F85888; color: #fff; }
    .type.Roche      { background: #B8A038; color: #000; }
    .type.Sol        { background: #E0C068; color: #000; }
    .type.Spectre    { background: #705898; color: #fff; }
    .type.Ténèbres   { background: #705848; color: #fff; }
    .type.Glace      { background: #98D8D8; color: #000; }
    .type.Vol        { background: #A890F0; color: #000; } 
    .type.Électrik   { background: #FFCE4B; color: #222; } 
    .type.Plante     { background: #78C850; color: #fff; }
    .type.Poison     { background: #A040A0; color: #fff; } 
    .type.Feu        { background: #F08030; color: #fff; } 
    .type.Eau        { background: #6890F0; color: #fff; } 

    .stat-bar {
      height: 10px;
      border-radius: 6px;
      overflow: hidden;
      background-color: #eee;
      margin-top: 0.2em;
    }

    .stat-bar-inner {
      height: 100%;
      border-radius: 6px;
      transition: width 0.3s ease;
    }

    .hp { background-color: #81C784; }           
    .attack { background-color: #FFEB3B; }       
    .defense { background-color: #FFB74D; }      
    .specialAttack { background-color: #4DD0E1; } 
    .specialDefense { background-color: #7986CB; }
    .speed { background-color: #BA68C8; }         


  `;

  // initialisation des attributs pour construire la carte
  constructor() {
    super();
    this.name = 'Inconnu';
    this.avatar = '';
    this.stats = {};
    this.types = [];
  }

  //affichage de la carte
  render() {
    return html`
      <img src="${this.avatar}" alt="Avatar de ${this.name}" />

      <h2>${this.name}</h2>

      <div class="types">
        ${this.types.map(type => html`<span class="type ${type}">${type}</span>`)}
      </div>

      <div class="stat">
        ❤️ <span>HP:</span> ${this.stats.hp}
        <div class="stat-bar">
          <div class="stat-bar-inner hp" style="width: ${this.stats.hp / 2}%;"></div>
        </div>
      </div>

      <div class="stat">
        ⚔️ <span>Attaque:</span> ${this.stats.attack}
        <div class="stat-bar">
          <div class="stat-bar-inner attack" style="width: ${this.stats.attack / 2}%;"></div>
        </div>
      </div>

      <div class="stat">
        🛡️ <span>Défense:</span> ${this.stats.defense}
        <div class="stat-bar">
          <div class="stat-bar-inner defense" style="width: ${this.stats.defense / 2}%;"></div>
        </div>
      </div>

      <div class="stat">
        🌟 <span>Atq. Spé.:</span> ${this.stats.specialAttack}
        <div class="stat-bar">
          <div class="stat-bar-inner specialAttack" style="width: ${this.stats.specialAttack / 2}%;"></div>
        </div>
      </div>

      <div class="stat">
        🔰 <span>Déf. Spé.:</span> ${this.stats.specialDefense}
        <div class="stat-bar">
          <div class="stat-bar-inner specialDefense" style="width: ${this.stats.specialDefense / 2}%;"></div>
        </div>
      </div>

      <div class="stat">
        ⚡ <span>Vitesse:</span> ${this.stats.speed}
        <div class="stat-bar">
          <div class="stat-bar-inner speed" style="width: ${this.stats.speed / 2}%;"></div>
        </div>
      </div>

      <div class="extra">
        <slot name="badge"></slot>
        <slot name="desc"></slot>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);