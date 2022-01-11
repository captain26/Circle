import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

export default class YearGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        var originalLineDraw = Chart.controllers.line.prototype.draw;
        Chart.helpers.extend(Chart.controllers.line.prototype, {
          draw: function() {
            originalLineDraw.apply(this, arguments);
    
          if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0];
            var ctx = this.chart.ctx;
            var x = activePoint.tooltipPosition().x;
            var topY = this.chart.scales['y-axis-0'].top;
            var bottomY = this.chart.scales['y-axis-0'].bottom;
  
           // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = '#34A853';
            ctx.stroke();
            ctx.restore();  
         }
        }});
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec","Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",],
                datasets: [
                    {
                        label: "Stock Price",
                        data: [907.596863,
                          1469,
                          1444,
                          1743,
                          1805,
                          1860,
                          1809,
                          1828.5,
                          1934,
                          1847,
                          1845,
                          1917.800049,
                          1939,
                          1983,
                          2003.949951,
                          2058,
                          2178.800049,
                          1939,
                          1983,
                          2003.949951,
                          2058,
                          1805,
                          1860,
                          1809,
                          1743,
                          1530.492432,
                          1565.163818,
                          1550.106567,
                          1527,
                          1469,
                          1444,
                          1743,
                          1805,
                          1860,
                          1809,
                          1828.5,
                          1934,
                          1847
                        ],
                        fill: false,
                        borderColor: "#34A853",
                        pointRadius: 0,
                        lineTension: 0,
                    }
                ]
            },
            options: {
              legend: {
                display: false,
              },
              scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
            },
            tooltips: {
                      mode: "x-axis",
                      intersect: false,
                  },
          }
        });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}