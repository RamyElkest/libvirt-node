{
  "targets": [
    {
      "target_name": "libvirt",
      'product_prefix': 'lib',
      "sources": [ 
        'generated/libvirt.c',
        'generated/libvirt-exports.c',
        'generated/libvirt-domain.c',
        'generated/libvirt-connect.c',
        'generated/libvirt-domain-snapshot.c',
        'generated/libvirt-interface.c',
        'generated/libvirt-network.c',
        'generated/libvirt-nodedev.c',
        'generated/libvirt-nwfilter.c',
        'generated/libvirt-secret.c',
        'generated/libvirt-storage-pool.c',
        'generated/libvirt-storage-vol.c',
        'generated/libvirt-stream.c',
      ],
      'conditions': [
        ['OS!="win"', {
          'link_settings': {
            'libraries': [
              '<!@(pkg-config --libs libvirt)'
            ]
          },
          'cflags': [
            '<!@(pkg-config --cflags libvirt)'
          ],
        }]
      ],
   }
  ]
}
