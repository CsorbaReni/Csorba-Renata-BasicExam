function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var charactersAlive = findAliveCharacters(userDatas);
  var button = document.querySelector('#btn');
  sortAliveCharacters(charactersAlive);
  showCharacterList(charactersAlive);
  button.addEventListener('click', function search() {
    searchCharacter(charactersAlive);
  });
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function findAliveCharacters(userDatas) {
  var alivePeople = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (!userDatas[i].dead) {
      alivePeople.push(userDatas[i]);
    }
  }
  return alivePeople;
}

function sortAliveCharacters(charactersAlive) {
  charactersAlive.sort(function sortByNames(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}

function showCharacterList(charactersAlive) {
  var characterTable = document.querySelector('#portraits');
  var characterRows = '';
  sortAliveCharacters(charactersAlive);
  for (var i = 0; i < charactersAlive.length; i++) {
    characterRows += `
      <div class="portraits__div"><img src="${charactersAlive[i].portrait}" alt="${charactersAlive[i].name}"><br><br>${charactersAlive[i].name}<br></div>
      `;
  }
  characterTable.innerHTML = characterRows;
}

function findFlagOfHouse(searchedCharacter) {
  var flagOfHouse = '';
  for (var i = 0; i < Object.keys(searchedCharacter).length; i++) {
    if (searchedCharacter.house) {
      flagOfHouse = `<img src="./assets/houses/${searchedCharacter.house}.png" alt="the flag of ${searchedCharacter.house} house">`;
    }
  }
  return flagOfHouse;
}

function searchCharacter(charactersAlive) {
  var userSearch = document.querySelector('#search-field').value.toLowerCase();
  var resultOfSearch = document.querySelector('#result');
  var searchedCharacter = {};
  var result = `
  <h2>Character not found</h2>`;
  for (var i = 0; i < charactersAlive.length; i++) {
    if (charactersAlive[i].name.toLowerCase().indexOf(userSearch) > -1) {
      searchedCharacter = charactersAlive[i];
      result = `
        <div class="picture"><img src="${charactersAlive[i].picture}" alt="${charactersAlive[i].name}></div>
        <br>
        <div class="name-and-flag>
          <h2>${charactersAlive[i].name}</h2>
          <div class="flag">${findFlagOfHouse(searchedCharacter)}</div>
        </div>
        <p>${charactersAlive[i].bio}</p>`;
    }
    resultOfSearch.innerHTML = result;
  }
  return result;
}