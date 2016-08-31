var cheeseBlocks = [];
var numRows, numColumns;

var cheesePossibilities = {
	REVEALED: "revealed",
	TRAP: "trap",
	CHEESE: "cheese"
}

function createCheeseBlocks (offsetx, offsety, rows, columns, rowHeight, columnWidth) {
	numRows = rows;
	numColumns = columns;
	for (x = 0; x < columns; ++x) {
		for (y = 0; y < rows; ++y) {
			cheese.x = offsetx + x * columnWidth;
			cheese.y = offsety + y * rowHeight;
			
			var cheeseBlock = {};
			cheeseBlock.sprite = cheese.clone();
			cheeseBlock.sprite.visible = true;
			cheeseBlock.revealed = false;
			cheeseBlock.isTrap = false;
			
			cheeseBlocks.push(cheeseBlock);
			stage.addChild(cheeseBlock.sprite);
		}
	}
}

function setTraps(numTraps) {
	var trapsSet = 0;
	while (trapsSet != numTraps) {
		var randomSpot = Math.floor(Math.random() * (cheeseBlocks.length - 1));
		if (!cheeseBlocks[randomSpot].isTrap) {
			cheeseBlocks[randomSpot].isTrap = true;
			++trapsSet;
		}
	}
}

function clearCheeseBlocks() {
	for (i = 0; i < cheeseBlocks.length; ++i) {
		cheeseBlocks[i].sprite.visible = false;
		stage.removeChild(cheeseBlocks[i]);
	}
	cheeseBlocks = [];
}

function assignNumNearbyTraps() {
	for (row = 0; row < numRows; ++row) {
		for (column = 0; column < numColumns; ++column) {
			var cheeseBlock = getCheeseBlock(row, column);
			cheeseBlock.numTraps = numNearbyTraps(row, column);
		}
	}
}

function numNearbyTraps(row, column) {
	var nearbyBlocks = [];
	if (row > 0) {
		nearbyBlocks.push(getCheeseBlock(row - 1, column));
		if (column > 0) {
			nearbyBlocks.push(getCheeseBlock(row - 1, column - 1));
		}
		if (column < numColumns - 1) {
			nearbyBlocks.push(getCheeseBlock(row - 1, column + 1));
		}
	}
	if (row < numRows - 1) {
		nearbyBlocks.push(getCheeseBlock(row + 1, column));
		if (column > 0) {
			nearbyBlocks.push(getCheeseBlock(row + 1, column - 1));
		}
		if (column < numColumns - 1) {
			nearbyBlocks.push(getCheeseBlock(row + 1, column + 1));
		}
	}
	if (column > 0) {
		nearbyBlocks.push(getCheeseBlock(row, column - 1));
	}
	if (column < numColumns - 1) {
		nearbyBlocks.push(getCheeseBlock(row, column + 1));
	}
	var trapsFound = 0;
	for (i = 0; i < nearbyBlocks.length; ++i) {
		if (nearbyBlocks[i].isTrap) {
			trapsFound += 1;
		}
	}
	return trapsFound;
}

function getCheeseBlock(row, column) {
	var index = column * numRows + row;
	return cheeseBlocks[index];
}

function checkTrap(row, column) {
	var cheeseBlock = getCheeseBlock(row, column);
	if (cheeseBlock.revealed) {
		return cheesePossibilities.REVEALED;
	}
	cheeseBlock.revealed = true;
	cheeseBlock.sprite.visible = false;

	if (cheeseBlock.isTrap) {
		
		mousetrap.x = cheeseBlock.sprite.x;
		mousetrap.y = cheeseBlock.sprite.y;
		
		cheeseBlock.sprite = mousetrap.clone();
		cheeseBlock.sprite.visible = true;
		stage.addChild(cheeseBlock.sprite);
	}
	return cheeseBlock.isTrap? cheesePossibilities.TRAP: cheesePossibilities.CHEESE;
}

function revealTraps() {
	for (i = 0; i < cheeseBlocks.length; ++i) {
		var cheeseBlock = cheeseBlocks[i];
		if (cheeseBlock.isTrap) {
			cheeseBlock.sprite.visible = false;
			mousetrap.x = cheeseBlock.sprite.x;
			mousetrap.y = cheeseBlock.sprite.y;
			
			cheeseBlock.sprite = mousetrap.clone();
			cheeseBlock.sprite.visible = true;
			stage.addChild(cheeseBlock.sprite);
		}
	}
}