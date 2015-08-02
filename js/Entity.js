var Entity = {
	
	init: function(parentEntity, seed, mass, canvasTag, location, color) {
		
		this.parentEntity = parentEntity;
		this.seed = seed;
		this.mass = mass;
		this.canvasTag = canvasTag;
		this.location = location;
		this.color = color;
		
		this.element = $(canvasTag).get(0);
		
		return this;
	},
	
	generate: function() {
		CURRENT_SEED = this.seed;
	},
	
	render: null,
	
	changeView: null
	
};