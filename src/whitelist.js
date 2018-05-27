let allowed_functions = {
	'virConnectOpen': 'host',
	'virConnectClose': 'host',
	'virConnectGetURI': 'host',
	'virDomainLookupByName': 'host',
	'virDomainGetID': 'domain',
	'virDomainCreateXML': 'host',
	'virDomainGetOSType': 'domain',
};

module.exports = {
	allowed_functions,
};