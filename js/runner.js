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

Runner.prototype.run_strategy = function() {
  var result = this.strategy(this.game_manager);
  return result.direction;
}

Runner.prototype.play = function() {
  var self = this;

  var direction = self.run_strategy();
  self.game_manager.move(direction);

  if (self.game_manager.isGameTerminated()) {
    setTimeout(function() { self.end_game(); }, self.new_game_delay);
  } else {
    setTimeout(function() { self.play(); }, self.play_delay);
  }
}

Runner.prototype.end_game = function() {
}
