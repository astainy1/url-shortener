// References to HTML elements
const generatedLinkContainer = document.getElementById('generated-link-container');
const urlInput = document.getElementById('url');
const generatedLinkBtn = document.getElementById('generated-link-btn');
const copyBtn = document.getElementById('tooltip');
const tooltipText = document.getElementById('tooltip-text');
const generatedLink = document.getElementById('generated-link');

// Disable button initially
function disableButton() {
    generatedLinkBtn.disabled = true;
    generatedLinkBtn.style.cursor = 'not-allowed';
    generatedLinkBtn.style.opacity = 0.6;
    urlInput.style.border = '2px solid #0a667d7a';
}

// Enable button
function enableButton() {
    generatedLinkBtn.disabled = false;
    generatedLinkBtn.style.cursor = 'pointer';
    generatedLinkBtn.style.opacity = 1;
    urlInput.style.border = '2px solid #0a667d';
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            tooltipText.innerHTML = 'Copied!';
        })
        .catch(() => {
            tooltipText.innerHTML = 'Failed to copy';
        });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    disableButton();

    urlInput.addEventListener('input', () => {
        if (urlInput.value.trim().length > 5) {
            enableButton();
        } else {
            disableButton();
        }
    });

    // Copy button click
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            copyToClipboard(generatedLink.textContent);
        });
    }
});
