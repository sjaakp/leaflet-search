leaflet-search
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

Apart from Leaflet itself, **Leaflet-search** has absolutely no dependencies. 
There is no need to load jQuery or other libraries (though it won't hurt).

## Usage ##

A minimum HTML page with a **Leaflet-search** would look something like this:

	<html>
	<head>
        <link href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" rel="stylesheet">
	</head>
	<body>

		<div id="m"></div>

		<script src="//unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
		<script src="leaflet-search.js"></script>

		<script>
			var map = L.map("m" /* , { ... map options ... } */);
			map.geocoder('Nominatim' /* , { ... geocoder opotions ... } */);
			map.finder(/* { ... finder opotions ... } */);
		</script>
	</body>
	</html>
	
The assets for **Leaflet** are loaded, as well as those for **Leaflet-search** (a single
`js`-file). A **Leaflet** `Map` is initialized. It has gotten two new methods:

- `geocoder(<string> name, <Object> options?)` Sets the geocoder with options. Return: `this`.
- `finder(<Object> options?)` Adds the `Search`-control with options. Return: `this`.

## CDN ##

**Leaflet-search** is available on the **unpkg** Content Delivery Network, so you
don't have to host the `leaflet-search` files on your own server. In this case,
the minimum HTML page looks like this:

	<html>
	<head>
        <link href="//unpkg.com/@sjaakp/leaflet-search/dist/leaflet-search.css" rel="stylesheet">
	</head>
	<body>

		<div id="dl"></div>

		<script src="//unpkg.com/@sjaakp/leaflet-search/dist/leaflet-search.js"></script>

		<script>
			leaflet-search("dl", /* options */);
		</script>
	</body>
	</html>


