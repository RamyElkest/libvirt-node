let whitelist = new Set([
	'virConnectOpen',
	'virConnectClose',
	'virConnectGetURI',
	'virDomainLookupByName',
	'virDomainGetID',
	'virDomainCreateXML',
	'virDomainGetOSType',
	'virDomainGetVcpusFlags',

	/** ListAll **/
	"virConnectListAllDomains",
	"virConnectListAllInterfaces",
	"virConnectListAllNetworks",
	"virConnectListAllNodeDevices",
	"virConnectListAllNWFilters",
	"virConnectListAllSecrets",
	"virConnectListAllStoragePools",
	"virDomainListAllSnapshots",
	"virDomainSnapshotListAllChildren",
	"virStoragePoolListAllVolumes",
]);

module.exports = {
	whitelist,
};