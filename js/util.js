var CURRENT_SEED;
       
Math.randomSeed = function(s) {
    s = Math.sin(s + 1) * 10000; 
    return s - Math.floor(s);
};

Math.randomSeedNext = function(range) {
    CURRENT_SEED = Math.randomSeed(CURRENT_SEED);
    return CURRENT_SEED * range;
};

var screenDistance = function(point1,point2)
{
    var xDist,yDist;
    
    xDist = point1.x - point2.x;
    yDist = point1.y - point2.y;
    return Math.floor(Math.sqrt(xDist*xDist + yDist*yDist));
};

var index;
var setPixel = function(iData, x, y, c) {
    index = (x + y * iData.width) * 4;
    iData.data[index+0] = c.r;
    iData.data[index+1] = c.g;
    iData.data[index+2] = c.b;
    iData.data[index+3] = c.a;
};




