let words = [];

async function loadWords() {
    const response = await fetch('words.txt');
    const text = await response.text();
    words = text.split('\n').filter(word => word.trim() !== '');
}

function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 110 - 10}%`;

    const fontSize = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    raindrop.style.fontSize = `${fontSize}px`;

    raindrop.textContent = words[Math.floor(Math.random() * words.length)];
    document.getElementById('rain-container').appendChild(raindrop);

    // ベースの落下速度の範囲を0.3から1.5に調整
    const baseSpeed = Math.random() * 1.2 + 0.3;
    // フォントサイズに応じて速度を調整（大きいほど速く）
    const speed = baseSpeed * (fontSize / 20);

    let position = -fontSize; // 開始位置をフォントサイズの負の値に
    let lastTime = performance.now();

    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        position += speed * (deltaTime / 16);
        raindrop.style.transform = `translateY(${position}px)`;

        if (position > window.innerHeight) {
            raindrop.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

async function init() {
    await loadWords();
    // テキスト生成の間隔を 400ms に設定
    setInterval(createRaindrop, 400);
}

init();
