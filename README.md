# AFITop100Streaming

A quick NodeJS/Express page that scrapes JustWatch.com to discover & display which of the films on the AFI Top 100 are currently streaming and where.

## How to Load

* Download NodeJS (this was created & tested on v8.16.2)
https://nodejs.org/en/
* Either use Git to clone the repository or download the ZIP from `Clone or download` button above
* Open Terminal (MacOS) or Command Line (Windows) and change directories to the folder where you've downloaded (and unzipped) your files
* Run `npm install` to install the project's Node dependencies (this only needs to be performed once, and will create a `node_modules` directory in your current folder)
* Once the installation completes, run `node app.js` to run the application and start the Express server
* Navigate to `http://localhost:9000` in a browser and you're done!

## Data Sources Caveat

All data is currently being scraped from JustWatch.com, & subject to their set of data which may be incorrect or out of date.

This project was created as an educational coding exercise to help me expand my skillset, as well as a fun activity to share with the Unspooled Podcast community.

I do not own the rights to the data being used to populate this application. This code should not be used in any way that re-purposes itself for monetization.
