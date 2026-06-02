import esriConfig from 'https://js.arcgis.com/4.27/@arcgis/core/config.js'
import WebMap from 'https://js.arcgis.com/4.27/@arcgis/core/WebMap.js'
import MapView from 'https://js.arcgis.com/4.27/@arcgis/core/views/MapView.js'
import * as urlUtils from "https://js.arcgis.com/4.27/@arcgis/core/core/urlUtils.js";

import ActionBar from './ActionBar.js'
import MapTheme from './MapTheme.js'
import * as OAuth2 from './OAuth2.js'
import { initTimeSlider, waveLayer } from './dmi.js'

const urlAPI = 'https://high-plating-184911.appspot.com/'

urlUtils.addProxyRule({
  urlPrefix: "http://mapserv.dmi.dk:6081/ZoombareKort/map",
  proxyUrl: `${urlAPI}forecasts/dmi/maps`
});

//esriConfig.apiKey = 'AAPKf28ba4fdd1e945a1be5f8d43dbd650eaMjyiDjdFXaCPZzo5erYJ7Xc7XKvBlbJZIPvNu0O2zwfeFiGhqoBvtQwJUZ1DMXIL'
const portal = await OAuth2.authenticate() //Authenticate with named user using OAuth2

const webmapId = 'ed9c982d0d4d4dcf8415d3c46e20c4c7' // Publicly available webmap

const theme = new MapTheme() // Contains light and dark basemap

const waves = waveLayer()

const map = new WebMap({
  portalItem: {
    id: webmapId
  }
});

map.layers.add(waves)

const view = new MapView({
  map,
  container: "viewDiv",
  padding: {
    left: 49
  },
  spatialReference: {
    wkid: 3575
  }
});

await initTimeSlider(view)
theme.view = view

const actionBar = new ActionBar(view)

map.when(() => {
  const { title, description, thumbnailUrl, avgRating } = map.portalItem
  document.querySelector("#header-title").textContent = title
  document.querySelector("calcite-shell").hidden = false
  document.querySelector("calcite-loader").hidden = true
})
