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

import './geo.scss';

import './geo.js';
import './providers/nominatim.js';
import './providers/geonames.js';
import './providers/here.js';
import './providers/tomtom.js';
import './providers/kadaster.js';

import debounce from 'lodash.debounce';

L.Search = L.Control.extend({
    initialize(options) {
        L.setOptions(this, L.extend({
            debounce: 300,
            suggest: 2
        }, options));
    },

    onAdd(map)  {
        const datalistId = map.getContainer().id + '_dl';
        const container = L.DomUtil.create('div', 'geo-search');
        const input = L.DomUtil.create('input', null, container);
        input.type = 'text';
        input.setAttribute('list', datalistId);
        L.DomEvent.on(input, 'input', debounce(function(e) {
            const v = e.target.value;
            if (v.length >= this.options.suggest)  {
                map._geocoder.suggest(e.target.value, datalist);
            }
        }, this.options.debounce), this);
        L.DomEvent.on(input, 'change', function (e) {
            const val = e.target.value,
                opts = datalist.childNodes;
            e.target.value = '';
            container.classList.remove('open');
            for (let i = 0; i < opts.length; i++) {
                if (val.startsWith(opts[i].innerText)) {
                    this._geocoder.lookup(opts[i].dataset.id);
                    return;
                }
            }
            this.find(val);
        }, map);
        const button = L.DomUtil.create('button', null, container);
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>';
        button.title = 'Search';
        L.DomEvent.on(button, 'click', function(e) {
            e.preventDefault();
            this.toggle();
        }, this);
        const datalist = L.DomUtil.create('datalist', null, container);
        datalist.id = datalistId;
        return container;
    },

    toggle()  {
        const c = this.getContainer(),
            cc = c.classList,
            bOpen = cc.contains('open');
        cc.toggle('open');
        if (! bOpen)  {
            c.children[0].focus();
        }
    },
});

L.search = function(options) {
    return new L.Search(options);
};

L.Map.include({
    find(address) {
        this._geocoder.geocode(address);
        return this;
    },

    geocoder(name, options)  {
        this._geocoder = new L.geo[name](this, options);
        return this;
    },

    finder(options)  {
        return this.addControl(L.search(options));
    }
});

L.Map.addInitHook(function() {
    this.geocoder('Nominatim', {});
});
