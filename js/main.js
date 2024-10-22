//Example fetch using DnD5eAPI - place subclasses in ul
// document.querySelector('button').addEventListener('click', getFetch)
getAllSpells()

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://www.dnd5eapi.co/api/spells/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getAllSpells(){
    const choice = document.querySelector('input').value
    const url = `https://www.dnd5eapi.co/api/spells`
    let names = ''
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data.results[0].name)
          data.results.forEach(element => {
            
            const li = document.createElement('li')
            li.textContent = element.name
            if(element.level === 1) document.getElementById('all_spells1').appendChild(li)
            if(element.level === 2) document.getElementById('all_spells2').appendChild(li)
            if(element.level === 3) document.getElementById('all_spells3').appendChild(li)
            if(element.level === 4) document.getElementById('all_spells4').appendChild(li)
            if(element.level === 5) document.getElementById('all_spells5').appendChild(li)
            if(element.level === 6) document.getElementById('all_spells6').appendChild(li)
          });
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }
