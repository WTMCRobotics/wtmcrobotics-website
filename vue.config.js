module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "WTMC Robotics",
    themeColor: "#C20312",
    msTileColor: "#C20312",
    manifestOptions: {
      display: "browser",
      icons: [
        {
          src: "./img/icons/monochrome.svg",
          type: "image/svg+xml",
          purpose: "monochrome",
        },
        {
          src: "./img/icons/monochrome-24x24.png",
          sizes: "24x24",
          type: "image/png",
          purpose: "monochrome",
        },
        {
          src: "./img/icons/monochrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "monochrome",
        },
        {
          src: "./img/icons/round-192x192.webp",
          sizes: "192x192",
          type: "image/webp",
          purpose: "any",
        },
        {
          src: "./img/icons/round-512x512.webp",
          sizes: "512x512",
          type: "image/webp",
          purpose: "any",
        },
        {
          src: "./img/icons/round-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "./img/icons/round-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "./img/icons/round-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "./img/icons/maskable-192x192.webp",
          sizes: "192x192",
          type: "image/webp",
          purpose: "maskable",
        },
        {
          src: "./img/icons/maskable-512x512.webp",
          sizes: "512x512",
          type: "image/webp",
          purpose: "maskable",
        },
      ],
    },
    iconPaths: {
      faviconSVG: "img/icons/favicon.svg",
      favicon48: "img/icons/favicon-48x48.png",
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: null,
      maskIcon: "img/icons/monochrome.svg",
      msTileImage: "img/icons/round-144x144.png",
    },
    assetsVersion: "1",
  },
};
