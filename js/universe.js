/// <reference path="../typings/jquery/jquery.d.ts"/>
var Universe = {
    
    generate: function() {
        
        var x,y
        
        this.parent.reset.call(this);
        
        //generate background
        this.backgroundImageData = this.backgroundImageData || this.canvas.createImageData(this.element.width, this.element.height);
        
        var randR = Math.randomSeedNext(noise.MAX_SEED);
        var randG = Math.randomSeedNext(noise.MAX_SEED);
        var randB = Math.randomSeedNext(noise.MAX_SEED);
        var magR = Math.randomSeedNext(1.0);
        var magG = Math.randomSeedNext(0.5);
        var magB = Math.randomSeedNext(1.0);
        var zoom = 0.0009;
        
        for(x = 0;x < this.element.width;x++) {
            for(y = 0;y < this.element.height;y++){
                
                setPixel(this.backgroundImageData,x,y, {
                        r: 255 * noise.perlin3(x * zoom,y * zoom,randR) * magR,
                        g: 255 * noise.perlin3(x * zoom,y * zoom,randG) * magG,
                        b: 255 * noise.perlin3(x * zoom,y * zoom,randB) * magB,
                        a: 255
                    }
                );
            }
        }
        
        //generate entities
        var ChildEntity = Object.inherit(Galaxy,Entity);
        var mass, mag, massCeiling, color;
        
        //Do loop in this order because of fixed height.  
        //This will give same universe, regardless of client width
        
        for(x = 0; x < this.element.width; x+=2)
        {
            for(y = 0; y < this.element.height; y+=2)
            {
                if(Math.randomSeedNext(1.0) < this.mass)
                {
                   massCeiling = 30;
                   mass = Math.randomSeedNext(massCeiling);
                   mag = (mass / massCeiling * (255 - 30)) + 30;
                   color = {r: mag, g:mag, b:mag, a:255};
                   
                   this.entities.push(
                        
                        Object.create(ChildEntity).init(
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
    
    zoomIn: function(clickPoint) {
        
        Universe.currentEntity = Universe.currentEntity || this;
        Universe.currentEntity.changeView(clickPoint);
        
    },
    
    zoomOut: function() {
        
        Universe.currentEntity = Universe.currentEntity.parentEntity || this;
        Universe.currentEntity.generate();
        Universe.currentEntity.render();
        
    },
};







