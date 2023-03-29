function geoFindMe() {
    function success(position) {
      let lat = round(position.coords.latitude, 4);
      let long = round(position.coords.longitude, 4);
      setLoc1(lat, long);
      submit();
    }
  
    function error() {
      console.log("Unable")
    }
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser")
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  
  function setLoc1(lat, long) {
    //geoPos
    let lScale = 1;
    console.log("Lat: " + lat);
    console.log("Long: " + long);
  
    minLatitude = round((lat - lScale), 4);
    maxLatitude = round((lat + lScale), 4);
    minLongitude = round((long - lScale), 4);
    maxLongitude = round((long + lScale), 4);
  }
