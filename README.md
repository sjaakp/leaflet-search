leaflet-search
--------------
#### Search Control for Leaflet ####

**Leaflet-search** is ...

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
        <link href="/dist/leaflet-search.css" rel="stylesheet">
	</head>
	<body>

		<div id="dl"></div>

		<script src="/dist/leaflet-search.js"></script>

		<script>
			leaflet-search("dl", /* options */);
		</script>
	</body>
	</html>

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


