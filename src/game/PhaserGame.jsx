import PropTypes from "prop-types";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";

export const PhaserGame = forwardRef(function PhaserGame(
  props,
  ref
) {
  const game = useRef();

  // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
  useLayoutEffect(() => {
    if (game.current === undefined) {
      game.current = StartGame("game-container");

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

  useEffect(() => {
    EventBus.on("current-scene-ready", (currentScene) => {
        if (ref !== null && ref !== undefined) {
          ref.current.scene = currentScene;
        }
    });

    return () => {
      EventBus.removeListener("current-scene-ready");
    };
  }, [ref]);

  return <div className="game" id="game-container"></div>;
});
