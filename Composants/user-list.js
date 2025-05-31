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
    }

    form {
      background: #2c2c2c;
      padding: 1rem;
      border-radius: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
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

    .list {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  `;

  constructor() {
    super();
    this.pokemon = [
      {
        name: 'Pikachu',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Électrik'],
        stats: {
          hp: 35,
          attack: 55,
          defense: 40,
          specialAttack: 50,
          specialDefense: 50,
          speed: 90
        }
      },
      {
        name: 'Bulbasaur',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['Plante', 'Poison'],
        stats: {
          hp: 45,
          attack: 49,
          defense: 49,
          specialAttack: 65,
          specialDefense: 65,
          speed: 45
        }
      }
    ];
  }

  addPokemon(e) {
    e.preventDefault();
    const form = e.target;
    const newPokemon = {
      name: form.name.value,
      avatar: form.avatar.value,
      types: form.types.value.split(',').map(t => t.trim()),
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
  }

  render() {
    return html`
      <div class="container">
        <form @submit="${this.addPokemon}">
          <input name="name" placeholder="Nom" required />
          <input name="avatar" placeholder="URL image" required />
          <input name="types" placeholder="Types (séparés par virgule)" required />
          <input name="hp" type="number" placeholder="HP" required />
          <input name="attack" type="number" placeholder="Attaque" required />
          <input name="defense" type="number" placeholder="Défense" required />
          <input name="specialAttack" type="number" placeholder="Atq. Spé." required />
          <input name="specialDefense" type="number" placeholder="Déf. Spé." required />
          <input name="speed" type="number" placeholder="Vitesse" required />
          <button type="submit">Ajouter</button>
        </form>

        <div class="list">
          ${this.pokemon.map(p =>
            html`<user-card
              .name=${p.name}
              .avatar=${p.avatar}
              .types=${p.types}
              .stats=${p.stats}>
            </user-card>`
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('user-list', UserList);
