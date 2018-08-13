const whitelist = new Set([
    'virConnectOpen',
    'virConnectClose',
    'virConnectGetURI',
    'virDomainLookupByName',
    'virDomainGetID',
    'virDomainCreateXML',
    'virDomainGetOSType',
    'virDomainGetVcpusFlags',

    /** ListAll **/
    'virConnectListAllDomains',
    'virConnectListAllInterfaces',
    'virConnectListAllNetworks',
    'virConnectListAllNodeDevices',
    'virConnectListAllNWFilters',
    'virConnectListAllSecrets',
    'virConnectListAllStoragePools',
    'virDomainListAllSnapshots',
    'virDomainSnapshotListAllChildren',
    'virStoragePoolListAllVolumes',

    // 'virConnCopyLastError', Error: Type 'virErrorPtr' is not mapped to a napi type
    // 'virConnGetLastError', Error: Type 'virErrorPtr' is not mapped to a napi type
    // 'virConnResetLastError', Error: Type 'virErrorPtr' is not mapped to a napi type
    // 'virConnSetErrorFunc', callback signature
    // 'virConnectBaselineCPU', Error: Type 'const char **' is not mapped to a napi type
    // 'virConnectCompareCPU', Error: Type 'virConnectDomainEventCallback' is not mapped to a napi type
    // 'virConnectDomainEventDeregister', Error: Type 'virConnectDomainEventCallback' is not mapped to a napi type
    // 'virConnectDomainEventDeregisterAny', Error: Type 'virConnectDomainEventCallback' is not mapped to a napi type
    // 'virConnectDomainEventRegister', Error: Type 'virConnectDomainEventCallback' is not mapped to a napi type
    // 'virConnectDomainEventRegisterAny', Error: Type 'virConnectDomainEventCallback' is not mapped to a napi type
    'virConnectDomainXMLFromNative',
    'virConnectDomainXMLToNative',
    'virConnectFindStoragePoolSources',
    // 'virConnectGetAllDomainStats', Error: Type 'virDomainStatsRecordPtr **' is not mapped to a napi type
    // 'virConnectGetCPUModelNames', Error: Type 'char ** *' is not mapped to a napi type
    'virConnectGetCapabilities',
    'virConnectGetDomainCapabilities',
    'virConnectGetHostname',
    // 'virConnectGetLibVersion', Error: Type 'unsigned long *' is not mapped to a napi type
    'virConnectGetMaxVcpus',
    'virConnectGetSysinfo',
    'virConnectGetType',
    // 'virConnectGetVersion', Error: Type 'unsigned long *' is not mapped to a napi type
    'virConnectIsAlive',
    'virConnectIsEncrypted',
    'virConnectIsSecure',
    // 'virConnectListDefinedDomains', Error: Type 'char ** const' is not mapped to a napi type
    // 'virConnectListDefinedInterfaces', Error: Type 'char ** const' is not mapped to a napi type
    // 'virConnectListDefinedNetworks', Error: Type 'char ** const' is not mapped to a napi type
    // 'virConnectListDefinedStoragePools', Error: Type 'char ** const' is not mapped to a napi type
    // 'virConnectListDomains', Error: Type 'int *' is not mapped to a napi type
    // 'virConnectListInterfaces', Error: Type 'int *' is not mapped to a napi type
    // 'virConnectListNWFilters', Error: Type 'int *' is not mapped to a napi type
    // 'virConnectListNetworks', Error: Type 'int *' is not mapped to a napi type
    // 'virConnectListSecrets', Error: Type 'int *' is not mapped to a napi type
    // 'virConnectListStoragePools', Error: Type 'int *' is not mapped to a napi type
    // 'virConnectNetworkEventDeregisterAny', Error: Type 'virConnectNetworkEventGenericCallback' is not mapped to a napi type
    // 'virConnectNetworkEventRegisterAny', Error: Type 'virConnectNetworkEventGenericCallback' is not mapped to a napi type
    // 'virConnectNodeDeviceEventDeregisterAny', Error: Type 'virConnectNetworkEventGenericCallback' is not mapped to a napi type
    // 'virConnectNodeDeviceEventRegisterAny', Error: Type 'virConnectNetworkEventGenericCallback' is not mapped to a napi type
    'virConnectNumOfDefinedDomains',
    'virConnectNumOfDefinedInterfaces',
    'virConnectNumOfDefinedNetworks',
    'virConnectNumOfDefinedStoragePools',
    'virConnectNumOfDomains',
    'virConnectNumOfInterfaces',
    'virConnectNumOfNWFilters',
    'virConnectNumOfNetworks',
    'virConnectNumOfSecrets',
    'virConnectNumOfStoragePools',
    // 'virConnectOpenAuth', Error: Type 'virConnectAuthPtr' is not mapped to a napi type
    'virConnectOpenReadOnly',
    'virConnectRef',
    // 'virConnectRegisterCloseCallback', Error: Type 'virConnectCloseFunc' is not mapped to a napi type
    // 'virConnectSecretEventDeregisterAny', Error: Type 'virConnectSecretEventGenericCallback' is not mapped to a napi type
    // 'virConnectSecretEventRegisterAny', Error: Type 'virConnectSecretEventGenericCallback' is not mapped to a napi type
    'virConnectSetKeepAlive',
    // 'virConnectStoragePoolEventDeregisterAny', Error: Type 'virConnectStoragePoolEventGenericCallback' is not mapped to a napi type
    // 'virConnectStoragePoolEventRegisterAny', Error: Type 'virConnectStoragePoolEventGenericCallback' is not mapped to a napi type
    // 'virConnectUnregisterCloseCallback', Error: Type 'virConnectCloseFunc' is not mapped to a napi type
    // 'virCopyLastError', Error: Type 'virConnectCloseFunc' is not mapped to a napi type
    // 'virDefaultErrorFunc', Error: Type 'virConnectCloseFunc' is not mapped to a napi type
    'virDomainAbortJob',
    'virDomainAddIOThread',
    'virDomainAttachDevice',
    'virDomainAttachDeviceFlags',
    'virDomainBlockCommit',
    // 'virDomainBlockCopy', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainBlockJobAbort',
    'virDomainBlockJobSetSpeed',
    // 'virDomainBlockPeek', // Error: Type 'void *' is not mapped to a napi type
    'virDomainBlockPull',
    'virDomainBlockRebase',
    'virDomainBlockResize',
    // 'virDomainBlockStats', // Error: Type 'virDomainBlockStatsPtr' is not mapped to a napi type
    // 'virDomainBlockStatsFlags', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainCoreDump',
    'virDomainCoreDumpWithFormat',
    'virDomainCreate',
    'virDomainCreateLinux',
    // 'virDomainCreateWithFiles', Error: Type 'int *' is not mapped to a napi type
    'virDomainCreateWithFlags',
    // 'virDomainCreateXMLWithFiles', Error: Type 'int *' is not mapped to a napi type
    'virDomainDefineXML',
    'virDomainDefineXMLFlags',
    'virDomainDelIOThread',
    'virDomainDestroy',
    'virDomainDestroyFlags',
    'virDomainDetachDevice',
    'virDomainDetachDeviceFlags',
    // 'virDomainFSFreeze', Error: Type 'const char **' is not mapped to a napi type
    // 'virDomainFSInfoFree', Error: Type 'virDomainFSInfoPtr' is not mapped to a napi type
    // 'virDomainFSThaw', Error: Type 'const char **' is not mapped to a napi type
    'virDomainFSTrim',
    'virDomainFree',
    // 'virDomainGetAutostart', Error: Type 'int *' is not mapped to a napi typ
    // 'virDomainGetBlkioParameters', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainGetBlockInfo', Error: Type 'virDomainBlockInfoPtr' is not mapped to a napi type
    // 'virDomainGetBlockIoTune', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainGetBlockJobInfo', Error: Type 'virDomainBlockJobInfoPtr' is not mapped to a napi type
    // 'virDomainGetCPUStats', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainGetConnect',
    // 'virDomainGetControlInfo', Error: Type 'virDomainControlInfoPtr' is not mapped to a napi type
    // 'virDomainGetDiskErrors', Error: Type 'virDomainDiskErrorPtr' is not mapped to a napi type
    // 'virDomainGetEmulatorPinInfo', Error: Type 'unsigned char *' is not mapped to a napi type
    // 'virDomainGetFSInfo', Error: Type 'virDomainFSInfoPtr **' is not mapped to a napi type
    // 'virDomainGetGuestVcpus', Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    'virDomainGetHostname',
    // 'virDomainGetIOThreadInfo', Error: Type 'virDomainIOThreadInfoPtr **' is not mapped to a napi type
    // 'virDomainGetInfo', Error: Type 'virDomainInfoPtr' is not mapped to a napi type
    // 'virDomainGetInterfaceParameters', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainGetJobInfo', Error: Type 'virDomainJobInfoPtr' is not mapped to a napi type
    // 'virDomainGetJobStats', Error: Type 'int *' is not mapped to a napi type
    'virDomainGetMaxMemory',
    'virDomainGetMaxVcpus',
    // 'virDomainGetMemoryParameters', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainGetMetadata',
    'virDomainGetName',
    // 'virDomainGetNumaParameters', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainGetPerfEvents', Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virDomainGetSchedulerParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainGetSchedulerParametersFlags', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainGetSchedulerType', Error: Type 'int *' is not mapped to a napi type
    // 'virDomainGetSecurityLabel', Error: Type 'int *' is not mapped to a napi type
    // 'virDomainGetSecurityLabelList', Error: Type 'virSecurityLabelPtr *' is not mapped to a napi type
    // 'virDomainGetState', Error: Type 'int *' is not mapped to a napi type
    // 'virDomainGetTime', Error: Type 'long long *' is not mapped to a napi type
    // 'virDomainGetUUID', Error: Type 'unsigned char *' is not mapped to a napi type
    'virDomainGetUUIDString',
    // 'virDomainGetVcpuPinInfo', Error: Type 'unsigned char *' is not mapped to a napi type
    // 'virDomainGetVcpus', Error: Type 'unsigned char *' is not mapped to a napi type
    'virDomainGetXMLDesc',
    'virDomainHasCurrentSnapshot',
    'virDomainHasManagedSaveImage',
    // 'virDomainIOThreadInfoFree', Error: Type 'virDomainIOThreadInfoPtr' is not mapped to a napi type
    'virDomainInjectNMI',
    // 'virDomainInterfaceAddresses', Error: Type 'virDomainInterfacePtr **' is not mapped to a napi type
    // 'virDomainInterfaceFree', Error: Type 'virDomainInterfacePtr' is not mapped to a napi type
    // 'virDomainInterfaceStats', Error: Type 'virDomainInterfaceStatsPtr' is not mapped to a napi type
    'virDomainIsActive',
    'virDomainIsPersistent',
    'virDomainIsUpdated',
    'virDomainListAllSnapshots',
    // 'virDomainListGetStats', Error: Type 'virDomainPtr *' is not mapped to a napi type
    'virDomainLookupByID',
    // 'virDomainLookupByUUID', Error: Type 'const unsigned char *' is not mapped to a napi type
    'virDomainLookupByUUIDString',
    'virDomainManagedSave',
    'virDomainManagedSaveDefineXML',
    'virDomainManagedSaveGetXMLDesc',
    'virDomainManagedSaveRemove',
    // 'virDomainMemoryPeek', Error: Type 'size_t' is not mapped to a napi type
    // 'virDomainMemoryStats', Error: Type 'virDomainMemoryStatPtr' is not mapped to a napi type
    'virDomainMigrate',
    'virDomainMigrate2',
    // 'virDomainMigrate3', Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainMigrateGetCompressionCache', // Error: Type 'unsigned long long *' is not mapped to a napi type
    // 'virDomainMigrateGetMaxDowntime', // Error: Type 'unsigned long long *' is not mapped to a napi type
    // 'virDomainMigrateGetMaxSpeed', // Error: Type 'unsigned long *' is not mapped to a napi type
    'virDomainMigrateSetCompressionCache',
    'virDomainMigrateSetMaxDowntime',
    'virDomainMigrateSetMaxSpeed',
    'virDomainMigrateStartPostCopy',
    'virDomainMigrateToURI',
    'virDomainMigrateToURI2',
    // 'virDomainMigrateToURI3', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainOpenChannel',
    'virDomainOpenConsole',
    'virDomainOpenGraphics',
    'virDomainOpenGraphicsFD',
    // 'virDomainPinEmulator', // Error: Type 'unsigned char *' is not mapped to a napi type
    // 'virDomainPinIOThread', // Error: Type 'unsigned char *' is not mapped to a napi type
    // 'virDomainPinVcpu', // Error: Type 'unsigned char *' is not mapped to a napi type
    // 'virDomainPinVcpuFlags', // Error: Type 'unsigned char *' is not mapped to a napi type
    'virDomainPMSuspendForDuration',
    'virDomainPMWakeup',
    'virDomainReboot',
    'virDomainRef',
    'virDomainRename',
    'virDomainReset',
    'virDomainRestore',
    'virDomainRestoreFlags',
    'virDomainResume',
    'virDomainRevertToSnapshot',
    'virDomainSave',
    'virDomainSaveFlags',
    'virDomainSaveImageDefineXML',
    'virDomainSaveImageGetXMLDesc',
    'virDomainScreenshot',
    // 'virDomainSendKey', // Error: Type 'unsigned int *' is not mapped to a napi type
    'virDomainSendProcessSignal',
    'virDomainSetAutostart',
    // 'virDomainSetBlkioParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainSetBlockIoTune', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainSetBlockThreshold',
    'virDomainSetGuestVcpus',
    // 'virDomainSetInterfaceParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainSetLifecycleAction',
    'virDomainSetMaxMemory',
    'virDomainSetMemory',
    'virDomainSetMemoryFlags',
    // 'virDomainSetMemoryParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainSetMemoryStatsPeriod',
    'virDomainSetMetadata',
    // 'virDomainSetNumaParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainSetPerfEvents', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainSetSchedulerParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virDomainSetSchedulerParametersFlags', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virDomainSetTime',
    'virDomainSetUserPassword',
    'virDomainSetVcpu',
    'virDomainSetVcpus',
    'virDomainSetVcpusFlags',
    'virDomainShutdown',
    'virDomainShutdownFlags',
    'virDomainSnapshotCreateXML',
    'virDomainSnapshotCurrent',
    'virDomainSnapshotDelete',
    'virDomainSnapshotFree',
    'virDomainSnapshotGetConnect',
    'virDomainSnapshotGetDomain',
    'virDomainSnapshotGetName',
    'virDomainSnapshotGetParent',
    'virDomainSnapshotGetXMLDesc',
    'virDomainSnapshotHasMetadata',
    'virDomainSnapshotIsCurrent',
    'virDomainSnapshotListAllChildren',
    // 'virDomainSnapshotListChildrenNames', // Error: Type 'char **' is not mapped to a napi type
    // 'virDomainSnapshotListNames', // Error: Type 'char **' is not mapped to a napi type
    'virDomainSnapshotLookupByName',
    'virDomainSnapshotNum',
    'virDomainSnapshotNumChildren',
    'virDomainSnapshotRef',
    // 'virDomainStatsRecordListFree', // Error: Type 'virDomainStatsRecordPtr *' is not mapped to a napi type
    'virDomainSuspend',
    'virDomainUndefine',
    'virDomainUndefineFlags',
    'virDomainUpdateDeviceFlags',
    // 'virEventAddHandle', // Error: Type 'virEventHandleCallback' is not mapped to a napi type
    // 'virEventAddTimeout', // Error: Type 'virEventTimeoutCallback' is not mapped to a napi type
    'virEventRegisterDefaultImpl',
    // 'virEventRegisterImpl', // Error: Type 'virEventAddHandleFunc' is not mapped to a napi type
    'virEventRemoveHandle',
    'virEventRemoveTimeout',
    'virEventRunDefaultImpl',
    // 'virEventUpdateHandle', // Error: Type 'void' is not mapped to a napi type
    // 'virEventUpdateTimeout', // Error: Type 'void' is not mapped to a napi type
    // 'virFreeError', // Error: Type 'virErrorPtr' is not mapped to a napi type
    // 'virGetLastError', // Error: Type 'virErrorPtr' is not mapped to a napi type
    'virGetLastErrorMessage',
    // 'virGetVersion', // Error: Type 'unsigned long *' is not mapped to a napi type
    'virInitialize',
    'virInterfaceChangeBegin',
    'virInterfaceChangeCommit',
    'virInterfaceChangeRollback',
    'virInterfaceCreate',
    'virInterfaceDefineXML',
    'virInterfaceDestroy',
    'virInterfaceFree',
    'virInterfaceGetConnect',
    'virInterfaceGetMACString',
    'virInterfaceGetName',
    'virInterfaceGetXMLDesc',
    'virInterfaceIsActive',
    'virInterfaceLookupByMACString',
    'virInterfaceLookupByName',
    'virInterfaceRef',
    'virInterfaceUndefine',
    'virNetworkCreate',
    'virNetworkCreateXML',
    'virNetworkDefineXML',
    'virNetworkDestroy',
    // 'virNetworkDHCPLeaseFree', // Error: Type 'virNetworkDHCPLeasePtr' is not mapped to a napi type
    'virNetworkFree',
    // 'virNetworkGetAutostart', // Error: Type 'int *' is not mapped to a napi type
    'virNetworkGetBridgeName',
    'virNetworkGetConnect',
    // 'virNetworkGetDHCPLeases', // Error: Type 'virNetworkDHCPLeasePtr **' is not mapped to a napi type
    'virNetworkGetName',
    // 'virNetworkGetUUID', // Error: Type 'unsigned char *' is not mapped to a napi type
    'virNetworkGetUUIDString',
    'virNetworkGetXMLDesc',
    'virNetworkIsActive',
    'virNetworkIsPersistent',
    'virNetworkLookupByName',
    // 'virNetworkLookupByUUID', // Error: Type 'const unsigned char *' is not mapped to a napi type
    'virNetworkLookupByUUIDString',
    'virNetworkRef',
    'virNetworkSetAutostart',
    'virNetworkUndefine',
    'virNetworkUpdate',
    // 'virNodeAllocPages', // Error: Type 'unsigned int *' is not mapped to a napi type
    'virNodeDeviceCreateXML',
    'virNodeDeviceDestroy',
    'virNodeDeviceDetachFlags',
    'virNodeDeviceDettach',
    'virNodeDeviceFree',
    'virNodeDeviceGetName',
    'virNodeDeviceGetParent',
    'virNodeDeviceGetXMLDesc',
    // 'virNodeDeviceListCaps', // Error: Type 'char ** const' is not mapped to a napi type
    'virNodeDeviceLookupByName',
    'virNodeDeviceLookupSCSIHostByWWN',
    'virNodeDeviceNumOfCaps',
    'virNodeDeviceReAttach',
    'virNodeDeviceRef',
    'virNodeDeviceReset',
    // 'virNodeGetCellsFreeMemory', // Error: Type 'unsigned long long *' is not mapped to a napi type
    // 'virNodeGetCPUMap', // Error: Type 'unsigned char **' is not mapped to a napi type
    // 'virNodeGetCPUStats', // Error: Type 'virNodeCPUStatsPtr' is not mapped to a napi type
    'virNodeGetFreeMemory',
    // 'virNodeGetFreePages', // Error: Type 'unsigned int *' is not mapped to a napi type
    // 'virNodeGetInfo', // Error: Type 'virNodeInfoPtr' is not mapped to a napi type
    // 'virNodeGetMemoryParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virNodeGetMemoryStats', // Error: Type 'virNodeMemoryStatsPtr' is not mapped to a napi type
    // 'virNodeGetSecurityModel', // Error: Type 'virSecurityModelPtr' is not mapped to a napi type
    // 'virNodeListDevices', // Error: Type 'char ** const' is not mapped to a napi type
    'virNodeNumOfDevices',
    // 'virNodeSetMemoryParameters', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    'virNodeSuspendForDuration',
    'virNWFilterDefineXML',
    'virNWFilterFree',
    'virNWFilterGetName',
    // 'virNWFilterGetUUID', // Error: Type 'unsigned char *' is not mapped to a napi type
    'virNWFilterGetUUIDString',
    'virNWFilterGetXMLDesc',
    'virNWFilterLookupByName',
    // 'virNWFilterLookupByUUID', // Error: Type 'const unsigned char *' is not mapped to a napi type
    'virNWFilterLookupByUUIDString',
    'virNWFilterRef',
    'virNWFilterUndefine',
    // 'virResetError', // Error: Type 'virErrorPtr' is not mapped to a napi type
    // 'virResetLastError', // Error: Type 'void' is not mapped to a napi type
    // 'virSaveLastError', // Error: Type 'virErrorPtr' is not mapped to a napi type
    'virSecretDefineXML',
    'virSecretFree',
    'virSecretGetConnect',
    'virSecretGetUsageID',
    'virSecretGetUsageType',
    // 'virSecretGetUUID', // Error: Type 'unsigned char *' is not mapped to a napi type
    'virSecretGetUUIDString',
    // 'virSecretGetValue', // Error: Type 'size_t *' is not mapped to a napi type
    'virSecretGetXMLDesc',
    'virSecretLookupByUsage',
    // 'virSecretLookupByUUID', // Error: Type 'const unsigned char *' is not mapped to a napi type
    'virSecretLookupByUUIDString',
    'virSecretRef',
    // 'virSecretSetValue', // Error: Type 'const unsigned char *' is not mapped to a napi type
    'virSecretUndefine',
    // 'virSetErrorFunc', // Error: Type 'void *' is not mapped to a napi type
    'virStoragePoolBuild',
    'virStoragePoolCreate',
    'virStoragePoolCreateXML',
    'virStoragePoolDefineXML',
    'virStoragePoolDelete',
    'virStoragePoolDestroy',
    'virStoragePoolFree',
    // 'virStoragePoolGetAutostart', // Error: Type 'int *' is not mapped to a napi type
    'virStoragePoolGetConnect',
    // 'virStoragePoolGetInfo', // Error: Type 'virStoragePoolInfoPtr' is not mapped to a napi type
    'virStoragePoolGetName',
    // 'virStoragePoolGetUUID', // Error: Type 'unsigned char *' is not mapped to a napi type
    'virStoragePoolGetUUIDString',
    'virStoragePoolGetXMLDesc',
    'virStoragePoolIsActive',
    'virStoragePoolIsPersistent',
    'virStoragePoolListAllVolumes',
    // 'virStoragePoolListVolumes', // Error: Type 'char ** const' is not mapped to a napi type
    'virStoragePoolLookupByName',
    'virStoragePoolLookupByTargetPath',
    // 'virStoragePoolLookupByUUID', // Error: Type 'const unsigned char *' is not mapped to a napi type
    'virStoragePoolLookupByUUIDString',
    'virStoragePoolLookupByVolume',
    'virStoragePoolNumOfVolumes',
    'virStoragePoolRef',
    'virStoragePoolRefresh',
    'virStoragePoolSetAutostart',
    'virStoragePoolUndefine',
    'virStorageVolCreateXML',
    'virStorageVolCreateXMLFrom',
    'virStorageVolDelete',
    'virStorageVolDownload',
    'virStorageVolFree',
    'virStorageVolGetConnect',
    // 'virStorageVolGetInfo', // Error: Type 'virStorageVolInfoPtr' is not mapped to a napi type
    // 'virStorageVolGetInfoFlags', // Error: Type 'virStorageVolInfoPtr' is not mapped to a napi type
    'virStorageVolGetKey',
    'virStorageVolGetName',
    'virStorageVolGetPath',
    'virStorageVolGetXMLDesc',
    'virStorageVolLookupByKey',
    'virStorageVolLookupByName',
    'virStorageVolLookupByPath',
    'virStorageVolRef',
    'virStorageVolResize',
    'virStorageVolUpload',
    'virStorageVolWipe',
    'virStorageVolWipePattern',
    'virStreamAbort',
    // 'virStreamEventAddCallback', // Error: Type 'virStreamEventCallback' is not mapped to a napi type
    'virStreamEventRemoveCallback',
    'virStreamEventUpdateCallback',
    'virStreamFinish',
    'virStreamFree',
    'virStreamNew',
    // 'virStreamRecv', // Error: Type 'size_t' is not mapped to a napi type
    // 'virStreamRecvAll', // Error: Type 'virStreamSinkFunc' is not mapped to a napi type
    // 'virStreamRecvFlags', // Error: Type 'size_t' is not mapped to a napi type
    // 'virStreamRecvHole', // Error: Type 'long long *' is not mapped to a napi type
    'virStreamRef',
    // 'virStreamSend', // Error: Type 'size_t' is not mapped to a napi type
    // 'virStreamSendAll', // Error: Type 'virStreamSourceFunc' is not mapped to a napi type
    'virStreamSendHole',
    // 'virStreamSparseRecvAll', // Error: Type 'virStreamSinkFunc' is not mapped to a napi type
    // 'virStreamSparseSendAll', // Error: Type 'virStreamSourceFunc' is not mapped to a napi type
    // 'virTypedParamsAddBoolean', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddDouble', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddFromString', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddInt', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddLLong', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddString', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddStringList', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddUInt', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsAddULLong', // Error: Type 'virTypedParameterPtr *' is not mapped to a napi type
    // 'virTypedParamsClear', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsFree', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGet', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetBoolean', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetDouble', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetInt', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetLLong', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetString', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetUInt', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type
    // 'virTypedParamsGetULLong', // Error: Type 'virTypedParameterPtr' is not mapped to a napi type

]);

module.exports = {
    whitelist,
};