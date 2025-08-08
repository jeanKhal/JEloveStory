# Guide d'extraction des invités pour la vérification en ligne

## Problème
Quand le site est hébergé en ligne (Vercel, Netlify, etc.), il n'est pas possible de lire directement les fichiers Excel depuis le navigateur. Cela empêche la vérification des invitations.

## Solution
Nous avons créé un système hybride qui :
1. **En local** : Lit le fichier Excel `liste.xlsx`
2. **En ligne** : Utilise une liste d'invités intégrée dans le code

## Comment extraire vos invités

### Étape 1 : Préparer le fichier Excel
Assurez-vous que votre fichier `public/liste.xlsx` contient :
- **Colonne A** : Numéro (optionnel)
- **Colonne B** : Prénom
- **Colonne C** : Nom
- **Colonne D** : Type d'invitation (optionnel)
- **Ligne 1** : En-têtes (sera ignorée)

**Types d'invitation dans la colonne D :**
- `b` ou `bénédiction` ou `benediction` = Bénédiction nuptiale uniquement
- `s` ou `soirée` ou `soiree` = Soirée dansante uniquement
- `x` ou `les deux` ou `both` = Les deux événements
- **Vide** = Les deux événements (par défaut)

### Étape 2 : Extraire les invités
Exécutez la commande suivante dans le terminal :

```bash
npm run extract-guests
```

Cette commande va :
- Lire votre fichier `liste.xlsx`
- Extraire tous les prénoms et noms
- Générer automatiquement le fichier `src/utils/guestData.ts`
- Afficher un résumé des invités extraits

### Étape 3 : Vérifier l'extraction
Le script affichera :
- Le nombre d'invités extraits
- Les 5 premiers invités pour vérification
- Le chemin du fichier généré

### Étape 4 : Tester la vérification
1. Lancez le site : `npm start`
2. Allez à la section RSVP
3. Testez avec un nom de votre liste
4. La vérification devrait fonctionner

## Fonctionnement du système

### En développement (local)
```typescript
// Le système essaie d'abord de lire le fichier Excel
const guests = await loadGuestListFromFile();
```

### En production (en ligne)
```typescript
// Si le fichier Excel n'est pas accessible, utilise les données intégrées
const guests = await loadGuestListFromData();
```

### Système hybride
```typescript
// Essaie Excel d'abord, puis fallback vers les données intégrées
const guests = await loadGuestListHybrid();
```

## Mise à jour de la liste

Quand vous ajoutez de nouveaux invités dans votre fichier Excel :

1. Mettez à jour `public/liste.xlsx`
2. Relancez : `npm run extract-guests`
3. Le fichier `guestData.ts` sera automatiquement mis à jour
4. Redéployez votre site

## Avantages de cette solution

✅ **Fonctionne en local et en ligne**
✅ **Pas de serveur backend nécessaire**
✅ **Mise à jour facile avec le script d'extraction**
✅ **Vérification rapide et fiable**
✅ **Gestion des espaces et de la casse**

## Dépannage

### Erreur "Fichier Excel non trouvé"
- Vérifiez que `liste.xlsx` existe dans `public/`
- Vérifiez que le fichier n'est pas corrompu

### Erreur "Aucun invité extrait"
- Vérifiez que les colonnes B et C contiennent des données
- Vérifiez que la première ligne contient les en-têtes

### Vérification ne fonctionne pas
- Vérifiez que les noms dans le fichier Excel sont corrects
- Relancez `npm run extract-guests`
- Vérifiez la console du navigateur pour les erreurs

## Structure du fichier Excel attendue

| A | B | C | D |
|---|---|---|---|
| 1 | Prénom | Nom | Type d'invitation |
| 2 | Jean | Dupont | x |
| 3 | Marie | Martin | b |
| 4 | Pierre | Bernard | s |
| 5 | Sophie | Petit | |
| ... | ... | ... | ... |

**Exemples de la colonne D :**
- `x` = Invité aux deux événements
- `b` = Invité à la bénédiction nuptiale uniquement
- `s` = Invité à la soirée dansante uniquement
- **Vide** = Invité aux deux événements (par défaut)

## Exemple de sortie du script

```
✅ 25 invités extraits du fichier Excel
✅ Fichier guestData.ts mis à jour avec 25 invités
📁 Chemin: /path/to/src/utils/guestData.ts

📋 Premiers invités extraits:
  1. Jean Dupont (Les deux événements)
  2. Marie Martin (Bénédiction nuptiale)
  3. Pierre Bernard (Soirée dansante)
  4. Sophie Petit (Les deux événements)
  5. Lucas Robert (Bénédiction nuptiale)
  ... et 20 autres invités
