const canvas = document.getElementById("gameScreen")
canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext("2d")

// start game button
const startGameBtn = document.getElementById("startGameBtn")
const menu = document.getElementById("menu")
const finalScoreEl = document.getElementById("finalScore")
const complimentEL = document.getElementById("compliment")

// score
const scoreElement = document.getElementById("gameScore")
let score = 0;

ctx.clearRect(0, 0, canvas.width, canvas.height);

// draw the player
const x = canvas.width / 2
const y = canvas.height / 2
let player = new Player(x, y, 20, 'white')
player.draw(ctx)

let projectiles = []
let proj_speed = 9

let particles = []

let enemies = []
let enemy_speed = 2

function init()
{
	player = new Player(x, y, 20, 'white')
	player.draw(ctx)
	projectiles = []
	particles = []
	enemies = []
	score = 0;
	scoreElement.innerHTML = score;
}

function spawnEnemy()
{
	setInterval(() => {
		const radius = Math.random() * (30-8) + 8
		let x, y

		if (Math.random() < 0.5)
		{
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
			y = Math.random() * canvas.height
		}
		else
		{
			x = Math.random() * canvas.width
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
		}

		// find the direction toward player
		const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x)
		const velocity  = {
			x: Math.cos(angle) * enemy_speed,
			y: Math.sin(angle) * enemy_speed,
		}

		const color = `hsl(${Math.random() * 360}, 50%, 50%)`
		enemies.push(new Enemy(x, y, radius, color, velocity))

	}, 1300)
}

function animate()
{
	animationId = requestAnimationFrame(animate)

	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	player.draw(ctx)
	projectiles.forEach((proj, pIndex) => {
		proj.update(ctx)

		// delete projectile when going off the screen
		if (proj.x + proj.radius < 0 ||
			proj.x - proj.radius > canvas.width ||
			proj.y + proj.radius < 0 ||
			proj.y - proj.radius > canvas.height)
		{
			setTimeout(() => {
				projectiles.splice(pIndex, 1)
			}, 0)
		}
	})

	enemies.forEach((enemy, eIndex) => {
		enemy.update(ctx)

		// check for collision with player
		const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y)
		if (distance < enemy.radius + player.radius + 1)
		{
			endGame(animationId)
		}

		// detect collision with enemies
		projectiles.forEach((proj, pIndex) => {
			// distance between the projectile and the enemy
			const distance = Math.hypot(proj.x - enemy.x, proj.y - enemy.y)
			if (distance < proj.radius + enemy.radius + 1)
			{
				// create explosion
				for (let i = 0; i < enemy.radius; i++)
				{
					particles.push(new Particle(proj.x, proj.y, Math.random() * 2, enemy.color, {
						x: (Math.random() - 0.5) * (Math.random() * 4),
						y: (Math.random() - 0.5) * (Math.random() * 4),
					}))
				}

				// shrink the enemy first
				if (enemy.radius > 20)
				{
					score += 100
					scoreElement.innerHTML = score
					gsap.to(enemy, {
						radius: enemy.radius - 10,
					})
					setTimeout(() => {
						projectiles.splice(pIndex, 1)
					}, 0)
				}
				// remove enemy completely
				else
				{
					score += 150
					scoreElement.innerHTML = score
					// prevent flash
					setTimeout(() => {
						enemies.splice(eIndex, 1)
						projectiles.splice(pIndex, 1)
					}, 0)
				}
			}
		})
	})

	particles.forEach((particle, index) => {
		if (particle.alpha <= 0)
			particles.splice(index, 1)
		else
			particle.update(ctx)
	})
}

window.addEventListener('click', (e) => {
	const angle = Math.atan2(e.clientY - y, e.clientX - x)
	const velocity = {
		x: Math.cos(angle) * proj_speed,
		y: Math.sin(angle) * proj_speed,
	}
	projectiles.push(new Projectile(x, y, 5, 'white', velocity))
})

startGameBtn.addEventListener('click', () => {
	init()
	spawnEnemy()
	animate()
	menu.style.display = 'none'
})

function endGame(animationId)
{
	menu.style.display = 'flex'
	finalScoreEl.innerHTML = score
	complimentEL.style.display = "block"
	if (score > 10000)
	{
		complimentEL.innerHTML = "Congratulations! You're so talented!"
		complimentEL.style.color = "orange"
	}

	cancelAnimationFrame(animationId)
}
