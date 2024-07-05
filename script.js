let words = [];

async function loadWords() {
    const response = await fetch('words.txt');
    const text = await response.text();
    words = text.split('\n').filter(word => word.trim() !== '');
}

function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    // 左端のはみ出しを許可するため、-10%から100%の範囲で設定
    raindrop.style.left = `${Math.random() * 110 - 10}%`;
    raindrop.style.top = '-20px';
    // フォントサイズをランダムに設定（12pxから24pxの範囲）
    const fontSize = Math.floor(Math.random() * (24 - 12 + 1)) + 12;
    raindrop.style.fontSize = `${fontSize}px`;
    raindrop.textContent = words[Math.floor(Math.random() * words.length)];
    document.getElementById('rain-container').appendChild(raindrop);

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
