var request = require('request'),
	util = require('util');

function inputsError(error) {
	Error.captureStackTrace(this, inputsError);
	this.error = error;
}

util.inherits(inputsError, Error);

function inputsio(options) {
	if (!options || !options.APIKey) throw new inputsError('Must provide an APIKey in order to interact with the inputs.io api');
	//if(!options.pin) throw new inputsError('Must provide a pin for transactions');

	this.apiKey = (options && options.APIKey) ? options.APIKey : '';
	this.baseUrl = 'https://inputs.io/';
	var self = this;

	function get(url, callback) {
		request.get(url, function(err, res, data) {
			if (err) {
				callback(err);
			} else {
				try {
					data = JSON.parse(data);
					if (data.success === false) {
						callback(new inputsError(data.errors || data.error))
					} else {
						callback(null, data);
					}
				} catch (err) {
					callback(err);
				}
			}
		});
	}

	this.balance = function(callback) {
		var url = self.baseUrl + 'api?key=' + self.apiKey + '&action=getbalance';
		console.log(url);
		get(url, callback);
	};

}
module.exports = inputsio;