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
        this.noiseValues = null;
        this.imageData = null;
        this.backgroundImageData = null;
		
		this.element = $(canvasTag).get(0);
		this.canvas = this.element.getContext('2d');
		
        return this;
	},
    
    generate: function() {
        
        throw Error("You must implement the generate method.");
    },
	
    update: function() {
        
        throw Error("You must implement the update method.");
    },
    
    reset: function() {
        
        cancelAnimationFrame(Universe.animationHandle);
        CURRENT_SEED = this.seed;
        this.noiseValues = [];
        this.entities = [];
        
    },
    
    createBackgroundImage: function(zoom, magnitude) {
        
        var x,y;
        
        this.backgroundImageData = this.backgroundImageData || this.canvas.createImageData(this.element.width, this.element.height);
        
        var randR = Math.randomSeedNext(noise.MAX_SEED);
        var randG = Math.randomSeedNext(noise.MAX_SEED);
        var randB = Math.randomSeedNext(noise.MAX_SEED);
        
        for(x = 0;x < this.element.width;x++) {
            for(y = 0;y < this.element.height;y++){
                
                setPixel(this.backgroundImageData,x,y, {
                        r: 255 * noise.perlin3(x * zoom,y * zoom,randR) * magnitude.magR,
                        g: 255 * noise.perlin3(x * zoom,y * zoom,randG) * magnitude.magG,
                        b: 255 * noise.perlin3(x * zoom,y * zoom,randB) * magnitude.magB,
                        a: 255
                    }
                );
            }
        }
    },
    
	render: function() {
        
        this.canvas.fillStyle = 'black';
        this.canvas.fillRect(0, 0, this.element.width, this.element.height);
        
        if(this.backgroundImageData)
            this.canvas.putImageData(this.backgroundImageData, 0, 0);
        
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