var Entity = {
	
	init: function(parentEntity, seed, mass, canvasTag, location, color) {
		
		this.parentEntity = parentEntity;
		this.seed = seed;
		this.mass = mass;
		this.canvasTag = canvasTag;
		this.location = location;
		this.color = color;
        
		this.selectedEntity = null;
		this.entities = null;
        this.imageData = null;
		
		this.element = $(canvasTag).get(0);
		this.canvas = this.element.getContext('2d');
				
		return this;
	},
    
    generate: function() {
		
        CURRENT_SEED = this.seed;
        this.entities = [];
	},
	
	render: function() {
        
        this.canvas.fillStyle = 'black';
        this.canvas.fillRect(0, 0, this.element.width, this.element.height);
        
        var i, e;
        for (i in this.entities)
        {
            e = this.entities[i];
            
            //update image data
            e.update();
            
            //set image data to canvas
            this.canvas.putImageData(e.imageData, e.location.x - (e.imageData.width/2), e.location.y - (e.imageData.height/2));
        }
        
        var self = this;
        Universe.animationHandle = requestAnimationFrame(function() { self.render(); });
    },
	
	changeView: function(clickPoint) {
        
        var i,closest,dist,shortDist;
        for(i in this.entities)
        {
            dist = screenDistance(this.entities[i].location,clickPoint);
            shortDist = shortDist || dist;
            if(dist <= shortDist)
            {
                closest = this.entities[i];
                shortDist = dist;
            }
        }
        
        Universe.currentEntity = closest;
        this.selectedEntity = closest;
        closest.generate();
        closest.render();
    }
	
};