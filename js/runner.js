function Runner(num_matches, strategy, game_manager) {
  this.num_matches = num_matches;
  this.strategy = strategy;
  this.game_manager = game_manager;
  this.play_delay = 100;
  this.new_game_delay = 500;
}

Runner.prototype.start = function() {
  if (this.num_matches > 0) {
    console.log("Starting Match #" + this.num_matches);
    this.game_manager.restart();
    this.play();
  } else {
    console.log("No more matches! The end.");
  }
}

Runner.prototype.play = function() {
}
