inputs.io-node
=====
Inputs.io-node is a wrapper around the inputs.io api, this module provides an easy way to get information from inputs.io. See the inputs.io api page for more detailed info on output data.

<b>Note:</b> This module is in an infant state and may have bugs, use with caution!

Require inputs.io to get started

```
var inputs = require('inputs.io');

var inputsio = new inputs({
	APIKey: 'yourapikey',
	pin: 'your 4-6 digit pin code'
});
```

Get balance
<b>Amount in satoshis.</b>

```
inputsio.balance(function(err,balance) {
	if(err){
		console.log(err);
	}
	console.log(balance[0]/100000000)
});
```
Get transactions
=====
Get last transactions, first argument specifies how many TX to skip, 0 for most recent
Returns json of transactions. <b>Amounts in satoshis.</b>

```
inputsio.transactions.list(0,function(err,transactions) {
	if(err){
		console.log(err);
	}
	console.log(transactions)
});
```

Get transaction details
=====
Get details for transaction id

```
inputsio.transactions.details('io2067ba89ded458ea0f07e5341f344d8b7fa2ff4b72c5903a34aa8e5c223c85',function(err,transaction) {
	if(err){
		console.log(err);
	}
	console.log(transaction)
});
```
Send transaction
=====
Send transaction, specify amount in btc
See inputs.io api page for a detailed list of ouputs to expect

```
inputsio.transactions.send('email or bitcoin address', 0.025, 'This is a note for the transaction',function(err,transaction) {
	if(err){
		console.log(err);
	}
	console.log(transaction)
});
```
Generate voucher
=====

Generate a voucher, specify amount in btc

```
inputsio.voucher.generate(0.01,function(err,vouchercode) {
	if(err){
		console.log(err);
	}
	console.log(vouchercode)
});
```

Redeem a voucher
=====

```
inputsio.voucher.redeem('your voucher code',function(err,result) {
	if(err){
		console.log(err);
	}
	console.log(result)
});

```
Sign a message
=====
Sign a bitcoin message

```
inputsio.message.sign('bitcoin address', 'the message to be signed',function(err,result) {
	if(err){
		console.log(err);
	}
	console.log(result)
});
```
Verify a message
=====
Verify a signed message
Note: you will receive some javascript errors for improper multiline string, make sure you seperate lines using \n and make string take up a single line or see how to create a proper multiline string. The result is empty if message is not verified.

```
inputsio.message.verify('signed message to be verified',function(err,result) {
	if(err){
		console.log(err);
	}
	console.log(result)
});
```

Stability
=====
In terms of use, this library has been used in many projects, but never versions may be faulty in some way:
<ul>
	<li><a href="http://www.bitspoker.com">BitsPoker</a></li>
	<li><a href="http://www.messagecoin.com">MessageCoin</a></li>
</ul>