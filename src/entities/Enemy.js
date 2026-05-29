export class Enemy {
    constructor(canvasWidth, level = 1) {
        this.radius = Math.random() * 10 + 10; 
        this.x = Math.random() * (canvasWidth - this.radius * 2) + this.radius;
        this.y = -this.radius;
        this.speed = Math.random() * 2 + 1;
        this.color = '#ff0055';
        
        // HP scales based on player level
        this.maxHp = 1 + Math.floor((level - 1) * 0.8); 
        this.hp = this.maxHp;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx, frames) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        
        ctx.rotate(frames * 0.05);
        ctx.beginPath();
        ctx.rect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.stroke();
        ctx.restore();

        // Draw Health Bar if damaged
        if (this.hp < this.maxHp) {
            const barWidth = this.radius * 2;
            const healthWidth = Math.max(0, (this.hp / this.maxHp) * barWidth);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(this.x - this.radius, this.y - this.radius - 12, barWidth, 4);
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(this.x - this.radius, this.y - this.radius - 12, healthWidth, 4);
        }
    }
}