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
 * @link https://developer.here.com/documentation/geocoder/dev_guide/topics/request-constructing.html
 */
L.geo.Here = L.geo.Geocoder.extend({
    mark(place) {
        const pos = place.displayPosition,
            latlng = L.latLng(pos.latitude, pos.longitude),
            mapv = place.mapView,
            tl = mapv.topLeft,
            br = mapv.bottomRight,
            bbox = L.latLngBounds([tl.latitude, br.longitude], [br.latitude, tl.longitude]);
        this.placeMarker(latlng, bbox, place);
    },

    fetchData(options)  {
        options.jsonattributes = 1;
        const url = this.constructUrl('https://geocoder.ls.hereapi.com/6.2/geocode.json', options);
        this.fetchJson(url)
            .then(json => json.response.view.shift().result.shift())
            .then(result => this.mark(result.location))
            .catch(error => this.fire(error));
    },

    suggest(address, datalist)  {
        const url = this.constructUrl('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json', { query: address });
        this.fetchJson(url)
            .then(json => json.suggestions)
            .then(suggestions => {
                datalist.innerHTML = suggestions.reduce((a, v) => a + `<option data-id="${v.locationId}">${v.label}</option>`, '');
            })
            .catch(error => this.fire(error));
    },

    lookup(id)  {
        this.fetchData({ locationid: id });
    },

    geocode(address)    {
        this.fetchData({ searchtext: address });
    }
});
