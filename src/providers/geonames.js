/**
 * sjaakp/leaflet-search
 * ----------
 * Search Control for Leaflet
 * Version 1.0.0
 * Copyright (c) 2020
 * Sjaak Priester, Amsterdam
 * MIT License
 * https://github.com/sjaakp/leaflet-search
 * https://sjaakpriester.nl
 */

/**
 * Topological names only; no streets
 * @link http://www.geonames.org/export/geonames-search.html
 */
L.geo.GeoNames = L.geo.Geocoder.extend({
    url: 'http://api.geonames.org/search',  // no https!

    fetchGeonames(url)  {
        return this.fetchJson(url)
            .then(json => {
                const geonames = json.geonames;
                if (! geonames || geonames.length < 1) throw 'notfound';
                return geonames;
            })
    },

    mark(place) {
        const latlng = L.latLng(place.lat, place.lng),
            bb = place.bbox,
            bbox = L.latLngBounds([bb.north, bb.west], [bb.south, bb.east]);
        this.placeMarker(latlng, bbox, place);
    },

    suggest(address, datalist)    {
        const url = this.constructUrl(this.url, { q: address, type: 'json', style: 'short' });

        this.fetchGeonames(url)
            .then(geonames => {
                datalist.innerHTML = geonames.reduce((a, v) => a + `<option data-id="${v.geonameId}">${v.name}&emsp;${v.countryCode}</option>`, '');
            })
            .catch(error => this.fire(error));
    },

    lookup(id)  {
        const url = this.constructUrl('http://api.geonames.org/getJSON', { geonameId: id });

        this.fetchJson(url)
            .then(json => this.mark(json))
            .catch(error => this.fire(error));
    },

    geocode(address)    {
        const url = this.constructUrl(this.url, { q: address, inclBbox: true });

        this.fetchGeonames(url)
            .then(geonames => geonames.shift())
            .then(place => this.mark(place))
            .catch(error => this.fire(error));
    }
});
