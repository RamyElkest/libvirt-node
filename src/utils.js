/**
 * Converts a C libvirt function name into a JS class member function name 
 *
 * This avoids a collision in names
 *
 * @param {string} C libvirt function name
 * @return {string} interface function name
 */
function getInterfaceName(funcName) {
    fixedName = funcName;
    if(funcName.startsWith("virNetworkDefine")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virNetworkCreateXML")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virNetworkLookup")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virInterfaceDefine")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virInterfaceCreateXML")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virInterfaceLookup")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virSecretDefine")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virSecretLookup")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virNWFilterDefine")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 3).toLowerCase() + fixedName.substring(3);
    }
    else if(funcName.startsWith("virNWFilterLookup")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 3).toLowerCase() + fixedName.substring(3);
    }
    else if(funcName.startsWith("virStoragePoolDefine")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virStoragePoolCreateXML")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virStoragePoolLookup")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virStorageVolDefine")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virStorageVolLookup")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainGetCPUStats")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainGetIOThreadInfo")) {
        fixedName = funcName.substring(12);
        fixedName = fixedName.substring(0, 2).toLowerCase() + fixedName.substring(2);
    }
    else if(funcName.startsWith("virDomainGetFSInfo")) {
        fixedName = funcName.substring(12);
        fixedName = fixedName.substring(0, 2).toLowerCase() + fixedName.substring(2);
    }
    else if(funcName.startsWith("virDomainSnapshotLookupByName")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainSnapshotListNames")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainSnapshotNumChildren")) {
        fixedName = funcName.substring(17);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainSnapshotNum")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainSnapshotCreateXML")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainSnapshotCurrent")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomainSnapshot")) {
        fixedName = funcName.substring(17);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virDomain")) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virNetwork")) {
        fixedName = funcName.substring(10);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virInterface")) {
        fixedName = funcName.substring(12);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith('virSecret')) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith('virNWFilter')) {
        fixedName = funcName.substring(11);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith('virStreamNew')) {
        fixedName = "newStream";
    }
    else if(funcName.startsWith('virStream')) {
        fixedName = funcName.substring(9);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virStoragePool")) {
        fixedName = funcName.substring(14);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virStorageVol")) {
        fixedName = funcName.substring(13);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virNodeDevice")) {
        fixedName = funcName.substring(13);
        fixedName = funcName.substring(0, 1).toLowerCase() + funcName.substring(14);
    }
    else if(funcName.startsWith("virNode")) {
        fixedName = funcName.substring(7);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("virConnect")) {
        fixedName = funcName.substring(10);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }
    else if(funcName.startsWith("xml")) {
        fixedName = funcName.substring(3);
        fixedName = fixedName.substring(0, 1).toLowerCase() + fixedName.substring(1);
    }

    return fixedName;
}

module.exports = {
    getInterfaceName,
};