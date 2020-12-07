class Player {
	constructor(x, y, radius, color)
	{
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}

	draw(ctx)
	{
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill()
	}
}

class Projectile {
	constructor(x, y, radius, color, velocity)
	{
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}

	draw(ctx)
	{
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill()
	}

	update(ctx)
	{
		this.draw(ctx)
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}

class Enemy {
	constructor(x, y, radius, color, velocity)
	{
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}

	draw(ctx)
	{
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill()
	}

	update(ctx)
	{
		this.draw(ctx)
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}

class Particle {
	constructor(x, y, radius, color, velocity)
	{
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
		this.alpha = 1
		this.friction = 0.98
	}

	draw(ctx)
	{
		ctx.save()
		ctx.globalAlpha = this.alpha
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.restore()
	}

	update(ctx)
	{
		this.draw(ctx)
		this.velocity.x *= this.friction
		this.velocity.y *= this.friction
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
		this.alpha -= 0.01
	}
}
