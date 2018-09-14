var fetch = require("node-fetch"); 

let host;
function Dero(hostP) {
	host = hostP;
	return ( {
		getBlockHeight: async () => {
			const result = await fetch ( host + "/getheight" )
										.then(res => res.json()).catch(err => console.log(err));
			return new Promise(resolve => {
				resolve(result);
			});
		},

		getBlockCount: async () => {
			const result = await fetch(	host + "/json_rpc",  
					{ 	method: "POST", 
						body: JSON.stringify({ 'jsonrpc': '2.0', 'id': '1', 'method': 'getblockcount'}), 
						headers: { 'Content-Type': 'application/json' }
					})	.then(res => res.json()).catch(err => console.log(err));
			return new Promise(resolve => {
									resolve(result.result);
								});
		},

		///TODO: Doesnt work
		getInfo: async () => {
			const result = await fetch ( host + "/get_info" )
										.then(res => res.json()).catch(err => console.log(err));
			return new Promise(resolve => {
									resolve(result);
								});
		},

		///TODO: Lags out
		getBlockTemplate: async (address, reserveSize) => {
			const result = await fetch ( 	host + "json_rpc", 
										{	method: "POST", 
											body: JSON.stringify({	'jsonrpc': '2.0', 'id':'1', 'method':'getblocktemplate', 
																	"params": { "wallet_address": address, "reserve_size" : reserveSize }
																}) ,
											headers: { 'Content-Type': 'application/json' }
										}) .then(res => res.json()).catch(err => console.log(err));
			return new Promise(resolve => {
									resolve(result);
								});
		},

		getBlock: async (hash) => {
			const result = await fetch ( 	host + "json_rpc", 
										{	method: "POST", 
											body: JSON.stringify({	'jsonrpc': '2.0', 'id':'1', 'method': 'getblock', 
																	"params":{ "hash": hash }
																}) ,
											headers: { 'Content-Type': 'application/json' }
										}) .then(res => res.json()).catch(err => console.log(err));
			return new Promise(resolve => {
									resolve(result);
								});
		} 
	} )
}


const a = Dero("https://rwallet.dero.live");
a.getBlock("b40cf3d76707ab28d7620924856bf87a910283e3154fbfd60e4408b0e6b59eaf").then(res=>console.log(res));

module.exports = {
	Dero
}