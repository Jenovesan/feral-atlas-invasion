document.addEventListener('DOMContentLoaded', function() {
    const stanzas = document.querySelectorAll('.stanza');
    const musselsContainer = document.getElementById('mussels-container');
    const body = document.body;
    const containerWidth = musselsContainer.offsetWidth;

    let currentStanza = 0;
    let musselCount = 0;
    let waterOpacity = 0;

    function updateWaterColor() {
        const startColor = {r: 0, g: 77, b: 102}; // #004d66
        const endColor = {r: 153, g: 204, b: 255}; // #99ccff

        const r = Math.round(startColor.r + (endColor.r - startColor.r) * waterOpacity);
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * waterOpacity);
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * waterOpacity);

        body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    function getRandomPosition() {
        return {
            x: Math.random() * (containerWidth - 40),
            y: Math.random() * 60
        };
    }

    function addMussels(count) {
        const maxMussels = 2000;
        const actualCount = Math.min(count, maxMussels);

        for (let i = 0; i < actualCount; i++) {
            const mussel = document.createElement('div');
            mussel.className = 'mussel';

            const position = getRandomPosition();
            mussel.style.left = `${position.x}px`;
            mussel.style.bottom = `${position.y}px`;

            musselsContainer.appendChild(mussel);

            setTimeout(() => {
                mussel.classList.add('visible');
            }, 20 * Math.min(i, 100));
        }
    }

    function progressPoem() {
        if (currentStanza < stanzas.length) {
            stanzas[currentStanza].classList.add('visible');
            waterOpacity = Math.min(0.9, waterOpacity + (1 / stanzas.length));
            updateWaterColor();

            const newMussels = musselCount === 0 ? 1 : musselCount * 3;
            addMussels(newMussels);
            musselCount = newMussels;

            currentStanza++;
        }
    }

    document.addEventListener('click', progressPoem);
});
