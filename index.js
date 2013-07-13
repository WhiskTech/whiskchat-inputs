var request = require('request'),
	util = require('util');


function inputsio(options) {
	if (!options || !options.APIKey) throw new inputsError('Must provide an APIKey in order to interact with the inputs.io api');
	if (!options.pin) throw new inputsError('Must provide a pin for transactions');

	this.apiKey = (options && options.APIKey) ? options.APIKey : '';
	this.pin = (options && options.pin) ? options.pin : '';
	this.baseUrl = 'https://inputs.io/';
	var self = this;

	function get(url, callback) {
		request.get(url, function(err, res, data) {
			if (!err && res.statusCode == 200) {
				var parsed, success = true;

				try {
					parsed = JSON.parse(data);
				} catch (e) {
					// An error has occured, handle it, by e.g. logging it
					success = false;



				} finally {
					if (success) {
						callback(null, parsed);
					} else {
						callback(null, data);
					}
				}

			} else {

				callback(err, data);
			}
		});
	}

	this.balance = function(callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=getbalance';
		//console.log(url); //debug line
		get(url, callback);
	};

	this.transactions = {};

	this.transactions.list = function(skip, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=gettransactions&from=' + skip;
		//console.log(url); //debug line
		get(url, callback);
	}

	this.transactions.details = function(txid, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=txdetails&txid=' + txid;
		//console.log(url); //debug line
		get(url, callback);
	}

	this.transactions.send = function(address, amount, note, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=send&address=' + encodeURIComponent(address) + '&amount=' + amount + '&note=' + note + '&pin=' + self.pin;
		//console.log(url); //debug line
		get(url, callback);
	}

	this.voucher = {};

	this.voucher.generate = function(amount, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=genvoucher&amount=' + amount + '&pin=' + self.pin;
		//console.log(url); //debug line
		get(url, callback);
	}
	this.voucher.redeem = function(voucher, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=redeemvoucher&voucher=' + voucher;
		//console.log(url); //debug line
		get(url, callback);
	}

	this.message = {};

	this.message.sign = function(address,message, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=signmessage&address=' + address +'&message='+ encodeURIComponent(message) +'&pin=' + self.pin;
		//console.log(url); //debug line
		get(url, callback);
	}

	//add multiline problem into readme
	this.message.verify = function(message, callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=verifymessage&message=' + encodeURIComponent(message);
		//console.log(url); //debug line
		get(url, callback);
	}
}
module.exports = inputsio;