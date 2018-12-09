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
  sortAliveCharacters(charactersAlive);
  showCharacterList(charactersAlive);
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
      <div class="portraits__div"><img src="${charactersAlive[i].portrait}" alt="${charactersAlive[i].name}"<br><br>${charactersAlive[i].name}<br></div>
      `;
  }
  characterTable.innerHTML = characterRows;
}