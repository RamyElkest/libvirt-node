FROM node:8
ENV LD_LIBRARY_PATH=/usr/src/libvirt-vroot/lib
ENV PKG_CONFIG_PATH=/usr/src/libvirt-vroot/lib/pkgconfig
ENV LIBVIRT=3.6.0
ENV EXT=xz
WORKDIR /usr/src
RUN echo "deb http://security.debian.org/ jessie/updates main contrib" >> /etc/apt/sources.list && \
  echo "deb-src http://security.debian.org/ jessie/updates main contrib" >> /etc/apt/sources.list && \
  apt-get update -y && apt-get upgrade -y && \
  apt-get install -y build-essential curl && \
  curl -O -s https://libvirt.org/sources/libvirt-${LIBVIRT}.tar.${EXT} && \
  tar -xf libvirt-${LIBVIRT}.tar.${EXT} && \
  cd libvirt-${LIBVIRT} && \
  ./configure --prefix=`pwd`/../libvirt-vroot \
    --without-libvirtd \
    --without-esx \
    --without-vbox \
    --without-libxl \
    --without-xen \
    --without-qemu \
    --without-lxc \
    --without-hyperv \
    --without-macvtap \
    --disable-werror && \
  make -j3 && \
  make install
COPY . .
RUN make && make check

