var Entity = Object.create(null);
Entity.init = function(parentEntity, seed, mass, canvasTag, location, color) {
		
	this.parentEntity = parentEntity;
	this.seed = seed;
	this.mass = mass;
	this.canvasTag = canvasTag;
	this.location = location;
	this.color = color;
	
	this.element = $(canvasTag).get(0);
	
	
};