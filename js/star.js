/* global noise */
var Star = {
    
    generate: function() {
        
        this.parent.reset.call(this);
        
        this.zSauce = 0;
        this.sauce = Math.randomSeedNext(1.0);
        
    },
    
    update: function() {
        
        var starScreenSize = Math.floor(Math.sqrt(this.mass));
        //console.log(this.mass);
        var scrRadius = starScreenSize/2;
        //var starScrPoint = { x: this.element.width/2, y: this.element.height/2 };
            
        this.imageData = this.imageData || this.canvas.createImageData(starScreenSize, starScreenSize);
        
        var value,dist,scale;
        var color;
        for (var x = 0; x < starScreenSize; x++) {
            for (var y = 0; y < starScreenSize; y++) {
                
                value = noise.simplex3( x * this.sauce, y * this.sauce, this.sauce * this.zSauce);
                
                dist = screenDistance({x: scrRadius,y: scrRadius }, {x:x,y:y});
                dist = dist/scrRadius; //normalize distance
                
                scale = 0.7;
                if(dist > scale)
                    value = value * 1.0/((dist - scale)*30);
                
                color = { r: value * this.color.r,g: value * this.color.g,b: value * this.color.b,a: 255};
                
                setPixel(this.imageData,x,y,color);
         
            }
        }    
        
        this.zSauce+= Math.randomSeedNext(0.02);
    }

};
