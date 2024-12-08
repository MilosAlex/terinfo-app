import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Polygon,
  MapPressEvent,
  Region,
} from "react-native-maps";

type MarkerType = {
  latitude: number;
  longitude: number;
};

export default function HomeScreen(): JSX.Element {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [polygonCoords, setPolygonCoords] = useState<MarkerType[] | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 47.58350606209345,
    longitude: 19.171074960000084,
    latitudeDelta: 5,
    longitudeDelta: 1.421,
  });

  const handleMapPress = (event: MapPressEvent): void => {
    const { coordinate } = event.nativeEvent;
    setMarkers((currentMarkers) => [
      ...currentMarkers,
      { latitude: coordinate.latitude, longitude: coordinate.longitude },
    ]);
  };

  console.log(markers);
  

  const handleMarkerPress = (index: number): void => {
    setPolygonCoords(markers.slice(0, index + 1));
  };

  const handleClear = (): void => {
    setMarkers([]);
    setPolygonCoords(null);
  };

  const handleZoomIn = (): void => {
    setRegion((currentRegion) => ({
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta / 2,
      longitudeDelta: currentRegion.longitudeDelta / 2,
    }));
  };

  const handleZoomOut = (): void => {
    setRegion((currentRegion) => ({
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta * 2,
      longitudeDelta: currentRegion.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
        key={markers.length}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(index)}
          />
        ))}

        {markers.length > 1 && (
          <Polyline coordinates={markers} strokeWidth={2} strokeColor="blue" />
        )}

        {polygonCoords && (
          <Polygon
            coordinates={polygonCoords}
            fillColor="rgba(0, 150, 0, 0.5)"
            strokeColor="green"
            strokeWidth={2}
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Zoom In" onPress={handleZoomIn} />
        <Button title="Zoom Out" onPress={handleZoomOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "10%",
    backgroundColor: "white",
  },
});
