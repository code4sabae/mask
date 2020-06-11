import util from "https://taisukef.github.io/util/util.mjs";
// import IMIEnrichmentAddress from "https://code4sabae.github.io/imi-enrichment-address-es/IMIEnrichmentAddress.mjs";
import IMIEnrichmentAddress from "../imi-enrichment-address-es/IMIEnrichmentAddress.mjs";
import { getLatLng } from "https://code4sabae.github.io/geocode/geocode.mjs";

// 福井県鯖江市北野町１丁目４−１７
// console.log(await getLatLng("福井県", "鯖江市", "北野町1"));

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7focaOfd1y3oRNRQagRdigu3u_ZkQlotI_Hrul9-O-fTfI7MWHqQ1vZWPFH7z02QsmUHrYIC05js6/pub?gid=0&single=true&output=csv";
const data = await (await fetch(url)).text();
const json = util.csv2json(util.decodeCSV(data));

Deno.writeTextFile("../sabaemask.json", JSON.stringify(json));

/*
// console.log(json);

for (const d of json) {
  const adr = await IMIEnrichmentAddress(d.住所);
  const latlng = adr.地理座標;
  if (latlng) {
    console.log(latlng.緯度 + "," + latlng.経度);
  } else {
    console.log();
  }
}

*/
