let whitelist = new Set([
	'virConnectOpen',
	'virConnectClose',
	'virConnectGetURI',
	'virDomainLookupByName',
	'virDomainGetID',
	'virDomainCreateXML',
	'virDomainGetOSType',
	'virDomainGetVcpusFlags',
]);

module.exports = {
	whitelist,
};