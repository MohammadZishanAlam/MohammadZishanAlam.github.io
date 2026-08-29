/**
 * Global Interactive Particle Canvas / Neural Mesh Animation
 * Mohammad Zishan Alam — Full-Page Background Animation
 * Stretches across the entire page from top to bottom
 */
class ParticleCanvas {
    constructor(canvasId = "global-particles") {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.maxDistance = 135;
        this.mouse = { x: null, y: null, radius: 160 };

        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.particles = [];

        // Adjust particle density based on screen dimensions
        const density = window.innerWidth < 768 ? 32 : 68;
        for (let i = 0; i < density; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.85,
                vy: (Math.random() - 0.5) * 0.85,
                radius: Math.random() * 2 + 1.2
            });
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener("resize", () => {
            this.resize();
        }, { passive: true });

        window.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener("mouseleave", () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Touch support for mobile devices
        window.addEventListener("touchmove", (e) => {
            if (e.touches && e.touches[0]) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        }, { passive: true });

        window.addEventListener("touchend", () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        if (!this.ctx || !this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const primaryColor = isLight ? "rgba(2, 106, 167, " : "rgba(0, 242, 254, ";
        const secondaryColor = isLight ? "rgba(0, 140, 215, " : "rgba(79, 172, 254, ";
        const shadowColor = isLight ? "#026aa7" : "#00f2fe";

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Movement
            p.x += p.vx;
            p.y += p.vy;

            // Bounce smoothly off viewport boundaries
            if (p.x < 0) {
                p.x = 0;
                p.vx *= -1;
            } else if (p.x > this.canvas.width) {
                p.x = this.canvas.width;
                p.vx *= -1;
            }

            if (p.y < 0) {
                p.y = 0;
                p.vy *= -1;
            } else if (p.y > this.canvas.height) {
                p.y = this.canvas.height;
                p.vy *= -1;
            }

            // Interactive mouse deflection / attraction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius && dist > 0) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.x -= (dx / dist) * force * 1.5;
                    p.y -= (dy / dist) * force * 1.5;
                }
            }

            // Draw particle node
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = primaryColor + (isLight ? "0.65)" : "0.85)");
            this.ctx.shadowBlur = isLight ? 4 : 10;
            this.ctx.shadowColor = shadowColor;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Connect nearby particle nodes
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.maxDistance) {
                    const opacity = (1 - dist / this.maxDistance) * (isLight ? 0.18 : 0.28);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = secondaryColor + opacity + ")";
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Instantiate on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    new ParticleCanvas("global-particles");
});
