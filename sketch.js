const MASS_EARTH = 5.972e24
const MASS_SUN = 1.989e30
const RADIUS_SUN = 7e8
const RADIUS_EARTH = 6.4e6
const G = 6.67e-11
const DISTANCE = 1.5e11

let showTrails = false

let [
  x,
  y,
  vx,
  vy
] = [200, 200, 0, 0]

const [ox, oy] = [1000, 500]

const stars = []
let trails = []

function setup() {
  createCanvas(1920, 1080)
  const v = Math.sqrt(G*MASS_EARTH/DISTANCE)
  const theta = Math.atan((oy-y)/(ox-x))
  vx = v * Math.sin(theta)
  vy = -v * Math.cos(theta)
  frameRate(60)

  for (let i = 0; i < 1000; i++) {
    const x = Math.random()*1920
    const y = Math.random()*1080
    stars.push({ x, y })
  }
}

function draw() {
  background(0)

  fill(255, 255, 255)
  stroke(255)
  for (const { x, y } of stars) {
    ellipse(x, y, 1,1)
  }

  const s = 0.5
  scale(s)
  translate(width/2, height/2)
  

  fill(255)
  stroke(255)

  if (showTrails) {
    for (let i = 0; i < trails.length - 1; i++) {
      const trail = trails[i]
      const next = trails[i+1]
      line(trail.x, trail.y, next.x, next.y)
    }
  }

  fill(255, 255, 0)
  ellipse(ox, oy, RADIUS_SUN*1e-7)

  fill(0, 255, 255)
  ellipse(x, y, RADIUS_EARTH*4e-6)

  const acceleration = (G*MASS_EARTH)/(RADIUS_EARTH*RADIUS_EARTH)
  const theta = Math.atan((oy-y)/(ox-x))
  let ax = Math.cos(theta)*acceleration
  let ay = Math.sin(theta)*acceleration

  if (x>=ox){
    ay*=-1
    ax*=-1
  }

  stroke(255)
  line(x,y,x+(ax*20),y+(ay*20))
  stroke(255,0,255)
  line(x,y,x+(vx*5),y+(vy*5))

  vx+=ax
  vy+=ay
  x+=vx
  y+=vy

  if (showTrails)
    trails.push({ x, y, time: Date.now() })
}

function keyPressed() {
  if (key == 't') {
    showTrails = !showTrails
    trails=[]
  }
}