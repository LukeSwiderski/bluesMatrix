(function loadApp() {
  var util = {
    store: function (namespace, data) {
      if (arguments.length > 1) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      } else {
        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
      }
    }
  }

  var App = {
    init: function () {
      this.storedTechniques = util.store('blues-matrix');
      this.populateBars();
    },

    techniques: [
      "Minor-Pentatonic",
      "Double-Stops",
      "BB-Box",
      "Chord-Tones",
      "Chord-Voicings",
      "Never-Lost",
      "Mixolydian",
      "Mixo-Dorian",
    ],

    defaultTechniqueOrder: [
      "Minor-Pentatonic",
      "Double-Stops",
      "BB-Box",
      "Chord-Tones",
      "Chord-Voicings",
      "Chord-Voicings",
      "Never-Lost",
      "Mixolydian",
      "Mixo-Dorian",
      "Double-Stops",
      "Chord-Tones",
      "Minor-Pentatonic",
    ],

    symbolHashTable: {
      "Minor-Pentatonic": "./svg/pentagon-svgrepo-com.svg",
      "Double-Stops": "./svg/stop-svgrepo-com.svg",
      "BB-Box": "./svg/box-svgrepo-com.svg",
      "Chord-Tones": "./svg/music-note-list-svgrepo-com.svg",
      "Chord-Voicings": "./svg/voice-svgrepo-com.svg",
      "Never-Lost": "./svg/map-svgrepo-com.svg",
      "Mixolydian": "./svg/mix-svgrepo-com.svg",
      "Mixo-Dorian": "./svg/hat-svgrepo-com.svg",
    },

    populateBars: function () {
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

        select.addEventListener('change', this.onChange.bind(this));
        select.barId = barId;

        this.buildDropDown(barId);
        this.setTechniquesAndSymbols(barId);
      }
    },

    buildDropDown: function (barId) {
      var select = document.getElementById("selectTechnique" + barId);

      for (technique of this.techniques) {
        var el = document.createElement("option");
        el.textContent = technique;
        el.value = technique;
        select.appendChild(el);
      }
    },

    setTechniquesAndSymbols: function (barId) {
      var techniques;
      if (this.storedTechniques.length) {
        techniques = this.storedTechniques;
      } else {
        techniques = this.defaultTechniqueOrder;
      }
      document.getElementById("technique" + barId).innerHTML = techniques[barId - 1];
      var symbolElement = document.getElementById("symbol" + barId);
      var imageElement = document.createElement("img");
      var symbolElement = document.getElementById("symbol" + barId);
      while (symbolElement.firstChild) {
        symbolElement.removeChild(symbolElement.firstChild);
      }
      imageElement.setAttribute("src", this.symbolHashTable[techniques[barId - 1]]);
      symbolElement.appendChild(imageElement);
    },

    onChange: function (e) {
      var select = e.target;
      var barId = select.barId;
      var value = e.target.value;

      if (value !== "Choose Technique") {
        this.storedTechniques[barId - 1] = value;
        util.store('blues-matrix', this.storedTechniques);
        this.setTechniquesAndSymbols(barId);
      }
    },

  };
  App.init();
})();

