# Web Components Pokémon — Lit

Ce projet utilise Lit pour créer des composants Web réutilisables permettant de créer et afficher des Pokémon personnalisés.

**Composants**

```html <user-list>```

    Composant principal.

    Gère un formulaire de création de Pokémon et une liste dynamique de cartes (<user-card>).

    Validation : max 2 types, stats numériques bornées.

```html <user-card>```

    Affiche les infos d’un Pokémon : nom, image, types, stats.

    Slots personnalisables (badge, desc) pour étendre le contenu.

```html <theme-toggle>```

    Composant de style de base pour uniformiser l’apparence des cartes.

**Choix techniques**

    Utilisation de Lit via CDN.

    Composants en JavaScript, sans framework.

    Encapsulation CSS, slots pour la flexibilité, logique locale à chaque composant.

**Utilisation**

1. Intégration

```html
<script type="module" src="user-list.js"></script>
<user-list></user-list>
```

2. Ajout de Pokémon

    Nom, image, stats, types.

    Max 2 types, messages d’erreur intégrés.

**Apports de Lit**

    Templates HTML simples (`html``).

    Réactivité sans DOM manuel.

    Encapsulation et modularité.

    Léger, rapide, idéal pour composants natifs.