var setup_strategies = function(runner) {
  var random = function() {runner.strategy=random_strategy; runner.start()};
  var elem = document.querySelector(".link_random");
  elem.addEventListener("click", random);
  elem.addEventListener(this.eventTouchend, random);
}

var random_strategy = function() {
  var result = { direction: 0 };
  result.direction = Math.floor((Math.random() * 100) % 4);
  return result;
}
