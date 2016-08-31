var current_state = titleState;

var score = 0;

function loop() {
	current_state.execute();
	stage.update();
	runGameTimer();
}

function switchStates(new_state) {
	current_state.onExit();
	current_state = new_state;
	current_state.onEnter();
}