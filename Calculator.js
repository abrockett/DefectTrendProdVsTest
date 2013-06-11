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
     },
     prepareCalculator: function (calculatorConfig) {
        return new this.lumenize.TimeSeriesCalculator({
            deriveFieldsOnInput: calculatorConfig.derivedFieldsOnInput,
            metrics: calculatorConfig.metrics,
            summaryMetricsConfig: calculatorConfig.summaryMetricsConfig,
            deriveFieldsAfterSummary: calculatorConfig.derivedFieldsAfterSummary,
            granularity: this.lumenize.Time.DAY,
            tz: this.config.timeZone,
            holidays: this.config.holidays,
            workDays: this._getWorkdays()
        });
    }
 });