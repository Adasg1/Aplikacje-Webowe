const board = document.querySelector("#board")
const h2Score = document.querySelector("#score")
const divReset = document.querySelector("#reset")
const h2Name = document.querySelector("#name")
const mouseCursor = document.querySelector("#crosshair")
const h2Final = document.querySelector("#final")
const zombieDict = {}

let score = 100
let health = 3
let index = 0
let gameRunning

function createZombie(){
  let speed = getRandomInt(10,51)
  let bottom = getRandomInt(3, 31)
  let size = getRandomInt(1,3)
    
  spawnZombie(speed, bottom, size)
}

function spawnZombie(speed, bottom, size){
  let zombie = document.createElement("div")
    
  zombie.classList.add("zombie")
  zombie.setAttribute("id", index)
  zombie.addEventListener("click", zombieHit)
  zombie.style.bottom = bottom + "vh"
  zombie.style.left = "100vw"
  zombie.style.transform = "scale(" + size + ")"
    
  board.appendChild(zombie)
  index++
    
  animateZombie(zombie, speed)
}

function animateZombie(zombie, speed){
  let shift = 200
  let bgPosition = 0
  let position = 0

  zombieDict[zombie.id] = setInterval ( () => {
    zombie.style.backgroundPositionX = bgPosition + shift +"px"
    zombie.style.left = 100 - position + "vw"
    bgPosition -= shift
    position++
    
    if (bgPosition ==- 1800)
      bgPosition=0
        
    if(position == 115){
      zombie.remove()
      health -= 1
			for(let i=health; i<3; i++)
				document.querySelectorAll("img")[i].src = "images/empty_heart.png"
            
      if(health <= 0)
        gameEnd()

      if(score < 0)
        gameEnd()
            
      clearInterval(zombieDict[zombie.id])
    }
  }
  , speed )
}

function getRandomInt(min, max){
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max-min) + min)
}

function crosshairMove(e){
  mouseCursor.style.top = e.pageY + "px"
  mouseCursor.style.left = e.pageX + "px"
}


function boardShot(){
  score -= 5
  h2Score.textContent=score

  if (score < 5) {
    gameEnd();
  }
}

function zombieHit(){
  score += 10
  h2Score.textContent=score

  clearInterval(zombieDict[this.id])
  this.remove()
}

function loadGame(){
  health = 3
  score = 100
  index = 0

  h2Score.textContent=score
  document.body.style.cursor="none"
  board.addEventListener("click", boardShot)
  window.addEventListener("mousemove", crosshairMove)
  let zombies = document.querySelectorAll("div.zombie")
    
  for (let i = 0; i < zombies.length; i++)
    zombies[i].remove()
    
  gameRunning = setInterval ( () => {
    createZombie()
    if(score < 0)
      gameEnd()
  }, 1000)
}

function resetGame(){
  divReset.style.transform = "translateY(200%)"
	for(let i=0; i<3; i++)
		document.querySelectorAll("img")[i].src = "images/full_heart.png"
  loadGame()
}

function gameEnd(){
  clearInterval(gameRunning)
    
  Object.keys(zombieDict).forEach(function(key) {
    clearInterval(zombieDict[key])
  })

  board.removeEventListener("click", boardShot)
	h2Final.textContent = score
  window.removeEventListener("mousemove", crosshairMove)
  document.body.style.cursor="default"
    
  divReset.style.transform = "translateY(0%)"

  document.getElementById("resetGame").addEventListener("click", resetGame)

  let gameOverMusic = document.getElementById('gameOverMusic');
  gameOverMusic.play();

  document.getElementById("resetGame").addEventListener("click", function() {
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
  });
}

loadGame()

