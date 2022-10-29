

var techniques = [
  "Minor-Pentatonic",
  "Double-Stops",
  "BB-Box",
  "Chord-Tones",
  "Chord-Voicings",
  "Never-Lost",
  "Mixolydian",
  "Mixo-Dorian",
];

var symbolHashTable = {
  "Minor-Pentatonic": "./svg/pentagon-svgrepo-com.svg",
  "Double-Stops": "./svg/stop-svgrepo-com.svg",
  "BB-Box": "./svg/box-svgrepo-com.svg",
  "Chord-Tones": "./svg/music-note-list-svgrepo-com.svg",
  "Chord-Voicings": "./svg/voice-svgrepo-com.svg",
  "Never-Lost": "./svg/map-svgrepo-com.svg",
  "Mixolydian": "./svg/mix-svgrepo-com.svg",
  "Mixo-Dorian": "./svg/hat-svgrepo-com.svg",
}

function buildDropDown(barId) {
  var select = document.getElementById("selectTechnique" + barId);

  for (technique of techniques) {
    var el = document.createElement("option");
    el.textContent = technique;
    el.value = technique;
    select.appendChild(el);
  }
}

function populateBars() {
  for (var i = 0; i < 12; i++) {
    var barId = i + 1;
    var gridContainer = document.getElementById(barId);

    // build drop down div
    var dropDownDiv = document.createElement('div');
    var form = document.createElement('form');
    var select = document.createElement('select');
    var option = document.createElement('option');
    option.innerHTML = "Choose Technique";
    select.setAttribute("id", "selectTechnique" + barId);
    form.setAttribute("id", "formId" + barId);
    dropDownDiv.classList.add("grid-item", "drop-down");
    select.appendChild(option);
    form.appendChild(select);
    dropDownDiv.appendChild(form);
    gridContainer.appendChild(dropDownDiv);

    // build technique div
    var techniqueDiv = document.createElement('div');
    techniqueDiv.classList.add('grid-item', 'technique');
    techniqueDiv.setAttribute('id', 'technique' + barId);
    gridContainer.appendChild(techniqueDiv);

    // build symbol div
    var symbolDiv = document.createElement('div');
    symbolDiv.classList.add('grid-item', 'symbol');
    symbolDiv.setAttribute('id', 'symbol' + barId);
    gridContainer.appendChild(symbolDiv);

    buildDropDown(barId);
    setEvents(barId);
  }
}

function setEvents(barId) {
  var select = document.getElementById('selectTechnique' + barId);
  document.getElementById("technique" + barId).innerHTML = techniques[0];
  var symbolElement = document.getElementById("symbol" + barId);
  var imageElement = document.createElement("img");
  imageElement.setAttribute("src", symbolHashTable["Minor-Pentatonic"]);
  symbolElement.appendChild(imageElement);

  select.onchange = function () {
    var techniqueName = document.getElementById('selectTechnique' + barId).value;
    var symbol = symbolHashTable[techniqueName];
    if (techniqueName !== "Choose technique") {
      document.getElementById("technique" + barId).innerHTML = techniqueName;
      var symbolElement = document.getElementById("symbol" + barId);
      while (symbolElement.firstChild) {
        symbolElement.removeChild(symbolElement.firstChild);
      }
      var imageElement = document.createElement("img");
      imageElement.setAttribute("src", symbol);
      symbolElement.appendChild(imageElement);
    }
  }
}

// buildDropDown();
// setEvents();
populateBars();




