/// <reference path="../typings/jquery/jquery.d.ts"/>
var Universe = {
    
    init: Entity.init,
    
    generate: function() {
        
        Entity.generate.call(this);
        
        this.galaxies = [];
        var x,y;
        var mass, mag, massCeiling;
        for(y = 0; y < this.element.height; y+=2)
        {
            for(x = 0; x < this.element.width; x+=2)
            {
                if(Math.randomSeedNext(1.0) < this.mass)
                {
                   massCeiling = 30;
                   mass = Math.randomSeedNext(massCeiling);
                   mag = (mass / massCeiling * (255 - 30)) + 30;
                   
                   this.galaxies.push(
                        
                        Object.create(Galaxy).init(
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
        $('#statsSection').html(this.galaxies.length);
    },

    render: function() {
        
        var element = $(this.canvasTag).get(0);
        var canvas = element.getContext('2d');
        var imageData = canvas.createImageData(element.width, element.height);
        
        var galaxyIndex, g;
        for (galaxyIndex in this.galaxies)
        {
            g = this.galaxies[galaxyIndex];
            
            var color = (this.selectedEntity && this.selectedEntity.seed === g.seed) ? { r:255,g:0,b:0,a:255} : g.color;
              
            setPixel(imageData,g.location.x,g.location.y,color);
            setPixel(imageData,g.location.x+1,g.location.y,color);
            setPixel(imageData,g.location.x+1,g.location.y+1,color);
            setPixel(imageData,g.location.x,g.location.y+1,color);
        }
        canvas.putImageData(imageData, 0, 0);
    },
    
    changeView: function(clickPoint) {
        
        var galaxyIndex,closestGalaxy,dist,shortDist;
        for(galaxyIndex in this.galaxies)
        {
            dist = screenDistance(this.galaxies[galaxyIndex].location,clickPoint);
            shortDist = shortDist || dist;
            if(dist <= shortDist)
            {
                closestGalaxy = this.galaxies[galaxyIndex];
                shortDist = dist;
            }
        }
        
        Universe.currentEntity = closestGalaxy;
        this.selectedEntity = closestGalaxy;
        closestGalaxy.generate();
        closestGalaxy.render();
    },
    
    zoomIn: function(clickPoint) {
        Universe.currentEntity = Universe.currentEntity || this;
        Universe.currentEntity.changeView(clickPoint);
    },
    
    zoomOut: function() {
        
        Universe.currentEntity = Universe.currentEntity.parentEntity;
        Universe.currentEntity.render();
        
    },
};







