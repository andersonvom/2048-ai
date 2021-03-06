function Runner(strategy, game_manager) {
  this.num_matches = null;
  this.strategy = strategy;
  this.game_manager = game_manager;
  this.play_delay = 100;
  this.new_game_delay = 500;
  this.original_info = {};
}

Runner.prototype.start = function() {
  this.game_manager.restart();
  if (this.num_matches == null) {
    this.play_once();
  } else {
    this.play_all();
  }
}

Runner.prototype.backup = function(type, attrs) {
  for (var i=0 ; i<attrs.length ; i++) {
    var attr_name = attrs[i];
    var attr = this.game_manager[attr_name];
    if (type == 'save') {
      this.original_info[attr_name] = attr;
      if (typeof attr == 'function')
        this.game_manager[attr_name] = function() {};
    } else {
      this.game_manager[attr_name] = this.original_info[attr_name];
    }
  }
}

Runner.prototype.run_strategy = function() {
  var info = ['actuate', 'over', 'won', 'score'];

  this.backup('save', info);
  var result = this.strategy(this.game_manager);
  this.backup('restore', info);

  return result.direction;
}

Runner.prototype.play_once = function() {
  console.log("Playing single match");
  this.play();
};

Runner.prototype.play_all = function() {
  var self = this;

  if (this.num_matches && this.num_matches > 0) {
    console.log("Starting Match #" + this.num_matches);
    this.play(function() { self.restart(); });
  } else {
    console.log("No more matches! The end.");
  }
};

Runner.prototype.play = function(end_game_callback) {
  var self = this;

  var direction = self.run_strategy();
  self.game_manager.move(direction);

  if (self.game_manager.isGameTerminated()) {
    self.show_score();
    if (end_game_callback)
      setTimeout(end_game_callback, self.new_game_delay);
  } else {
    setTimeout(function() { self.play(end_game_callback); }, self.play_delay);
  }
}

Runner.prototype.show_score = function() {
  console.log("Final score: " + this.game_manager.score);
}

Runner.prototype.restart = function() {
  this.num_matches -= 1;
  this.start();
}
