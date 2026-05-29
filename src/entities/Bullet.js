export class Bullet {
    constructor(x, y, speed, damage = 1) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.speed = speed;
        this.damage = damage;
        this.color = '#ffff00';
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}