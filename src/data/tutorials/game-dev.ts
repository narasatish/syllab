import { TutorialTopic } from './types';

export const gameDevTopics: TutorialTopic[] = [
  {
    id: 'game-p5js-intro',
    category: 'p5.js Basics',
    title: 'Introduction to p5.js',
    difficulty: 'Beginner',
    theory: [
      'p5.js is a JavaScript library that makes creating interactive graphics simple and accessible.',
      'It provides functions like setup() to initialize your sketch and draw() to render frames continuously.',
      'The canvas is your drawing area where all graphics appear.',
    ],
    syntax: 'function setup() { createCanvas(800, 600); }\nfunction draw() { background(220); }',
    code: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  fill(255, 100, 100);
  ellipse(400, 300, 100, 100);
}`,
    output: 'A gray canvas with a red circle in the center',
    livePreview: true,
    notes: [
      'setup() runs once at the start',
      'draw() runs 60 times per second by default',
      'background() clears the canvas each frame',
    ],
    practice: {
      title: 'Draw Multiple Shapes',
      description: 'Draw at least 5 different shapes on the canvas using rect(), ellipse(), triangle().',
      startCode: '',
      hint: 'Use fill() to change colors before drawing each shape.',
      solution: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  fill(100, 150, 255);
  rect(100, 100, 150, 100);
  fill(255, 100, 100);
  ellipse(400, 300, 100, 100);
  fill(100, 255, 100);
  triangle(600, 200, 700, 200, 650, 100);
}`,
    },
  },
  {
    id: 'game-canvas-coords',
    category: 'p5.js Basics',
    title: 'Canvas Coordinates & Drawing',
    difficulty: 'Beginner',
    theory: [
      'The canvas uses a coordinate system where (0,0) is the top-left corner.',
      'X increases to the right, Y increases downward.',
      'Understanding coordinates is essential for positioning graphics accurately.',
    ],
    syntax: 'createCanvas(width, height);\npoint(x, y);\nline(x1, y1, x2, y2);',
    code: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(2);

  // Draw grid lines
  for (let i = 0; i <= 800; i += 100) {
    line(i, 0, i, 600);
    line(0, i, 800, i);
  }

  // Draw center point
  fill(255, 0, 0);
  ellipse(400, 300, 10, 10);
}`,
    output: 'A grid overlay on the canvas with a red circle at center (400, 300)',
    livePreview: true,
    notes: [
      'Coordinates start at (0, 0) in the top-left',
      'stroke() sets the outline color',
      'strokeWeight() controls line thickness',
    ],
    practice: {
      title: 'Draw a House',
      description: 'Use rect() and triangle() to draw a house at specific coordinates.',
      startCode: '',
      hint: 'Draw the base with rect(), then add a triangular roof with triangle().',
      solution: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  fill(150, 100, 50);
  rect(300, 250, 200, 200);
  fill(200, 50, 50);
  triangle(300, 250, 400, 150, 500, 250);
  fill(100, 150, 255);
  rect(350, 300, 50, 50);
}`,
    },
  },
  {
    id: 'game-input-mouse',
    category: 'p5.js Basics',
    title: 'Mouse Input & Interactivity',
    difficulty: 'Beginner',
    theory: [
      'p5.js tracks mouse position with mouseX and mouseY variables.',
      'mousePressed() detects clicks, and mouseMoved() tracks movement.',
      'Making games interactive requires responding to user input.',
    ],
    syntax: 'mouseX, mouseY\nmousePressed()\nmouseIsPressed',
    code: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  // Draw circle at mouse position
  fill(100, 150, 255);
  ellipse(mouseX, mouseY, 50, 50);

  // Change color if mouse is pressed
  if (mouseIsPressed) {
    fill(255, 100, 100);
  } else {
    fill(100, 255, 100);
  }
  rect(10, 10, 100, 50);
}`,
    output: 'A circle follows the mouse; a rectangle changes color when clicked',
    livePreview: true,
    notes: [
      'mouseIsPressed is true while mouse button is held',
      'mouseX and mouseY update every frame',
      'Use conditionals to respond to input',
    ],
    practice: {
      title: 'Paint Brush',
      description: 'Create a simple paint brush where clicking and dragging draws circles.',
      startCode: '',
      hint: 'Draw ellipses at mouseX, mouseY when mouseIsPressed is true.',
      solution: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
    ellipse(mouseX, mouseY, 10, 10);
  }
}`,
    },
  },
  {
    id: 'game-keyboard',
    category: 'p5.js Basics',
    title: 'Keyboard Input & Controls',
    difficulty: 'Beginner',
    theory: [
      'Keyboard input is essential for game controls like movement and actions.',
      'p5.js provides keyPressed() and key variables to detect keyboard input.',
      'Use keyCodes for arrow keys and special keys.',
    ],
    syntax: 'key, keyCode\nkeyPressed()\nkeyIsDown()',
    code: `let x = 400;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  // Move rectangle left/right with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }

  fill(100, 150, 255);
  rect(x, 250, 50, 50);
}`,
    output: 'A blue rectangle moves left and right with arrow keys',
    livePreview: true,
    notes: [
      'keyIsDown() checks if key is currently pressed',
      'LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW are predefined',
      'key variable stores the character pressed',
    ],
    practice: {
      title: 'Four-Way Movement',
      description: 'Move a square in all four directions using arrow keys.',
      startCode: '',
      hint: 'Track both x and y coordinates and update with LEFT/RIGHT/UP/DOWN arrows.',
      solution: `let x = 400;
let y = 300;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  if (keyIsDown(LEFT_ARROW)) x -= 5;
  if (keyIsDown(RIGHT_ARROW)) x += 5;
  if (keyIsDown(UP_ARROW)) y -= 5;
  if (keyIsDown(DOWN_ARROW)) y += 5;

  fill(100, 150, 255);
  rect(x, y, 50, 50);
}`,
    },
  },
  {
    id: 'game-colors-fill',
    category: 'p5.js Basics',
    title: 'Colors & Styling',
    difficulty: 'Beginner',
    theory: [
      'Colors in p5.js use RGB (Red, Green, Blue) values from 0-255.',
      'fill() sets the interior color, stroke() sets the outline color.',
      'Alpha channel (0-255) controls transparency.',
    ],
    syntax: 'fill(r, g, b);\nstroke(r, g, b);\ncolor(r, g, b, a);',
    code: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);

  // Pure red
  fill(255, 0, 0);
  rect(100, 100, 100, 100);

  // Pure green
  fill(0, 255, 0);
  ellipse(400, 200, 100, 100);

  // Pure blue
  fill(0, 0, 255);
  triangle(600, 100, 700, 100, 650, 200);

  // Semi-transparent yellow
  fill(255, 255, 0, 100);
  rect(200, 350, 150, 150);
}`,
    output: 'Shapes in red, green, blue, and semi-transparent yellow on white background',
    livePreview: true,
    notes: [
      'RGB values range from 0 (dark) to 255 (bright)',
      'Alpha parameter (4th value) controls transparency (0 = invisible, 255 = opaque)',
      'noFill() and noStroke() hide fill or outline',
    ],
    practice: {
      title: 'Rainbow Gradient',
      description: 'Draw 6 rectangles in rainbow colors (red, orange, yellow, green, blue, purple).',
      startCode: '',
      hint: 'Use fill() with different RGB values before drawing each rect().',
      solution: `function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  fill(255, 0, 0);
  rect(50, 200, 100, 100);
  fill(255, 128, 0);
  rect(160, 200, 100, 100);
  fill(255, 255, 0);
  rect(270, 200, 100, 100);
  fill(0, 255, 0);
  rect(380, 200, 100, 100);
  fill(0, 0, 255);
  rect(490, 200, 100, 100);
  fill(128, 0, 255);
  rect(600, 200, 100, 100);
}`,
    },
  },
  {
    id: 'game-sprite-basics',
    category: 'Sprites & Movement',
    title: 'Creating Sprites & Objects',
    difficulty: 'Intermediate',
    theory: [
      'Sprites are game objects like characters, enemies, or items.',
      'In p5.js, sprites are represented as objects with position, velocity, and appearance.',
      'Using classes makes managing multiple sprites efficient.',
    ],
    syntax: 'class Sprite {\n  constructor(x, y) { this.x = x; this.y = y; }\n  display() { ellipse(this.x, this.y, 20); }\n}',
    code: `class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  display() {
    fill(100, 150, 255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

let sprite;

function setup() {
  createCanvas(800, 600);
  sprite = new Sprite(400, 300);
}

function draw() {
  background(220);
  sprite.display();
}`,
    output: 'A blue circle (sprite) displayed at center of canvas',
    livePreview: true,
    notes: [
      'Classes organize sprite data and behavior',
      'constructor() initializes sprite properties',
      'display() renders the sprite each frame',
    ],
    practice: {
      title: 'Multiple Sprites',
      description: 'Create an array of 5 sprites and display them all on the canvas.',
      startCode: '',
      hint: 'Use a for loop to create sprites and another to display them.',
      solution: `class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    fill(100, 150, 255);
    ellipse(this.x, this.y, 30, 30);
  }
}

let sprites = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    sprites.push(new Sprite(random(800), random(600)));
  }
}

function draw() {
  background(220);
  for (let sprite of sprites) {
    sprite.display();
  }
}`,
    },
  },
  {
    id: 'game-velocity',
    category: 'Sprites & Movement',
    title: 'Velocity & Smooth Movement',
    difficulty: 'Intermediate',
    theory: [
      'Velocity is the rate of change of position (speed in a direction).',
      'Smooth movement requires updating position by velocity each frame.',
      'Bouncing off walls requires reversing velocity on collision.',
    ],
    syntax: 'this.vx, this.vy for velocity\nthis.x += this.vx; this.y += this.vy;',
    code: `class Sprite {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x < 15 || this.x > 785) this.vx *= -1;
    if (this.y < 15 || this.y > 585) this.vy *= -1;
  }

  display() {
    fill(100, 150, 255);
    ellipse(this.x, this.y, 30, 30);
  }
}

let sprite;

function setup() {
  createCanvas(800, 600);
  sprite = new Sprite(400, 300, 3, 2);
}

function draw() {
  background(220);
  sprite.update();
  sprite.display();
}`,
    output: 'A blue circle moves diagonally and bounces off canvas edges',
    livePreview: true,
    notes: [
      'Velocity updates position every frame for smooth motion',
      'Negative velocity reverses direction',
      'Boundary checks detect wall collisions',
    ],
    practice: {
      title: 'Controlled Speed',
      description: 'Create a sprite that moves toward the mouse with constant speed.',
      startCode: '',
      hint: 'Calculate direction to mouse, normalize it, and multiply by speed.',
      solution: `class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
  }

  update() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    this.x += (dx / distance) * this.speed;
    this.y += (dy / distance) * this.speed;
  }

  display() {
    fill(100, 150, 255);
    ellipse(this.x, this.y, 30, 30);
  }
}

let sprite;

function setup() {
  createCanvas(800, 600);
  sprite = new Sprite(400, 300);
}

function draw() {
  background(220);
  sprite.update();
  sprite.display();
}`,
    },
  },
  {
    id: 'game-collision',
    category: 'Game Logic',
    title: 'Collision Detection',
    difficulty: 'Intermediate',
    theory: [
      'Collision detection identifies when two sprites touch or overlap.',
      'Circle-to-circle collision uses distance between centers.',
      'If distance < sum of radii, sprites are colliding.',
    ],
    syntax: 'let d = dist(x1, y1, x2, y2);\nif (d < r1 + r2) { /* collision */ }',
    code: `class Sprite {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  collidesWith(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  display() {
    fill(100, 150, 255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

let player, obstacle;

function setup() {
  createCanvas(800, 600);
  player = new Sprite(400, 300, 15);
  obstacle = new Sprite(300, 200, 20);
}

function draw() {
  background(220);

  // Move player with mouse
  player.x = mouseX;
  player.y = mouseY;

  // Check collision
  if (player.collidesWith(obstacle)) {
    fill(255, 0, 0);
    text('COLLISION!', 350, 100);
  }

  player.display();
  obstacle.display();
}`,
    output: 'Two circles; red "COLLISION!" text appears when circles touch',
    livePreview: true,
    notes: [
      'dist() calculates Euclidean distance between two points',
      'Circle-circle collision is simple and fast',
      'Extend for rectangle or complex shapes as needed',
    ],
    practice: {
      title: 'Collect & Count',
      description: 'Display a score that increases when player collides with collectibles.',
      startCode: '',
      hint: 'Reset collectible position after collision and increment score.',
      solution: `class Sprite {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  collidesWith(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }
  display() {
    fill(100, 150, 255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

let player, collectible;
let score = 0;

function setup() {
  createCanvas(800, 600);
  player = new Sprite(400, 300, 15);
  collectible = new Sprite(random(800), random(600), 10);
}

function draw() {
  background(220);
  player.x = mouseX;
  player.y = mouseY;

  if (player.collidesWith(collectible)) {
    score++;
    collectible.x = random(800);
    collectible.y = random(600);
  }

  fill(0);
  text('Score: ' + score, 20, 30);
  player.display();
  collectible.display();
}`,
    },
  },
  {
    id: 'game-score-display',
    category: 'Game Logic',
    title: 'Score & Game State',
    difficulty: 'Intermediate',
    theory: [
      'Game state tracks health, score, level, and game status.',
      'Text rendering displays score and game information to the player.',
      'Game states include menu, playing, game over, and paused.',
    ],
    syntax: 'fill(0); text("Score: " + score, x, y);\ntextSize(size);',
    code: `let score = 0;
let health = 100;
let level = 1;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  fill(0);
  textSize(20);
}

function draw() {
  background(220);

  // Display game state
  text('Score: ' + score, 20, 30);
  text('Health: ' + health, 20, 60);
  text('Level: ' + level, 20, 90);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(40);
    text('GAME OVER', 300, 300);
    textSize(20);
    text('Final Score: ' + score, 300, 350);
  } else {
    // Simulate gameplay
    score += 1;
    if (score > 100) gameOver = true;
  }
}`,
    output: 'Score, Health, Level display updating; GAME OVER when score exceeds 100',
    livePreview: true,
    notes: [
      'textSize() controls font size',
      'fill() sets text color',
      'Separate variables for each game stat',
    ],
    practice: {
      title: 'Health System',
      description: 'Decrease health when clicking; show game over at 0 health.',
      startCode: '',
      hint: 'Decrement health on mousePressed and check if health <= 0.',
      solution: `let health = 100;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  fill(0);
  textSize(20);
  text('Health: ' + health, 20, 30);

  if (health <= 0) {
    gameOver = true;
    fill(255, 0, 0);
    textSize(40);
    text('GAME OVER', 300, 300);
  }
}

function mousePressed() {
  if (!gameOver) {
    health -= 10;
  }
}`,
    },
  },
  {
    id: 'game-levels',
    category: 'Game Logic',
    title: 'Level Progression',
    difficulty: 'Intermediate',
    theory: [
      'Games progress through levels with increasing difficulty.',
      'Each level can have different enemy counts, speeds, or obstacles.',
      'Level completion typically requires meeting a goal (defeating enemies, collecting items).',
    ],
    syntax: 'if (goal_met) { level++; reset_level(); }',
    code: `let level = 1;
let enemiesDefeated = 0;
let enemiesNeeded = 5 + level * 2;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  fill(0);
  textSize(20);
  text('Level: ' + level, 20, 30);
  text('Enemies: ' + enemiesDefeated + '/' + enemiesNeeded, 20, 60);

  // Simulate defeating enemies
  if (frameCount % 60 === 0 && enemiesDefeated < enemiesNeeded) {
    enemiesDefeated++;
  }

  // Check level completion
  if (enemiesDefeated >= enemiesNeeded) {
    level++;
    enemiesDefeated = 0;
    enemiesNeeded = 5 + level * 2;
  }

  // Display progress
  fill(100, 150, 255);
  rect(50, 100, 200, 30);
  fill(0);
  rect(50, 100, (200 * enemiesDefeated) / enemiesNeeded, 30);
}`,
    output: 'Progress bar fills; level increments when enemies are defeated',
    livePreview: true,
    notes: [
      'Difficulty increases with each level',
      'Progress bars visualize completion toward goal',
      'Reset level variables when advancing',
    ],
    practice: {
      title: 'Timed Levels',
      description: 'Create a level that lasts 30 seconds; display time remaining.',
      startCode: '',
      hint: 'Use frameCount to track elapsed time; level ends when time runs out.',
      solution: `let level = 1;
let timeStart = 0;
let levelDuration = 30 * 60; // 30 seconds

function setup() {
  createCanvas(800, 600);
  timeStart = frameCount;
}

function draw() {
  background(220);

  let elapsed = frameCount - timeStart;
  let remaining = max(0, levelDuration - elapsed);
  let seconds = floor(remaining / 60);

  fill(0);
  textSize(20);
  text('Time: ' + seconds + 's', 20, 30);
  text('Level: ' + level, 20, 60);

  if (remaining === 0) {
    level++;
    timeStart = frameCount;
  }
}`,
    },
  },
  {
    id: 'game-animation',
    category: 'Sprites & Movement',
    title: 'Sprite Animation & Frames',
    difficulty: 'Intermediate',
    theory: [
      'Animation sequences images (frames) in rapid succession.',
      'Sprite sheets contain multiple frames in a grid.',
      'Cycling through frames creates smooth animation effects.',
    ],
    syntax: 'currentFrame = (currentFrame + 1) % totalFrames;',
    code: `class AnimatedSprite {
  constructor(x, y, totalFrames) {
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.totalFrames = totalFrames;
    this.frameSize = 50;
  }

  update() {
    this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
  }

  display() {
    // Simulate animation by drawing different colored rectangles
    let colors = [
      [255, 0, 0],
      [255, 128, 0],
      [255, 255, 0],
      [0, 255, 0],
    ];
    fill(colors[this.currentFrame % colors.length]);
    rect(this.x, this.y, this.frameSize, this.frameSize);
  }
}

let sprite;

function setup() {
  createCanvas(800, 600);
  sprite = new AnimatedSprite(375, 275, 4);
}

function draw() {
  background(220);
  sprite.update();
  sprite.display();
}`,
    output: 'A square cycles through red, orange, yellow, and green colors',
    livePreview: true,
    notes: [
      'Modulo operator (%) cycles frame index',
      'Control animation speed by updating every N frames instead of every frame',
      'Sprite sheets reduce file sizes and loading time',
    ],
    practice: {
      title: 'Walking Character',
      description: 'Create a character that animates walking across the screen.',
      startCode: '',
      hint: 'Use multiple frames and move character horizontally each frame.',
      solution: `class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.frameCount = 4;
  }

  update() {
    this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    this.x += 2;
    if (this.x > 800) this.x = -50;
  }

  display() {
    let colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]];
    fill(colors[this.currentFrame]);
    rect(this.x, this.y, 50, 50);
  }
}

let character;

function setup() {
  createCanvas(800, 600);
  character = new Character(0, 275);
}

function draw() {
  background(220);
  character.update();
  character.display();
}`,
    },
  },
  {
    id: 'game-jumping',
    category: 'Sprites & Movement',
    title: 'Jumping & Gravity',
    difficulty: 'Intermediate',
    theory: [
      'Gravity simulates downward acceleration, pulling objects toward ground.',
      'Jumping applies upward velocity that diminishes over time.',
      'Platforms define where jumping is possible.',
    ],
    syntax: 'this.vy += gravity; if (this.y >= groundLevel) { this.vy = 0; }',
    code: `class Player {
  constructor(x, groundLevel) {
    this.x = x;
    this.y = groundLevel;
    this.groundLevel = groundLevel;
    this.vy = 0;
    this.gravity = 0.3;
    this.jumpPower = -12;
  }

  jump() {
    if (this.y === this.groundLevel) {
      this.vy = this.jumpPower;
    }
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y > this.groundLevel) {
      this.y = this.groundLevel;
      this.vy = 0;
    }
  }

  display() {
    fill(100, 150, 255);
    rect(this.x - 15, this.y - 30, 30, 30);
  }
}

let player;

function setup() {
  createCanvas(800, 600);
  player = new Player(400, 450);
}

function draw() {
  background(220);
  fill(100, 100, 100);
  rect(0, 450, 800, 150);

  player.update();
  player.display();
}

function keyPressed() {
  if (key === ' ') {
    player.jump();
  }
}`,
    output: 'A player character jumps when spacebar pressed; gravity pulls back to ground',
    livePreview: true,
    notes: [
      'Gravity should be a small positive value (0.1 to 0.5)',
      'Jump velocity is negative (upward)',
      'Check if on ground before allowing jump',
    ],
    practice: {
      title: 'Double Jump',
      description: 'Allow jumping twice before returning to ground.',
      startCode: '',
      hint: 'Track jump count; reset to 0 on ground, increment on jump.',
      solution: `class Player {
  constructor(x, groundLevel) {
    this.x = x;
    this.y = groundLevel;
    this.groundLevel = groundLevel;
    this.vy = 0;
    this.gravity = 0.3;
    this.jumpPower = -12;
    this.jumpsRemaining = 2;
  }

  jump() {
    if (this.jumpsRemaining > 0) {
      this.vy = this.jumpPower;
      this.jumpsRemaining--;
    }
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y >= this.groundLevel) {
      this.y = this.groundLevel;
      this.vy = 0;
      this.jumpsRemaining = 2;
    }
  }

  display() {
    fill(100, 150, 255);
    rect(this.x - 15, this.y - 30, 30, 30);
  }
}

let player;

function setup() {
  createCanvas(800, 600);
  player = new Player(400, 450);
}

function draw() {
  background(220);
  fill(100, 100, 100);
  rect(0, 450, 800, 150);
  player.update();
  player.display();
}

function keyPressed() {
  if (key === ' ') {
    player.jump();
  }
}`,
    },
  },
  {
    id: 'game-enemies',
    category: 'Game Logic',
    title: 'Enemy AI & Behavior',
    difficulty: 'Intermediate',
    theory: [
      'AI gives enemies simple behaviors like patrolling, chasing, or attacking.',
      'Distance checks determine if enemies can sense the player.',
      'Different AI states create variety: idle, patrol, chase, attack.',
    ],
    syntax: 'if (dist(this.x, this.y, playerX, playerY) < senseRange) { chase(); }',
    code: `class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.senseRange = 150;
    this.state = 'patrol';
  }

  update(playerX, playerY) {
    let distToPlayer = dist(this.x, this.y, playerX, playerY);

    if (distToPlayer < this.senseRange) {
      this.state = 'chase';
      // Chase player
      if (playerX > this.x) this.x += 2;
      else this.x -= 2;
    } else {
      this.state = 'patrol';
      // Patrol left/right
      this.x += this.vx;
      if (this.x < 50 || this.x > 750) this.vx *= -1;
    }
  }

  display() {
    if (this.state === 'chase') {
      fill(255, 0, 0);
    } else {
      fill(100, 100, 255);
    }
    ellipse(this.x, this.y, 30, 30);
  }
}

let player = { x: 400, y: 300 };
let enemy;

function setup() {
  createCanvas(800, 600);
  enemy = new Enemy(200, 300);
}

function draw() {
  background(220);
  player.x = mouseX;
  player.y = mouseY;

  enemy.update(player.x, player.y);

  fill(0, 255, 0);
  ellipse(player.x, player.y, 20, 20);
  enemy.display();
}`,
    output: 'Enemy patrols (blue); chases player (red) when close enough',
    livePreview: true,
    notes: [
      'Simple distance checks create convincing AI behavior',
      'Multiple states make enemies feel reactive',
      'Sense range defines aggro distance',
    ],
    practice: {
      title: 'Multiple Enemies',
      description: 'Create 3 enemies with different patrol zones.',
      startCode: '',
      hint: 'Create array of enemies; update and display each in loops.',
      solution: `class Enemy {
  constructor(x, y, minX, maxX) {
    this.x = x;
    this.y = y;
    this.minX = minX;
    this.maxX = maxX;
    this.vx = 2;
  }

  update(playerX, playerY) {
    if (dist(this.x, this.y, playerX, playerY) < 100) {
      if (playerX > this.x) this.x += 2;
      else this.x -= 2;
    } else {
      this.x += this.vx;
      if (this.x < this.minX || this.x > this.maxX) this.vx *= -1;
    }
  }

  display() {
    fill(100, 100, 255);
    ellipse(this.x, this.y, 30, 30);
  }
}

let enemies = [];
let player = { x: 400, y: 300 };

function setup() {
  createCanvas(800, 600);
  enemies.push(new Enemy(150, 300, 50, 250));
  enemies.push(new Enemy(400, 200, 300, 500));
  enemies.push(new Enemy(650, 400, 550, 750));
}

function draw() {
  background(220);
  player.x = mouseX;
  player.y = mouseY;

  fill(0, 255, 0);
  ellipse(player.x, player.y, 20, 20);

  for (let enemy of enemies) {
    enemy.update(player.x, player.y);
    enemy.display();
  }
}`,
    },
  },
  {
    id: 'game-particles',
    category: 'Visual Effects',
    title: 'Particle Systems',
    difficulty: 'Advanced',
    theory: [
      'Particles are small objects that simulate effects like explosions, smoke, or fire.',
      'Particle systems emit many particles with random properties.',
      'Particles fade out or disappear after their lifetime expires.',
    ],
    syntax: 'for (let i = 0; i < particles.length; i++) { particles[i].update(); }',
    code: `class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-3, -1);
    this.life = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 5;
  }

  display() {
    fill(255, 200, 0, this.life);
    ellipse(this.x, this.y, 5, 5);
  }

  isDead() {
    return this.life <= 0;
  }
}

let particles = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  // Create particles on click
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }
  }

  // Update and display
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}`,
    output: 'Clicking creates particle bursts that fade away',
    livePreview: true,
    notes: [
      'Alpha channel (4th color parameter) controls transparency',
      'Reduce life each frame for fade effect',
      'Remove dead particles to save memory',
    ],
    practice: {
      title: 'Explosion Effect',
      description: 'Create particles that spread outward from impact point.',
      startCode: '',
      hint: 'Use angle and speed for particles to radiate outward.',
      solution: `class Particle {
  constructor(x, y, angle, speed) {
    this.x = x;
    this.y = y;
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.life = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 5;
  }

  display() {
    fill(255, 100, 0, this.life);
    ellipse(this.x, this.y, 8, 8);
  }

  isDead() {
    return this.life <= 0;
  }
}

let particles = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    for (let i = 0; i < 20; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 5);
      particles.push(new Particle(mouseX, mouseY, angle, speed));
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}`,
    },
  },
  {
    id: 'game-simple-platformer',
    category: 'Mini Game Projects',
    title: 'Simple Platformer Game',
    difficulty: 'Advanced',
    theory: [
      'Platformers combine jumping, gravity, platforms, and enemies.',
      'Players navigate levels avoiding obstacles and collecting items.',
      'Core mechanics: movement, jumping, collision, platform interaction.',
    ],
    syntax: 'Check collision with platforms; apply gravity; handle input.',
    code: `class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.gravity = 0.4;
    this.jumpPower = -10;
    this.onGround = false;
  }

  handleInput() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 4;
    if (keyIsDown(RIGHT_ARROW)) this.x += 4;
  }

  update(platforms) {
    this.handleInput();
    this.vy += this.gravity;
    this.y += this.vy;
    this.onGround = false;

    for (let platform of platforms) {
      if (this.y + 20 >= platform.y &&
          this.y + 20 <= platform.y + 10 &&
          this.x + 15 > platform.x &&
          this.x - 15 < platform.x + platform.w) {
        this.y = platform.y - 20;
        this.vy = 0;
        this.onGround = true;
      }
    }
  }

  jump() {
    if (this.onGround) {
      this.vy = this.jumpPower;
    }
  }

  display() {
    fill(0, 255, 0);
    rect(this.x - 15, this.y - 20, 30, 40);
  }
}

let player;
let platforms = [];

function setup() {
  createCanvas(800, 600);
  player = new Player(400, 500);
  platforms.push({ x: 0, y: 550, w: 800 });
  platforms.push({ x: 200, y: 450, w: 150 });
  platforms.push({ x: 500, y: 350, w: 150 });
}

function draw() {
  background(220);

  for (let p of platforms) {
    fill(100, 100, 100);
    rect(p.x, p.y, p.w, 10);
  }

  player.update(platforms);
  player.display();

  fill(0);
  text('Arrow Keys: Move, Space: Jump', 20, 30);
}

function keyPressed() {
  if (key === ' ') {
    player.jump();
  }
}`,
    output: 'A green player character navigates platforms using arrow keys and spacebar',
    livePreview: true,
    notes: [
      'Platform collision checks vertical and horizontal bounds',
      'Track onGround state for jump validation',
      'Expand with obstacles, collectibles, and enemies',
    ],
    practice: {
      title: 'Add Collectibles',
      description: 'Add coins to platforms; increase score when collected.',
      startCode: '',
      hint: 'Create collectible objects; check collision with player.',
      solution: `class Collectible {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = false;
  }
  display() {
    if (!this.collected) {
      fill(255, 255, 0);
      ellipse(this.x, this.y, 15, 15);
    }
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.score = 0;
  }

  checkCollectibles(collectibles) {
    for (let c of collectibles) {
      if (dist(this.x, this.y, c.x, c.y) < 25) {
        c.collected = true;
        this.score += 10;
      }
    }
  }
}

let player;
let collectibles = [];

function setup() {
  createCanvas(800, 600);
  player = new Player(400, 500);
  collectibles.push(new Collectible(250, 420));
  collectibles.push(new Collectible(550, 320));
}

function draw() {
  background(220);

  for (let c of collectibles) {
    c.display();
  }

  player.checkCollectibles(collectibles);
  fill(0);
  text('Score: ' + player.score, 20, 30);
}`,
    },
  },
  {
    id: 'game-flappy-bird',
    category: 'Mini Game Projects',
    title: 'Flappy Bird Clone',
    difficulty: 'Advanced',
    theory: [
      'Flappy Bird is a simple tap-to-jump mechanic with scrolling obstacles.',
      'Player controls vertical position; obstacles scroll horizontally.',
      'Collision detection ends the game.',
    ],
    syntax: 'y += velocity; velocity += gravity; check collision with pipes.',
    code: `class Bird {
  constructor() {
    this.y = 300;
    this.vy = 0;
    this.gravity = 0.2;
    this.flapPower = -6;
  }

  flap() {
    this.vy = this.flapPower;
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;
  }

  display() {
    fill(255, 200, 0);
    ellipse(100, this.y, 30, 30);
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.gapY = random(100, 400);
    this.gapSize = 100;
    this.scored = false;
  }

  update() {
    this.x -= 3;
  }

  display() {
    fill(0, 150, 0);
    rect(this.x, 0, 40, this.gapY);
    rect(this.x, this.gapY + this.gapSize, 40, 600 - this.gapY - this.gapSize);
  }
}

let bird;
let pipes = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  bird = new Bird();
  pipes.push(new Pipe(600));
}

function draw() {
  background(135, 206, 235);

  if (!gameOver) {
    bird.update();

    if (frameCount % 120 === 0) {
      pipes.push(new Pipe(800));
    }

    for (let p of pipes) {
      p.update();
      p.display();

      if (p.x < 70 && !p.scored) {
        score++;
        p.scored = true;
      }

      if (bird.y < p.gapY || bird.y > p.gapY + p.gapSize) {
        if (p.x < 130 && p.x > 70) {
          gameOver = true;
        }
      }
    }

    if (bird.y > 600) gameOver = true;
  }

  bird.display();
  fill(0);
  textSize(20);
  text('Score: ' + score, 20, 30);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(40);
    text('GAME OVER', 300, 300);
  }
}

function mousePressed() {
  if (!gameOver) {
    bird.flap();
  }
}`,
    output: 'A yellow bird flaps through scrolling green pipes; collision ends game',
    livePreview: true,
    notes: [
      'Click to flap; gravity pulls bird down',
      'Pipes scroll left and new ones spawn regularly',
      'Collision with pipe or ground triggers game over',
    ],
    practice: {
      title: 'Add Restart',
      description: 'Allow clicking to restart the game after game over.',
      startCode: '',
      hint: 'Add a restart flag and reset variables when clicked after game over.',
      solution: `function mousePressed() {
  if (gameOver) {
    bird = new Bird();
    pipes = [];
    pipes.push(new Pipe(600));
    score = 0;
    gameOver = false;
  } else {
    bird.flap();
  }
}`,
    },
  },
  {
    id: 'game-memory-match',
    category: 'Mini Game Projects',
    title: 'Memory Matching Game',
    difficulty: 'Advanced',
    theory: [
      'Memory games test recall by flipping cards to find matching pairs.',
      'Game tracks flipped cards and checks for matches.',
      'Players must remember card positions to win.',
    ],
    syntax: 'Track flipped cards; check if values match; reset on mismatch.',
    code: `class Card {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 80;
    this.value = value;
    this.flipped = false;
  }

  clicked(mx, my) {
    return mx > this.x && mx < this.x + this.w &&
           my > this.y && my < this.y + this.h;
  }

  display() {
    if (!this.flipped) {
      fill(100, 150, 255);
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textAlign(CENTER, CENTER);
      text('?', this.x + 40, this.y + 40);
    } else {
      fill(200, 200, 200);
      rect(this.x, this.y, this.w, this.h);
      fill(0);
      textSize(30);
      textAlign(CENTER, CENTER);
      text(this.value, this.x + 40, this.y + 40);
    }
  }
}

let cards = [];
let flipped = [];
let matches = 0;

function setup() {
  createCanvas(500, 500);
  let values = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  values = shuffle(values);

  let idx = 0;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      cards.push(new Card(x * 100 + 20, y * 100 + 20, values[idx++]));
    }
  }
}

function draw() {
  background(220);

  for (let card of cards) {
    card.display();
  }

  fill(0);
  textSize(20);
  text('Matches: ' + matches, 20, 480);
}

function mousePressed() {
  for (let card of cards) {
    if (card.clicked(mouseX, mouseY) && !card.flipped) {
      card.flipped = true;
      flipped.push(card);

      if (flipped.length === 2) {
        if (flipped[0].value === flipped[1].value) {
          matches++;
          flipped = [];
        } else {
          setTimeout(() => {
            flipped[0].flipped = false;
            flipped[1].flipped = false;
            flipped = [];
          }, 1000);
        }
      }
    }
  }
}`,
    output: 'A 4x4 grid of face-down cards; flip to find matching pairs',
    livePreview: true,
    notes: [
      'Cards display their value when flipped',
      'Matching pairs remain flipped; mismatches flip back',
      'Track matched pairs count toward victory',
    ],
    practice: {
      title: 'Win Condition',
      description: 'Display "You Won!" when all pairs are matched.',
      startCode: '',
      hint: 'Check if matches === 8 (total pairs) and display message.',
      solution: `function draw() {
  background(220);

  for (let card of cards) {
    card.display();
  }

  fill(0);
  textSize(20);
  text('Matches: ' + matches, 20, 480);

  if (matches === 8) {
    fill(0, 200, 0);
    textSize(40);
    text('YOU WON!', 150, 250);
  }
}`,
    },
  },
  {
    id: 'game-snake',
    category: 'Mini Game Projects',
    title: 'Snake Game',
    difficulty: 'Advanced',
    theory: [
      'Snake is a classic game where the player controls a growing snake.',
      'Snake eats food to grow; hitting walls or itself ends the game.',
      'Movement direction changes with arrow keys.',
    ],
    syntax: 'Track segments; move head; check food collision; check self collision.',
    code: `let snakeSegments = [{ x: 200, y: 200 }];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let foodX = 300;
let foodY = 300;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

function draw() {
  background(220);

  // Update direction
  direction = nextDirection;

  // Move snake
  let head = snakeSegments[snakeSegments.length - 1];
  let newHead = {
    x: head.x + direction.x * 20,
    y: head.y + direction.y * 20
  };

  // Check wall collision
  if (newHead.x < 0 || newHead.x >= 400 ||
      newHead.y < 0 || newHead.y >= 400) {
    gameOver = true;
  }

  // Check self collision
  for (let segment of snakeSegments) {
    if (newHead.x === segment.x && newHead.y === segment.y) {
      gameOver = true;
    }
  }

  snakeSegments.push(newHead);

  // Check food collision
  if (newHead.x === foodX && newHead.y === foodY) {
    score += 10;
    foodX = floor(random(20)) * 20;
    foodY = floor(random(20)) * 20;
  } else {
    snakeSegments.shift();
  }

  // Draw
  fill(100, 150, 255);
  for (let segment of snakeSegments) {
    rect(segment.x, segment.y, 20, 20);
  }

  fill(255, 0, 0);
  rect(foodX, foodY, 20, 20);

  fill(0);
  textSize(20);
  text('Score: ' + score, 20, 380);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(30);
    text('GAME OVER', 120, 200);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && direction.x === 0) {
    nextDirection = { x: -1, y: 0 };
  } else if (keyCode === RIGHT_ARROW && direction.x === 0) {
    nextDirection = { x: 1, y: 0 };
  } else if (keyCode === UP_ARROW && direction.y === 0) {
    nextDirection = { x: 0, y: -1 };
  } else if (keyCode === DOWN_ARROW && direction.y === 0) {
    nextDirection = { x: 0, y: 1 };
  }
}`,
    output: 'A blue snake grows when eating red food; collision ends game',
    livePreview: true,
    notes: [
      'Prevent 180-degree turns (snake cannot reverse into itself)',
      'Snake grows by not removing tail when food is eaten',
      'Food spawns randomly on grid',
    ],
    practice: {
      title: 'Difficulty Levels',
      description: 'Increase game speed as score increases.',
      startCode: '',
      hint: 'Calculate frameRate based on score; higher score = faster game.',
      solution: `function draw() {
  // Increase difficulty
  let level = floor(score / 50) + 1;
  frameRate(5 + level * 2);

  // Rest of draw code...
}`,
    },
  },
  {
    id: 'game-brick-breaker',
    category: 'Mini Game Projects',
    title: 'Brick Breaker Game',
    difficulty: 'Advanced',
    theory: [
      'Brick Breaker uses a bouncing ball and paddle to break bricks.',
      'Ball bounces off walls, paddle, and bricks.',
      'Destroying all bricks wins the level; missing the ball loses a life.',
    ],
    syntax: 'Track ball velocity; detect paddle/brick collisions; remove hit bricks.',
    code: `let ballX = 200;
let ballY = 350;
let ballVX = 3;
let ballVY = -3;
let paddleX = 150;
let bricks = [];
let lives = 3;
let score = 0;

function setup() {
  createCanvas(400, 500);
  createBricks();
}

function createBricks() {
  bricks = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 5; x++) {
      bricks.push({ x: x * 80, y: y * 30 + 20, w: 80, h: 20 });
    }
  }
}

function draw() {
  background(220);

  // Move ball
  ballX += ballVX;
  ballY += ballVY;

  // Wall collisions
  if (ballX < 5 || ballX > 395) ballVX *= -1;
  if (ballY < 5) ballVY *= -1;

  // Paddle collision
  if (ballY > 450 && ballY < 470 &&
      ballX > paddleX && ballX < paddleX + 100) {
    ballVY *= -1;
  }

  // Miss ball
  if (ballY > 500) {
    lives--;
    if (lives > 0) {
      ballX = 200;
      ballY = 350;
      ballVX = 3;
      ballVY = -3;
    }
  }

  // Brick collision
  for (let i = bricks.length - 1; i >= 0; i--) {
    let b = bricks[i];
    if (ballX > b.x && ballX < b.x + b.w &&
        ballY > b.y && ballY < b.y + b.h) {
      ballVY *= -1;
      bricks.splice(i, 1);
      score += 10;
    }
  }

  // Draw
  fill(100);
  rect(paddleX, 450, 100, 20);

  fill(255, 0, 0);
  ellipse(ballX, ballY, 10, 10);

  fill(0, 150, 0);
  for (let brick of bricks) {
    rect(brick.x, brick.y, brick.w, brick.h);
  }

  fill(0);
  textSize(16);
  text('Lives: ' + lives + ' Score: ' + score, 10, 490);

  // Move paddle with mouse
  paddleX = constrain(mouseX - 50, 0, 300);

  if (lives === 0 || bricks.length === 0) {
    fill(0);
    textSize(30);
    text(bricks.length === 0 ? 'YOU WON!' : 'GAME OVER', 120, 250);
  }
}`,
    output: 'Ball bounces off paddle and bricks; destroying all bricks wins',
    livePreview: true,
    notes: [
      'Ball velocity controls speed and direction',
      'Paddle follows mouse horizontally',
      'Brick collision detection removes brick and reverses ball',
    ],
    practice: {
      title: 'Power-ups',
      description: 'Add power-up bricks that drop temporary bonuses.',
      startCode: '',
      hint: 'Some bricks spawn collectibles when hit; collectibles affect gameplay.',
      solution: `// Add powerup property to bricks
for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 5; x++) {
    bricks.push({
      x: x * 80,
      y: y * 30 + 20,
      w: 80,
      h: 20,
      powerup: random() < 0.2 ? 'slow' : null
    });
  }
}

// When collecting powerup:
if (brick.powerup === 'slow') {
  ballVX *= 0.7;
  ballVY *= 0.7;
}`,
    },
  },
];
