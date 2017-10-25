(function(global, local) {
	'use strict';

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
		},

		drawHeatMap: function() {
			for (const coord of hm.database) {
				// plot div on body
				local.body.appendChild(hm.createDiv(coord));
			}
		},

		createDiv: function(coord) {
			let div = document.createElement("div");
			div.style.backgroundColor = "black";
			div.style.height = "5px";
			div.style.width = "5px";
			div.style.borderRadius = "5px";
			div.style.position = "absolute";
			div.style.left = `${coord.x}px`
			div.style.top = `${coord.y}px`

			return div
		}
	}

	// inherit prototypes from parent!
	heatMap.init.prototype = heatMap.prototype;

	// expose api to window
	global.hm = heatMap;

	let session = heatMap();
	session.detectActivity();

	// on click on ctrl key, draw heatmap
	local.addEventListener("keydown", e=> {
	    // console.log(e);
	    if (e.keyCode == 17) {
	    	console.log("drawing heatmap on page");
	    	session.drawHeatMap();
	    } else {
	    	console.log("other!")
	    }
	})

	global.session = session;

})(window, document)

// to use; just load the javascript file into your page
// click randomly
// press on control to see your graph