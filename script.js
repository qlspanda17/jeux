// Base de 50 cartes avec des couleurs comme images de remplacement
const cartes = [
  
  { id: 1, couleur: '#FF6B6B' }, { id: 2, src: "images/animaux/elephant.webp" },
  { id: 3, couleur: '#45B7D1' }, { id: 4, src: "images/animaux/jbl.webp" },
  { id: 5, couleur: '#98D8C8' }, { id: 6, src: "images/animaux/oiseaux.webp" },
  { id: 7, couleur: '#BB8FCE' }, { id: 8, src: "images/animaux/jackson.webp" },
  { id: 9, couleur: '#F8B739' }, { id: 10, src: "images/animaux/ecouteurs.webp" },
  { id: 11, couleur: '#E63946' }, { id: 12, src: "images/animaux/panda.webp" },
  { id: 13, couleur: '#457B9D' }, { id: 14, src: "images/animaux/prime.webp" },
  { id: 15, couleur: '#E9C46A' }, { id: 16, src: "images/animaux/rock.webp" },
  { id: 17, couleur: '#2A9D8F' }, { id: 18, src: "images/animaux/telescope.webp" },
  { id: 19, couleur: '#E76F51' }, { id: 20, src: "images/animaux/the_rock.webp" },
  { id: 21, couleur: '#6A994E' }, { id: 22, src: "images/animaux/jacksons.webp" },
  { id: 23, couleur: '#F2CC8F' }, { id: 24, src: "images/animaux/ecouteur.webp" },
  { id: 25, couleur: '#3D405B' }, { id: 26, src: "images/animaux/boussole.webp" },
  { id: 27, couleur: '#F2E9E4' }, { id: 28, src: "images/animaux/computer_fixing.webp" },
  { id: 29, couleur: '#9A8C98' }, { id: 30, couleur: '#4A4E69' },
  { id: 31, couleur: '#22223B' }, { id: 32, couleur: '#C9ADA1' },
  { id: 33, couleur: '#F2E8CF' }, { id: 34, couleur: '#A47551' },
  { id: 35, couleur: '#6C584C' }, { id: 36, couleur: '#06FFA5' },
  { id: 37, couleur: '#FF006E' }, { id: 38, couleur: '#8338EC' },
  { id: 39, couleur: '#3A86FF' }, { id: 40, couleur: '#FFBE0B' },
  { id: 41, couleur: '#FB5607' }, { id: 42, couleur: '#FF006E' },
  { id: 43, couleur: '#8338EC' }, { id: 44, couleur: '#3A86FF' },
  { id: 45, couleur: '#06FFA5' }, { id: 46, couleur: '#FFD60A' },
  { id: 47, couleur: '#ABC4FF' }, { id: 48, couleur: '#B6CCFE' },
  { id: 49, couleur: '#C1E7FF' }, { id: 50, couleur: '#D4F1FF' }
];

const modes = {
  facile: 5,
  moyen: 15,
  difficile: 30
};

let niveauActuel = '';
let sequence = [];
let selectionJoueur = [];
let cartesMelangees = [];

// Fonction pour mélanger un tableau
function melanger(array) {
  const copie = [...array];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// Créer une image de carte (div colorée avec numéro)
// Remplacez cette fonction dans votre script.js :
function creerImageCarte(carte) {
  // Si la carte a une propriété 'src', on affiche une vraie image
  if (carte.src) {
    const img = document.createElement('img');
    img.src = carte.src;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    return img;
  }
  
  // Sinon, on affiche une div colorée avec le numéro
  const div = document.createElement('div');
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.background = carte.couleur;
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  div.style.fontSize = '2em';
  div.style.fontWeight = 'bold';
  div.style.color = 'white';
  div.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
  div.textContent = carte.id;
  return div;
}

// Attendre un certain temps
function attendre(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Démarrer le jeu avec un niveau
async function demarrerJeu(niveau) {
  niveauActuel = niveau;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('jeu').style.display = 'block';
  
  const nombreCartes = modes[niveau];
  sequence = melanger(cartes).slice(0, nombreCartes);
  selectionJoueur = [];
  
  await afficherSequence();
  afficherGrille();
}

// Afficher la séquence de cartes
async function afficherSequence() {
  const zoneCarte = document.getElementById('zoneCarte');
  const info = document.getElementById('info');
  
  info.innerHTML = `<div class="compteur">Mémorisez les ${sequence.length} cartes !</div>`;
  
  for (let i = 0; i < sequence.length; i++) {
    const carte = sequence[i];
    info.innerHTML = `<div class="compteur">Carte ${i + 1} / ${sequence.length}</div>`;
    
    const container = document.createElement('div');
    container.style.width = '250px';
    container.style.height = '250px';
    container.appendChild(creerImageCarte(carte));
    
    zoneCarte.innerHTML = '';
    zoneCarte.appendChild(container);
    
    await attendre(5000); // 5 secondes par carte
    
    zoneCarte.innerHTML = '';
    await attendre(500);
  }
  
  info.innerHTML = '<div class="compteur">🎯 À vous de jouer ! Cliquez sur les cartes dans l\'ordre !</div>';
}

// Afficher la grille de toutes les cartes
function afficherGrille() {
  const grille = document.getElementById('grille');
  grille.innerHTML = '';
  
  cartesMelangees = melanger(cartes);
  
  cartesMelangees.forEach((carte, index) => {
    const container = document.createElement('div');
    container.style.width = '100px';
    container.style.height = '100px';
    container.style.cursor = 'pointer';
    container.style.border = '3px solid transparent';
    container.style.borderRadius = '8px';
    container.style.transition = 'all 0.2s';
    container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    container.appendChild(creerImageCarte(carte));
    
    container.onclick = () => choisirCarte(index, container);
    
    container.onmouseenter = () => {
      container.style.transform = 'scale(1.1)';
      container.style.boxShadow = '0 5px 15px rgba(0,0,0,0.4)';
    };
    
    container.onmouseleave = () => {
      if (!container.classList.contains('selectionnee')) {
        container.style.transform = 'scale(1)';
        container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      }
    };
    
    grille.appendChild(container);
  });
}

// Choisir une carte
function choisirCarte(index, element) {
  if (selectionJoueur.length >= sequence.length) return;
  
  const carteChoisie = cartesMelangees[index];
  selectionJoueur.push(carteChoisie);
  
  element.classList.add('selectionnee');
  element.style.borderColor = '#4CAF50';
  element.style.transform = 'scale(1.05)';
  element.style.boxShadow = '0 0 20px #4CAF50';
  element.onclick = null;
  
  const info = document.getElementById('info');
  info.innerHTML = `<div class="compteur">Cartes sélectionnées : ${selectionJoueur.length} / ${sequence.length}</div>`;
  
  if (selectionJoueur.length === sequence.length) {
    verifierResultat();
  }
}

// Vérifier le résultat
function verifierResultat() {
  let correct = true;
  const grilleElements = document.getElementById('grille').children;
  
  for (let i = 0; i < sequence.length; i++) {
    if (selectionJoueur[i].id !== sequence[i].id) {
      correct = false;
      break;
    }
  }
  
  const resultat = document.getElementById('resultat');
  resultat.style.display = 'block';
  
  if (correct) {
    resultat.className = 'succes';
    resultat.innerHTML = `
      <h2>🎉 Félicitations !</h2>
      <p>Vous avez mémorisé toutes les ${sequence.length} cartes dans le bon ordre !</p>
      <p style="font-size: 3em; margin: 20px 0;">🏆</p>
    `;
  } else {
    resultat.className = 'echec';
    resultat.innerHTML = `
      <h2>😔 Dommage !</h2>
      <p>L'ordre n'est pas tout à fait correct.</p>
      <p>Réessayez pour améliorer votre mémoire !</p>
    `;
  }
  
  document.getElementById('btnRecommencer').style.display = 'inline-block';
  document.getElementById('btnMenu').style.display = 'inline-block';
  
  // Désactiver les clics sur la grille
  Array.from(grilleElements).forEach(el => el.onclick = null);
}

// Event listeners
document.getElementById('btnFacile').onclick = () => demarrerJeu('facile');
document.getElementById('btnMoyen').onclick = () => demarrerJeu('moyen');
document.getElementById('btnDifficile').onclick = () => demarrerJeu('difficile');

document.getElementById('btnRecommencer').onclick = () => {
  document.getElementById('resultat').style.display = 'none';
  document.getElementById('btnRecommencer').style.display = 'none';
  document.getElementById('btnMenu').style.display = 'none';
  demarrerJeu(niveauActuel);
};

document.getElementById('btnMenu').onclick = () => {
  document.getElementById('jeu').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
  document.getElementById('resultat').style.display = 'none';
  document.getElementById('btnRecommencer').style.display = 'none';
  document.getElementById('btnMenu').style.display = 'none';
  document.getElementById('zoneCarte').innerHTML = '';
  document.getElementById('grille').innerHTML = '';
};