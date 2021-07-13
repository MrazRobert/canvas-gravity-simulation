import utils from './utils'
import './style.scss'
import 'font-awesome/css/font-awesome.css'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#FA0C8F', '#FADE19', '#AE01FA', '#21FA19', '#310CFA']

const gravity = 0.2;
const friction = 0.98;

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

addEventListener('click', () => {
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
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity;
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
  for (let i = 0; i < 400; i++) {
    const radius = utils.randomIntFromRange(4, 20);
    const x = utils.randomIntFromRange(radius, canvas.width - radius);
    const y = utils.randomIntFromRange(0, canvas.height - radius);
    const dx = utils.randomIntFromRange(-3, 3);
    const dy = utils.randomIntFromRange(-2, 2);
    const color = utils.randomColor(colors)
    balls.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.8)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 1; i < balls.length; i++) {
    balls[i].update();
  }
}

init()
animate()
