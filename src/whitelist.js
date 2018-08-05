let allowed_functions = {
	'virConnectOpen': 'host',
	'virConnectClose': 'host',
	'virConnectGetURI': 'host',

	// virDomainGet

	// skipped
	// 'virDomainGetInfo': 'domain',
	// 'virDomainGetState': 'domain',
	// 'virDomainGetControlInfo': 'domain',
	// 'virDomainGetBlockInfo': 'domain',
	// 'virDomainGetJobInfo': 'domain',
	// 'virDomainGetJobStats': 'domain',
	// 'virDomainGetAutostart',': 'domain',

	// 'virDomainGetHostname': 'domain',
	// 'virDomainGetID': 'domain',
	// 'virDomainGetMaxMemory': 'domain',
	// 'virDomainGetMaxVcpus': 'domain',
	// 'virDomainGetMetadata': 'domain',
	// 'virDomainGetName': 'domain',
	// 'virDomainGetOSType': 'domain',
	// 'virDomainGetVcpusFlags': 'domain',
	// 'virDomainGetXMLDesc': 'domain',

	'virDomainAbortJob': 'domain',
	'virDomainAddIOThread': 'domain',
	'virDomainAttachDevice': 'domain',
	'virDomainAttachDeviceFlags': 'domain',
	'virDomainBlockCommit': 'domain',
	'virDomainBlockJobAbort': 'domain',
	'virDomainBlockJobSetSpeed': 'domain',
	'virDomainBlockPull': 'domain',
	'virDomainBlockRebase': 'domain',
	'virDomainBlockResize': 'domain',
	'virDomainCoreDump': 'domain',
	'virDomainCoreDumpWithFormat': 'domain',
	'virDomainCreate': 'domain',
	'virDomainCreateLinux': 'domain',
	'virDomainCreateWithFlags': 'domain',
	'virDomainCreateXML': 'host',
	'virDomainDefineXML': 'domain',
	'virDomainDefineXMLFlags': 'domain',
	'virDomainDelIOThread': 'domain',
	'virDomainDestroy': 'domain',
	'virDomainDestroyFlags': 'domain',
	'virDomainDetachDevice': 'domain',
	'virDomainDetachDeviceFlags': 'domain',
	'virDomainFree': 'domain',
	'virDomainFSTrim': 'domain',
	'virDomainGetHostname': 'domain',
	'virDomainGetID': 'domain',
	'virDomainGetMaxMemory': 'domain',
	'virDomainGetMaxVcpus': 'domain',
	'virDomainGetMetadata': 'domain',
	'virDomainGetName': 'domain',
	'virDomainGetOSType': 'domain',
	'virDomainGetVcpusFlags': 'domain',
	'virDomainGetXMLDesc': 'domain',
	'virDomainHasManagedSaveImage': 'domain',
	'virDomainInjectNMI': 'domain',
	'virDomainIsActive': 'domain',
	'virDomainIsPersistent': 'domain',
	'virDomainIsUpdated': 'domain',
	// 'virDomainListAllSnapshots': 'domain', needs virDomainSnapshotPtr
	'virDomainLookupByID': 'host',
	'virDomainLookupByName': 'host',
	'virDomainLookupByUUIDString': 'host',
	// 'virDomainLxcOpenNamespace': 'domain', needs virStreamPtr
	'virDomainManagedSave': 'domain',
	'virDomainManagedSaveDefineXML': 'domain',
	'virDomainManagedSaveGetXMLDesc': 'domain',
	'virDomainManagedSaveRemove': 'domain',
	'virDomainMigrate': 'domain',
	'virDomainMigrate2': 'domain',
	'virDomainMigrateSetCompressionCache': 'domain',
	'virDomainMigrateSetMaxDowntime': 'domain',
	'virDomainMigrateSetMaxSpeed': 'domain',
	'virDomainMigrateStartPostCopy': 'domain',
	'virDomainMigrateToURI': 'domain',
	'virDomainMigrateToURI2': 'domain',
	// 'virDomainOpenChannel': 'domain', needs virStreamPtr
	// 'virDomainOpenConsole': 'domain', needs virStreamPtr
	'virDomainOpenGraphics': 'domain',
	'virDomainOpenGraphicsFD': 'domain',
	'virDomainPMSuspendForDuration': 'domain',
	'virDomainPMWakeup': 'domain',
	'virDomainReboot': 'domain',
	'virDomainRename': 'domain',
	'virDomainReset': 'domain',
	'virDomainRestore': 'domain',
	'virDomainRestoreFlags': 'domain',
	'virDomainResume': 'domain',
	'virDomainSave': 'domain',
	'virDomainSaveFlags': 'domain',
	'virDomainSaveImageDefineXML': 'domain',
	'virDomainSaveImageGetXMLDesc': 'domain',
	// 'virDomainScreenshot': 'domain', needs virStreamPtr
	'virDomainSendProcessSignal': 'domain',
	'virDomainSetAutostart': 'domain',
	'virDomainSetBlockThreshold': 'domain',
	'virDomainSetGuestVcpus': 'domain',
	'virDomainSetLifecycleAction': 'domain',
	'virDomainSetMaxMemory': 'domain',
	'virDomainSetMemory': 'domain',
	'virDomainSetMemoryFlags': 'domain',
	'virDomainSetMemoryStatsPeriod': 'domain',
	'virDomainSetMetadata': 'domain',
	'virDomainSetUserPassword': 'domain',
	'virDomainSetVcpu': 'domain',
	'virDomainSetVcpus': 'domain',
	'virDomainSetVcpusFlags': 'domain',
	'virDomainShutdown': 'domain',
	'virDomainShutdownFlags': 'domain',
	'virDomainSuspend': 'domain',
	'virDomainUndefine': 'domain',
	'virDomainUndefineFlags': 'domain',
	'virDomainUpdateDeviceFlags': 'domain',


};

module.exports = {
	allowed_functions,
};