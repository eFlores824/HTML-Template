var frameCount, gameTimer;

function resetGameTimer() {
	frameCount = 0;
	gameTimer = 0;
}

function runGameTimer() {
	frameCount += 1
	if (frameCount % (FPS / 10) == 0) {
		gameTimer = frameCount / (FPS);
	}
}
resetGameTimer();