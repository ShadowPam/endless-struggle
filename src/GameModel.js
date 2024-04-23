import { joke } from "./jokeSource";
import { resolvePromise } from "./resolvePromise";
import enemies from "./Enemies.js";
import basicRewards from "./BasicRewards.js";
import seedrandom from "seedrandom";

const model = {

    mcAlive: true,
    mcName:"Player",
    mcMaxHp: null,
    mcHp: null,
    mcAttack: null,
    mcShield: null,
    mcDefence: null,
    mcDodge: null,
    mcDodgeTimer: null,
    mcDodgeRoll: null,
    mcPRNG: {},

    enemyAlive: true,
    enemyName: null,
    enemyKey: null,
    enemyMaxHp: null,
    enemyHp: null,
    enemyAttack: null,

    currentRound: null,

    jokePromiseState: {},

    combatState: -1,
    actionIntent: null,
    rewardIntent: null,

    currentRewards:[],
    currentEnemy:{},

    seed:null,
    stateSnapshot:{},
    shouldRunStateZeroOnReady: true,
    initialized: false,

    initializeModel() {
        if (!this.initialized) {
            console.log("init")
            this.mcMaxHp = 100
            this.mcHp = 100
            this.mcAttack = 100
            this.mcShield = 0
            this.mcDefence = 30
            this.mcDodge = 0.01
            this.mcDodgeTimer = 0
            this.mcDodgeRoll = 2
            this.currentRound = 1
            this.shouldRunStateZeroOnReady = true

            this.setNewSeed() // seed -1
            this.getEnemy() // current enemy is always from the previous seed

            this.setNewSeed() // start seed (0)
            this.setNewMcPRNG()
    
            this.initialized = true
        }
    },

    setNewMcPRNG(){
        this.mcPRNG = seedrandom(this.seed, {state: true})
    },

    setNewSeed(){
        this.seed = Math.random()
    },

    setZeroOnReady(bool){
        this.shouldRunStateZeroOnReady = bool
    },

    progressTurn(){
        if (this.mcDodgeTimer > 0){
            this.mcdodgeRoll = this.mcPRNG()
            console.log(this.mcdodgeRoll)
        }
        else{
            this.mcdodgeRoll = 2 // 2 -> guaranteed hit
        }
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
    
    getRewards(){
        this.currentRewards = this.sample(basicRewards,3)
    },
    
    sample(arr,nr) {
        const array = [...arr]
        const random = seedrandom(this.seed)
        var j, x, index;
        for (index = array.length - 1; index > 0; index--) {
            j = Math.floor(random() * (index + 1));
            x = array[index];
            array[index] = array[j];
            array[j] = x;
        }
        return array.slice(0, nr);
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
        this.mcdodgeRoll = this.mcPRNG()
        console.log(this.mcdodgeRoll)
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
        console.log("snap")
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

        // this.stateSnapshot.mcPRNG = this.mcPRNG.state()
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
        this.mcPRNG = seedrandom(this.seed, {"": this.stateSnapshot.mcPRNG})
    },
};

export { model };