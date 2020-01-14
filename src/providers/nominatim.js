
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
 * @link https://nominatim.org/release-docs/develop/api/Search/
 */
L.geo.Nominatim = L.geo.Geocoder.extend({
    url: 'https://nominatim.openstreetmap.org/',

    mark(place) {
        const latlng = L.latLng(place.lat, place.lon),
            bb = place.boundingbox,
            bbox = L.latLngBounds([bb[0], bb[2]], [bb[1], bb[3]]);
        this.placeMarker(latlng, bbox, place);
    },

    search(address) {
        const url = this.constructUrl(this.url + 'search', { format: 'json', q: address });
        return this.fetchJson(url)
    },

    suggest(address, datalist)    {
        // const url = this.constructUrl(this.url + 'search', { format: 'json', q: address });
        this.search(address)
            .then(json => {
                // console.log(json);
                datalist.innerHTML = json.reduce((a, v) => a + `<option data-id="${v.osm_type.charAt(0).toUpperCase()}${v.osm_id}">${v.display_name}</option>`, '');
            })
            .catch(error => this.fire(error));
    },

    lookup(id)  {
        const url = this.constructUrl(this.url + 'reverse', {
            format: 'json',
            osm_type: id.charAt(0),
            osm_id: id.slice(1)
        });
        this.fetchJson(url)
            .then(json => this.mark(json))
            .catch(error => this.fire(error));
    },

    geocode(address)    {
        // fetch('//nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address))
        //     .then(response => response.json())
        this.search(address)
            .then(json => {
                if (json.length < 1) throw('notfound');
                return json[0];
            })
            .then(place => this.mark(place))
            .catch(error => this.fire(error));
    }
});
