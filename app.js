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
      this.storedChordOptions = util.store('chord-options');
      this.populateBars();
      this.randomizeEvent();
    },

    techniques: [
      "Minor-Pentatonic",
      "Major-Pentatonic",
      "Double-Stops",
      "Blues-Mindset",
      "BB-Box",
      "Chord-Tones",
      "Chord-Voicings",
      "Hybrid-BS",
      "Hybrid-Flat-5th",
      "Never-Lost",
      "Mixolydian",
      "Mixo-Dorian",
      "Blues-Mindset",
      "Hybrid-BS",
      "Major-Pentatonic",
      "Hybrid-Flat-5th"
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
      "Hybrid-BS",
      "Major-Pentatonic",
      "Hybrid-Flat-5th",
    ],

    symbolHashTable: {
      "Minor-Pentatonic": "./svg/pentagon-svgrepo-com.svg",
      "Major-Pentatonic": './svg/parade-marching-svgrepo-com.svg',
      "Double-Stops": "./svg/stop-svgrepo-com.svg",
      "Blues-Mindset": "./svg/head-svgrepo-com.svg",
      "BB-Box": "./svg/box-svgrepo-com.svg",
      "Chord-Tones": "./svg/music-note-list-svgrepo-com.svg",
      "Chord-Voicings": "./svg/voice-svgrepo-com.svg",
      "Hybrid-BS": "./svg/diagram-svgrepo-com.svg",
      "Hybrid-Flat-5th": './svg/flat-tire-svgrepo-com.svg',
      "Never-Lost": "./svg/map-svgrepo-com.svg",
      "Mixolydian": "./svg/mix-svgrepo-com.svg",
      "Mixo-Dorian": "./svg/hat-svgrepo-com.svg",
      "Blues-Mindset": "./svg/head-svgrepo-com.svg",
      "Hybrid-BS": "./svg/diagram-svgrepo-com.svg",
      "Major-Pentatonic": "./svg/parade-marching-svgrepo-com.svg",
      "Hybrid-Flat-5th": "./svg/flat-tire-svgrepo-com.svg"
    },

    populateBars: function () {
      for (var i = 0; i < 12; i++) {
        var barId = i + 1;
        var gridContainer = document.getElementById(barId);

        // build technique  drop down div
        var dropDownDiv = document.createElement('div');
        var form = document.createElement('form');
        var select = document.createElement('select');
        var option = document.createElement('option');
        option.innerHTML = "Technique";
        select.setAttribute("id", "selectTechnique" + barId);
        select.classList.add("select-technique");
        form.setAttribute("id", "formId" + barId);
        dropDownDiv.classList.add("grid-item", "drop-down");
        select.appendChild(option);
        form.appendChild(select);
        dropDownDiv.appendChild(form);
        gridContainer.appendChild(dropDownDiv);

        // build 'of the chord" div
        var ofTheDiv = document.createElement('div');
        var chordForm = document.createElement('form');
        var chordSelect = document.createElement('select');
        var chordOption = document.createElement('option');
        var chordOptionOne = document.createElement('option');
        var chordOptionFour = document.createElement('option');
        var chordOptionFive = document.createElement('option');
        chordOption.innerHTML = "of the";
        chordOptionOne.textContent = '1';
        chordOptionFour.textContent = '4';
        chordOptionFive.textContent = '5';
        chordSelect.setAttribute('id', 'selectChord' + barId);
        chordSelect.classList.add('chord-select');
        ofTheDiv.classList.add("grid-item", "chord-drop-down");
        chordSelect.appendChild(chordOption);
        chordSelect.appendChild(chordOptionOne);
        chordSelect.appendChild(chordOptionFour);
        chordSelect.appendChild(chordOptionFive);
        chordForm.appendChild(chordSelect);
        ofTheDiv.appendChild(chordForm);
        gridContainer.appendChild(ofTheDiv);

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

        // build forth quarter spacer div
        var quarter4div = document.createElement('div');
        quarter4div.classList.add('grid-item', 'quarter4');
        quarter4div.setAttribute('id', 'quarterFour' + barId);
        gridContainer.appendChild(quarter4div);

        //assign bar background color classes
        if (
          barId === 1 ||
          barId === 2 ||
          barId === 3 ||
          barId === 4 ||
          barId === 7 ||
          barId === 8 ||
          barId === 11
        ) {
          quarter1div.classList.add('one-chord');
          techniqueDiv.classList.add('one-chord');
          symbolDiv.classList.add('one-chord');
          quarter4div.classList.add('one-chord');
        }

        if (barId === 9) {
          quarter1div.classList.add('five-chord');
          techniqueDiv.classList.add('five-chord');
          symbolDiv.classList.add('five-chord');
          quarter4div.classList.add('five-chord');
        }

        select.addEventListener('change', this.onTechniqueChange.bind(this));
        select.barId = barId;
        chordSelect.addEventListener('change', this.onChordChange.bind(this));
        chordSelect.barId = barId;


        select.addEventListener('change', this.onTechniqueChange.bind(this));
        select.barId = barId;
        chordSelect.addEventListener('change', this.onChordChange.bind(this));
        chordSelect.barId = barId;

        this.buildTechniqueDropDown(barId);
        this.setTechniquesAndSymbols(barId);
      }
    },

    buildTechniqueDropDown: function (barId) {
      var select = document.getElementById("selectTechnique" + barId);

      for (technique of this.techniques) {
        var el = document.createElement("option");
        el.textContent = technique;
        el.value = technique;
        select.appendChild(el);
      }
    },

    setTechniquesAndSymbols: function (barId) {
      if (!this.storedTechniques.length) {
        for (var item of this.defaultTechniqueOrder) {
          this.storedTechniques.push(item);
        }
        util.store('blues-matrix', this.storedTechniques);
      }

      if (!this.storedChordOptions.length) {
        this.storedChordOptions = new Array(12).fill('');
        util.store('chord-options', this.storedChordOptions);
      }

      // set technique
      document.getElementById("technique" + barId).innerHTML = this.storedTechniques[barId - 1];

      // set svg symbol image
      var symbolElement = document.getElementById("symbol" + barId);
      var imageElement = document.createElement("img");
      var symbolElement = document.getElementById("symbol" + barId);
      while (symbolElement.firstChild) {
        symbolElement.removeChild(symbolElement.firstChild);
      }
      imageElement.setAttribute("src", this.symbolHashTable[this.storedTechniques[barId - 1]]);
      symbolElement.appendChild(imageElement);

      // set chord options
      var select = document.getElementById('selectChord' + barId);
      var chordOptionDiv = document.getElementById("quarterFour" + barId);
      var chordOption = this.storedChordOptions[barId - 1];
      if (chordOption.length) {
        chordOptionDiv.innerHTML = '(of the ' + chordOption + ')';
        for (option of select.options) {
          if (option.value === chordOption) {
            option.selected = true;
          }
        }
      }
    },

    onTechniqueChange: function (e) {
      var select = e.target;
      var barId = select.barId;
      var value = e.target.value;

      if (value !== "Technique") {
        this.storedTechniques[barId - 1] = value;
        util.store('blues-matrix', this.storedTechniques);
        this.setTechniquesAndSymbols(barId);
      }
    },

    onChordChange: function (e) {
      var chordSelect = e.target;
      var barId = chordSelect.barId;
      var value = e.target.value;
      var techniqueDiv = document.getElementById("technique" + barId);

      if (value !== 'of the') {
        techniqueDiv.innerHTML = this.storedTechniques[barId - 1] + "(" + value + ")";
      } else {
        techniqueDiv.innerHTML = this.storedTechniques[barId - 1];
      }
    },

    randomizeEvent: function () {
      var randomizeButton = document.getElementById('randomize');
      randomizeButton.addEventListener('click', this.randomize.bind(this));
    },

    randomize: function (e) {
      var randomizedTechniques = this.defaultTechniqueOrder.slice();
      var currentIndex = randomizedTechniques.length, randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [randomizedTechniques[currentIndex], randomizedTechniques[randomIndex]] = [
          randomizedTechniques[randomIndex], randomizedTechniques[currentIndex]];
      }
      randomizedTechniques[5] = randomizedTechniques[4];
      this.storedTechniques = randomizedTechniques;
      util.store('blues-matrix', this.storedTechniques);
      for (var i = 0; i < randomizedTechniques.length; i++) {
        this.setTechniquesAndSymbols(i + 1);
        // reset chord options
        var select = document.getElementById('selectChord' + (i + 1));
        select.options[0].selected = true;
      }
      this.storedChordOptions = new Array(12).fill('');
      util.store('chord-options', this.storedChordOptions);
    },

  };
  App.init();
})();

