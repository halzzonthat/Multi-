document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.founder-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 15;
            const rotateX = ((centerY - y) / centerY) * 15;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 50px rgba(0,0,0,0.5)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    const dotCount = 12;
    const dots = [];
    const trailContainer = document.getElementById('trail-container');
    if (trailContainer) {
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            const scale = 1 - (i / dotCount) * 0.8;
            dot.style.transform = `scale(${scale})`;
            dot.style.opacity = 1 - (i / dotCount);
            trailContainer.appendChild(dot);
            dots.push({ el: dot, x: 0, y: 0 });
        }
    }

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        let x = mouseX, y = mouseY;
        dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.35;
            dot.y += (y - dot.y) * 0.35;
            dot.el.style.left = `${dot.x}px`;
            dot.el.style.top = `${dot.y}px`;
            x = dot.x; y = dot.y;
        });
        requestAnimationFrame(animate);
    }
    animate();

    const audioSource = 'song.mp3';
    const player = new Audio(audioSource);
    player.loop = true;
    player.volume = 1.0;

    let hasInteracted = false;

    const masterPlay = () => {
        if (hasInteracted) return;
        player.play().then(() => {
            hasInteracted = true;
            ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'].forEach(evt => {
                window.removeEventListener(evt, masterPlay);
            });
        }).catch(() => {});
    };

    window.addEventListener('mousemove', () => player.load(), { once: true });
    ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'].forEach(evt => {
        window.addEventListener(evt, masterPlay, { passive: true });
    });
});