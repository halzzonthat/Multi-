document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.getElementById('loader');
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('.nav-btn');

    const removeLoader = () => {
        setTimeout(() => {
            body.classList.remove('loading');
            setTimeout(() => {
                if (loader) loader.style.display = 'none';
            }, 800);
        }, 1200);
    };

    if (document.readyState === 'complete') {
        removeLoader();
    } else {
        window.addEventListener('load', removeLoader);
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection && !button.classList.contains('active')) {
                navButtons.forEach(btn => btn.classList.remove('active'));
                sections.forEach(sec => sec.classList.remove('active'));
                button.classList.add('active');
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
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

    function animateTrails() {
        let x = mouseX, y = mouseY;
        dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.35;
            dot.y += (y - dot.y) * 0.35;
            dot.el.style.left = `${dot.x}px`;
            dot.el.style.top = `${dot.y}px`;
            x = dot.x; y = dot.y;
        });
        requestAnimationFrame(animateTrails);
    }
    animateTrails();

    const expandBtn = document.getElementById('expand-receipts');
    const details = document.getElementById('receipts-details');
    if (expandBtn && details) {
        expandBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = details.classList.contains('active');
            if (isActive) {
                details.classList.remove('active');
                expandBtn.innerText = 'VIEW';
            } else {
                details.classList.add('active');
                expandBtn.innerText = 'HIDE';
            }
        });
    }

    const audioSource = 'music.mp3';
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

    const logo = document.getElementById('logo');
    if (logo) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            logo.style.transform = `translate(${(mouseX - 0.5) * 15}px, ${(mouseY - 0.5) * 15}px)`;
        });
    }
});
