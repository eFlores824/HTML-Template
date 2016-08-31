var colliders = [];
var enemyColliders = [];

var collisionChecker = {
	addCollider: function (objectBitmap) {
		var index = colliders.indexOf(objectBitmap);
		if (index == -1) {
			colliders.push(objectBitmap);
		}
	},
	removeCollider: function (objectBitmap) {
		var index = colliders.indexOf(objectBitmap);
		if (index != -1) {
			colliders.splice(index, 1);
		}
	},
	clearColliders: function () {
		colliders = [];
	},
	addEnemyCollider: function (enemyBitmap) {
		var index = enemyColliders.indexOf(enemyBitmap);
		if (index == -1 ) {
			enemyColliders.push(enemyBitmap);
		}
	},
	removeEnemyCollider: function (enemyBitmap) {
		var index = enemyColliders.indexOf(enemyBitmap);
		if (index != -1) {
			enemyColliders.splice(index, 1);
		}
	},
	clearEnemyColliders: function () {
		enemyColliders = [];
	},
	collidingWith: function (bitmapChecking, alphaThreshold) {
		for (i = 0; i < colliders.length; ++i) {
			var collider = colliders[i];
			if (collider != bitmapChecking && ndgmr.checkPixelCollision(bitmapChecking, collider, alphaThreshold)) {
				return collider;
			}
		}
		return null;
	},
	collisionPoints: function (bitmapChecking) {
		var collisions = [];
		for (i = 0; i < colliders.length; ++i) {
			var collider = colliders[i];
			if (collider != bitmapChecking) {
				var intersection = ndgmr.checkRectCollision(bitmapChecking, collider);
				if (intersection != null) {
					var collision = { intersection: intersection, collider: collider };
					collisions.push(collision);
				}
			}
		}
		return collisions;
	},
	isColliding: function (bitmapChecking, alphaThreshold) {
		for (i = 0; i < colliders.length; ++i) {
			var collider = colliders[i];
			if (collider != bitmapChecking && ndgmr.checkPixelCollision(bitmapChecking, colliders[i], alphaThreshold)) {
				return true;
			}
		}
		return false;
	},
	pushBackIfColliding: function (bitmapChecking, player) {
		var collisions = collisionChecker.collisionPoints(bitmapChecking);
		for (i = 0; i < collisions.length; ++i) {
			var collision = collisions[i];
			if (collision != null && collision.intersection != null) {
				if (collision.intersection.width > collision.intersection.height) {
					var movement = collision.intersection.height;
					if (bitmapChecking.y < collision.collider.y) {
						movement = -movement;
					}
					bitmapChecking.y += movement;
                    if(player == 1){
                        cancelPlayer1Vertical = true;
                    }
                    else if(player == 2){
                        cancelPlayer2Vertical = true;
                    }
				}
				else {
					var movement = collision.intersection.width;
					if (bitmapChecking.x < collision.collider.x) {
						movement = -movement;
					}
					bitmapChecking.x += movement;
                    if(player == 1){
                        cancelPlayer1Horizontal = true;
                    }
                    else if(player == 2){
                        cancelPlayer2Horizontal = true;
                    }
				}
			}
		}		
	},
	isCollidingWithEnemy: function (bitmapChecking, alphaThreshold) {
		for (i = 0; i < enemyColliders.length; ++i) {
			var collider = enemyColliders[i];
			if (collider != bitmapChecking && ndgmr.checkPixelCollision(bitmapChecking, collider, alphaThreshold)) {
				return true;
			}
		}
		return false;
	}
}