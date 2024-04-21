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
    mcShield: 0,
    mcDefence: 30,
    mcDodge: 0.3,
    mcDodgeTimer: 0,

    enemyAlive: true,
    enemyName:"Some guy",
    enemyKey:"enemy1",
    enemyMaxHp: 100,
    enemyHp: 100,
    enemyAttack: 20,

    currentRound: 1,

    jokePromiseState: {},

    combatState: 0,
    actionIntent: "",
    rewardIntent: 0,

    currentRewards:[],
    currentEnemy:{},

    progressTurn(){
        if (this.mcDodgeTimer > 0){
            this.mcDodgeTimer -= 1
        }
    },

    progressRound(){
        this.currentRound += 1
    },

    getEnemy(){
        this.currentEnemy = this.sample(enemies,1)[0]
        this.enemyAlive = true
        this.enemyName = this.currentEnemy.name
        this.enemyKey = this.currentEnemy.key
        this.enemyMaxHp = this.currentEnemy.health
        this.enemyHp = this.enemyMaxHp
        this.enemyAttack = this.currentEnemy.attack
    },

    collectReward(){
        const currentReward = this.currentRewards[this.rewardIntent]
        if(currentReward.tier == "basic"){
            this.mcAttack += currentReward.attack
            this.mcDefence += currentReward.defence
            this.mcDodge += currentReward.dodge
        }
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

    declareRewardIntent(choice){
        this.rewardIntent = choice
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

    doShield(){
        this.mcShield += this.mcDefence
    },

    doDodge(){
        this.mcDodgeTimer = 2
    },

    getJoke(categories,blacklist,safe){
        resolvePromise(joke(categories,blacklist,safe), this.jokePromiseState)
    },

    getAttacked(){
        let dodgeRoll = 2
        if (this.mcDodgeTimer > 0){
           dodgeRoll = Math.random();
        }
        if (dodgeRoll > this.mcDodge){
            this.mcShield = this.mcShield - this.enemyAttack;
            if (this.mcShield < 0){
                this.mcHp = this.mcHp + this.mcShield;
                this.mcShield = 0;
            }
            if (this.mcHp <= 0){
                this.mcAlive = false;
            }
        }
    },

};

export { model };