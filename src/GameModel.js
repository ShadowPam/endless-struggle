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
    mcDodge: 0.01,
    mcDodgeTimer: 0,
    mcDodgeRoll: 2,

    enemyAlive: true,
    enemyName:"Some guy",
    enemyKey:"enemy1",
    enemyMaxHp: 100,
    enemyHp: 100,
    enemyAttack: 20,

    currentRound: 1,

    jokePromiseState: {},

    combatState: -1,
    actionIntent: "",
    rewardIntent: 0,

    currentRewards:[],
    currentEnemy:{},

    stateSnapshot:{},
    hasLoadedSnapshot: false,
    shouldRunStateZeroOnReady: true,

    setZeroOnReady(bool){
        this.shouldRunStateZeroOnReady = bool
    },

    progressTurn(){
        if(!this.hasLoadedSnapshot){
            this.mcdodgeRoll = 2
            if (this.mcDodgeTimer > 0){
                this.mcdodgeRoll = Math.random();
            }
        }
        if (this.mcDodgeTimer > 0){
            this.mcDodgeTimer -= 1
        }
    },

    progressRound(){
        this.currentRound += 1
        this.hasLoadedSnapshot = false
        this.currentRewards = []
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
    
    getRewards(){
        if(this.currentRewards.length == 0){ // !hasLoadedSnapshot equivalent
            this.currentRewards = this.sample(basicRewards,3)
        }
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

        if (this.mcDodgeRoll > this.mcDodge){
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
    
    takeStateSnapshot(){
        this.stateSnapshot.mcAlive = this.mcAlive
        this.stateSnapshot.mcMaxHp = this.mcMaxHp
        this.stateSnapshot.mcHp = this.mcHp
        this.stateSnapshot.mcAttack = this.mcAttack
        this.stateSnapshot.mcShield = this.mcShield
        this.stateSnapshot.mcDefence = this.mcDefence
        this.stateSnapshot.mcDodge = this.mcDodge
        this.stateSnapshot.mcDodgeTimer = this.mcDodgeTimer
        this.stateSnapshot.mcDodgeRoll = this.mcDodgeRoll
        this.stateSnapshot.enemyAlive = this.enemyAlive
        this.stateSnapshot.enemyName = this.enemyName
        this.stateSnapshot.enemyKey = this.enemyKey
        this.stateSnapshot.enemyMaxHp = this.enemyMaxHp
        this.stateSnapshot.enemyHp = this.enemyHp
        this.stateSnapshot.enemyAttack = this.enemyAttack
    },
    
    loadStateSnapshot(){
        this.mcAlive = this.stateSnapshot.mcAlive
        this.mcMaxHp = this.stateSnapshot.mcMaxHp
        this.mcHp = this.stateSnapshot.mcHp
        this.mcAttack = this.stateSnapshot.mcAttack
        this.mcShield = this.stateSnapshot.mcShield
        this.mcDefence = this.stateSnapshot.mcDefence
        this.mcDodge = this.stateSnapshot.mcDodge
        this.mcDodgeTimer = this.stateSnapshot.mcDodgeTimer
        this.mcDodgeRoll = this.stateSnapshot.mcDodgeRoll
        this.enemyAlive = this.stateSnapshot.enemyAlive
        this.enemyName = this.stateSnapshot.enemyName
        this.enemyKey = this.stateSnapshot.enemyKey
        this.enemyMaxHp = this.stateSnapshot.enemyMaxHp
        this.enemyHp = this.stateSnapshot.enemyHp
        this.enemyAttack = this.stateSnapshot.enemyAttack
        this.hasLoadedSnapshot = true
    },
    
};

export { model };