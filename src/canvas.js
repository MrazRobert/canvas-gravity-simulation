import utils from './utils';
import './style.scss';
import 'font-awesome/css/font-awesome.css';
import * as dat from 'dat.gui';

const gui = new dat.GUI({ name: 'gravity', closed: true, hideable: true });
gui.domElement.id = 'gui';

const simulation = {
  alpha: 0.8,
  gravity: 0.2,
  friction: 0.98,
  balls: {
    count: 400,
    minRadius: 4,
    maxRadius: 20
  }
}

gui.add(simulation, 'alpha', 0, 1)
gui.add(simulation, 'gravity', 0, 5, 0.01).onChange(() => setRadius())
gui.add(simulation, 'friction', 0, 1.1, 0.01).onChange(() => setRadius())
const ballProperties = gui.addFolder('ball properties')
ballProperties.add(simulation.balls, 'count', 0, 600, 1).onChange(() => ballAdderAndRemover())
ballProperties.add(simulation.balls, 'minRadius', 4, 30, 1).onChange(() => setRadius())
ballProperties.add(simulation.balls, 'maxRadius', 4, 30, 1).onChange(() => setRadius())

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#FA0C8F', '#FADE19', '#AE01FA', '#21FA19', '#310CFA']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

const pElement = document.getElementById("click")

pElement.addEventListener('click', () => {
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * simulation.friction
    } else {
      this.dy += simulation.gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width
      || this.x - this.radius + this.dx <= 0) {
      this.dx = -this.dx
    }

    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Implementation
let balls
function init() {
  balls = []
  for (let i = 0; i < simulation.balls.count; i++) {
    balls.push(createBall());
  }
}

// Create a new ball
function createBall() {
  const {minRadius, maxRadius} = simulation.balls
  const radius = utils.randomIntFromRange(minRadius, maxRadius);
  const x = utils.randomIntFromRange(radius, canvas.width - radius);
  const y = utils.randomIntFromRange(0, canvas.height - radius);
  const dx = utils.randomIntFromRange(-3, 3);
  const dy = utils.randomIntFromRange(-2, 2);
  const color = utils.randomColor(colors)
  return new Ball(x, y, dx, dy, radius, color)
}

// Adding and removing balls
function ballAdderAndRemover() {
  const ballsLength = balls.length
  const ballsCount = Math.abs(ballsLength - simulation.balls.count)
  if (ballsLength < simulation.balls.count) {
    for (let i = 0; i < ballsCount; i++) {
      balls.push(createBall())
    }
  }
  if (ballsLength > simulation.balls.count) {
    for (let i = 0; i < ballsCount; i++) {
      balls.pop()
    }
  }
}

// setting the minimum and the maximum radius of the balls
function setRadius() {
  const {minRadius, maxRadius} = simulation.balls
  balls.forEach((ball, index) => {
    if (ball.radius < minRadius) {
      balls.splice(index, 1)
      balls.push(createBall())
    }
    if (ball.radius > maxRadius) {
      balls.splice(index, 1)
      balls.push(createBall())
    }
  })
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(0, 0, 0, ${simulation.alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
  }
}

init()
animate()
