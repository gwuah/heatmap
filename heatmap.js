(function(global, local) {

	// necessary variables
	let hm;

	function heatMap(options) {
		return new heatMap.init(options)
	}

	heatMap.init = function(options) {
		hm = this;
		hm.count = 0;
		hm.options = options || {};
		hm.database = [];

		// console.log(hm);
	}

	heatMap.prototype = {
		detectActivity: function() {
			// listen for click events
			local.addEventListener("click", function(e) {

				// record click event in db
				hm.database.push({
					x: e.pageX,
					y: e.pageY,
					id: hm.count,
				});

				hm.count += 1;
			})
		}
	}

	// inherit prototypes from parent!
	heatMap.init.prototype = heatMap.prototype;

	// expose api to window
	global.hm = heatMap;

	// console.log(this)

})(window, document)