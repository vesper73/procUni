/* global noise */
/// <reference path="../typings/jquery/jquery.d.ts"/>
var Galaxy = {
    
    generate: function() {
        
        //reset
        this.parent.reset.call(this);
        
        //generate background
        var bColor = getPixel(this.parentEntity.backgroundImageData,this.location.x,this.location.y);
        this.parent.createBackgroundImage.call(this, 
            0.002, { 
                magR: bColor.r/255 * 2, 
                magG: bColor.g/255 * 2, 
                magB: bColor.b/255 * 2
            }
        );
        
        //generate entities   
        var ChildEntity = Object.inherit(SolarSystem,Entity);
        
        var distFromCenter;
        var mass, mag, color, cRnd;
        var massCeiling = 10000;
        var min = 500;
        var x,y;
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
                    mass = Math.floor(Math.randomSeedNext(massCeiling - min)) + min;
                    mag = 255 * (mass / massCeiling);
                                       
                    cRnd = Math.randomSeedNext(1.0);
                    color = {
                        r: (mag * Math.randomSeedNext(3.0)).ceil(255), 
                        g: (mag * Math.randomSeedNext(3.0)).ceil(255), 
                        b: (mag * Math.randomSeedNext(1.0)).ceil(255), 
                        a:255
                    };    
                    
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
       var color = this.color;
       
       setPixel(this.imageData,0,0,color);
       setPixel(this.imageData,1,0,color);
       setPixel(this.imageData,0,1,color);
       setPixel(this.imageData,1,1,color);
           
    },

};







