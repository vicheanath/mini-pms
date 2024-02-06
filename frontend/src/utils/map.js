import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
export const icon = L.icon({ iconUrl: iconUrl });

export const iconURL = iconUrl;

export const getCurrLocation = () => {
  const geo = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      geo.latitude = position.coords.latitude;
      geo.longitude = position.coords.longitude;
      return geo;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    return geo;
  }
};
