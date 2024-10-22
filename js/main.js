//Example fetch using DnD5eAPI - place subclasses in ul
document.getElementById('display_known').addEventListener('click', displayKnown)
document.getElementById('display_all').addEventListener('click', displayAll)
document.getElementById('known_lvl1').addEventListener('click', collapse)



let allSpells = []
let knownSpells = []

getSpellsFromAPI()

async function getSpellsFromAPI() {
  const url = `https://www.dnd5eapi.co/api/spells`;

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


function addToKnown(name){}

function addAllSpells(){
  allSpells.forEach(element => {

    // Erstelle ein neues li Element
    const row = document.createElement('li');
            
    // Erstelle den Button und setze den Text auf "+"
    const button = document.createElement('button');
    button.textContent = '+';
    button.id = element.index + '-button'
  
    // Füge den Button vor den Text des li Elements hinzu
    row.appendChild(button);
    
    // Setze den Text des li Elements
    const spellName = document.createTextNode(' ' + element.name);
    row.appendChild(spellName);
  
    button.addEventListener('click', function() {
      console.log(`You clicked on ${element.name}`); 
    });  
  
    // if (element.level === 1) document.getElementById('all_spells1').appendChild(row);
    // if (element.level === 2) document.getElementById('all_spells2').appendChild(row);
    // if (element.level === 3) document.getElementById('all_spells3').appendChild(row);
    // if (element.level === 4) document.getElementById('all_spells4').appendChild(row);
    // if (element.level === 5) document.getElementById('all_spells5').appendChild(row);
    // if (element.level === 6) document.getElementById('all_spells6').appendChild(row);
    
  })
}



function displayKnown(){
  console.log('Known:')
  console.log(knownSpells)
}

function displayAll(){

  console.log('All:')
  console.log(allSpells)
}

function collapse(){
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}