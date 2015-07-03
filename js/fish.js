class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}, stateDimensions) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.velocity = {r: 8, t: Math.random()*Math.PI*2};//temporary
		this.position = aPosition;
		this.alive = true;
	}

	tick(time) {
		//need to finish location bounds
		// if(this.position.x > stateDimensions.x && this.velocity.t < Math.PI) {
		//
		// } else if(this.position.x < 0 && this.velocity.t >= Math.PI) {
		//
		// }
		// if(this.position.y < 0 && (this.velocity.t < Math.PI/2 || this.velocity.t > Math.PI*3/2)) {
		//
		// } else if(this.position.y > stateDimensions.y && (this.velocity.t >= Math.PI/2 && this.velocity.t <= Math.PI*3/2)) {
		//
		// }
		this.position = {x: this.position.x + time/1000*this.velocity.r*Math.sin(this.velocity.t), y: this.position.y - time/1000*this.velocity.r*Math.cos(this.velocity.t)};
	}
}

module.exports = Fish;
