export class InputHandler {
    constructor(canvas, callbacks) {
        this.mouse = { x: canvas.width / 2, y: canvas.height / 2, clicked: false };
        this.callbacks = callbacks; // Expects an object: { onClick, onPauseToggle }

        // Track mouse position
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Handle clicks
        canvas.addEventListener('mousedown', () => {
            this.mouse.clicked = true;
            if (this.callbacks.onClick) {
                this.callbacks.onClick(this.mouse);
            }
        });

        canvas.addEventListener('mouseup', () => {
            this.mouse.clicked = false;
        });

        // Handle Keyboard (Pause)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
                if (this.callbacks.onPauseToggle) {
                    this.callbacks.onPauseToggle();
                }
            }
        });
    }
}