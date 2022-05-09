import "leaflet/dist/leaflet.css";
import "./MyMap.scss";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { IonLoading, IonRow, IonImg } from "@ionic/react";
import MyCamera from "./MyCamera";
import { fetchLocation } from "./getData";


const MyMap = () => {
  const position = [56.52635293804066, 9.614244537563335];

  const [myspot, setMySpot] = useState("");
  const [spot, setSpot] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const [dbData, setDbData] = useState([]);

  const markerPositions = [
    {
      image: "assets/position-images/spot-icon.jpg",
      location: "Skæring",
      name: "Skæring",
      latitude: "56.2314977010896",
      longitude: "10.320953067889777",
    },

    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Ebeltoft",
      name: "glasmuseet",
      latitude: "56.19656102762782",
      longitude: "10.678123381787396",
    },

    {
      image: "/assets/position-images/spot-icon.jpgg",
      location: "Lønstrup",
      name: "lønstrup",
      latitude: "57.47520549523601",
      longitude: "9.797069303027442",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Kalyves",
      name: "Provlita",
      latitude: "35.45508926793525",
      longitude: "24.171037403669782",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Kalyves",
      name: "Dimitra",
      latitude: "35.456922591535694",
      longitude: "24.167508999612433",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Kalyves",
      name: "Cactus coffee",
      latitude: "35.45797294238098",
      longitude: "24.16576565846501",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setMyPosition(coordinates.coords);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();

    setMySpot(L.icon({ iconUrl: "/assets/icon-images/my-icon.png" }));
    setSpot(L.icon({ iconUrl: "/assets/icon-images/spot-icon.png" }));

    fetchLocation("mapmyplace")
    .then(response => setDbData(response));

  

  }, []);

  if (loading)
    return (
      <IonLoading
        spinner={"bubbles"}
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Vent lige lidt...henter kortdata"}
        duration={5000}
      />
    );

  if (error) return <div>error</div>;

  return (
    <div id="content">
      <MyCamera position={[myPosition.latitude, myPosition.longitude]} />

      <MapContainer center={position} zoom={7} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          position={[myPosition.latitude, myPosition.longitude]}
          icon={myspot}
        >
          <Popup>Im here</Popup>
        </Marker>

        {dbData.map((data, index) => (
          <Marker
            key={"map" + index}
            id="animate"
            position={[data.latitude, data.longitude]}
            icon={spot}
          >
            <Popup>
              <IonRow>
                <IonImg
                  src={
                    "https://woumnidrxvcievydosww.supabase.in/storage/v1/object/public/image-mapmyplace/" +
                    data.image
                  }
                ></IonImg>
              </IonRow>
              <IonRow className="headline">{data.location}</IonRow>
              <IonRow className="comment">{data.comment}</IonRow>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
