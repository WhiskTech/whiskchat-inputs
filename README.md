inputs.io-node
=====
Inputs.io-node is a wrapper around the inputs.io api, this module provides an easy way to get information from inputs.io. 


Require inputs.io to get started

```
var inputs = require('inputs.io');

var inputsio = new inputs({
	APIKey: 'yourapikey',
	pin: 'your 4-6 digit pin code'
});
```

Example call

```
inputsio.balance(function(err,balance) {
	if(err){
		console.log(err);
	}
	console.log(balance[0]/100000000)
});
```