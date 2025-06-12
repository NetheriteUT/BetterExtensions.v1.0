let charCount = 0;
let popupVisible = false;
let typedText = '';

document.addEventListener('keydown', (e) => {
    if (e.key.length === 1) {
        charCount++;
        typedText += e.key.toLowerCase();

        if (charCount >= 100 && !popupVisible) {
            showPopup();
        }

        if (popupVisible && typedText.includes('touching grass')) {
            hidePopup();
        }

        if (typedText.length > 50) {
            typedText = typedText.slice(-50);
        }
    }
});

function showPopup() {
    popupVisible = true;
    const popup = document.createElement('div');
    popup.id = 'touch-grass-popup';
    popup.innerHTML = `
        <div class="touch-grass-content">
            <h1>GO TOUCH GRASS</h1>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogO3p9--J91KmBy1Xolni0id7EyKVNbir1Q&s" />
        </div>
    `;
    document.body.appendChild(popup);
}

function hidePopup() {
    popupVisible = false;
    const popup = document.getElementById('touch-grass-popup');
    if (popup) popup.remove();
    charCount = 0;
    typedText = '';
}
