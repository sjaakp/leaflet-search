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
 * @link https://developer.tomtom.com/search-api-and-extended-search-api/search-api-and-extended-search-api-documentation-geocoding/geocode
 */
L.geo.TomTom = L.geo.Geocoder.extend({
    url: 'https://api.tomtom.com/search/2/geocode/',

    suggestions: [],

    datalist: null,

    mark(place) {
        const pos = place.position,
            latlng = L.latLng(pos.lat, pos.lon),
            mapv = place.viewport,
            tl = mapv.topLeftPoint,
            br = mapv.btmRightPoint,
            bbox = L.latLngBounds([tl.lat, br.lon], [br.lat, tl.lon]);
        this.placeMarker(latlng, bbox, place);
    },

    fetchResults(address, options = {})  {
        const query = encodeURIComponent(address),
            url = this.constructUrl(`${this.url}${query}.json`, options);

        return this.fetchJson(url)
            .then(json => {
                if (json.summary.numResults < 1) throw('notfound');
                return json.results;
            })
    },

    suggest(address, datalist)  {
        this.datalist = datalist;
        this.fetchResults(address,{ typeahead: true })
            .then(results => {
                this.suggestions = results;
                datalist.innerHTML = results.reduce((a, v) => a + `<option data-id="${v.id}">${v.address.freeformAddress}</option>`, '');
            })
            .catch(error => this.fire(error));
    },

    lookup(id)  {
        const found = this.suggestions.find(v => v.id === id);
        if (found) this.mark(found);
    },

    geocode(address)    {
        this.fetchResults(address)
            .then(results => results.shift())
            .then(place => this.mark(place))
            .catch(error => this.fire(error));
    }
});
