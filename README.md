# Endless Struggle

An endless web-based roguelike where the player is a hunter battling monsters one by one in a turn based environment. After each successful battle the player will get to pick between 3 options for stat upgrades, items or relics that modify the following battles. The player will be scored and receive a high score depending on how many monsters they killed. The difficulty will increase as the number of battles go up. Every monster will on their turn present a joke upon battle start that will reduce the player’s hitpoints. During battle the monster's current damage and health will be adjusted by the struggle meter as well as the amount of previous battles finished. The struggle meter will make the jokes do more damage and create a blur effect on the screen to give the player feedback on how much struggle they are in. During battle the struggle meter goes up by how many turns it takes the player to successfully slay the monster. After a successful battle the struggle meter will go down by a set amount(able to be increased through upgrades).


## In-Depth

You can take a look at our [Project Design Document](https://docs.google.com/document/d/1kvHIkOhtxyfwX9pLrCysm74v3xT7PtJOYbR38JCDaEo/edit?usp=sharing) for specifics.

## Set-up (locally)

Download then run `npm install` for fetching relevant dependencies.
Run `npm run dev` to start it up in localhost:8080.

## 3rd party component

The Leaderboard is a 3rd party component that is user-visible. It takes in a datalist that we store in the database and produces a leaderboard component with search and sort features. You can find this code in LeaderboardPresenter and LeaderboardView as well as GameOverPresenter(saving to db).

## Structure

-   `index.html` - A basic HTML page to contain the game.
-   `src` - Contains the React client source code.
-   `src/main.jsx` - The main **React** entry point. This bootstraps the React application.
-   `src/ReactRoot.jsx` - The main React component.
-   `src/game/PhaserGame.jsx` - The React component that initializes the Phaser Game and serve like a bridge between React and Phaser.
-   `src/game/EventBus.js` - A simple event bus to communicate between React and Phaser.
-   `src/game` - Contains the game source code.
-   `src/game/main.js` - The main **game** entry point. This contains the game configuration and start the game.
-   `src/game/scenes/Boot.js` - Handles booting of the application and preloading assets needed by the preloader.
-   `src/game/scenes/Preloader.js` - Preloades the PhaserGame by instantiating assets for use.
-   `src/game/scenes/Game.js` - Creates the canvas and places all assets. Also creates the functions to interact with the canvas.
-   `src/presenters/GamePresenter.jsx` - A presenter used for the "Start" screen where we have the PhaserGame and GameView present.
-   `src/presenters/MainMenuPresenter.jsx` - A presenter used the main menu of our application.
-   `src/views/GameView.jsx` - A view for showing the user input buttons for the game.
-   `src/views/MainMenuView.jsx` - A view for showing the main menu buttons.
-   `GameModel.js` - The model for our Game.
-   `jokeSource.js` - Handles the callbacks from the API
-   `resolvePromise.js` - Helper class for resolving promises.
-   `public/style.css` - Some simple CSS rules to help with page layout.
-   `public/assets` - Contains the static assets used by the game.
