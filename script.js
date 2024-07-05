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

    // フォントサイズをランダムに設定（10pxから40pxの範囲）
    const fontSize = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    raindrop.style.fontSize = `${fontSize}px`;

    raindrop.textContent = words[Math.floor(Math.random() * words.length)];
    document.getElementById('rain-container').appendChild(raindrop);

    let position = -20;
    // ベースの落下速度をランダムに設定（1から10の範囲）
    let baseSpeed = Math.random() * 9 + 1;
    // フォントサイズに応じて速度を調整（大きいほど遅く）
    let speed = baseSpeed * (25 / fontSize);
    
    const interval = setInterval(() => {
        position += speed;
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
