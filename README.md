# Web Components Pokémon — Lit

Ce projet utilise Lit pour créer des composants Web réutilisables permettant de créer et afficher des Pokémon personnalisés.

## Composants
 
`<user-list>`

    Composant principal.

    Gère un formulaire de création de Pokémon et une liste dynamique de cartes (<user-card>).

    Validation : max 2 types, stats numériques bornées.

`<user-card>`

    Affiche les infos d’un Pokémon : nom, image, types, stats.

    Slots personnalisables (badge, desc) pour étendre le contenu.

`<theme-toggle>`

    Composant permettant de choisir le thème d'affichage entre sombre et clair.

## Choix techniques

    Utilisation de Lit via CDN.

    Composants en JavaScript, sans framework.

    Encapsulation CSS, slots pour la flexibilité, logique locale à chaque composant.

## Utilisation

1. Intégration

<pre>html<br>
<!-- Pour les cartes et le formulaire -->
<script type="module" src="user-list.js"></script>
<script type="module" src="user-card.js"></script>
<user-list></user-list>

<!-- Pour le selecteur de thème -->
<script type="module" src="theme-toggle.js"></script>
<user-list></user-list>
<br>
</pre>

2. Ajout de Pokémon

    Nom, image, stats, types.

    Max 2 types, messages d’erreur intégrés.

## Apports de Lit

    Templates HTML simples.

    Réactivité sans DOM manuel.

    Encapsulation et modularité.

    Léger, rapide, idéal pour composants natifs.