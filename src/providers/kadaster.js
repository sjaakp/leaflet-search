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
 * Netherlands
 * @link https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 */
L.geo.Kadaster = L.geo.Geocoder.extend({
    url: 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/',

    mark(place) {
        this.placeMarker(place.centroide_ll.match(/[\d.]+/g).reverse(), null, place);
    },

    suggest(address, datalist)  {
        const url = this.constructUrl(this.url + 'suggest', { q: address + ' and -type:postcode' });
        this.fetchJson(url)
            .then(json => {
                if (json.response.numFound < 1) throw('notfound');
                return json.highlighting;
            })
            .then(hilight => {
                let html = '';
                for (const id in hilight) {
                    const opt = `<option data-id="${id}">${hilight[id].suggest.shift()}</option>`;
                    html += opt;
                }
                datalist.innerHTML = html;
            })
            .catch(error => this.fire(error));
    },

    lookup(id)  {
        const url = this.constructUrl(this.url + 'lookup', { id: id });
        this.fetchJson(url)
            .then(json => json.response.docs.shift())
            .then(place => this.mark(place))
            .catch(error => this.fire(error));
    },

    geocode(address)    {
        const url = this.constructUrl(this.url + 'free', { q: address + ' and -type:postcode' });
        this.fetchJson(url)
            .then(json => {
                if (json.response.numFound < 1) throw('notfound');
                return json.response.docs.shift();
            })
            .then(place => this.mark(place))
            .catch(error => this.fire(error));
    }
});
