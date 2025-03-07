
import { setLocalStorageKey, getLocalStorageKey, addPalette } from './local-storage.js';
import { renderPalette} from './dom-helpers.js';

const defaultPalettes = [
  {
    title: "Ocean Breeze",
    colors: ["#0077b6", "#00b4d8", "#90e0ef"],
    temperature: "neutral"
  },
  {
    title: "Sunset Glow",
    colors: ["#ff5d8f", "#ff98a1", "#f6a5c0"],
    temperature: "warm"
  },
  {
    title: "Forest Retreat",
    colors: ["#0f4b5c", "#a1c4d9", "#f4d35e"],
    temperature: "cool"
  }
];

// Defines the loadPalettes before it's used
const loadPalettes = () => {
  const palettes = getLocalStorageKey('palettes');
  const paletteSection = document.getElementById('palette-section');
  paletteSection.innerHTML = ''; // Clear the section
  palettes.forEach((palette) => renderPalette(palette, paletteSection)); // Render the palettes
};

//initializes palettes if none are found in Storage
function initPalettesIfEmpty() {
  const storedPalettes = getLocalStorageKey('palettes');
  if (!storedPalettes || storedPalettes.length === 0) {
    setLocalStorageKey('palettes', defaultPalettes); // Set default palettes if none exist
  }
  loadPalettes();
}

document.addEventListener('DOMContentLoaded', () => {
  const paletteForm = document.getElementById('palette-form');
  const titleInput = document.getElementById('palette-title');
  const colorInputs = document.querySelectorAll('.color-input');
  const temperatureRadios = document.getElementsByName('temperature');

 //loads default palettes if none exist
  initPalettesIfEmpty();

  //palette form submission
  paletteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!titleInput.value) {
      alert('Title is required!');
      return;
    }

    //Allows only 3 colors for user to select
    const colors = Array.from(colorInputs).map((input) => input.value).slice(0, 3); 
    const temperature = Array.from(temperatureRadios).find((radio) => radio.checked).value;
    const newPalette = {
      uuid: crypto.randomUUID(),
      title: titleInput.value,
      colors,
      temperature,
    };

    addPalette(newPalette); // Adds palette to local storage
    loadPalettes(); // Refreshs displayed palettes
    titleInput.value = ''; // Clear the title input field
    colorInputs.forEach((input) => (input.value = '#000000')); // Resets color inputs
    document.getElementById('neutral').checked = true; // Reset temperature radio to default
  });

  loadPalettes(); // first load of palettes when the page is loaded
});
