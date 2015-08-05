/* global noise */
var SolarSystem = {
    
    generate: function() {
        
        this.parent.reset.call(this);
    
        var star = Object.create(Object.inherit(Star,Entity)).init(
            this,
            Math.randomSeedNext(1.0),
            this.mass,
            this.canvasTag,
            {x: this.element.width/2, y: this.element.height/2},
            this.color
        );
        
        star.generate();
        this.entities.push(star);
        
    },
    
    
    update: function() {
        
        this.imageData = this.imageData || this.canvas.createImageData(2, 2);
        setPixel(this.imageData,0,0,this.color);
        setPixel(this.imageData,1,0,this.color);
        setPixel(this.imageData,0,1,this.color);
        setPixel(this.imageData,1,1,this.color);
    }
    
    
    
    
};
