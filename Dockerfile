FROM node:12

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y build-essential curl

RUN apt-get install -y libgnutls28-dev
RUN apt-get install -y libxml2-utils
RUN apt-get install -y xsltproc
RUN apt-get install -y python-pip
RUN pip install rst2html5

ENV LD_LIBRARY_PATH=/usr/src/libvirt-vroot/lib
ENV PKG_CONFIG_PATH=/usr/src/libvirt-vroot/lib/pkgconfig
ENV LIBVIRT=5.6.0
ENV EXT=xz
WORKDIR /usr/src
RUN curl -s https://libvirt.org/sources/libvirt-${LIBVIRT}.tar.${EXT} | tar xJ

WORKDIR /usr/src/libvirt-${LIBVIRT}/build
RUN ../configure \
    --prefix=/usr/src/libvirt-vroot \
    --without-libvirtd \
    --without-esx \
    --without-vbox \
    --without-libxl \
    --without-qemu \
    --without-lxc \
    --without-hyperv \
    --without-macvtap \
    --disable-werror
RUN make -j3
RUN make install

WORKDIR /usr/src
COPY package.json .
COPY package-lock.json .
RUN npm install --ignore-scripts
COPY . .
RUN npm install
RUN npm run build
RUN npm test

