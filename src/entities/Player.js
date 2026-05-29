export class Player {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 50;
        this.radius = 15;
        this.color = '#00ffff';
        
        // Base Stats (Upgradeable)
        this.fireRate = 15;      // Lower is faster
        this.bulletSpeed = 10;   // Higher is faster
        this.lerpSpeed = 0.15;   // Higher is faster movement
        this.damage = 1;         // Bullet damage
    }

    update(mouseX) {
        this.x += (mouseX - this.x) * this.lerpSpeed;
        
        if (this.x < this.radius) this.x = this.radius;
        if (this.x > this.canvasWidth - this.radius) this.x = this.canvasWidth - this.radius;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(this.radius, this.radius);
        ctx.lineTo(-this.radius, this.radius);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}