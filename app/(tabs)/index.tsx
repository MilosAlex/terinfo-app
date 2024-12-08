import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, MapPressEvent, LatLng } from "react-native-maps";

type MarkerType = {
  latitude: number;
  longitude: number;
};

export default function HomeScreen(): JSX.Element {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const handleMapPress = (event: MapPressEvent): void => {
    const { coordinate } = event.nativeEvent;
    setMarkers((currentMarkers) => [
      ...currentMarkers,
      { latitude: coordinate.latitude, longitude: coordinate.longitude },
    ]);
  };

  useEffect(() => {
    console.log("Markers updated:", markers);
  }, [markers]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={handleMapPress} key={markers.length}>
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
