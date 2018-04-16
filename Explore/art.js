
// SVG //
var root = d3.select("body").select("#cont");

var svg = root.append("svg").attr("height", 800).attr("width", 800);

var framediff = d3.scaleLog().base(10);

var create = function(art, k) {
    var put = framediff((k+1));
    actual = d3.line()        
        .x(function(art) { return art.x1  * 8 + 400 + Math.random() * put; })
        .y(function(art) { return art.y1  * 8 + 500 + Math.random() * put; })
         .curve(d3.curveBasis);
    return (actual(art));
};

var figure = function(input) {
    temp = input;
    if(input._exit === undefined){
        temp = input.append("path")
            .attr("stroke", "black")
            .attr("stroke-width", 0.1)
            .attr("stroke-opacity", 0.2)
            .attr("fill", "transparent");
    }
    temp.transition()
        .attr("d", function(d, z) {
        return create(d, z);
    });
};

function run() {
    fig = MovaViz('BEA').debug(true) .data('https://www.sfu.ca/~oalemi/data/KAREN_BEAS_001_original.bvh','bvh').container(svg);
    
    fig.addDrawMethod(figure, 'bone-positions', [900, 3500], 1);
}