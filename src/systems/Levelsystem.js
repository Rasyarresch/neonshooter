export class LevelSystem {
    constructor() {
        this.level = 1;
        this.currentExp = 0;
        this.expRequired = 50; 
    }

    addExp(amount) {
        this.currentExp += amount;
        if (this.currentExp >= this.expRequired) {
            this.currentExp -= this.expRequired;
            this.level++;
            this.expRequired = Math.floor(this.expRequired * 1.5); 
            return true; 
        }
        return false;
    }

    getUpgrades() {
        const pool = [
            { title: "RAPID FIRE", desc: "Shoot faster", apply: (p) => p.fireRate = Math.max(5, p.fireRate - 3) },
            { title: "VELOCITY", desc: "Faster bullets", apply: (p) => p.bulletSpeed += 3 },
            { title: "AGILITY", desc: "Move faster", apply: (p) => p.lerpSpeed += 0.05 },
            { title: "POWER", desc: "More damage", apply: (p) => p.damage += 1 }
        ];
        
        return pool.sort(() => 0.5 - Math.random()).slice(0, 2);
    }
}