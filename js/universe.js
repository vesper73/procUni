/// <reference path="../typings/jquery/jquery.d.ts"/>
var Universe = {
    
    generate: function() {
        
        this.parent.generate.call(this);
        
        var x,y;
        var mass, mag, massCeiling, color;
        for(y = 0; y < this.element.height; y+=2)
        {
            for(x = 0; x < this.element.width; x+=2)
            {
                if(Math.randomSeedNext(1.0) < this.mass)
                {
                   massCeiling = 30;
                   mass = Math.randomSeedNext(massCeiling);
                   mag = (mass / massCeiling * (255 - 30)) + 30;
                   color = {r: mag, g:mag, b:mag, a:255};
                   
                   this.entities.push(
                        
                        Object.create(Object.inherit(Galaxy,Entity)).init(
                            this,
                            Math.randomSeedNext(1.0),
                            mass,
                            this.canvasTag,
                            {x:x, y:y},
                            color
                        )
                    );
                }
            }
        }
        $('#statsSection').html(this.entities.length);
    },
    
    update: function() {
        
        var i, e;
        for (i in this.entities)
        {
           e = this.entities[i];
           e.imageData = e.imageData || this.canvas.createImageData(2, 2);
           setPixel(e.imageData,0,0,e.color);
           setPixel(e.imageData,1,0,e.color);
           setPixel(e.imageData,0,1,e.color);
           setPixel(e.imageData,1,1,e.color);
        }
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







