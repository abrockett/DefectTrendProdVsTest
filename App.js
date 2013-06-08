Ext.define('CustomApp', {
    extend: 'Rally.app.App',
	requires: [ 'ProdVsTestCalculator'],
    componentCls: 'app',

    launch: function() {
        this.snapshotStore = Ext.create('Rally.data.lookback.SnapshotStore', {
			// context: {
			// 	workspace: '/workspace/' + this.getContext().getWorkspace().ObjectID,
			// 	project: '/project/' + this.getContext().getProject().ObjectID,
			// 	projectScopeUp: this.getContext().getProjectScopeUp(),
			// 	projectScopeDown: this.getContext().getProjectScopeDown()
			// },
            listeners: {
                load: function(store, data, success) {
                    this._processData(store, data, success);
                },
                scope: this
            },
            fetch: ['Name','Environment','OpenedDate','Project'],
            hydrate: ['Environment'],
		    filters: [
		    	{
		    		property: '_ProjectHierarchy',
		    		operator: '=',
		    		value: this.getContext().getProject().ObjectID
		    	},
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
                // {
                //     property: '__At',
                //     value: '2013-05-28T00:00:00Z'
                // }
                {
                	property: '_ValidFrom',
                	operator: '=',
                	value: {
						$gte: "2010-02-01TZ",
						$lte: "current"
					}
                }
            ]
        });
        this.snapshotStore.load();
    },

    _processData: function(store, data, success) {
    	console.log(data.length);
    	// Ext.Array.each(data, function(item) {
    	// 	console.log(item.data.Environment + '\t' + item.data.OpenedDate + '\t' + item.data.Project + '\t' + item.data.Name);
    	// });
debugger;
    	this.calculator = Ext.create('ProdVsTestCalculator', {});
    	this.chartData = this.calculator.prepareChartData(store);
    	console.log(chartData);
    }
});