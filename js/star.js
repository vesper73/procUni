/* global noise */
var Star = {
    
    generate: function() {
        
        this.parent.generate.call(this);
        
        var ChildEntity = Object.inherit(Planet,Entity);
        var planet = Object.create(ChildEntity).init(
            this,
            Math.randomSeedNext(1.0),
            this.mass,
            this.canvasTag,
            {x: this.element.width/2, y: this.element.height/2},
            this.color
        );
        
        planet.generate();
        
        this.entities.push(planet);
        
    },
    
    
    update: function() {
        
        this.imageData = this.imageData || this.canvas.createImageData(2, 2);
        setPixel(this.imageData,0,0,this.color);
        setPixel(this.imageData,1,0,this.color);
        setPixel(this.imageData,0,1,this.color);
        setPixel(this.imageData,1,1,this.color);
    }
    
    
    
    
};
