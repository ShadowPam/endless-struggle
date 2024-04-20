import { joke } from "./jokeSource";
import { resolvePromise } from "./resolvePromise";
import enemies from "./Enemies.js";
import basicRewards from "./BasicRewards.js";

const model = {

    mcAlive: true,
    mcName:"Player",
    mcMaxHp: 100,
    mcHp: 100,
    mcAttack: 100,
    mcDefence: 0,
    mcDodge: 0.3,

    enemyAlive: true,
    enemyName:"Some guy",
    enemyKey:"enemy1",
    enemyMaxHp: 100,
    enemyHp: 100,
    enemyAttack: 20,

    currentRound: 0,

    jokePromiseState: {},

    combatState: 0,
    actionIntent: "",

    currentRewards:[],
    currentEnemy:{},

    getEnemy(){
        this.currentEnemy = this.sample(enemies,1)[0]
        this.enemyAlive = true
        this.enemyName = this.currentEnemy.name
        this.enemyKey = this.currentEnemy.key
        this.enemyMaxHp = this.currentEnemy.health
        this.enemyHp = this.enemyMaxHp
        this.enemyAttack = this.currentEnemy.attack
    },

    getBasicRewards(){
        this.currentRewards = this.sample(basicRewards,3)
    },

    sample(arr,nr) {
        var j, x, index;
        for (index = arr.length - 1; index > 0; index--) {
            j = Math.floor(Math.random() * (index + 1));
            x = arr[index];
            arr[index] = arr[j];
            arr[j] = x;
        }
        return arr.slice(0, nr);
    },

    setCombatState(value){
        this.combatState = value;
    },

    declareActionIntent(choice){
        this.actionIntent = choice
    },

    doAttack(){
        this.enemyHp = this.enemyHp - this.mcAttack;
        if (this.enemyHp <= 0){
            this.enemyAlive = false;
        }
    },

    getJoke(categories,blacklist,safe){
        resolvePromise(joke(categories,blacklist,safe), this.jokePromiseState)
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