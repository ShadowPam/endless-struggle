import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

// Add relevant imports here
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const PATH = "endless-struggle";
export const auth = getAuth(app);

function modelToPersistence(model) {
    return {
        player: {
            player_alive: model.mcAlive,
            player_name: model.mcName,
            player_hp: model.mcHp,
            player_maxHp: model.mcMaxHp,
            player_damage: model.mcDamage,
            player_stats: {
                attack: model.mcAttack,
                defence: model.mcDefence,
                dodge: model.mcDodge,
            },
            player_shield: model.mcShield,
            player_inConfidence: model.mcConfidence,
            player_dodgeTimer: model.mcDodgeTimer,
        },
        enemy: {
            enemy_alive: model.enemyAlive,
            enemy_name: model.enemyName,
            enemy_key: model.enemyKey,
            enemy_hp: model.enemyHp,
            enemy_damage: model.enemyDamage,
            enemy_stats: {
                maxHp: model.enemyMaxHp,
                attack: model.enemyAttack,
                damage_spread: model.enemyDamageSpread,
            },
        },
        run: {
            currentRound: model.currentRound,
            currentEnemy: model.currentEnemy,
            seed: model.seed,
            stateSnapshot: model.stateSnapshot,
            shouldRunStateZeroOnReady: model.shouldRunStateZeroOnReady,
            initialized: model.initialized,
        },
    };
}

function globalModelToPersistance(globalModel) {
    console.log("i am here");
    return {
        global: {
            leader_board: globalModel.leaderboard,
        },
    };
}

function persistenceToModel(dataFromPersistance, model) {
    toModelPlayer(dataFromPersistance?.player, model);

    toModelEnemy(dataFromPersistance?.enemy, model);

    toModelRun(dataFromPersistance?.run, model);
}

function globalPersistanceToGlobalModel(dataFromPersistance, globalModel) {
    toGlobalModel(dataFromPersistance?.global, globalModel);
}

function toModelPlayer(player_data, model) {
    model.mcAlive = player_data?.player_alive || true;
    model.mcName = player_data?.player_name || "Player";
    model.mcMaxHp = player_data?.player_maxHp || null;
    model.mcHp = player_data?.player_hp || null;
    model.mcDamage = player_data?.player_damage || null;
    model.mcAttack = player_data?.player_stats?.attack || null;
    model.mcShield = player_data?.player_shield;
    model.mcDefence = player_data?.player_stats?.defence || null;
    model.mcConfidence = player_data?.player_inConfidence || null;
    model.mcDodge = player_data?.player_stats?.dodge || null;
    if (Number.isInteger(player_data?.player_dodgeTimer)) {
        model.mcDodgeTimer = player_data.player_dodgeTimer;
    } else {
        model.mcDodgeTimer = null;
    }
}

function toModelEnemy(enemy_data, model) {
    model.enemyAlive = enemy_data?.enemy_alive || true;
    model.enemyName = enemy_data?.enemy_name || null;
    model.enemyKey = enemy_data?.enemy_key || null;
    model.enemyMaxHp = enemy_data?.enemy_stats?.maxHp || null;
    model.enemyHp = enemy_data?.enemy_hp || null;
    model.enemyDamage = enemy_data?.enemy_damage || null;
    model.enemyAttack = enemy_data?.enemy_stats?.attack || null;
    model.enemyDamageSpread = enemy_data?.enemy_stats?.damage_spread || null;
}

function toModelRun(run_data, model) {
    model.currentRound = run_data?.currentRound || null;
    model.currentEnemy = run_data?.currentEnemy || {};
    model.seed = run_data?.seed || null;
    model.stateSnapshot = run_data?.stateSnapshot || {};
    model.shouldRunStateZeroOnReady = run_data?.shouldRunStateZeroOnReady || true;
    model.initialized = run_data?.initialized || false;
}

function toGlobalModel(global_data, globalModel) {
    globalModel.leaderboard = global_data?.leader_board || [{ name: "Kid", score: 3 }];
}

function saveToFirebase(model, globalModel) {
    if (model.ready && model.user) {
        const model_path = PATH + "/" + model.user.uid;
        set(ref(db, model_path), modelToPersistence(model));
    }

    if (globalModel.ready) {
        const global_model_path = PATH + "/global";
        set(ref(db, global_model_path), globalModelToPersistance(globalModel));
    }
}

function readFromFirebase(model) {
    if (model.user) {
        model.ready = false;
        const model_path = PATH + "/" + model.user.uid;

        return get(ref(db, model_path))
            .then(function convertACB(snapshot) {
                console.log(snapshot.val());
                return persistenceToModel(snapshot.val(), model);
            })
            .then(function setModelReadyACB() {
                model.ready = true;
                model.setNewPRNGs();
            });
    }
}

function readFromFirebaseGlobal(globalModel) {
    globalModel.ready = false;

    const global_model_path = PATH + "/global";

    return get(ref(db, global_model_path))
        .then(function convertACB(snapshot) {
            console.log(snapshot.val());
            return globalPersistanceToGlobalModel(snapshot.val(), globalModel);
        })
        .then(function setGlobalModelReadyACB() {
            globalModel.ready = true;
        });
}

function connectToFirebase(model, watchFunction, globalModel) {
    function checkModelACB() {
        return [
            model.stateSnapshot.mcAlive,
            model.stateSnapshot.mcMaxHp,
            model.stateSnapshot.mcHp,
            model.stateSnapshot.mcAttack,
            model.stateSnapshot.mcDamage,
            model.stateSnapshot.mcShield,
            model.stateSnapshot.mcDefence,
            model.stateSnapshot.mcConfidence,
            model.stateSnapshot.mcDodge,
            model.stateSnapshot.mcDodgeTimer,
            model.stateSnapshot.mcDodgeRoll,
            model.stateSnapshot.enemyAlive,
            model.stateSnapshot.enemyName,
            model.stateSnapshot.enemyKey,
            model.stateSnapshot.enemyMaxHp,
            model.stateSnapshot.enemyHp,
            model.stateSnapshot.enemyAttack,
            model.stateSnapshot.enemyDamage,
            model.stateSnapshot.mcPRNG,
            model.stateSnapshot.enemyPRNG,
            model.stateSnapshot.mcAlive,
            model.stateSnapshot.mcMaxHp,
            model.stateSnapshot.mcHp,
            model.stateSnapshot.mcAttack,
            model.stateSnapshot.mcDamage,
            model.stateSnapshot.mcShield,
            model.stateSnapshot.mcDefence,
            model.stateSnapshot.mcConfidence,
            model.stateSnapshot.mcDodge,
            model.stateSnapshot.mcDodgeTimer,
            model.stateSnapshot.mcDodgeRoll,
            model.stateSnapshot.enemyAlive,
            model.stateSnapshot.enemyName,
            model.stateSnapshot.enemyKey,
            model.stateSnapshot.enemyMaxHp,
            model.stateSnapshot.enemyHp,
            model.stateSnapshot.enemyAttack,
            model.stateSnapshot.enemyDamage,
            model.stateSnapshot.mcPRNG,
            model.stateSnapshot.enemyPRNG,
            globalModel.leaderboard,
        ];
    }

    function saveModelACB() {
        saveToFirebase(model, globalModel);
    }

    function loginOrOutACB(user) {
        if (user) {
            model.user = user;
        } else {
            model.user = null;
        }
        model.ready = false;
        globalModel.ready = false;
        readFromFirebase(model);
        readFromFirebaseGlobal(globalModel);
    }

    onAuthStateChanged(auth, loginOrOutACB);
    watchFunction(checkModelACB, saveModelACB);
}
export {
    connectToFirebase,
    modelToPersistence,
    persistenceToModel,
    saveToFirebase,
    readFromFirebase,
    readFromFirebaseGlobal,
    globalPersistanceToGlobalModel,
    globalModelToPersistance
};
