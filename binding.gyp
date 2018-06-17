{
  "targets": [
    {
      "target_name": "libvirt",
      'product_prefix': 'lib',
      "sources": [ "src/libvirt.c" ],
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
