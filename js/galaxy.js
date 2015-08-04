/// <reference path="../typings/jquery/jquery.d.ts"/>
var Galaxy = {
    
    generate: function() {
        
        this.parent.generate.call(this);
        
        //we should generate image data for each entity, and then on the global render method, loop through each entities imagedata an put it at the proper coordinateon the main canvas image
        //regular stars could be 2x2 image data
        var x,y;
        var distFromCenter;
        var mass, mag, massCeiling, color;
        for(y = 0; y < this.element.height; y+=2)
        {
            for(x = 0; x < this.element.width; x+=2)
            {
                distFromCenter = screenDistance(
                    { x: this.element.width/2, y: this.element.height/2 },
                    { x: x, y: y }
                );
                
                if(Math.randomSeedNext(1.0) < 1.0/(distFromCenter*distFromCenter/this.mass))
                {
                   massCeiling = 10000;
                   mass = Math.randomSeedNext(massCeiling);
                   mag = (mass / massCeiling * (255 - 30)) + 30;
                   color = {r: mag, g:mag, b:mag, a:255};
                   
                   this.entities.push(
                        
                        Object.create(Object.inherit(Star,Entity)).init(
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

};







