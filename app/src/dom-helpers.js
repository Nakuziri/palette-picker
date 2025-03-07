
import { removePalette } from './local-storage.js';  


export const renderPalette = (palette, paletteSection) => {
    const paletteElement = document.createElement('li');
    paletteElement.classList.add('palette-item');
    
    const title = document.createElement('h3');
    title.textContent = palette.title;
    paletteElement.appendChild(title);
    
    const colorsContainer = document.createElement('div');
    colorsContainer.classList.add('colors-container');
    
    palette.colors.forEach((color) => {
      const colorDiv = document.createElement('div');
      colorDiv.classList.add('color-box');
      colorDiv.style.backgroundColor = color;
      
      const colorText = document.createElement('p');
      colorText.textContent = color;
      colorText.style.color = '#fff';
      colorDiv.appendChild(colorText);
      
      // Creates copy button for each color
      const copyButton = document.createElement('button');
      copyButton.classList.add('copy-btn');
      copyButton.textContent = `Copy ${color}`;
      copyButton.onclick = () => {
        navigator.clipboard.writeText(color).then(() => {
          copyButton.textContent = 'Copied hex!';
          setTimeout(() => {
            copyButton.textContent = `Copy ${color}`;
          }, 1000);
        });
      };
      
      // Add color and copy button to the container
      const colorContainer = document.createElement('div');
      colorContainer.classList.add('color-item');
      colorContainer.appendChild(colorDiv);
      colorContainer.appendChild(copyButton);
      
      colorsContainer.appendChild(colorContainer);
    });
  
    paletteElement.appendChild(colorsContainer);
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      removePalette(palette.uuid);
      paletteSection.removeChild(paletteElement);
    };
    paletteElement.appendChild(deleteButton);
  
    const banner = document.createElement('div');
    banner.classList.add('temperature-banner', `temperature-${palette.temperature}`);
    banner.textContent = palette.temperature.charAt(0).toUpperCase() + palette.temperature.slice(1);
    paletteElement.appendChild(banner);
  
    paletteSection.appendChild(paletteElement);
  };

  export const copyToClipboard = (color, button) => {
    navigator.clipboard.writeText(color).then(() => {
      button.textContent = 'Copied hex!';
      //1 second timer for copy button
      setTimeout(() => {
        button.textContent = `Copy ${color}`;
      }, 1000);
    });
  };
  