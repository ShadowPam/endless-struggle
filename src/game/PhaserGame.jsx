import PropTypes from "prop-types";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";

export const PhaserGame = forwardRef(function PhaserGame(props, ref) {
    const game = useRef();

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {
        if (game.current === undefined) {
            console.log(props.initData)
            game.current = StartGame("game-container");

            // data used to create scene on startup/reload
            game.current.config.initData = props.initData;

            if (ref !== null && ref !== undefined) {
                ref.current = { game: game.current, scene: null };
            }
        }
        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        };
    }, [ref]);

    // window.addEventListener('beforeunload', () => {
    //     console.log("here")
    //     game.destroy()
    //     game.current = StartGame("game-container");
    //     game.current.config.initData = props.initData;
    // });

    useEffect(() => {
        EventBus.on("current-scene-ready", (currentScene) => {
            if (ref !== null && ref !== undefined) {
                ref.current.scene = currentScene;
            }
            // makes sure to run combatstate 0 on startup and reload after pause
            // shouldRunStateZeroOnReady is set true when pausing.
            if (props.model.shouldRunStateZeroOnReady) {
                props.model.setZeroOnReady(false);
                props.model.setCombatState(0);
            }
        });

        return () => {
            EventBus.removeListener("current-scene-ready");
        };
    }, [ref]);

    return <div className="game" id="game-container"></div>;
});
