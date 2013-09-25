var digitalGraph = new Object();
digitalGraph.lastValue = 0; // keep binary signal at one level for a amount of time

function addDigital(){
	var n = 40,
	    random = d3.random.normal(0, 0),
	    data = d3.range(n).map(random);
 
	var margin = {top: 20, right: 20, bottom: 20, left: 40},
	    width = 650 - margin.left - margin.right,
	    height = 150 - margin.top - margin.bottom;
 
	var x = d3.scale.linear()
	    .domain([1, n - 2])
	    .range([0, width]);
 
	var y = d3.scale.linear()
	    .domain([-1, 2])
	    .range([height, 0]);
 
	var line = d3.svg.line()
	    .interpolate("linear")
	    .x(function(d, i) { return x(i); })
	    .y(function(d, i) { return y(d); });
 
	var svg = d3.select("#digital").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  .append("rect")
	    .attr("width", width)
	    .attr("height", height);
 
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + y(0) + ")")
	    .call(d3.svg.axis().scale(x).orient("bottom"));
 
	svg.append("g")
	    .attr("class", "y axis")
	    .call(d3.svg.axis().scale(y).orient("left"));
		
	var path = svg.append("g")
	    .attr("clip-path", "url(#clip)")
	  .append("path")
	    .datum(data)
	    .attr("class", "line")
	    .attr("d", line);
		
	digitalGraph.x = x;
	digitalGraph.line = line;
	digitalGraph.path = path;
	digitalGraph.data = data;
	digitalGraph.random = random;
}


function tickDigital() {
	
	digitalGraph.lastValue = Math.floor(Math.random()+0.5);
	digitalGraph.data.push(digitalGraph.lastValue);

   // redraw the line, and slide it to the left
  digitalGraph.path
      .attr("d", digitalGraph.line)
      .attr("transform", null)
    .transition()
      .duration(500)
      .ease("linear")
      .attr("transform", "translate(" + digitalGraph.x(0) + ",0)")
      .each("end", tickDigital);
 
  // pop the old data point off the front
  digitalGraph.data.shift();
}


