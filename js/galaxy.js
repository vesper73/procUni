/// <reference path="../typings/jquery/jquery.d.ts"/>
var Galaxy = {
    
    generate: function() {
        
        this.parent.reset.call(this);
    
        //we should generate image data for each entity, and then on the global render method, loop through each entities imagedata an put it at the proper coordinateon the main canvas image
        //regular stars could be 2x2 image data
        var ChildEntity = Object.inherit(SolarSystem,Entity);
        
        var x,y;
        var distFromCenter;
        var mass, mag, magadj, massCeiling, color, cRnd, min;
        for(x = 0; x < this.element.width; x+=2)
        {
            for(y = 0; y < this.element.height; y+=2)
            {
                distFromCenter = screenDistance(
                    { x: this.element.width/2, y: this.element.height/2 },
                    { x: x, y: y }
                );
                
                if(Math.randomSeedNext(1.0) < 1.0/(distFromCenter*distFromCenter/this.mass))
                {
                    massCeiling = 10000;
                    min = 1000;
                    mass = Math.randomSeedNext(massCeiling - min) + min;
                    mag = (mass / massCeiling * 0.9);
                    magadj = mag * 0.3;
                   
                    cRnd = Math.randomSeedNext(1.0);
                    if(cRnd < 0.01)
                        color = {r: 255 * magadj, g:255, b:255 * magadj, a:255};
                    else if(cRnd < 0.05)
                        color = {r: 255, g:255 * magadj, b:255, a:255};
                    else if(cRnd < 0.10)
                        color = {r: 255 * magadj, g:255 * magadj, b:255, a:255};
                    else if(cRnd < 0.20)
                        color = {r: 255, g:255 * magadj, b:255 * magadj, a:255};
                    else
                        color = {r: 255, g:255, b:255 * mag, a:255};
                   
                                       
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
    
    update: function() {
        
       this.imageData = this.imageData || this.canvas.createImageData(2, 2);
       
       //var color = colorFlicker(this.color);
       var color = this.color;
       
       setPixel(this.imageData,0,0,color);
       setPixel(this.imageData,1,0,color);
       setPixel(this.imageData,0,1,color);
       setPixel(this.imageData,1,1,color);
           
    },

};







