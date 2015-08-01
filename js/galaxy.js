/// <reference path="../typings/jquery/jquery.d.ts"/>
var Galaxy = Object.create(null);
Galaxy.prototype = {
    
    init: function(parentEntity, seed, mass, canvasTag, location, color) {
        
        this.parentEntity = parentEntity;
        this.seed = seed;
        this.mass = mass;
        this.canvasTag = canvasTag;
        this.location = location;
        this.color = color;
        this.stars = [];
        this.element = $(this.canvasTag).get(0);
        this.selectedEntity = null;
        
        return this;
    },
    
    generate: function() {
        
        CURRENT_SEED = this.seed;
        
        //Generate stars
        this.stars = [];
        var x,y;
        var distFromCenter;
        var mass, mag, massCeiling;
        for(y = 0; y < this.element.height; y+=2)
        {
            for(x = 0; x < this.element.width; x+=2)
            {
                massCeiling = 10000;
                mass = Math.randomSeedNext(massCeiling);
                mag = (mass / massCeiling * (255 - 30)) + 30;
                   
                distFromCenter = screenDistance(
                    { x: this.element.width/2, y: this.element.height/2 },
                    { x: x, y: y }
                );
                
                if(Math.randomSeedNext(1.0) < 1.0/(distFromCenter*distFromCenter/this.mass))
                {
                   this.stars.push(
                        
                        Object.create(Star.prototype).init(
                            this,
                            Math.randomSeedNext(1.0),
                            mass,
                            this.canvasTag,
                            {x:x, y:y},
                            {r: mag, g:mag, b:mag, a:255}
                        )
                    );
                }
            }
        }
        
        
        $('#statsSection').html(this.stars.length);
    },
    
    render: function() {
        
        var element = $(this.canvasTag).get(0);
        var canvas = element.getContext('2d');
        var imageData = canvas.createImageData(element.width, element.height);
        
        var starIndex, s;
        for (starIndex in this.stars)
        {
            s = this.stars[starIndex];
            var color = (this.selectedEntity && this.selectedEntity.seed === s.seed) ? { r:255,g:0,b:0,a:255} : s.color;
            setPixel(imageData,s.location.x,s.location.y,color);
            setPixel(imageData,s.location.x+1,s.location.y,color);
            setPixel(imageData,s.location.x+1,s.location.y+1,color);
            setPixel(imageData,s.location.x,s.location.y+1,color);
        }
        
        canvas.putImageData(imageData, 0, 0);
    },
    
    changeView: function(clickPoint) {
        
        var starIndex,closestStar,dist,shortDist;
        for(starIndex in this.stars)
        {
            dist = screenDistance(this.stars[starIndex].location,clickPoint);
            shortDist = shortDist || dist;
            if(dist <= shortDist)
            {
                closestStar = this.stars[starIndex];
                shortDist = dist;
            }
        }
        
        Universe.currentEntity = closestStar; 
        this.selectedEntity = Universe.currentEntity;
        this.selectedEntity.generate();
        this.selectedEntity.render();
        
       
    }
};







