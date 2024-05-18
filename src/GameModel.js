import { joke } from "./jokeSource";
import { resolvePromise } from "./resolvePromise";
import enemies from "./Enemies.js";
import basicRewards from "./BasicRewards.js";
import rareRewards from "./RareRewards.js";
import seedrandom from "seedrandom";
import { auth } from "./firebaseModel.js";

const model = {
    mcAlive: true,
    mcName: "Player",
    mcMaxHp: null,
    mcHp: null,
    mcDamage: null,
    mcAttack: null,
    mcShield: null,
    mcDefence: null,
    mcConfidence: null,
    mcDodge: null,
    mcDodgeTimer: null,
    maxDodgeTimer: null,
    mcDodgeRoll: null,
    mcPRNG: {},

    enemyAlive: true,
    enemyName: null,
    enemyKey: null,
    enemyMaxHp: null,
    enemyHp: null,
    enemyDamage: null,
    enemyAttack: null,
    enemyDamageSpread: null,
    enemyPRNG: {},
    enemyHpScalar: null,
    enemyAttackScalar: null,

    currentRound: null,

    jokePromiseState: {},

    combatState: -1,
    actionIntent: null,
    rewardIntent: null,

    currentRewards: [],
    currentEnemy: {},

    seed: null,
    stateSnapshot: {},
    shouldRunStateZeroOnReady: true,
    initialized: false,

    initializeModel() {
        if (!this.initialized) {
            if (this.ready) {
                let char = auth.currentUser.email.indexOf('@');
                this.mcName = auth.currentUser.email.slice(0,char);
            }
            this.mcAlive = true;
            this.mcMaxHp = 50;
            this.mcHp = 50;
            this.mcAttack = 10;
            this.mcDamage = this.mcAttack;
            this.mcShield = 0;
            this.mcConfidence = false;
            this.mcDefence = 2;
            this.mcDodge = 0.15;
            this.mcDodgeTimer = 0;
            this.maxDodgeTimer = 2;
            this.mcDodgeRoll = 2;
            this.enemyDamageSpread = 0.6;
            this.enemyHpScalar = 1.05; //5%
            this.enemyAttackScalar = 1.1; //10%
            this.shouldRunStateZeroOnReady = true;
            
            this.currentRound = 0;
            this.setNewSeed(); // seed -1
            this.getEnemy(); // current enemy is always from the previous seed

            this.currentRound = 1;
            this.setNewSeed(); // start seed (0)
            this.setNewPRNGs();

            this.initialized = true;
        }
    },

    resetModel() {
        this.mcAlive = false;
        this.mcMaxHp = null;
        this.mcName = "Player";
        this.mcHp = null;
        this.mcDamage = null;
        this.mcAttack = null;
        this.mcShield = null;
        this.mcDefence = null;
        this.mcDodge = null;
        this.mcDodgeTimer = null;
        this.maxDodgeTimer = null;
        this.mcDodgeRoll = null;
        this.mcPRNG = {};

        this.enemyAlive = false;
        this.enemyName = null;
        this.enemyKey = null;
        this.enemyMaxHp = null;
        this.enemyHp = null;
        this.enemyDamage = null;
        this.enemyAttack = null;
        this.enemyDamageSpread = null;
        this.enemyPRNG = {};
        this.enemyHpScalar = null;
        this.enemyAttackScalar = null;

        this.currentRound = null;

        this.jokePromiseState = {};

        this.combatState = -1;
        this.actionIntent = null;
        this.rewardIntent = null;

        this.currentRewards = [];
        this.currentEnemy = {};

        this.seed = null;
        this.stateSnapshot = {};
        this.shouldRunStateZeroOnReady = true;
        this.initialized = false;
    },

    setMcDamage() {
        if (this.mcShield === 0) {
            this.mcDamage = this.mcAttack;
            this.mcConfidence = false;
        } else {
            this.mcDamage = this.mcAttack * 2;
            this.mcConfidence = true;
        }
    },

    setEnemyDamage() {
        this.enemyDamage =
            this.enemyAttack +
            Math.round(this.enemyDamageSpread * 2 * this.enemyAttack * (this.enemyPRNG() - 0.5));
    },

    setNewPRNGs() {
        this.mcPRNG = seedrandom(this.seed, { state: true });
        this.enemyPRNG = seedrandom(this.seed + 1, { state: true });
    },

    setNewSeed() {
        this.seed = Math.random();
    },

    setZeroOnReady(bool) {
        this.shouldRunStateZeroOnReady = bool;
    },

    progressDodgeTimer() {
        if (this.mcDodge > 0.95){ // enforce dodge cap
            this.mcDodge = 0.95
        }
        if (this.mcDodgeTimer > 0) {
            this.mcDodgeTimer -= 1;
        }

        if (this.mcDodgeTimer > 0) {
            this.mcDodgeRoll = this.mcPRNG();
        } else {
            this.mcDodgeRoll = 2; // 2 -> guaranteed hit
            console.log("awdjwa");
        }
    },

    progressRound() {
        this.currentRound += 1;
    },

    getEnemy() {
        //enemy scaling would be implemented here
        this.currentEnemy = this.sample(enemies, 1)[0];
        this.enemyAlive = true;
        this.enemyName = this.currentEnemy.name;
        this.enemyKey = this.currentEnemy.key;
        this.enemyMaxHp = Math.floor(this.currentEnemy.health * (this.enemyHpScalar ** this.currentRound));
        this.enemyHp = this.enemyMaxHp;
        this.enemyAttack = Math.floor(this.currentEnemy.attack * (this.enemyAttackScalar ** this.currentRound));
        console.log(this.enemyAttackScalar)
        console.log(this.enemyHpScalar)
        this.enemyDamage = this.enemyAttack;
    },

    collectReward() {
        const currentReward = this.currentRewards[this.rewardIntent];
        if (currentReward.tier == "basic") {
            this.mcAttack += currentReward.attack;
            this.mcDefence += currentReward.defence;
            this.mcDodge += currentReward.dodge;
        }
        if (currentReward.tier == "rare") {
            this.mcShield *= currentReward.shieldMultiplier;
            this.mcAttack += currentReward.attack;
            this.maxDodgeTimer += currentReward.dodgeTimer;
        }
    },

    getRewards() {
        const random = seedrandom(this.seed + 3);
        if (random() >= 0.3) {
            this.currentRewards = this.sample(basicRewards, 3);
        }
        if (random() < 0.3) {
            this.currentRewards = this.sample(rareRewards, 3);
        }
    },

    sample(arr, nr) {
        const array = [...arr];
        const random = seedrandom(this.seed + 2);
        var j, x, index;
        for (index = array.length - 1; index > 0; index--) {
            j = Math.floor(random() * (index + 1));
            x = array[index];
            array[index] = array[j];
            array[j] = x;
        }
        console.log(this.seed,array)
        return array.slice(0, nr);
    },

    setCombatState(value) {
        this.combatState = value;
    },

    declareRewardIntent(choice) {
        this.rewardIntent = choice;
    },

    declareActionIntent(choice) {
        this.actionIntent = choice;
    },

    doAttack() {
        this.enemyHp = this.enemyHp - this.mcDamage;
        if (this.enemyHp <= 0) {
            this.enemyHp = 0;
            this.enemyAlive = false;
        }
    },

    doShield() {
        this.mcShield += this.mcDefence;
    },

    doDodge() {
        this.mcDodgeTimer = this.maxDodgeTimer;
        this.mcDodgeRoll = this.mcPRNG();
    },

    getJoke(categories, blacklist, safe) {
        resolvePromise(joke(categories, blacklist, safe), this.jokePromiseState);
    },

    getAttacked() {
        if (this.mcDodgeRoll > this.mcDodge) {
            this.mcShield = this.mcShield - this.enemyDamage;
            if (this.mcShield < 0) {
                this.mcHp = this.mcHp + this.mcShield;
                this.mcShield = 0;
            }
            if (this.mcHp <= 0) {
                this.mcHp = 0;
                this.mcAlive = false;
            }
        }
    },

    takeStateSnapshot() {
        this.stateSnapshot.mcAlive = this.mcAlive;
        this.stateSnapshot.mcMaxHp = this.mcMaxHp;
        this.stateSnapshot.mcHp = this.mcHp;
        this.stateSnapshot.mcAttack = this.mcAttack;
        this.stateSnapshot.mcDamage = this.mcDamage;
        this.stateSnapshot.mcShield = this.mcShield;
        this.stateSnapshot.mcDefence = this.mcDefence;
        this.stateSnapshot.mcConfidence = this.mcConfidence;
        this.stateSnapshot.mcDodge = this.mcDodge;
        this.stateSnapshot.mcDodgeTimer = this.mcDodgeTimer;
        this.stateSnapshot.mcDodgeRoll = this.mcDodgeRoll;
        this.stateSnapshot.enemyAlive = this.enemyAlive;
        this.stateSnapshot.enemyName = this.enemyName;
        this.stateSnapshot.enemyKey = this.enemyKey;
        this.stateSnapshot.enemyMaxHp = this.enemyMaxHp;
        this.stateSnapshot.enemyHp = this.enemyHp;
        this.stateSnapshot.enemyAttack = this.enemyAttack;
        this.stateSnapshot.enemyDamage = this.enemyDamage;

        // this.stateSnapshot.mcPRNG = this.mcPRNG.state()
        // this.stateSnapshot.enemyPRNG = this.enemyPRNG.state()
    },

    loadStateSnapshot() {
        this.mcAlive = this.stateSnapshot.mcAlive;
        this.mcMaxHp = this.stateSnapshot.mcMaxHp;
        this.mcHp = this.stateSnapshot.mcHp;
        this.mcAttack = this.stateSnapshot.mcAttack;
        this.mcDamage = this.stateSnapshot.mcDamage;
        this.mcShield = this.stateSnapshot.mcShield;
        this.mcDefence = this.stateSnapshot.mcDefence;
        this.mcConfidence = this.stateSnapshot.mcConfidence;
        this.mcDodge = this.stateSnapshot.mcDodge;
        this.mcDodgeTimer = this.stateSnapshot.mcDodgeTimer;
        this.mcDodgeRoll = this.stateSnapshot.mcDodgeRoll;
        this.enemyAlive = this.stateSnapshot.enemyAlive;
        this.enemyName = this.stateSnapshot.enemyName;
        this.enemyKey = this.stateSnapshot.enemyKey;
        this.enemyMaxHp = this.stateSnapshot.enemyMaxHp;
        this.enemyHp = this.stateSnapshot.enemyHp;
        this.enemyAttack = this.stateSnapshot.enemyAttack;
        this.enemyDamage = this.stateSnapshot.enemyDamage;
        this.mcPRNG = seedrandom(this.seed, { "": this.stateSnapshot.mcPRNG });
        this.enemyPRNG = seedrandom(this.seed, { "": this.stateSnapshot.enemyPRNG });
    },
};

export { model };
