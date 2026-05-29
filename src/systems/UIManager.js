export class UIManager {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    drawMenu() {
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = '30px "Press Start 2P"';
        this.ctx.fillText('NEON', this.canvas.width / 2, this.canvas.height / 2 - 40);
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillText('SHOOTER', this.canvas.width / 2, this.canvas.height / 2 + 10);
        this.ctx.font = '10px "Press Start 2P"';
        this.ctx.fillStyle = (Math.floor(Date.now() / 500) % 2 === 0) ? '#ff0055' : 'transparent';
        this.ctx.fillText('CLICK TO START', this.canvas.width / 2, this.canvas.height / 2 + 80);
    }

    drawHUD(levelSystem, score, highscore) {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '12px "Press Start 2P"';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`LVL: ${levelSystem.level}  SCORE: ${score}`, 15, 30);
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`HI: ${highscore}`, this.canvas.width - 15, 30);

        // EXP Bar Drawing
        const expWidth = (levelSystem.currentExp / levelSystem.expRequired) * this.canvas.width;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, 5);
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillRect(0, 0, expWidth, 5);
    }

    drawLevelUp(activeUpgrades, mouse) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ffff';
        this.ctx.textAlign = 'center';
        this.ctx.font = '20px "Press Start 2P"';
        this.ctx.fillText('LEVEL UP!', this.canvas.width / 2, this.canvas.height / 2 - 100);

        activeUpgrades.forEach((upg, i) => {
            const boxY = this.canvas.height / 2 - 30 + (i * 70);
            
            const isHover = mouse.x > this.canvas.width/2 - 120 && mouse.x < this.canvas.width/2 + 120 &&
                            mouse.y > boxY - 25 && mouse.y < boxY + 25;

            this.ctx.fillStyle = isHover ? '#ff0055' : '#222';
            this.ctx.strokeStyle = '#00ffff';
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.rect(this.canvas.width/2 - 120, boxY - 25, 240, 50);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = 'white';
            this.ctx.font = '10px "Press Start 2P"';
            this.ctx.fillText(upg.title, this.canvas.width/2, boxY);
            
            this.ctx.fillStyle = '#aaa';
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillText(upg.desc, this.canvas.width/2, boxY + 15);
        });
    }

    drawPause(mouse) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ffff';
        this.ctx.textAlign = 'center';
        this.ctx.font = '30px "Press Start 2P"';
        this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2 - 80);

        const cy = this.canvas.height / 2;
        this.ctx.font = '15px "Press Start 2P"';
        
        this.ctx.fillStyle = (mouse.y > cy - 30 && mouse.y < cy + 5) ? '#ff0055' : 'white';
        this.ctx.fillText('RESUME', this.canvas.width / 2, cy - 10);
        
        this.ctx.fillStyle = (mouse.y > cy + 10 && mouse.y < cy + 45) ? '#ff0055' : 'white';
        this.ctx.fillText('RETRY', this.canvas.width / 2, cy + 30);
        
        this.ctx.fillStyle = (mouse.y > cy + 50 && mouse.y < cy + 85) ? '#ff0055' : 'white';
        this.ctx.fillText('EXIT', this.canvas.width / 2, cy + 70);
    }

    drawGameOver(score, highscore) {
        this.ctx.fillStyle = '#ff0055';
        this.ctx.textAlign = 'center';
        this.ctx.font = '30px "Press Start 2P"';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px "Press Start 2P"';
        this.ctx.fillText(`FINAL SCORE: ${score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
        
        if (score >= highscore && score > 0) {
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillText(`NEW HIGH SCORE!`, this.canvas.width / 2, this.canvas.height / 2 + 60);
        } else {
            this.ctx.fillStyle = '#aaaaaa';
            this.ctx.fillText(`HIGH SCORE: ${highscore}`, this.canvas.width / 2, this.canvas.height / 2 + 60);
        }
    }
}
