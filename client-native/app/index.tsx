import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllFavorites } from '../api.js';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Index() {

  const [favorites, setFavorites] = useState([])
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    getAllFavorites().then(setFavorites).catch(setLoadError)
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Favorites List</Text>
      { favorites.map((favePlace) => (
        <View key={favePlace._id}>
          <Text style={styles.faveTitle}>{favePlace.name}</Text>
          <View style={styles.faveLocationRow}>
            <FontAwesome5 name="globe" size={12} color="black" />
            <Text style={styles.faveCoords}>{favePlace.location.coordinates[1]}, {favePlace.location.coordinates[0]}</Text>
          </View>
          <Text style={styles.favePerson}>by: {favePlace.whose}</Text>
        </View>
      ))}
      { loadError && <Text>{loadError.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24
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