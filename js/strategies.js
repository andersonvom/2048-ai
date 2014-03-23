var setup_strategies = function(runner) {
  var random = function() {runner.strategy=random_strategy; runner.start()};
  var elem = document.querySelector(".link_random");
  elem.addEventListener("click", random);
  elem.addEventListener(this.eventTouchend, random);

  var max_score = function() {runner.strategy=max_score_strategy; runner.start()};
  var elem = document.querySelector(".link_max_score");
  elem.addEventListener("click", max_score);
  elem.addEventListener(this.eventTouchend, max_score);

  var max_sq_sum = function() {runner.strategy=max_sq_sum_strategy; runner.start()};
  var elem = document.querySelector(".link_max_sq_sum");
  elem.addEventListener("click", max_sq_sum);
  elem.addEventListener(this.eventTouchend, max_sq_sum);

  var max_sq_sum_two = function() {runner.strategy=max_sq_sum_two_ahead_strategy; runner.start()};
  var elem = document.querySelector(".link_max_sq_sum_two");
  elem.addEventListener("click", max_sq_sum_two);
  elem.addEventListener(this.eventTouchend, max_sq_sum_two);
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

var square_sum_cells = function(cells) {
  var grid_size = cells.length;
  var total = 0;
  for (var i=0 ; i<grid_size ; i++) {
    for (var j=0 ; j<grid_size ; j++) {
      var cell = cells[i][j];
      if (cell) {
        total += cell.value * cell.value;
      }
    }
  }
  return total;
}

var max_sq_sum_strategy = function(game_manager) {
  var max = { direction: 0, value: 0 };

  each_move(game_manager, function(game_manager, direction) {
    var value = square_sum_cells(game_manager.grid.cells);
    if (value > max.value) {
      max.value = value;
      max.direction = direction;
    }
  });

  return max;
}

var max_score_strategy = function(game_manager) {
  var max = { direction: 0, value: 0 };
  var equal_scores = 0;

  each_move(game_manager, function(game_manager, direction) {
    var current_score = game_manager.score;
    if (current_score > max.value) {
      max.value = current_score;
      max.direction = direction;
    }
    if (current_score == max.value) {
      equal_scores++;
    }
  });

  // If the score doesn't change in this move, pick a random one
  if (equal_scores == 4) {
    max.direction = Math.floor((Math.random() * 100) % 4);
  }

  return max;
}

var max_sq_sum_two_ahead_strategy = function(game_manager) {
  var max = { direction: 0, value: 0 };

  each_move(game_manager, function(game_manager, direction) {
    var total;
    if (!game_manager.isGameTerminated()) {
      var result = max_sq_sum_strategy(game_manager);
      total = result.value;
    } else {
      total = square_sum_cells(game_manager.grid.cells);
      game_manager.over = false;
      game_manager.won = false;
    }
    if (total > max.value) {
      max.value = total;
      max.direction = direction;
    }
  });

  return max;
}
