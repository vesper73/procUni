/* global noise */
var Star = Object.create(null);
Star.prototype = {
    
    init: function(parentEntity, seed, mass, canvasTag, location, color) {
        
        this.parentEntity = parentEntity;
        this.seed = seed;
        this.mass = mass; 
        this.canvasTag = canvasTag;
        this.location = location;
        this.color = color;
        this.selectedEntity = null;
        
        this.zSuace = 0;
        this.sauce = 0;
        
        return this;
    },
    
    generate: function() {
        
        CURRENT_SEED = this.seed;
        
        this.zSauce = 0;
        this.sauce = Math.randomSeedNext(1.0);
        
    },
    
    render: function() {
        
        //var colorStyle = "rgba("+ this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a +")";
        
        //Draw star
        var element = document.getElementsByTagName('canvas')[0];
        var canvas = element.getContext('2d');
        var starScreenSize = Math.floor(Math.sqrt(this.mass));
        var starScrPoint = { x: element.width/2, y: element.height/2 };
        var imageDataStar = canvas.createImageData(starScreenSize, starScreenSize);
        var scrRadius = starScreenSize/2;
        
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
                
                setPixel(imageDataStar,x,y,{r:color,g:color,b:color,a:255});
         
            }
        }    
        canvas.fillStyle = 'black';
        canvas.fillRect(0, 0, element.width, element.height);
        canvas.putImageData(imageDataStar, starScrPoint.x-(starScreenSize/2), starScrPoint.y-(starScreenSize/2));
        
        this.zSauce+= Math.randomSeedNext(0.02);
        
        //var self = this;
        (function(self) { Star.animationHandle = requestAnimationFrame(function(){ self.render()}) })(this);
        
    },
    
    
};
