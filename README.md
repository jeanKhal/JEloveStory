# JOEL&EUNICE - Mariage 2024 🎉

Site web moderne et responsive pour le mariage de Joel & Eunice, optimisé pour les performances et l'expérience utilisateur.

## ✨ Fonctionnalités

- **Design Responsive** : Adapté à tous les appareils (mobile, tablette, desktop)
- **Compteur Dynamique** : Compteur en temps réel jusqu'au grand jour
- **Animations Fluides** : Transitions et animations optimisées
- **Navigation Intuitive** : Menu hamburger responsive avec effets de scroll
- **Performance Optimisée** : Chargement rapide et expérience fluide
- **Accessibilité** : Support des préférences de réduction de mouvement
- **PWA Ready** : Configuration pour Progressive Web App

## 🚀 Optimisations de Performance

### Lazy Loading
- Chargement différé des composants avec `React.lazy()`
- Suspense pour les états de chargement
- Images optimisées avec `loading="lazy"`

### Mémoisation
- `React.memo()` pour éviter les re-renders inutiles
- `useMemo()` et `useCallback()` pour optimiser les calculs
- Cache intelligent pour les données coûteuses

### Animations Optimisées
- Utilisation de `requestAnimationFrame`
- Throttling des événements de scroll
- Support des préférences de réduction de mouvement

### Build Optimisé
- Source maps désactivées en production
- Code splitting automatique
- Compression des assets

## 🛠️ Technologies

- **React 18** avec TypeScript
- **React Router** pour la navigation
- **CSS Variables** pour le système de design
- **Intersection Observer** pour les animations au scroll
- **Performance APIs** pour l'optimisation

## 📱 Responsive Design

Le site s'adapte parfaitement à tous les écrans :

- **Mobile** : < 768px
- **Tablette** : 768px - 1024px  
- **Desktop** : > 1024px

## 🎨 Système de Design

### Couleurs
- **Primaire** : #d4af37 (Or)
- **Secondaire** : #f8f4e6 (Beige clair)
- **Accent** : #e8c39e (Beige doré)

### Typographie
- **Primaire** : Playfair Display (titres)
- **Secondaire** : System fonts (texte)

### Espacements
- Système cohérent avec variables CSS
- Breakpoints standardisés

## 🚀 Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm start

# Build de production
npm run build

# Analyse des performances
npm run build:analyze

# Vérification du code
npm run lint
npm run type-check
```

## 📊 Métriques de Performance

Le site est optimisé pour :

- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🔧 Scripts Disponibles

- `npm start` : Démarrage du serveur de développement
- `npm run build` : Build de production optimisé
- `npm run test` : Tests unitaires
- `npm run lint` : Vérification du code
- `npm run optimize` : Optimisation complète

## 📱 PWA Features

- Manifest.json configuré
- Service Worker prêt
- Installation sur l'écran d'accueil
- Mode hors ligne

## 🎯 Accessibilité

- Support des lecteurs d'écran
- Navigation au clavier
- Contraste optimisé
- Préférences de réduction de mouvement

## 🌟 Fonctionnalités Avancées

- **Compteur Dynamique** : Mise à jour en temps réel
- **Barre de Progression** : Indicateur de scroll
- **Bouton Retour en Haut** : Navigation facilitée
- **Animations au Scroll** : Intersection Observer
- **Menu Responsive** : Navigation mobile optimisée

## 📈 Optimisations Futures

- [ ] Service Worker pour le cache
- [ ] Compression des images WebP
- [ ] CDN pour les assets statiques
- [ ] Analytics de performance
- [ ] Tests E2E

---

**Joel & Eunice** - 15 Juin 2024 💒