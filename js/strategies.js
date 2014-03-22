var random_strategy = function() {
  var result = { direction: 0 };
  result.direction = Math.floor((Math.random() * 100) % 4);
  return result;
}
