// Directive for pie charts, pass in title and data only
(function (window, angular, undefined) {
    'use strict';
 var app = angular.module('starter');
app.directive("hcPieChart", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      title: "@",
      data: "="
    },
    link: function(scope, element) {
      scope.$watch("data", function(newData) {
        var chart = Highcharts.chart(element[0], {
          colors: [
            "#4572A7",
            "#AA4643",
            "#89A54E",
            "#80699B",
            "#3D96AE",
            "#DB843D",
            "#92A8CD",
            "#A47D7C",
            "#B5CA92"
          ],
          chart: {
            type: "pie",
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
            }
          },
          title: {
            text: scope.title
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              depth: 35,
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                style: {
                  color:
                    (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                    "black"
                }
              }
            }
          },
          series: [
            {
              name: "Pallet",
              colorByPoint: true,
              data: newData
            }
          ]
        });
      });
    }
  };
});

app.directive("hcColumnGraph", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      title: "@",
      data: "="
    },
    link: function(scope, element) {
      scope.$watch("data", function(newData) {
        console.log(newData);
        var chart = Highcharts.chart(element[0], {
          chart: {
            type: "column"
          },
          title: {
            text: scope.title
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: "{point.y:.1f}"
              }
            }
          },
          xAxis: [
            {
              type: "category",
              labels: {
                rotation: -45,
                style: {
                  fontSize: "13px",
                  fontFamily: "Verdana, sans-serif"
                }
              }
            }
          ],
          yAxis: {
            min: 0
          },
          legend: {
            enabled: false
          },
          tooltip: {
            pointFormat: '<p style="color:white;padding:0"><b>{point.y}</b></p>'
          },
          scrollbar: {
            enabled: true
          },
          series: [
            {
              name: "Pallets",
              colorByPoint: true,
              data: newData
            }
          ],

          color: "#aaf442"
        });
      });
    }
  };
});

app.directive("hcStackColumn", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      title: "@",
      data: "="
    },
    link: function(scope, element) {
      scope.$watch("data", function(newData) {
        Highcharts.setOptions(Highcharts.theme);
        var chart = Highcharts.chart(element[0], {
          chart: {
            type: "column"
          },
          title: {
            text: scope.title
          },
          xAxis: {
            categories: newData.categories
          },
          yAxis: {
            min: 0,
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: "bold",
                color:
                  (Highcharts.theme && Highcharts.theme.textColor) || "gray"
              }
            }
          },
          //legend: {
          //    enabled: false
          //},
          //tooltip: {
          //    pointFormat: '<p style="color:white;padding:0"><b>{point.y}</b></p>'
          //},
          tooltip: {
            headerFormat: "<b>{point.x}</b><br/>",
            pointFormat: "{series.name}: {point.y}"
          },
          scrollbar: {
            enabled: true
          },
          plotOptions: {
            column: {
              stacking: "normal",
              dataLabels: {
                enabled: true,
                color:
                  (Highcharts.theme && Highcharts.theme.dataLabelsColor) ||
                  "black"
              }
            }
          },
          series: newData.series,
          color: "#aaf442"
        });
      });
    }
  };
});

app.directive("hcTreeMap", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      title: "@",
      data: "="
    },
    link: function(scope, element) {
      scope.$watch("data", function(newData) {
        console.log(newData);
        var chart = Highcharts.chart(element[0], {
          series: [
            {
              type: "treemap",
              dataLabels: {
                style: {
                  color: "#fff",
                  textOutline: "0px 0px #fff"
                }
              },
              layoutAlgorithm: "stripes",
              alternateStartingDirection: true,
              levels: [
                {
                  level: 1,
                  layoutAlgorithm: "sliceAndDice",
                  dataLabels: {
                    enabled: true,
                    align: "left",
                    verticalAlign: "top",
                    style: {
                      color: "#424242",
                      fontSize: "15px",
                      fontWeight: "bold",
                      textOutline: "0px 0px #fff"
                    }
                  }
                }
              ],
              data: newData
            }
          ],
          title: {
            text: scope.title
          }
        });
      });
    }
  };
});

app.directive("hcBarGraph", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      title: "@",
      subtitle: "@",
      data: "=",
      categories: "@",
      yAxisText: "@"
    },
    link: function(scope, element) {
      scope.$watch("data", function(newData) {
        console.log(newData);
        var chart = Highcharts.chart(element[0], {
          colors: [
            "#4572A7",
            "#AA4643",
            "#89A54E",
            "#80699B",
            "#3D96AE",
            "#DB843D",
            "#92A8CD",
            "#A47D7C",
            "#B5CA92"
          ],
          chart: {
            type: "bar"
          },
          title: {
            text: scope.title
          },
          subtitle: {
            text: scope.subtitle
          },
          xAxis: {
            categories: scope.categories,
            title: {
              text: null
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: scope.yAxisText,
              align: "high"
            },
            labels: {
              overflow: "justify"
            }
          },
          tooltip: {
            valueSuffix: " millions"
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            }
          },
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "top",
            x: 0,
            y: -10,
            marginButtom: 5,
            floating: true,
            borderWidth: 1,
            backgroundColor:
              (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
              "#FFFFFF",
            shadow: true
          },
          credits: {
            enabled: false
          },
          series: newData
        });
      });
    }
  };
});

app.directive("hcArea", function(){
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      title: "@",
      subtitle: "@",
      data: "=",
      categories: "@",
      yAxisText: "@"
    },    link: function(scope, element) {
      scope.$watch("data", function(newData) {
          var chart = Highcharts.chart(element[0], {
              chart: {
        type: 'area',
        spacingBottom: 30
    },
    title: {
        text: scope.title
    },
    subtitle: {
    text: scope.subtitle,
        floating: true,
        align: 'right',
        verticalAlign: 'bottom',
        y: 15
    },
    xAxis: {
        categories: scope.categories
    },
    yAxis: {
        title: {
            text: 'Total item'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        data: newData,
        name:'Item'
    }]
          });
      })}
}});
})(window, window.angular);