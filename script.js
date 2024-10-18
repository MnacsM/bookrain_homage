let words = [];

const colorMap = {
    '水': '#3498db',
    '炎': '#e74c3c',
    '雷': '#f1c40f',
    '岩': '#95a5a6',
    '風': '#2ecc71',
    '音': '#1abc9c',  // 明るい緑 - 音の広がりや透明感を表現
    '恋': '#ffa3c2',  // 淡いピンク - 愛や情熱を象徴
    '霞': '#95a5a6',  // グレー - 霧や霞のぼんやりとした印象
    '花': '#f1c40f',  // 明るい黄色 - 華やかで陽気な印象
    '蛇': '#27ae60',  // 深い緑 - 蛇の静けさや神秘を表現
    '蟲': '#8e44ad',  // 紫 - 不思議さや少し不気味な雰囲気
    '月': '#3498db',  // 淡い青 - 静かな夜と月光をイメージ
    '日': '#f39c12',  // 橙色 - 太陽の光と温かさを表現
    '獣': '#e67e22',  // 焦げ茶 - 野生の力強さを象徴
};

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

    const text = words[Math.floor(Math.random() * words.length)];
    raindrop.textContent = text;
    document.getElementById('rain-container').appendChild(raindrop);

    // ランダムなタイミングで色を変更
    const technique = text.split('の')[0];
    const color = colorMap[technique];
    raindrop.style.setProperty('--pulse-color', color);

    if (Math.random() < 0.3) { // 30%の確率で色が変わる
        setTimeout(() => {
            raindrop.classList.add('pulse');
        }, Math.random() * 5000); // 0~5秒後にエフェクト開始
    }

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
