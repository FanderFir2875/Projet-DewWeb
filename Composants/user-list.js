import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import './user-card.js';

class UserList extends LitElement {


  static styles = css`
    .container {
      background-color: #1e1e1e;
      color: white;
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      font-family: Arial, sans-serif;
    }

    form {
      background: #2c2c2c;
      padding: 1rem;
      border-radius: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      max-width: 800px;
    }

    input, button {
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
    }

    input {
      width: 150px;
    }

    button {
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }

    .types-checkboxes {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      width: 100%;
    }

    .types-checkboxes label {
      background: #444;
      padding: 0.3rem 0.6rem;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      font-size: 0.9em;
    }

    .types-checkboxes input[type="checkbox"] {
      margin-right: 0.3rem;
    }

    #typeError {
      color: red;
      font-size: 0.85em;
      text-align: center;
      width: 100%;
    }

    .list {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  `;
  
    static properties = {
    pokemon: { type: Array },
  };
  
  constructor() {
    super();
    this.pokemon = [
      {
        name: 'Pikachu',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Électrik'],
        stats: {
          hp: 35, attack: 55, defense: 40,
          specialAttack: 50, specialDefense: 50, speed: 90
        }
      },
      {
        name: 'Bulbasaur',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['Plante', 'Poison'],
        stats: {
          hp: 45, attack: 49, defense: 49,
          specialAttack: 65, specialDefense: 65, speed: 45
        }
      }
    ];
  }

  limitTypeSelection(e) {
    const checkboxes = this.shadowRoot.querySelectorAll('input[name="type"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    const errorMsg = this.shadowRoot.getElementById('typeError');

    if (checked.length >= 2) {
      checkboxes.forEach(cb => {
        if (!cb.checked) cb.disabled = true;
      });
      errorMsg.style.display = 'none';
    } else {
      checkboxes.forEach(cb => cb.disabled = false);
      errorMsg.style.display = 'none';
    }
  }
  validateStats(stats) {
  const limits = {
    hp: [1, 255],
    attack: [1, 190],
    defense: [1, 230],
    specialAttack: [1, 200],
    specialDefense: [1, 230],
    speed: [1, 200],
  };

  for (const [key, value] of Object.entries(stats)) {
    const [min, max] = limits[key];
    if (value < min || value > max) {
      return { valid: false, message: `${key} doit être entre ${min} et ${max}` };
    }
  }

  return { valid: true };
  }


  addPokemon(e) {
    e.preventDefault();
    const form = e.target;
    const selectedTypes = Array.from(this.shadowRoot.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

    if (selectedTypes.length === 0 || selectedTypes.length > 2) {
      this.shadowRoot.getElementById('typeError').style.display = 'block';
      return;
    }

    const newPokemon = {
      name: form.name.value,
      avatar: form.avatar.value || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png" ,
      types: selectedTypes,
      stats: {
        hp: Number(form.hp.value),
        attack: Number(form.attack.value),
        defense: Number(form.defense.value),
        specialAttack: Number(form.specialAttack.value),
        specialDefense: Number(form.specialDefense.value),
        speed: Number(form.speed.value)
      }
    };

    this.pokemon = [...this.pokemon, newPokemon];
    form.reset();
    this.shadowRoot.querySelectorAll('input[name="type"]').forEach(cb => {
      cb.checked = false;
      cb.disabled = false;
    });
  }

  handleImageError(e) {
    e.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png";
  }

  render() {
    const allTypes = ['Plante', 'Feu', 'Eau', 'Électrik', 'Poison', 'Vol', 'Sol', 'Roche', 'Psy', 'Spectre', 'Dragon', 'Acier', 'Ténèbres', 'Fée', 'Combat', 'Normal', 'Glace', 'Insecte'];

    return html`
      <div class="container">
        <form @submit="${this.addPokemon}">
          <input name="name" placeholder="Nom" required />
          <input name="avatar" placeholder="Image"/>
          <input name="hp" type="number" placeholder="HP" required />
          <input name="attack" type="number" placeholder="Attaque" required />
          <input name="defense" type="number" placeholder="Défense" required />
          <input name="specialAttack" type="number" placeholder="Atq. Spé." required />
          <input name="specialDefense" type="number" placeholder="Déf. Spé." required />
          <input name="speed" type="number" placeholder="Vitesse" required />

          <div class="types-checkboxes">
            ${allTypes.map(type => html`
              <label>
                <input 
                  type="checkbox" 
                  name="type" 
                  value="${type}" 
                  @change="${this.limitTypeSelection}" />
                ${type}
              </label>
            `)}
          </div>

          <p id="typeError" style="display: none;">Veuillez sélectionner au maximum 2 types.</p>

          <button type="submit">Ajouter</button>
        </form>

        <div class="list">
          ${this.pokemon.map(p => html`
            <user-card
              .name=${p.name}
              .avatar=${p.avatar || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'}
              .types=${p.types}
              .stats=${p.stats}
            >
              <span slot="badge">⭐</span>
              <p slot="desc">${p.name} est un Pokémon ajouté par formulaire.</p>
            </user-card>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('user-list', UserList);
