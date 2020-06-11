import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";

const gsi = {};

gsi.getTileLayer = function () {
  // set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
  return L.tileLayer(
    "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    {
      attribution:
        '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
      maxZoom: 18,
    },
  );
};

export { L, gsi };
