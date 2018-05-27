let allowed_functions = new Set([
	'virConnectOpen',
	'virConnectClose',
	'virConnectGetURI',
	'virDomainLookupByName',
	'virDomainGetID',
]);

module.exports = {
	allowed_functions,
};