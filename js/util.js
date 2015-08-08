Math.TAU = 6.28318530717958; 
noise.MAX_SEED = 65536;

var CURRENT_SEED;
      
Math.randomSeed = function(s) {
    
    s = Math.sin(s + 1) * 10000; 
    
    return s - Math.floor(s);
};

Math.randomSeedNext = function(range) {
    range = range || 1.0;
    CURRENT_SEED = Math.randomSeed(CURRENT_SEED);
    return CURRENT_SEED * range;
};

var key;
Object.inherit = function(childObj, parentObj) {
    
    for(key in parentObj)
        childObj[key] = childObj[key] || parentObj[key];
   
    childObj.parent = parentObj;
    
    return childObj; 
};

var index;
var setPixel = function(iData, x, y, c) {
    
    index = (x + y * iData.width) * 4;
    
    iData.data[index+0] = c.r;
    iData.data[index+1] = c.g;
    iData.data[index+2] = c.b;
    iData.data[index+3] = c.a;
};

var xDist,yDist;
var screenDistance = function(point1,point2) {
    
    xDist = point1.x - point2.x;
    yDist = point1.y - point2.y;
    
    return Math.floor(Math.sqrt(xDist*xDist + yDist*yDist));
};


var colorFlicker = function(color) {
    
    var newColor = {
        r:color.r,
        g:color.g,
        b:color.b,
        a:color.a
    };    
    
    var tsin = Math.sin((new Date()).getMilliseconds());
    if(Math.randomSeedNext(1.0) < 0.001)
    {
        newColor = {
           r: newColor.r * tsin,
           g: newColor.g * tsin,
           b: newColor.b * tsin,
           a: 255
       };
    }
    
    return newColor;
}

Number.prototype.ceil = function(max) {
    return Math.min(max,this);
}







