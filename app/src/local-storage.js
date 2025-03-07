
export const setLocalStorageKey = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting localStorage key ${key}:`, e);
    }
  };
  
  // Gets a value from localStorage with a default fallback
  export const getLocalStorageKey = (key, defaultValue = []) => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      console.error(`Error parsing localStorage item for key ${key}:`, e);
      return defaultValue;
    }
  };
  
  // Adds a new palette to localStorage
  export const addPalette = (newPalette) => {
    const palettes = getLocalStorageKey('palettes');
    if (Array.isArray(palettes)) {
      palettes.push(newPalette);
      setLocalStorageKey('palettes', palettes);
    } else {
      console.error('Expected an array, but found:', palettes);
    }
  };
  
  // Removes a palette from localStorage by UUID
  export const removePalette = (paletteUuid) => {
    let palettes = getLocalStorageKey('palettes');
    if (Array.isArray(palettes)) {
      palettes = palettes.filter((palette) => palette.uuid !== paletteUuid);
      setLocalStorageKey('palettes', palettes);
    } else {
      console.error('Expected an array of palettes, but found:', palettes);
    }
  };
  
  // Initializes palettes if localStorage is empty
  export const initPalettesIfEmpty = () => {
    const palettes = getLocalStorageKey('palettes');
    if (palettes.length === 0) {
      fetch('./palettes.json')
        .then((response) => response.json())
        .then((defaultPalettes) => {
          const formattedPalettes = Array.isArray(defaultPalettes) ? defaultPalettes : Object.values(defaultPalettes);

        //stores it
          setLocalStorageKey('palettes', formattedPalettes);
        })
        .catch((e) => {
          console.error('Error loading default palettes from JSON:', e);
        });
    }
  };
  