Leaflet-search
--------------
#### Search Control for Leaflet ####

**Leaflet-search** is a Search Control for the [Leaflet](https://leafletjs.com/)
open source JavaScript map library. It makes use of one of several geocoding services.

A demo of **Leaflet-search** is [here](https://sjaakpriester.nl/software/leaflet-search).

Here is **Leaflet-search**'s  [GitHub page](https://github.com/sjaakp/leaflet-search).

## Installing ##

Install **Leaflet-search** with [npm](https://www.npmjs.com/):

	npm i @sjaakp/leaflet-search

You can also manually install **Leaflet-search** by 
[downloading the source in ZIP-format](https://github.com/sjaakp/leaflet-search/archive/master.zip).

Apart from Leaflet itself, **Leaflet-search** has no dependencies. 
There is no need to load jQuery or other libraries (though it won't hurt).

## Usage ##

A minimum HTML page with a **Leaflet-search** would look something like this:

	<html>
	<head>
        <link href="//unpkg.com/leaflet/dist/leaflet.css" rel="stylesheet">
	</head>
	<body>

		<div id="m"></div>

		<script src="//unpkg.com/leaflet/dist/leaflet.js"></script>
		<script src="leaflet-search.js"></script>

		<script>
			var map = L.map("m" /* , { ... map options ... } */);
			map.setGeocoder('Nominatim' /* , { ... Geocoder options ... } */);
			map.addControl(L.control.search({ ... Search options ...}));
		</script>
	</body>
	</html>
	
The assets for **Leaflet** are loaded, as well as those for **Leaflet-search** (a single
`js`-file). A **Leaflet** `Map` is initialized. The Leaflet map now has a new method:

- **`setGeocoder(<string> name, <Object> options?)`** Set the geocoder with options. Return: `this`.

#### CDN ####

**Leaflet-search** is available on the **unpkg** Content Delivery Network, so you
don't have to host the `leaflet-search.js` file on your own server. In this case,
the **Leaflet-search** can be loaded like this:

	<script src="//unpkg.com/@sjaakp/leaflet-search/dist/leaflet-search.js"></script>

## L.Control.Search ##

**Leaflet-search** defines a new Leaflet [Control](https://leafletjs.com/reference-1.6.0.html#control): 
`L.Control.Search`. It places a button on the map, which expands to a text input field that
accepts free-form addresses.

`L.Control.Search` inherits the [`position`](https://leafletjs.com/reference-1.6.0.html#control-position)
property from `L.Control`. Following the Leaflet-habit, a new `L.Control.Search` can be created
by `L.control.search(<options>)`, so adding **Leaflet-search** to a Map boils down to:

    map.addControl(L.control.search({ position: 'bottomright' }));
    
## Geocoder ##

**Leaflet-search** retrieves its information from a *geocoding service*. The service is 
initialized by:

    map.setGeocoder('<geocoder name>', { <geocoder options> });
    
Generally, options will be empty, apart from the API Key some providers expect, and which
often can be obtained free of charge. Other options may be added.

Currently, **Leaflet-search** 
supports the following providers (there may be more in the future):

|Name|  |Required option|
|----|---|------------|
|[Nominatim](https://nominatim.org)|free, by [OpenStreetMap](https://www.openstreetmap.org/about)| |
|[GeoNames](https://geonames.org)|free|{ username: '...' } |
|[Here](https://developer.here.com/documentation/authentication/dev_guide/index.html)|commercial|{ apiKey: '...' } |
|[TomTom](https://developer.tomtom.com/search-api/search-api-documentation/)|commercial|{ key: '...' } |
|[Kadaster](https://github.com/PDOK/locatieserver/wiki/API-Locatieserver)|Netherlands only| |

Notice that some providers may stipulate that you should use their service only on map
tiles of the same provider.

If you don't explicitly set a geocoder, **Leaflet-search** uses *Nominatim*.
