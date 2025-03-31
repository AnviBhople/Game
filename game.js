// Initialize Kaboom.js
kaboom();

// Load Sprites (Check the correct path)
loadSprite("player", "assets/player.png");
loadSprite("enemy", "assets/enemy.jpeg");
loadSprite("background", "assets/background.jpg");
loadSprite("bullet", "assets/bullet.jpeg");

scene("game", () => {
	// Add Background
	add([sprite("background"), scale(1.5)]);

	// Player and movement
	const player = add([sprite("player"), pos(300, 400), area(), body()]);

	onKeyDown("left", () => {
		player.move(-200, 0);
	});
	onKeyDown("right", () => {
		player.move(200, 0);
	});
	onKeyDown("down", () => {
		player.move(0, 200);
	});
	onKeyDown("up", () => {
		player.move(0, -200);
	});

	// Shooting Bullets
	onKeyPress("space", () => {
		const bullet = add([
			sprite("bullet"),
			pos(player.pos.x + 20, player.pos.y),
			area(),
			"bullet",
			{
				speed: 400,
			},
		]);
	});

	// Bullet Movements
	action("bullet", (b) => {
		b.move(0, -b.speed);
		if (b.pos.y < 0) {
			destroy(b);
		}
	});

	// Spawning Enemies every 1 second
	loop(1, () => {
		add([
			sprite("enemy"),
			pos(rand(0, width()), 0),
			area(),
			body(),
			"enemy",
			{
				speed: rand(100, 200),
			},
		]);
	});

	// Enemy Movements
	action("enemy", (e) => {
		e.move(0, e.speed);
		if (e.pos.y > height()) {
			destroy(e);
		}
	});

	// Bullets hitting enemies
	collides("bullet", "enemy", (b, e) => {
		destroy(b);
		destroy(e);
	});

	// Game Over Condition
	collides("enemy", player, () => {
		destroy(player);
		add([
			text("Game Over!", { size: 48 }),
			pos(width() / 2 - 100, height() / 2),
		]);
		wait(2, () => {
			go("game"); // Restart game
		});
	});
});

// Start the Game
go("game");
