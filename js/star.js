/* global noise */
var Star = {
    
    init: Entity.init,
    
    generate: function() {
        
        Entity.generate.call(this);
        
        this.zSauce = 0;
        this.sauce = Math.randomSeedNext(1.0);
        
    },
    
    
    update: function() {
        
        var starScreenSize = Math.floor(Math.sqrt(this.mass));
        var scrRadius = starScreenSize/2;
        //var starScrPoint = { x: this.element.width/2, y: this.element.height/2 };
        
        this.imageData = this.canvas.createImageData(starScreenSize, starScreenSize);
       
        var value,dist,color,scale;
        for (var x = 0; x < starScreenSize; x++) {
            for (var y = 0; y < starScreenSize; y++) {
                
                value = noise.simplex3( x * this.sauce, y * this.sauce, this.sauce * this.zSauce);
                
                dist = screenDistance({x: scrRadius,y: scrRadius }, {x:x,y:y});
                dist = dist/scrRadius; //normalize distance
                
                color = value*this.color.r;
                scale = 0.7;
                if(dist > scale)
                    color = color * 1.0/((dist - scale)*30);
                
                setPixel(this.imageData,x,y,{r:color,g:color,b:color,a:255});
         
            }
        }    
        
        this.zSauce+= Math.randomSeedNext(0.02);
        
    },

    render: function() {
        
        this.update();
      
        this.canvas.fillStyle = 'black';
        this.canvas.fillRect(0, 0, this.element.width, this.element.height);
        
        this.canvas.putImageData(this.imageData, Math.floor(this.element.width/2 - this.imageData.width/2), Math.floor(this.element.height/2 - this.imageData.height/2));
       
        var self = this;
        Universe.animationHandle = requestAnimationFrame(function() { self.render(); });
    },
    
    
    
    
};
