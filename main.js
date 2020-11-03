var cols = 7,
    rows = 6,
    grid = new Array(rows),
    discSize = 40,
    playerTurn = true,
    backgroundColor,
    finished = false;

function setup() {
  for(let i = 0; i < grid.length; i++) grid[i] = new Array(cols);
  createCanvas(400, 400);
}

function draw() {
  stroke(255);
  background(0);
  if(!finished) {
    backgroundColor = (playerTurn)?color(255, 0, 0, 120):color(255, 255, 0, 120);
    background(backgroundColor);
  }
  ellipseMode(CENTER);
  translate(discSize / 2, discSize / 2);
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      noFill();
      if(grid[i][j] === "red") fill(255, 0, 0, 255);
      else if(grid[i][j] === "yellow") fill(255, 255, 0, 255);
      ellipse(discSize * j, discSize * i, discSize);
    }
  }
}

function mouseClicked() {
  if(!finished) {
    addDisc(floor(mouseX / discSize));
    hasWon();
  }
  return false;
}

function addDisc(col) {
  for(let i = grid.length - 1; i >= 0; i--) {
    if(grid[i][col] === undefined){ 
      grid[i][col] = (playerTurn)?"red":"yellow";
      playerTurn = !playerTurn;
      return true;
    }
  }
  return alert("This column is full");
}

function hasWon() {
  var lastDisc;
  var count = 0;
  for(let i = grid.length - 1; i >= 0; i--) {
    for(let j = 0; j < grid[i].length; j++) {
      var colorDisc = grid[i][j];
      if((lastDisc === colorDisc || lastDisc === undefined) && colorDisc !== undefined) count++;
      else count = 0;
      if(count === 4){
        finished = true;
        return alert('Win');
      }
      lastDisc = colorDisc;
    }
  }
  count = 0,
  lastDisc = undefined;
  for(let j = cols - 1; j >= 0; j--) {
    for(let i = 0; i < rows; i++)  {
      var colorDisc = grid[i][j];
      if((lastDisc === colorDisc || lastDisc === undefined) && colorDisc !== undefined) count++;
      else count = 0;
      if(count === 4) {
        finished = true;
        return alert('Win');
      }
      lastDisc = colorDisc;
    }
  }


  // count = 0,
  // lastDisc = undefined;
  for(let i = grid.length - 1; i >= 0; i--) {
    for(let j = 0; j < grid[i].length; j++) {
      count = 0,
      lastDisc = undefined;
      for(let diagonal = 0; diagonal < 4; diagonal++) {
        if(j + diagonal < grid[i].length && i + diagonal < grid.length) {
          var colorDisc = grid[i + diagonal][j + diagonal];
          if((lastDisc === colorDisc || lastDisc === undefined) && colorDisc !== undefined) count++;
          else count = 0;
          if(count === 4) {
            finished = true;
            return alert('Win');
          }
          lastDisc = colorDisc;
        }
      }
      count = 0,
      lastDisc = undefined;
      for(let diagonal = 0; diagonal < 4; diagonal++) {
        if(j - diagonal >= 0 && i + diagonal < grid.length) {
          var colorDisc = grid[i + diagonal][j - diagonal];
          if((lastDisc === colorDisc || lastDisc === undefined) && colorDisc !== undefined) count++;
          else count = 0;
          if(count === 4) {
            finished = true;
            return alert('Win');
          }
          lastDisc = colorDisc;
        }
      }
    }
  }


  for(let i = grid.length - 1; i >= 0; i--) {
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] === undefined) return undefined;
    }
  }
  finished = true;
  return alert('Draw (please refresh)');
}