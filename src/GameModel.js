import { joke } from "./jokeSource";
import { resolvePromise } from "./resolvePromise";

const model = {

    mcAlive: true,
    mcMaxHp: 100,
    mcHp: 100,
    mcAttack: 10,
    mcDefence: 0,
    mcDodge: 0.3,

    enemyAlive: true,
    enemyMaxHp: 100,
    enemyHp: 100,
    enemyAttack: 10,
    joke: {},

    inCombat: false,

    combatToggle(){
        this.inCombat = !this.inCombat;
    },

    doAttack(){
        this.enemyHp = this.enemyHp - this.mcAttack;
        if (this.enemyHp <= 0){
            this.enemyAlive = false;
        }
    },

    getJoke(categories,blacklist,safe){
        resolvePromise(joke(categories,blacklist,safe), this.joke)
    },

    getAttacked(){
        const dodgeRoll = Math.random();
        if (dodgeRoll > this.mcDodge){
            this.mcDefence = this.mcDefence - this.enemyAttack;
            if (this.mcDefence < 0){
                this.mcHp = this.mcHp + this.mcDefence;
                this.mcDefence = 0;
            }
            if (this.mcHp <= 0){
                this.mcAlive = false;
            }
        }
    },

};

export { model };