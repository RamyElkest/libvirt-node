const { whitelist } = require('../src/whitelist');
const { libvirt_parser } = require('../src/parser');

/** Copied from libvirt-python's sanitytest.py **/
function ignore(name) {
    if(name.startsWith('virTypedParams') ||
       name.startsWith('virNetworkDHCPLeaseFree') ||
       name.startsWith('virDomainStatsRecordListFree') ||
       name.startsWith('virDomainFSInfoFree') ||
       name.startsWith('virDomainIOThreadInfoFree') ||
       name.startsWith('virDomainInterfaceFree'))
    {
        return true;
    }
    if(["virConnectAuthCallbackPtr", "virConnectCloseFunc",
        "virStreamSinkFunc", "virStreamSourceFunc", "virStreamEventCallback",
        "virEventHandleCallback", "virEventTimeoutCallback", "virFreeCallback",
        "virStreamSinkHoleFunc", "virStreamSourceHoleFunc", "virStreamSourceSkipFunc"]
        .includes(name))
    {
        return true;
    }
    if(name.endsWith('Callback')) {
        if(name.startsWith('virConnectDomainEvent') ||
           name.startsWith('virConnectNetworkEvent') ||
           name.startsWith('virConnectStoragePoolEvent') ||
           name.startsWith('virConnectNodeDeviceEvent') ||
           name.startsWith('virConnectSecretEvent'))
        {
            return true;
        }
    }
    if(name.startsWith('virEvent') && name.endsWith('Func')){
        return true;
    }

    return false;
}

((parser) => {
    let allowed = [],
        skipped = [];

    Object.values(parser.functions).forEach(func => {
        if(ignore(func.name))
            return;

        if(whitelist.has(func.name)) {
            allowed.push(func);
        } else {
            skipped.push(func);
        }
    });

    // skipped.forEach(func => console.log(func.name));

    console.log(`${allowed.length}/${allowed.length + skipped.length} implemented`);
    console.log(`${allowed.length * 100 / (allowed.length + skipped.length)}%`);
})(libvirt_parser);
