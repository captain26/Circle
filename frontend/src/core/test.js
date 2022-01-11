var KiteConnect = require("kiteconnect").KiteConnect;

const tickers = '738561';


var kc = new KiteConnect({
	api_key: "rkpul9bo6m30tpv9",
	access_token: "eqfVaGcg8BBDiL1V8niUzPqfY5x2zsvE",
});



// kc.generateSession("IEe991eaaBXETtVqG6VDf3ZaI1Ekspgi", "l8mg850r7kcl1jhv3hmmele61s55m5ph")
// 	.then(function(response) {
// 		init();
// 	})xq
// 	.catch(function(err) {
// 		console.log(err);
// 	});
init();

function init() {
	// Fetch equity margins.
	kc.getLTP([tickers])
	// You can have other api calls here.
		.then(function(response) {
			console.log(response['738561']);
			// You got user's margin details.
		}).catch(function(err) {
			// Something went wrong.
		});
}




// var KiteTicker = require("kiteconnect").KiteTicker;
// var ticker = new KiteTicker({
// 	api_key: "rkpul9bo6m30tpv9",
// 	access_token: "mB8Mrfpa1tuy7qg0HIgFaxdCAPmPkiuz"
// });
// // console.log(ticker);

// ticker.connect();
// ticker.on("ticks", onTicks);
// ticker.on("connect", subscribe);

// function onTicks(ticks) {
// 	console.log("Ticks", ticks);
// }

// function subscribe() {
// 	var items = [738561];
// 	ticker.subscribe(items);
// 	ticker.setMode(ticker.modeFull, items);
// }
