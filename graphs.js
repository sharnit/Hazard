//function to graph natural hazard data
function scatter() {

    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 80
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    //setup fill color;
    var color = d3.rgb("red");

    //load data for natural hazard's economic damages
    d3.csv('india_hazard_damage.csv', function (data) {

        data.forEach(function (d) {
            d.year = +d.year;
            d.damage = +d.damage;

        });

        console.log(data[0]);

        //setup x
        var xValue = function (d) {
                return d.year
            },
            xScale = d3.scaleLinear().range([0, width]),
            xMap = function (d) {
                return xScale(xValue(d));
            },
            xAxis = d3.axisBottom().scale(xScale);

        //setup y
        var yValue = function (d) {
                return d.damage
            },
            yScale = d3.scaleLinear().range([height, 0]),
            yMap = function (d) {
                return yScale(yValue(d));
            },
            yAxis = d3.axisLeft().scale(yScale);

        //add graph canvas to body of the webpage
        var svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", width + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

        //x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("year");

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("damage");

        // draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 10)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) {
                return color
            });

        // draw legend
        var legend = svg.selectAll(".legend")
            //.data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
            });

        // draw legend colored rectangles
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        // draw legend text
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) {
                return d;
            })

    });
}
