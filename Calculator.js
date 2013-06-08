 Ext.define("ProdVsTestCalculator", {
     extend: "Rally.data.lookback.calculator.TimeSeriesCalculator",

     getMetrics: function () {
         return [
             {
                 "field": "Environment",
                 "as": "Prod",
                 "f": "filteredCount",
                 "filterField": "Environment",
                 "filterValues": ["Production"],
                 "display": "column"
             },
             {
                 "field": "Environment",
                 "as": "Test",
                 "f": "filteredCount",
                 "filterField": "Environment",
                 "filterValues": ["Test"],
                 "display": "column"
             }
         ];
     }
 });