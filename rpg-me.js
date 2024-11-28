/**
 * Copyright 2024 raen-max
 * @license Apache-2.0, see LICENSE for full text.
 */
// Function to update the character based on input values
function updateCharacter() {
  const character = document.getElementById("character");
  
  // Get values from the inputs
  const accessories = document.querySelector('wired-radio-group#accessories').value;
  const base = document.querySelector('wired-radio-group#base').value;
  const hatcolor = document.querySelector('wired-radio-group#hatcolor').value;
  const fire = document.getElementById("fire").checked;

  // Update the character's attributes (passing them as attributes to the <rpg-character> element)
  character.setAttribute('accessories', accessories);
  character.setAttribute('base', base);
  character.setAttribute('hatcolor', hatcolor);
  character.setAttribute('fire', fire);

  // Generate a unique seed based on current settings (this will be used in the URL for sharing)
  const seed = generateSeed(accessories, base, hatcolor, fire);
  
  // Update the display of the seed value below the character
  document.getElementById("seed-display").innerText = `Seed: ${seed}`;

  // Update the share link that will be copied to clipboard
  updateShareLink(seed);
}

// Function to generate a unique seed based on current settings
function generateSeed(accessories, base, hatcolor, fire) {
  // A simple seed format: each setting corresponds to a digit or boolean value
  // We combine all settings into a string (which will be used as the URL parameter)
  return `${accessories}${base}${hatcolor}${fire ? 1 : 0}`;
}

// Function to update the shareable link
function updateShareLink(seed) {
  const url = `${window.location.origin}${window.location.pathname}?seed=${seed}`;
  document.getElementById("share-link").innerText = `Share Link: ${url}`;
}

// Event listeners for the form inputs
document.getElementById("accessories").addEventListener("change", updateCharacter);
document.getElementById("base").addEventListener("change", updateCharacter);
document.getElementById("hatcolor").addEventListener("change", updateCharacter);
document.getElementById("fire").addEventListener("change", updateCharacter);

// Copy the share link to clipboard when the "Copy Share Link" button is clicked
document.getElementById("share-button").addEventListener("click", function() {
  const shareLink = document.getElementById("share-link").innerText;
  const textToCopy = shareLink.replace("Share Link: ", "");
  navigator.clipboard.writeText(textToCopy)
    .then(() => alert('Link copied to clipboard!'))
    .catch(err => alert('Failed to copy text: ' + err));
});

// Function to handle URL parameters when the page loads
function handleURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const seed = urlParams.get('seed');
  
  if (seed) {
    // Set the character based on the seed value passed in the URL
    document.querySelector('wired-radio-group#accessories').value = seed[0];
    document.querySelector('wired-radio-group#base').value = seed[1];
    document.querySelector('wired-radio-group#hatcolor').value = seed[2];
    document.getElementById("fire").checked = seed[3] === '1';

    // Update the character and the UI to reflect the URL parameters
    updateCharacter();
  }
}

// Initialize the page by checking for URL parameters and applying them if present
handleURLParams();

// Ensure the character is correctly displayed on page load (even without URL params)
updateCharacter();
