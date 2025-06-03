import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import './user-card.js';

/**
 * Composant héritant de LitElement : UserList
 * affiche une liste de user-card
 */
class UserList extends LitElement {

  //style de la liste
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
  
  //Propriétés de la liste
  static properties = {
    pokemon: { type: Array },
  };
  
  //constructeur de la liste
  constructor() {
    super();

    //On initialise deux exemples de base
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

  /**  
   * empeche la selection de plus de 2 types
   */
  limitTypeSelection() {
    const checkboxes = this.shadowRoot.querySelectorAll('input[name="type"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    const errorMsg = this.shadowRoot.getElementById('typeError');

    // desactive les checkbox si 2 d'entres elles sont déjà sélectionnée.
    if (checked.length >= 2) {
      checkboxes.forEach(cb => {
        if (!cb.checked) cb.disabled = true;
      });
      errorMsg.style.display = 'none';
    } 
    else // sinon les active (en cas de deselection du deuxieme type par exemple).
    {
      checkboxes.forEach(cb => cb.disabled = false);
      errorMsg.style.display = 'none';
    }
  }

  /**
   * verifie que les states créées sont bien dans l'intervalle limitant 
   * de chaque statistique, la limite si ce n'est pas le cas.
   * 
   * @param {*} stats
   * @returns void
   */
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
      if (value < min) 
      {
        stats[key] = min;
        continue;
      }
      else if (value > max)
      {
        stats[key] = max;
      }
    }

    return stats;
  }

  /**
   * Crée et ajoute une carte en fonction des valeurs transmises
   * par l'évenement submit et ajoute la carte dans la liste.
   * 
   * @param {Event} e 
   * @returns void
   */
  addPokemon(e) {

    //On recupère les valeurs dans des constantes
    e.preventDefault();
    const form = e.target;
    const selectedTypes = Array.from(this.shadowRoot.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

    //Verifie que seulement deux types sont selectionnés
    if (selectedTypes.length === 0 || selectedTypes.length > 2) {
      this.shadowRoot.getElementById('typeError').style.display = 'block';
      return;
    }

    //Creation de la carte.
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

    //verifie les stats
    this.validateStats(newPokemon.stats);

    //ajout de la carte à la liste
    this.pokemon = [...this.pokemon, newPokemon];
    
    //réinitialisation du formulaire de creation de carte.
    form.reset();
    this.shadowRoot.querySelectorAll('input[name="type"]').forEach(cb => {
      cb.checked = false;
      cb.disabled = false;
    });
  }

  //Affichage du formulaire et de la liste.
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
