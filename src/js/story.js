// @ts-check
'use strict';

import moment from 'moment';

import Chart from './chart.js';

var Story = {

  story_1_1: function (csv, xcolumn, ycolumn) {
    let options = {
      lines: {
        show: true
      },
      points: {
        radius: 1,
        show: false
      },
      shadowSize: 1,
      xaxis: {
        min: 0,
        max: 0,
        mode: 'time',
        minTickSize: [6, 'month'],
        timeformat: '%Y-%m'
      },
      yaxis: {
        min: 0,
        max: 0
      },
      legend: {
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: true,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    csv = csv.filter(line => line['Typ'] !== 'Prognose');

    let series = {};
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    let self = this;
    sites.forEach(function (site) {
      series[site] = self.extract(groups[site], xcolumn, ycolumn, 'YYYY-MM-DD');
      options = self.minmax(series[site], options);
    });

    // right margin
    options.xaxis.max = moment(options.xaxis.max).add(1, 'month').valueOf();

    this.plot(series, options, sites, []);
  },

  story_1_4: function (csv, xcolumn, ycolumn) {
    let options = {
      bars: {
        show: true,
        barWidth: 12 * 24 * 60 * 60 * 350,
        lineWidth: 0,
        //      order: 1,
        fillColor: {
          colors: [{
            opacity: 1
          }, {
            opacity: 0.7
          }]
        }
      },
      xaxis: {
        mode: 'time',
        minTickSize: [1, 'month'],
        timeformat: '%b',
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        min: 0,
        max: 0
      },
      yaxis: {
        min: 0,
        max: 0,
        axisLabel: 'kWh',
        axisLabelPadding: 20
      },
      legend: {
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: false,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    let series = {};
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    let centershift = sites.length * options.bars.barWidth / 2;
    let self = this;
    sites.forEach(function (site, index) {
      let points = self.extract(groups[site], xcolumn, ycolumn, 'MMM');
      // left shift o x-axis to center all series bars of a month
      series[site] = points.map(xy => [xy[0] + (index * options.bars.barWidth) - centershift, xy[1]]);
      options = self.minmax(points, options);
    });

    options.xaxis.min -= centershift;
    options.xaxis.max += centershift;

    // left and right margin
    options.xaxis.min = moment(options.xaxis.min).subtract(1, 'week').valueOf();
    options.xaxis.max = moment(options.xaxis.max).add(1, 'week').valueOf();

    let annotations = [
      {
        x: moment('15.04.2018', 'DD.MM.YYYY').valueOf(),
        y: 2500000,
        text: 'Monatlicher Gasverbrauch in den Lagern'
      }
    ];

    this.plot(series, options, sites, []);
  },

  story_1_5: function (csv, xcolumn, ycolumn) {
    let options = {
      bars: {
        show: true,
        barWidth: 12 * 24 * 60 * 60 * 350,
        lineWidth: 0,
        //      order: 1,
        fillColor: {
          colors: [{
            opacity: 1
          }, {
            opacity: 0.7
          }]
        }
      },
      xaxis: {
        mode: 'time',
        minTickSize: [1, 'month'],
        timeformat: '%b',
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        min: 0,
        max: 0
      },
      yaxis: {
        min: 0,
        max: 0,
        axisLabel: 'kWh / m2',
        axisLabelPadding: 20
      },
      legend: {
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: false,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    let series = {};
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    let centershift = sites.length * options.bars.barWidth / 2;
    let self = this;
    sites.forEach(function (site, index) {
      let points = self.extract(groups[site], xcolumn, ycolumn, 'MMM');
      // left shift o x-axis to center all series bars of a month
      series[site] = points.map(xy => [xy[0] + (index * options.bars.barWidth) - centershift, xy[1]]);
      options = self.minmax(points, options);
    });

    options.xaxis.min -= centershift;
    options.xaxis.max += centershift;

    // left and right margin
    options.xaxis.min = moment(options.xaxis.min).subtract(1, 'week').valueOf();
    options.xaxis.max = moment(options.xaxis.max).add(1, 'week').valueOf();

    let annotations = [
      {
        x: moment('15.04.2018', 'DD.MM.YYYY').valueOf(),
        y: 2500000,
        text: 'Monatlicher Gasverbrauch in den Lagern'
      }
    ];

    this.plot(series, options, sites, []);
  },

  story_1_6: function (csv, xcolumn, ycolumn) {
    let options = {
      bars: {
        show: true,
        barWidth: 12 * 24 * 60 * 60 * 350,
        lineWidth: 0,
        //      order: 1,
        fillColor: {
          colors: [{
            opacity: 1
          }, {
            opacity: 0.7
          }]
        }
      },
      xaxis: {
        mode: 'time',
        minTickSize: [1, 'month'],
        timeformat: '%b',
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        min: 0,
        max: 0
      },
      yaxis: {
        min: 0,
        max: 0,
        axisLabel: 'kWh / m2',
        axisLabelPadding: 20
      },
      legend: {
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: false,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    let series = {};
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    let centershift = sites.length * options.bars.barWidth / 2;
    let self = this;
    sites.forEach(function (site, index) {
      let points = self.extract(groups[site], xcolumn, ycolumn, 'MMM');
      // left shift o x-axis to center all series bars of a month
      series[site] = points.map(xy => [xy[0] + (index * options.bars.barWidth) - centershift, xy[1]]);
      options = self.minmax(points, options);
    });

    options.xaxis.min -= centershift;
    options.xaxis.max += centershift;

    // left and right margin
    options.xaxis.min = moment(options.xaxis.min).subtract(1, 'week').valueOf();
    options.xaxis.max = moment(options.xaxis.max).add(1, 'week').valueOf();

    let annotations = [
      {
        x: moment('15.04.2018', 'DD.MM.YYYY').valueOf(),
        y: 2500000,
        text: 'Monatlicher Gasverbrauch in den Lagern'
      }
    ];

    this.plot(series, options, sites, []);
  },

  story_1_6_1: function (csv, xcolumn, ycolumn) {
    let options = {
      points: {
        show: true,
        radius: 5,
        lineWidth: 2,
        fill: true,
        fillColor: false
      },
      xaxis: {
        mode: 'time',
        minTickSize: [1, 'month'],
        //      timeformat: "%b",
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        min: 0,
        max: 0
      },
      yaxis: {
        min: 0,
        max: 0,
        axisLabel: 'kWh / m2',
        axisLabelPadding: 20
      },
      legend: {
        position: 'se',
        hideable: true
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: false,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    let series = {};
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    let self = this;
    sites.forEach(function (site/*, index*/) {
      series[site] = self.extract(groups[site], xcolumn, ycolumn, 'MMM');
      options = self.minmax(series[site], options);
    });

    // left and right margin
    options.xaxis.min = moment(options.xaxis.min).subtract(2, 'week').valueOf();
    options.xaxis.max = moment(options.xaxis.max).add(2, 'week').valueOf();

    this.plot(series, options, sites, []);

  },

  story_2_1: function (csv, xcolumn, ycolumn) {
    let options = {
      lines: {
        show: true
      },
      points: {
        radius: 1,
        show: false
      },
      shadowSize: 1,
      xaxis: {
        min: 0,
        max: 0,
        mode: 'time',
        minTickSize: [6, 'month'],
        timeformat: '%Y-%m'
      },
      yaxis: {
        min: 0,
        max: 0,
        axisLabel: 'kWh',
        axisLabelPadding: 20
      },
      legend: {
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: true,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    let segments = {};
    let labels = [];
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    let self = this;
    sites.forEach(function (site, index) {
      let types = self.groupBy('Typ', groups[site]);
      for (let type in types) {
        segments[site + type] = self.extract(types[type], xcolumn, ycolumn, 'YYYY-MM-DD');
        labels.push(sites[index] + '/' + type);
      }
      let series = self.extract(groups[site], xcolumn, ycolumn, 'YYYY-MM-DD');
      options = self.minmax(series, options);
    });

    // right margin
    options.xaxis.max = moment(options.xaxis.max).add(1, 'month').valueOf();

    this.plot(segments, options, labels, []);
  },

  story_2_2: function (csv, xcolumn/*, ycolumn*/) {
    let labels = [
      'IST Werte seit EE Maßname',
      'Prognose auf historischen Daten',
      'Planwert nach EE Maßnahme',
      'Bereinigte IST Werte'];

    let options = {
      lines: {
        show: true
      },
      //    points: {
      //      radius: 2,
      //      show: true
      //    },
      shadowSize: 1,
      xaxis: {
        mode: 'time',
        tickSize: [3, 'month'],
        tickFormatter: function (val/*, axis*/) {
          return moment(val).format('MMM YYYY');
        }
      },
      yaxis: {
        min: 0,
        axisLabel: 'Verbrauch kumuliert in kWh',
        axisLabelPadding: 20
      },
      legend: {
        position: 'se'
      },
      grid: {
        hoverable: true,
        borderWidth: 0
      },
      tooltip: {// requires 'hoverable' property
        show: true,
        content: '%y' /*"<b>%y.2</b>"*/,
        defaultTheme: false
      }
    };

    let series = {};
    let groups = this.groupBy('Standort', csv);
    let sites = Object.keys(groups);
    series['gasConCum'] = this.extract(groups[sites[0]], xcolumn, 'gasConCum', 'YYYY-MM-DD');
    series['gasPredCum'] = this.extract(groups[sites[0]], xcolumn, 'gasPredCum', 'YYYY-MM-DD');
    series['gasPredFac2Cum'] = this.extract(groups[sites[0]], xcolumn, 'gasPredFac2Cum', 'YYYY-MM-DD');
    series['gasPredFac3CutCum'] = this.extract(groups[sites[0]], xcolumn, 'gasPredFac3CutCum', 'YYYY-MM-DD');

    this.plot(series, options, labels, []);
  }
};
