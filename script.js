let words = [];

async function loadWords() {
    const response = await fetch('words.txt');
    const text = await response.text();
    words = text.split('\n').filter(word => word.trim() !== '');
}

function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 100}%`;
    raindrop.style.top = '-20px';
    raindrop.textContent = words[Math.floor(Math.random() * words.length)];
    document.getElementById('rain-container').appendChild(raindrop);

    let position = -20;
    const interval = setInterval(() => {
        position += 1;
        raindrop.style.top = `${position}px`;

        if (position > window.innerHeight) {
            clearInterval(interval);
            raindrop.remove();
        }
    }, 50);
}

async function init() {
    await loadWords();
    setInterval(createRaindrop, 100);
}

init();
