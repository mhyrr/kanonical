---
title: Weather Needs An API
date: 2015-01-31T14:14:05.000Z
path: /weather-needs-an-api/
---

Weather really needs an API.

I've been thinking about this since I played around with [OMGEarthquake](https://twitter.com/omgearthquake) awhile back.  I had originally wanted to make a few additional OMGs for tornadoes, hurricanes, etc.  The problem was data.. I couldn't find any good sources.

To make OMGEarthquake work, I had to hit up USGS for a weirdly-formatted CSV .txt file and parse through it line by line.  Not exactly a modern standard.  They updated it sometime in 2013 and now use an Atom feed format along with a couple of other options.  

But the worst offender by far is NWS.  Here's a sample tornado warning:

      WFUS53 KICT 142213
      TORICT
      KSC169-142245-
      /O.NEW.KICT.TO.W.0011.110414T2213Z-110414T2245Z/

      BULLETIN - EAS ACTIVATION REQUESTED
      TORNADO WARNING
      NATIONAL WEATHER SERVICE WICHITA KS
      513 PM CDT THU APR 14 2011

      THE NATIONAL WEATHER SERVICE IN WICHITA HAS ISSUED A

      * TORNADO WARNING FOR...
        NORTHEASTERN SALINE COUNTY IN CENTRAL KANSAS...

      * UNTIL 545 PM CDT

      * AT 512 PM CDT...TRAINED WEATHER SPOTTERS REPORTED A FUNNEL CLOUD
        NEAR NEW CAMBRIA...OR 7 MILES EAST OF SALINA. A TORNADO MAY DEVELOP
        AT ANY TIME. DOPPLER RADAR SHOWED THIS DANGEROUS STORM MOVING NORTH
        AT 40 MPH.

      * LOCATIONS IMPACTED INCLUDE...
        NEW CAMBRIA.

      PRECAUTIONARY/PREPAREDNESS ACTIONS...

      TAKE COVER NOW. MOVE TO AN INTERIOR ROOM ON THE LOWEST FLOOR OF A
      STURDY BUILDING. AVOID WINDOWS. IF IN A MOBILE HOME...A VEHICLE OR
      OUTDOORS...MOVE TO THE CLOSEST SUBSTANTIAL SHELTER AND PROTECT
      YOURSELF FROM FLYING DEBRIS.

      &&

      LAT...LON 3895 9736 3893 9736 3892 9737 3891 9736
            3874 9736 3875 9761 3896 9761 3896 9737
      TIME...MOT...LOC 2213Z 181DEG 34KT 3885 9746
      HAIL 1.00IN

      $$

      DUNTEN
      
Literally the only people that can read and parse that is a news station.  They then get on the TV waves and say "GET IN THE BASEMENT!"  I'm not sure this constitutes state-of-the-art warning systems.  And yet, that statement is still jam-packed with good data.
 
The same is true for winter weather advisories, small craft wind advisories, etc.

Here's a winter weather advisory example.  Remember, CAPS LOCK IS CRUISE CONTROL FOR AWESOME.

      URGENT - WINTER WEATHER MESSAGE
      NATIONAL WEATHER SERVICE BINGHAMTON NY
      344 AM EST SAT JAN 31 2015

      NYZ015>018-022>025-036-037-044>046-055>057-062-PAZ038>040-043-044-
      047-048-072-010845-
      /O.NEW.KBGM.WS.A.0002.150201T1700Z-150202T1900Z/
      /O.CON.KBGM.WC.Y.0003.000000T0000Z-150131T1600Z/
      YATES-SENECA-SOUTHERN CAYUGA-ONONDAGA-STEUBEN-SCHUYLER-CHEMUNG-
      TOMPKINS-MADISON-SOUTHERN ONEIDA-CORTLAND-CHENANGO-OTSEGO-TIOGA-
      BROOME-DELAWARE-SULLIVAN-BRADFORD-SUSQUEHANNA-NORTHERN WAYNE-
      WYOMING-LACKAWANNA-LUZERNE-PIKE-SOUTHERN WAYNE-
      INCLUDING THE CITIES OF...PENN YAN...SENECA FALLS...AUBURN...
      SYRACUSE...CORNING...HORNELL...WATKINS GLEN...ELMIRA...ITHACA...
      ONEIDA...UTICA...ROME...CORTLAND...NORWICH...ONEONTA...
      COOPERSTOWN...OWEGO...BINGHAMTON...WALTON...DELHI...MONTICELLO...
      TOWANDA...SAYRE...MONTROSE...TUNKHANNOCK...SCRANTON...
      WILKES-BARRE...HAZLETON...MILFORD...HONESDALE
      344 AM EST SAT JAN 31 2015

      ...WIND CHILL ADVISORY REMAINS IN EFFECT UNTIL 11 AM EST THIS
      MORNING...
      ...WINTER STORM WATCH IN EFFECT FROM SUNDAY AFTERNOON THROUGH
      MONDAY AFTERNOON...

      THE NATIONAL WEATHER SERVICE IN BINGHAMTON HAS ISSUED A WINTER
      STORM WATCH...WHICH IS IN EFFECT FROM SUNDAY AFTERNOON THROUGH
      MONDAY AFTERNOON.
      
      ...
      
There is so much potential here.  They have all of the lat/longs, the towns, the conditions, timing, etc.  The notifications, updates, and visualizations for something like this could be extensive.  But every weather app or page I've ever seen that actually shows NWS advisories just punts and shows this wall of text.  And for good reason, it's awful.

#### Forecasts and Probabilities

There is some hope for general weather conditions and forecasts.  I spent just enough time on NOAA's [NDFD API docs](http://graphical.weather.gov/xml/) to say "screw this", but the [OpenWeatherMap](http://openweathermap.org/api) seems promising.  There's at least a lot of easily reachable data available.  

But there's still a lot of room for improvement.  The largest issue during the Blizzard of 2015 two weeks ago, was the track adjustment that caused Boston to get clobbered while NYC skirted the edges and came away with not a lot of snow.  It was enough of a "debacle" to make the [lead NWS forecast apologize publicly](http://www.washingtonpost.com/blogs/capital-weather-gang/wp/2015/01/27/why-the-snow-forecast-for-new-york-city-was-so-bad-and-what-should-be-done/).

And yet... only 10 or 20 years ago, I feel like this would have been a major success.  They were able to predict days early that a minor Alberta clipper would regroup off the Mid-Atlantic coast and twirl into an obscenely strong Noreaster.  From what little I know, this was an immensely complicated sitution that both meteoroglogists and models had to handle.  They missed the exact track of the storm by about the length of Long Island.

The missing ingredient was the range of possibilities for the storm: in model terms, the equivalent "ensembles".  Meteorologists work hard to intuit their forecast out of a huge can of model data, including many different runs of the same model with slightly varied input conditions.  This provides a variety of model scenarios.

But very rarely does this information translate to the general public.  At most, you'll get someone saying "I think we'll be on the low end of this range."  One thing I especially love about [Capital Weather Gang](http://www.washingtonpost.com/blogs/capital-weather-gang/) is how they provide Boom and Bust scenarios along with Confidence ranges in their forecasts.

![Boom/Bust](http://www.washingtonpost.com/wp-apps/imrs.php?src=http://img.washingtonpost.com/blogs/capital-weather-gang/files/2015/01/snow_chances_1-26-v3a.jpg&w=1484)

This is a great way to take a a good stab at the forecast, while also providing enough detail across a range of scenarios.  And it reminds readers that you are essentially trying to predict the future.

Any forecasting API of the future should take probabilities into account in the data model.  A generalized version of Boom and Bust would work very well.  Translated into a Bell Curve, the Boom and Bust becomes a forecast, say, 2 deviations from the primary estimate, while the Confidence value becomes the standard deviation (controlling the spread).

#### Separating Data

What I'd really love to see is a separation of forecast data and forecast presentation.  If it occurred, lots of interesting possibilities open up: you could easily overlay forecasts from different sources, run forecasts against actuals later, or even create a heatmap of which areas some forecasts always nail and where they miss.

I could be wrong here, but it seems as if the public-facing meteorologists of the country would be naturally aligned against this idea.  For the most part, they don't look back at how their forecast missed (at least publicly).  They want to be your go-to source for the weather forecast.  So perhaps this would be an uphill battle.  But one organization could definitely do this: the [NWS](http://www.weather.gov/).  If they got in the business of presenting their data well - models, actuals, forecasts, and probabilities - they could start a swing towards more interesting weather UI presentations, more honest evaluation of forecasting, and a more conscious public knowledgeable about the variation possible in an upcoming storm.  And that's a great thing, not only because the NWS is still known for the horrid text boxes above, but also because the state of the art in weather apps right now seems to be this:

![Effing Weather App](http://effingweatherapp.com/img/slider/slide-1.png)

#### Events

It may seem like I'm going a bit overboard on this right now because I live near DC and the classic DC snow hole is killing me this winter.  And that's true.  When it's 90 and sunny in July at the beach, I could care less that the standard deviation in high temperature was 2.5 degrees between the various GFS ensembles.

True weather disasters is where this will really matter, and snow is the least of those.  I joked about it above, but it really is a bit sad that the tornado warning system of today is still based on sirens and radio stations.  Almost everyone has geo data on their phones, and we've got geo data on every weather event.  If we can receive AMBER alerts on our phones, we ought to be able to receive geographically relevant tornado warnings as well.  The same is true for hurricanes, fires, space weather (X-Class solar flares anyone?), flood watches, severe thunderstorms, and others.  And yet, these sorts of notifications are still tucked away behind a firewall of obfuscation, available only for professional meteorologists, firefighters, police, and related fields.

Here's hoping for a general trend towards a better data model, protocol and API for weather, and the possibility this could make more data available to the general public.  And now I should go update my USGS feed for OMGEarthquake.  I can't wait to do OMGTornado one day.





