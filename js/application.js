// Wait till the browser is ready to render the game (avoids glitches)
var game_manager = null;
var runner = null;
window.requestAnimationFrame(function () {
  game_manager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  runner = new Runner(1, random_strategy, game_manager);
});
