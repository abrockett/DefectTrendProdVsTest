Ext.define('DefectTrendApp', {
    extend: 'Rally.app.App',
    requires: [ 'ProdVsTestCalculator'],
    componentCls: 'app',

    items: [
        {
            xtype: 'rallychart',

            storeConfig: {
                fetch: ['Name','Environment','OpenedDate','Project'],
                hydrate: ['Environment'],
                filters: [
                    // {
                    //     property: '_ProjectHierarchy',
                    //     operator: '=',
                    //     value: this.getContext().getProject().ObjectID
                    // },
                    {
                        property: '_TypeHierarchy',
                        operator: '=',
                        value: 'Defect'
                    },
                    {
                        property: 'Resolution',
                        operator: '=',
                        value: 'Duplicate'
                    },
                    {
                        property: '_ValidFrom',
                        operator: '=',
                        value: {
                            $gte: "2010-02-01TZ",
                            $lte: "current"
                        }
                    }
                ]
            },

            calculatorType: 'ProdVsTestCalculator',
            calculatorConfig: {
            	granularity: 'month'
            },

            chartConfig: {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Defect Trends'
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    tickInterval: 20,
                    title: {
                        text: 'Days'
                    }
                },
                yAxis: [
                    {
                        title: {
                            text: 'Count'
                        }
                    }
                ],
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false
                        }
                    },
                    area: {
                        stacking: 'normal'
                    }
                }
            }
        }
    ]
});