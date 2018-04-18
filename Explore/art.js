
// SVG Stuff //

var root = d3.select("body").select("#cont");

var svg = root.append("svg").attr("height", 800).attr("width", 800);

var framediff = d3.scaleLog().base(10);

var change = 0.1;
var change2 = 0.1;

var slider = document.getElementById('slider');
var sliderDiv = document.getElementById("sliderDiv");
change = Number(sliderDiv);

slider.onchange = function() {
	sliderDiv.innerHTML = this.value;
	run();
};

var slider2 = document.getElementById('slider2');
var sliderDiv2 = document.getElementById("sliderDiv2");
change2 = Number(sliderDiv2);

slider2.onchange = function() {
	sliderDiv2.innerHTML = this.value;
	run();
};

var create = function(art, k) {
	var put = framediff((k+1));
	actual = d3.line()        
		.x(function(art) { return art.x1  * 8 + 400 + put; })
		.y(function(art) { return art.y1  * 8 + 500 + put; })
		 .curve(d3.curveBasis);
	return (actual(art));
};

var figure = function(input) {
	temp = input;
	if(input._exit === undefined){
		temp = input.append("path")
			.attr("stroke", "white")
			.attr("stroke-width", change2)
			.attr("stroke-opacity", change)
			.attr("fill", function() {
            var color = 100 * Math.random();
            console.log(color);
            return "hsl(" + color + ",100%,50%)";
            });
	}
	temp.transition()
		.attr("d", function(d, z) {
		return create(d, z);
	});
};

function run() {
	fig = MovaViz('BEA').debug(true) .data('https://www.sfu.ca/~oalemi/data/KAREN_BEAS_001_original.bvh','bvh').container(svg);
	
	fig.addDrawMethod(figure, 'bone-positions', [900, 3500], 1);
};
