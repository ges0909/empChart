"use strict";

import moment from "moment";
import $ from "jquery";

var Chart = {

	flot: null,

	extract: function(csv, xColumn, yColumn, dateTimeFormat) {
		let series = [];
		csv.forEach(line => {
			let x = moment(line[xColumn], dateTimeFormat).valueOf(); // number of milliseconds since the Unix Epoch
			let y = parseFloat(line[yColumn]);
			if (!isNaN(y)) {
				series.push([x, y]);
			}
		});
		return series;
	},

	groupBy: function(byColumn, csv) {
		let lines = {};
		csv.forEach(line => {
			let groupedBy = line[byColumn];
			if (typeof lines[groupedBy] === "undefined") {
				lines[groupedBy] = [];
			}
			lines[groupedBy].push(line);
		});
		return lines;
	},

	indexOf: function(groupedBy, groupedSeries) {
		let keys = Object.keys(groupedSeries);
		for (let i = 0; i < keys.length; i++) {
			if (keys[i] === groupedBy) {
				return i;
			}
		}
		return -1;
	},

	plot: function(groupedSeries, options, labels, annotations) {
		let dataset = [];
		for (let groupedBy in groupedSeries) {
			if (groupedSeries[groupedBy].length > 0) {
				let index = this.indexOf(groupedBy, groupedSeries);
				let data = {
					label: labels[index], // label is also used for legend; if not specified, series is not show in legend
					data: groupedSeries[groupedBy]
					//        color: colors[index],
					//        lines: {},
					//        bars: {},
					//        points: {},
					//        clickable: false,
					//        hoverable: false,
					//        shadowSize: 5,
					//        highlightColor: 'green'
				};
				dataset.push(data);
			}
		}

		options.legend = {
			labelFormatter: function (label/*, series*/) {
				return `<a href="javascript:void(0)" id="${label}" class="legendtoggle">${label}</a>`;
			}
		};

		this.flot = $.plot($("#chart"), dataset, options);

		let self = this;
		$("#chart").on("click", ".legendtoggle", function (/*event*/) {
			self.toggle($(this).attr("id"));
		});

		// axis labels
		$("<div class='axisLabel xaxisLabel'></div>").text("X Label").appendTo($("#chart"));
		$("<div class='axisLabel yaxisLabel'></div>").text("Y Label").appendTo($("#chart"));

		// annotations
		annotations.forEach(function (annotation) {
			let p = this.flot.pointOffset({x: annotation.x, y: annotation.y});
			$("#chart").append(`<div style="position:absolute;left:${p.left}px;top:${p.top}px">${annotation.text}</div>`);
		});

		// resize without plugin
		//    $(window).resize(function () {
		//      $.plot($('#chart'), dataset, options)
		//    });
	},

	toggle: function(label) {
		let options = this.flot.getOptions();
		let data = this.flot.getData();
		let idx = data.findIndex(d => d.label === label);
		if ("lines" in options && options.lines.show) {
			data[idx].lines.show = !data[idx].lines.show;
		} else if ("points" in options && options.points.show) {
			data[idx].points.show = !data[idx].points.show;
		} else if ("bars" in options && options.bars.show) {
			data[idx].bars.show = !data[idx].bars.show;
		}
		this.flot.setData(data);
		//  this.flot.setupGrid();
		this.flot.draw();
		//    let index = this.hidden.findIndex(data => data.label === label);
		//    if (index > -1) {
		//      let data = this.hidden.splice(index, 1);
		//      this.dataset.push(data[0]);
		//    } else {
		//      index = this.dataset.findIndex(data => data.label === label);
		//      if (index > -1) {
		//        let data = this.dataset.splice(index, 1);
		//        this.hidden.push(data[0]);
		//      }
		//    }
		//    $.plot($('#chart'), this.dataset, this.options);
	},

	minmax: function(series, options) {
		if (series.length > 0) {
			// x-axis: find min and max values over all series
			let xmin = series.reduce((min, xy) => min[0] > xy[0] ? xy : min)[0];
			if (options.xaxis.min < xmin) {
				options.xaxis.min = xmin;
			}
			let xmax = series.reduce((max, xy) => max[0] < xy[0] ? xy : max)[0];
			if (options.xaxis.max < xmax) {
				options.xaxis.max = xmax;
			}
			// y-axis: find max value over all series
			let ymax = series.reduce((max, xy) => max[1] < xy[1] ? xy : max)[1];
			if (options.yaxis.max < ymax) {
				options.yaxis.max = ymax;
			}
		}
		return options;
	}
};
