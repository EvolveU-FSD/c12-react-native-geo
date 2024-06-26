import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getAllFavorites } from '../api.js';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MapView, { Marker } from "react-native-maps";
import FavoriteModal from "@/components/FavoriteModal";

export default function Index() {

  const [favorites, setFavorites] = useState([])
  const [loadError, setLoadError] = useState(null)

  const [mapRegion, setMapRegion] = useState({
    latitude: 51.04560343757784, 
    longitude: -114.05404581689704,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  const [userClick, setUserClick] = useState()
  const [showFavorite, setShowFavorite] = useState(false)


  useEffect(() => {
    getAllFavorites().then(setFavorites).catch(setLoadError)
  }, [])

  const saveFavorite = useCallback(() => {
    setShowFavorite(true)
  }, [userClick])

  function favoriteClicked(fave) {
    setMapRegion({
      latitude: fave.location.coordinates[1], 
      longitude: fave.location.coordinates[0],
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView 
        style={styles.map}
        region={mapRegion}
        onPress={(e) => {
          console.log('User clicked at', e.nativeEvent.coordinate)
          setUserClick(e.nativeEvent.coordinate)
        }}
      >
        <Marker 
          title="Central Library"
          description="Margo's Favorite"
          coordinate={{latitude: 51.04560343757784, longitude: -114.05404581689704 }}
        />
        { userClick && (
          <Marker 
            title="Click here"
            description="To save a new favorite"
            coordinate={userClick}
            onCalloutPress={saveFavorite}
            pinColor="#008000"
          />
        )}

        { favorites.map((favePlace) => (
            <Marker
              key={favePlace._id}
              title={favePlace.name}
              description={favePlace.whose+"'s Favorite"}
              coordinate={{
               latitude: favePlace.location.coordinates[1], 
               longitude: favePlace.location.coordinates[0]
              }}
            />
        ))}
      </MapView>
      <Text style={styles.title}>Favorites List</Text>
      <ScrollView>
        { favorites.map((favePlace) => (
          <View 
            key={favePlace._id}
            style={styles.faveCard}
          >
            <Text 
              onPress={() => { favoriteClicked(favePlace) }}
              style={styles.faveTitle}
            >
              {favePlace.name}
            </Text>
            <View style={styles.faveLocationRow}>
              <FontAwesome5 name="globe" size={12} color="black" />
              <Text style={styles.faveCoords}>{favePlace.location.coordinates[1]}, {favePlace.location.coordinates[0]}</Text>
            </View>
            <Text style={styles.favePerson}>by: {favePlace.whose}</Text>
          </View>
        ))}
      </ScrollView>
      { loadError && <Text>{loadError.message}</Text>}

      <FavoriteModal visible={showFavorite} onClose={() => setShowFavorite(false)}/>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24
  },
  map: {
    width: '100%',
    height: '50%',
  },
  faveCard: {
    width: '100%',
    margin: 5
  },
  faveTitle: {
    fontSize: 20
  },
  faveLocationRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  faveCoords: {
    marginStart: 3,
    fontSize: 12,
  },
  favePerson: {
    fontSize: 12
  },

})