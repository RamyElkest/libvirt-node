{
  "targets": [
    {
      "target_name": "libvirt",
      'product_prefix': 'lib',
      "sources": [ 
        'generated/libvirt.c',
        'generated/connect.c',
        'generated/domain.c',
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
