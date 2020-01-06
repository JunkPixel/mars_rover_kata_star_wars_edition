/*jshint esversion: 6 */

/**
 * Mars Rover Kata star wars edition- Ironhack Prework
 * 
 * @author Ricardo Tomaz
 */

// Ships configuration
var spaceShips = {
    xWing: {
      name: 'X-Wing',
      alias: 'x',
      direction: 'N', 
      x: 0, 
      y: 0, 
      travelLog: []
    }, 
    tie: {
      name: 'Tie-Fighter',
      alias: 't',
      direction: 'N', 
      x: 6, 
      y: 6, 
      travelLog: []
    },
    milleniumFalcon: {
      name: 'Millenium-Falcon',
      alias: 'm',
      direction: 'N', 
      x: 4, 
      y: 4, 
      travelLog: []
    }
  
  
  };
  
  // Grid configuration
  const gridSize = {
    x: 10,
    y: 10
  };
  //Number of obstacles
  const asteroids = 7;
  
  let grid = [];
  
  
  
  generateGrid(grid, gridSize);
  addSpaceShips(spaceShips, grid);
  generateObstacles(grid, asteroids, gridSize);
  
  
  console.table(grid);
  
  
  
  
  /**
   * Takes the spaceShip and change it's direction to turn left.
   */
  function turnLeft(spaceShip){
    switch (spaceShip.direction) {
      case 'N':
        spaceShip.direction = 'W';
        break;
      case 'S':
        spaceShip.direction = 'E';
        break;
      case 'E':
        spaceShip.direction = 'N';
        break;
      case 'W':
        spaceShip.direction = 'S';
        break;
    }
  
    console.log('Evasive maneuers maneuvers captain!. Turning left! New direction' +" "+ spaceShip.direction);
  }
  
  /**
   * Takes the spaceShip and change it's direction to turn right
   */
  function turnRight(spaceShip){
    switch (spaceShip.direction) {
      case 'N':
        spaceShip.direction = 'E';
        break;
      case 'S':
        spaceShip.direction = 'W';
        break;
      case 'E':
        spaceShip.direction = 'S';
        break;
      case 'W':
        spaceShip.direction = 'N';
        break;
    }
  
    console.log('Evasive maneuers maneuvers captain!. Turning right! New direction' +" "+ spaceShip.direction);
  }
  
  /**
   * Takes the spaceShip and move it forward according to its direction.
   */
  function moveForward(spaceShip, grid){
    // The position of the spaceShip before the change
    let prevX = spaceShip.x;
    let prevY = spaceShip.y;
  
    switch (spaceShip.direction) {
      case 'N':
        spaceShip.y--;
        break;
      case 'S':
        spaceShip.y++;
        break;
      case 'E':
        spaceShip.x++;
        break;
      case 'W':
        spaceShip.x--;
        break;
    }
  
    // If there's a collision, the spaceShip will go back to its previous position.
    // Otherwise, the grid will be updated to show the new spaceShip's path.
    if (checkCollision(grid, spaceShip)) {
      spaceShip.x = prevX;
      spaceShip.y = prevY;
    } else {
      // Add the previous position to the travellog
      spaceShip.travelLog.push([prevX, prevY]);
      // Set the label previous position in the grid to lower case to indicate
      // that the spaceShip isn't there now
      grid[prevY][prevX] = grid[prevY][prevX].toLowerCase();
      // Set the label actual position in the grid to upper case to indicate
      // that the spaceShip is there now
      grid[spaceShip.y][spaceShip.x] += spaceShip.alias.toUpperCase();
  
      console.log('Moving forward! New position: [' + spaceShip.x + ',' + spaceShip.y + ']');
    }
  }
  
  /**
   * Takes the spaceShip and move it backward according to its direction.
   */
  function moveBackward(spaceShip, grid){
    // The position of the rover before the change
    let prevX = spaceShip.x;
    let prevY = spaceShip.y;
  
    switch (spaceShip.direction) {
      case 'N':
        spaceShip.y++;
        break;
      case 'S':
        spaceShip.y--;
        break;
      case 'E':
        spaceShip.x--;
        break;
      case 'W':
        spaceShip.x++;
        break;
    }
  
    // If there's a collision, the spaceShip will go back to its previous position.
    // Otherwise, the grid will be updated to show the new spaceShip's path.
    if (checkCollision(grid, spaceShip)) {
      spaceShip.x = prevX;
      spaceShip.y = prevY;
    } else {
        // Add the previous position to the travellog
      spaceShip.travelLog.push([prevX, prevY]);
       // Set the label previous position in the grid to lower case to indicate
      // that the spaceShip isn't there now
      grid[prevY][prevX] = grid[prevY][prevX].toLowerCase();
      // Set the label actual position in the grid to upper case to indicate
      // that the spaceShip is there now
      grid[spaceShip.y][spaceShip.x] += spaceShip.alias.toUpperCase();
  
      console.log('Moved backward! New position: [' + spaceShip.x + ',' + spaceShip.y + ']');
    }
  }
  
  /**
   * Check if the spaceShip has collision with an asteroid, another spaceShip or has
   * exceeded the limits of the grid.
   */
  function checkCollision(grid, spaceShip) {
    // If the value of the new position in the grid is 'undefined', then that position
    // doesn't exist (exceeds the size), so isn't valid
    if (typeof grid[spaceShip.x] === 'undefined' || typeof grid[spaceShip.x][spaceShip.y] === 'undefined') {
      console.log('Out of the grid!');
      return true;
    // If there's an asteroid (identified by the '#' symbol), there's a collision too
    } else if (grid[spaceShip.y][spaceShip.x] === '#') {
      console.log('Collision with an asteroid!');
      return true;
    // If the cell has any content (first condition) and it has any lowercase (second condition), 
    // that means there's another rover in that position
    } else if (grid[spaceShip.y][spaceShip.x].length > 0 && grid[spaceShip.y][spaceShip.x] !== grid[spaceShip.y][spaceShip.x].toLowerCase()) {
      console.log('Collision with a spaceship!');
      return true;
    }
  
    // If there isn't any collision, then return false
    return false;
  }
  
  /**
   * Take the sequence and, for each character, execute the corresponding
   * command calling a function to move or rotate the spaceShip.
   */
  function runSequence(sequence, spaceShip) {
    console.log(spaceShip.name + '\'s turn!');
  
    for (let i = 0; i < sequence.length; i++) {
      switch (sequence[i]) {
        case 'f':
          moveForward(spaceShip, grid);
          break;
        case 'b':
          moveBackward(spaceShip, grid);
          break;
        case 'r':
          turnRight(spaceShip);
          break;
        case 'l':
          turnLeft(spaceShip);
          break;
        default: // If the command isn't valid
          console.log('%cThe command "' + sequence[i] + '" is not valid! ' + 
                      'It can only be "f", "b", "r", or "l"');
          break;
      }
    }
  
    console.log('Turn ended!');
  
    // Generate and show the log
    let log = '';
    spaceShip.travelLog.forEach(function(position) {
      log += '[' + position[0] + ',' + position[1] + '] ';
    });
    console.log('Travel log: ' + log);
  
    // Show the actual position of the spaceShip
    console.log('Actual position: [' + spaceShip.x + ',' + spaceShip.y + ']');
  
    // Show the actual grid in a table
    console.table(grid);
  }
  
  /**
   * Takes the 'grid' and generate on it a bidimensional array
   * (with empty values) with the size determined in 'gridSize'
   */
  function generateGrid(grid, gridSize) {
    for (let i = 0; i < gridSize.x; i++) {
      grid[i] = [];
      for (let j = 0; j < gridSize.y; j++) {
        grid[i][j] = '';
      }
    }
  }
  
  /**
   * Takes the rovers, show its data in console and add it to the grid.
   */
  function addSpaceShips(spaceShips, grid) {
    console.log('Spaceships', );
  
    for (let spaceShip in spaceShips) {
      let alias = spaceShips[spaceShip].alias;
      let x = spaceShips[spaceShip].x;
      let y = spaceShips[spaceShip].y;
  
      // Show its alias (in upper case) in the grid to indicate that it's the
      // actual position
      grid[x][y] += alias.toUpperCase();
  
      console.log(spaceShip);
      console.log('Alias: ' + alias );
    }
    console.log('Spaceships ' + Object.keys(spaceShips).length);
  }
  
  /**
   * Generates, randomly, obstacles and put them on the grid. The number
   * of obstacles are determined by 'totalObstacles' and they are
   * identified in the grid by the '#' symbol.
   */
  function generateObstacles(grid, asteroids, gridSize) {
    for (let i = 0; i <= asteroids; i++) {
      // Generate the random numbers that will determine the position
      let x = Math.floor(Math.random() * gridSize.x);
      let y = Math.floor(Math.random() * gridSize.y);
  
      // If the cell is empty (there isn't a spaceShip), then put the obstacle there
      if (!grid[x][y]) {
        grid[x][y] = '#';
      }
    }
  }
  
