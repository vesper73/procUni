var SolarSystem = {
    
    generate: function() {
        
        this.parent.reset.call(this);
        
        //Create background
        var x,y;
        
        var bColor = getPixel(this.parentEntity.backgroundImageData,this.location.x,this.location.y);
        this.backgroundImageData = this.backgroundImageData || this.canvas.createImageData(this.element.width, this.element.height);
        
        for(x = 0;x < this.element.width;x++) {
            for(y = 0;y < this.element.height;y++) {
                setPixel(this.backgroundImageData,x,y, { r: bColor.r, g: bColor.g, b: bColor.b, a:255 });
            }
        }
        
        //Add entities
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
        
        //var color = colorFlicker(this.color);
        var color = this.color;
        
        setPixel(this.imageData,0,0,color);
        setPixel(this.imageData,1,0,color);
        setPixel(this.imageData,0,1,color);
        setPixel(this.imageData,1,1,color);
    }
    
    
    
    
};
