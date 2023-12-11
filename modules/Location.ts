/**
 * getCurrentLocation
 */

export const getCurrentLocation = async ({
  accurate,
  useCache,
}: {
  accurate: boolean;
  useCache: boolean;
}): Promise<{ lat: number; lng: number } | false> => {
  const options = {
    enebleHighAccuracy: accurate,
    timeout: accurate ? 5000 : 1000,
    maximumAge: useCache ? 1000 * 60 * 3 : 0,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        resolve({ lat: crd.latitude, lng: crd.longitude });
      },
      (error) => {
        if (error.code === 3) {
          reject(error);
        } else {
          reject(error);
        }
      },
      options
    );
  });
};

/**
 * getDistanceFromLatLngInKm
 */

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const getDistanceFromLatLngInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};
