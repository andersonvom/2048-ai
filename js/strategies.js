var setup_strategies = function(runner) {
  var random = function() {runner.strategy=random_strategy; runner.start()};
  var elem = document.querySelector(".link_random");
  elem.addEventListener("click", random);
  elem.addEventListener(this.eventTouchend, random);
}

var copy_cells = function(cells) {
  var grid_size = cells.length;
  var new_cells = [];
  for (var i=0 ; i<grid_size ; i++) {
    new_cells[i] = [];
    for (var j=0 ; j<grid_size ; j++) {
      var pos = { x: i, y: j };

      new_cells[i][j] = null;
      if (cells[i][j]) {
        new_cells[i][j] = new Tile({}, 0);
        new_cells[i][j].x = cells[i][j].x;
        new_cells[i][j].y = cells[i][j].y;
        new_cells[i][j].value = cells[i][j].value;
        new_cells[i][j].previousPosition = cells[i][j].previousPosition;
        new_cells[i][j].mergedFrom = cells[i][j].mergedFrom;
      }
    }
  }

  return new_cells;
}

var each_move = function(game_manager, callback) {
  var original_cells = copy_cells(game_manager.grid.cells);

  for (var direction=0 ; direction<4 ; direction++) {
    var score = game_manager.score;
    game_manager.move(direction);
    callback(game_manager, direction);

    // Rever game back to its original state
    game_manager.score = score;
    game_manager.grid.cells = copy_cells(original_cells);
    if (game_manager.isGameTerminated()) {
      game_manager.over = false;
      game_manager.won = false;
    }
  }
}

var random_strategy = function() {
  var result = { direction: 0 };
  result.direction = Math.floor((Math.random() * 100) % 4);
  return result;
}
