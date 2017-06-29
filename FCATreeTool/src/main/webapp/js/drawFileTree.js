function drawFileTree(e) {

	// $("#tree-container").height(); //$(document).height();
	console.log("in drawDendrongram");
	d3.select("svg").remove();
	
	var jsonFile = e.target.result;
	var treeData = JSON.parse(jsonFile);

	var fillColour = "mediumslateblue";
	// Calculate total nodes, max label length
	var totalNodes = 0;
	var maxLabelLength = 20;

	var panSpeed = 200;
	var panBoundary = 20; // Within 20px from edges will pan when dragging.
	// Misc. variables
	var i = 0;
	var duration = 750;
	var root;

	// size of the diagram
	var viewerWidth = $(document).width();
	var viewerHeight = $(document).height();

	var tree = d3.layout.treelist().childIndent(20).nodeHeight(50);
	var ul = d3.select("#tree-container").append("ul").classed("treelist",
			true);

	d3.selectAll("li").remove();

	if (treeData.children)
		treeData.children.forEach(function(child) {
			collapse(child);
		});

	// Helper functions for collapsing and expanding nodes.
	function collapse(d) {
		if (d.children) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
		}
	}

	function expand(d) {
		if (d._children) {
			d.children = d._children;
			d.children.forEach(expand);
			d._children = null;
		}
	}

	function render(treeData, parent) {
		var nodes = tree.nodes(treeData), duration = 250;

		function toggleChildren(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else if (d._children) {
				d.children = d._children;
				d._children = null;
			}
		}
		var nodeEls = ul.selectAll("li.node").data(nodes, function(d) {
			return d.id || (d.id = ++i);
		});

		var entered = nodeEls.enter().append("li").classed("node", true).style(
				"top", parent.y + "px").style("opacity", 0).style("height",
				tree.nodeHeight() + "px").on("click", function(d) {
			toggleChildren(d);
			render(treeData, d);

		}).on("mouseover", function(d) {
			if (d.children || d._children) {
				d3.select(this).classed("selected", true);
			}
		}).on("mouseout", function(d) {
			d3.selectAll(".selected").classed("selected", false);
		});
		// add arrows if it is a folder
		entered.append("span").attr(
				"class",
				function(d) {
					var icon = d.children ? " glyphicon-chevron-down"
							: d._children ? "glyphicon-chevron-right" : "";
					return "caret glyphicon " + icon;
				});

		// update caret direction
		nodeEls.select("span.caret").attr(
				"class",
				function(d) {
					var icon = d.children ? " glyphicon-chevron-down"
							: d._children ? "glyphicon-chevron-right" : "";
					return "caret glyphicon " + icon;
				});

		nodeEls
				.select("span")
				.html(
						function(d) {
							var sep = ", ";

							// console.log(`own object ${d.own_objects}`);
							// var objString = d.children ? "ownObj "
							// + d.own_objects.join(sep) : "allObj "
							// + d.objects.join(sep);

							// var attrString = d.attributes.join(sep);
							var objString = "empty";
							var attrString = "empty";

							if (d._children)
								objString = d.objects.sort().toString();
							else
								objString = d.own_objects.sort().toString();

							var maxStringLength = 150;

							if (d.attributes.toString())
								attrString = d.attributes.toString();

							if (objString.length > maxStringLength)
								objString = objString.substring(0,
										maxStringLength)
										+ '...';
							if (attrString.length > maxStringLength)
								attrString = attrString.substring(0,
										maxStringLength)
										+ '...';
							
							var x = false;
							
							if (x){
								attrString =  "<span style=color:green> Attributes: "
								+ attrString
								+ "</span><br /> " ;								
							} 
							else {attrString = "zz3"};

							return "<strong> Node: "
									+ d.Node
									+ "</strong><br /> <span style=color:blue>Objects: "
									+ objString
									+ "</span> <br />"
								//	+ "<span style=color:green> Attributes: "
									+ attrString
								//	+ "</span>"
								//	+ "<br/> " +
									+		"<span style=color:DarkSlateBlue> obj count "
									+ d.ObjectCount + "</span>";
						})

		// update position with transition
		nodeEls.transition().duration(duration).style("top", function(d) {
			return (d.y - tree.nodeHeight()) + "px";
		}).style("left", function(d) {
			return d.x + "px";
		}).style("opacity", 1);
		nodeEls.exit().remove();
	}

	render(treeData, treeData);
};