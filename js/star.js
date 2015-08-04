/* global noise */
var Star = {
    
    generate: function() {
        
        this.parent.generate.call(this);
        
        this.zSauce = 0;
        this.sauce = Math.randomSeedNext(1.0);
        
        this.entities.push(
                        
            Object.create(Object.inherit(Star,Entity)).init(
                this,
                Math.randomSeedNext(1.0),
                this.mass,
                this.canvasTag,
                {x:this.element.width/2, y:this.element.height/2},
                {r:0,g:0,b:0,a:255}
            )
        );
        
    },
    
    
    update: function() {
        
        var i, e;
        for (i in this.entities)
        {
            e = this.entities[i];
            
            var starScreenSize = Math.floor(Math.sqrt(this.mass));
            var scrRadius = starScreenSize/2;
            //var starScrPoint = { x: this.element.width/2, y: this.element.height/2 };
            
            e.imageData = e.imageData || this.canvas.createImageData(starScreenSize, starScreenSize);
           
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
                    
                    setPixel(e.imageData,x,y,{r:color,g:color,b:color,a:255});
             
                }
            }    
        }
        
        this.zSauce+= Math.randomSeedNext(0.02);
        
    }
    
    
    
    
};
