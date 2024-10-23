//Example fetch using DnD5eAPI - place subclasses in ul
document.getElementById('display_known').addEventListener('click', displayKnown)
document.getElementById('display_all').addEventListener('click', displayInfo)


const DNDAPI = 'https://www.dnd5eapi.co'


let allSpells = []
let knownSpells = []

getAllSpellsFromAPI()



async function getAllSpellsFromAPI() {
  const url = `${DNDAPI}/api/spells`;

  try {
    const res = await fetch(url); // Warte, bis die API-Daten geladen sind
    const data = await res.json(); // Warte, bis die JSON-Daten geparst sind
    
    // Speichern der Zaubersprüche im Array
    apiSpells = data.results; // Alle Zaubersprüche speichern
    allSpells = [...apiSpells]; // Kopiere Zaubersprüche in knownSpells
    
    // Jetzt können wir die Zaubersprüche verarbeiten
    addAllSpells();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

async function getSpellInfo(spellPath) {
  const url = `${DNDAPI}${spellPath}`;
  let spellInfo;
  
  try {
    const res = await fetch(url); // Warte, bis die API-Daten geladen sind
    const data = await res.json(); // Warte, bis die JSON-Daten geparst sind   
    
    spellInfo = data;  
  } catch (err) {
    console.log(`Error: ${err}`);
  }

  return spellInfo;
}

function addAllSpells(){
  allSpells.forEach(element => {

    // Erstelle ein neues li Element
    const row = document.createElement('li');
            
    // Erstelle den Button und setze den Text auf "+"
    const button = document.createElement('button');
    button.textContent = '+';
    button.id = `add${element.index}Button`
  
    // Füge den Button vor den Text des li Elements hinzu
    row.appendChild(button);
    
    // Setze den Text des li Elements
    const spellName = document.createTextNode(' ' + element.name);
    row.appendChild(spellName);
  
    button.addEventListener('click', function() {
      addSpellToKnownSpells(element);
    });
  
    if (element.level === 1) document.getElementById('all_spells1').appendChild(row);
    if (element.level === 2) document.getElementById('all_spells2').appendChild(row);
    if (element.level === 3) document.getElementById('all_spells3').appendChild(row);
    if (element.level === 4) document.getElementById('all_spells4').appendChild(row);
    if (element.level === 5) document.getElementById('all_spells5').appendChild(row);
    if (element.level === 6) document.getElementById('all_spells6').appendChild(row);    
  })
}


function addSpellToKnownSpells(spell) {
  if (!spellALreadyKnown(spell)){
    knownSpells.push(spell); 
    console.log(`added ${spell.name} to known spells`);
    updateKnownSpellsUl() 
  }
}

function removeSpellFromKnownSpells (spell){
  for (let i = 0; i < knownSpells.length; i++){
    if(spell.name === knownSpells[i].name){
      knownSpells.splice(i, 1)
      console.log(`removed ${spell.name} from known spells`) 
      updateKnownSpellsUl()     
    }
  }
}

function updateKnownSpellsUl(){
  //clear all knowns spells ULs
  document.getElementById('known_spells1').innerHTML = '';
  document.getElementById('known_spells2').innerHTML = '';
  document.getElementById('known_spells3').innerHTML = '';
  document.getElementById('known_spells4').innerHTML = '';
  document.getElementById('known_spells5').innerHTML = '';
  document.getElementById('known_spells6').innerHTML = '';

  for (let i = 0; i < knownSpells.length; i++){
    const spell = knownSpells[i] 

    // Erstelle ein neues li Element
    const row = document.createElement('li');

      
    // Erstelle den Button und setze den Text auf "+"
    const removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.id = `remove${spell.index}Button`  
  
    // Füge den Button vor den Text des li Elements hinzu
    row.appendChild(removeButton);
    
    removeButton.addEventListener('click', function() {
      removeSpellFromKnownSpells(spell);
    });

        // Setze den Text des li Elements
    const spellName = document.createTextNode(' ' + spell.name + ' ');
    row.appendChild(spellName);  

    //add info-button to li
    const infoButton = document.createElement('Button')
    infoButton.textContent = 'i'
    infoButton.id = `${spell.name}InfoButton`
    row.appendChild(infoButton)
    infoButton.addEventListener('click', function(){
      displayInfo(spell)
    })
    
    if (spell.level === 1) document.getElementById('known_spells1').appendChild(row);
    if (spell.level === 2) document.getElementById('known_spells2').appendChild(row);
    if (spell.level === 3) document.getElementById('known_spells3').appendChild(row);
    if (spell.level === 4) document.getElementById('known_spells4').appendChild(row);
    if (spell.level === 5) document.getElementById('known_spells5').appendChild(row);
    if (spell.level === 6) document.getElementById('known_spells6').appendChild(row);  
  }
}

function spellALreadyKnown(sut){
  let known = false
  knownSpells.forEach(spell => (sut.name === spell.name) ? known = true : {} )
  return known
}


function displayKnown(){
  console.log('Known:')
  console.log(knownSpells)
}

function displayAll(){

  console.log('All:')
  console.log(allSpells)
}

async function displayInfo(spell) {

  const spellInfo = await getSpellInfo(spell.url);
  console.log(spellInfo)

  // Hole das Modal und die Textbox
  var modal = document.getElementById("spellInfo")
  document.getElementById("spellName").textContent = `${spell.name}`
  document.getElementById("spellDescription").textContent = `${spellInfo.desc}`



  // Öffne das Modal
  modal.style.display = "block"

  // Schließe das Modal, wenn der Benutzer auf das "x" klickt
  var closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function() {
    modal.style.display = "none"
  };

  // Schließe das Modal, wenn der Benutzer außerhalb des Popups klickt
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  };
}
