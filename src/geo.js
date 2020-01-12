
L.geo = {
    Geocoder: L.Class.extend({
        initialize: function (map, options) {
            this._map = map;
            L.setOptions(this, options);
        },

        constructUrl(text, options = {})  {
            const opts = Object.assign({}, this.options, options),
                url = new URL(text);
            for (const k in opts)   {
                url.searchParams.set(k, opts[k]);
            }
            return url;
        },

        fetchJson(url)  {
            return fetch(url.href)
                .then(response => response.json())
        },

        placeMarker(latlng, bbox)   {
            this._map.placeMarker(latlng, bbox);
        },

        fire(err)   {
            this._map.fire(err);
        },

        suggest(address, datalist)    {
        },

        lookup(id)  {
        }
    })
};
