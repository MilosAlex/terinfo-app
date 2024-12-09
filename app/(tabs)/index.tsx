import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Polygon,
  MapPressEvent,
  Region,
  MarkerPressEvent,
} from "react-native-maps";

type MarkerType = {
  latitude: number;
  longitude: number;
};

type PolygonType = MarkerType[];

export default function HomeScreen(): JSX.Element {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [polygons, setPolygons] = useState<PolygonType[]>([]);
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

  const handleMarkerPress = (event: MarkerPressEvent): void => {
    event.stopPropagation();

    const newPolygon = [...markers];
    setPolygons((currentPolygons) => [...currentPolygons, newPolygon]);
    setMarkers([]);
  };

  const handleClear = (): void => {
    setMarkers([]);
    setPolygons([]);
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
        {/* Render markers */}
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={handleMarkerPress}
          />
        ))}

        {/* Render the line for markers not yet part of a polygon */}
        {markers.length > 1 && (
          <Polyline coordinates={markers} strokeWidth={2} strokeColor="blue" />
        )}

        {/* Render all polygons */}
        {polygons.map((polygon, index) => (
          <Polygon
            key={`polygon-${index}`}
            coordinates={polygon}
            fillColor="rgba(0, 150, 0, 0.5)"
            strokeColor="green"
            strokeWidth={2}
          />
        ))}
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
