import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=5d6a2d9e";
  const [state, setState] = useState({
    s: "Enter a movie...",
    s: "",
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      let results = data.Search || [];
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  const openPopup = (id) => {
    axios(apiurl + "&t=" + id).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find a movie, a TV show or many more...</Text>
      <View style={styles.textBox}>
        <Image
          source={require("./assets/loupe.png")}
          style={styles.iconStyle}
        />
        <TextInput
          placeholder="Enter a movie..."
          style={styles.input}
          onChangeText={(text) =>
            setState((prevState) => {
              return { ...prevState, s: text };
            })
          }
          onSubmitEditing={search}
          value={state.s}
        />
      </View>

      <ScrollView style={styles.results}>
        {state.results.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No results, please try something else.
            </Text>
          </View>
        )}
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.Title)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: result.Poster }}
                style={styles.PosterResult}
                resizeMode="cover"
              />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title != "undefined"}
      >
        <SafeAreaView style={styles.popup}>
          <TouchableHighlight
            onPress={() =>
              setState((prevState) => {
                return { ...prevState, selected: {} };
              })
            }
          >
            <Image
              source={require("./assets/arrow.png")}
              style={styles.iconStyle}
            />
          </TouchableHighlight>

          <Image
            source={{ uri: state.selected.Poster }}
            style={styles.selectedPoster}
          />
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={{ marginLeft: 20 }}>
            Rating: {state.selected.imdbRating} (IMDB)
          </Text>
          <Text style={{ marginLeft: 20 }}>Genre: {state.selected.Genre}</Text>
          <Text style={{ marginLeft: 20 }}>
            Director: {state.selected.Director}
          </Text>
          <Text style={{ marginLeft: 20 }}>
            Actors: {state.selected.Actors}
          </Text>
          <Text style={{ margin: 20 }}>{state.selected.Plot}</Text>
        </SafeAreaView>
        <TouchableHighlight
          onPress={() =>
            setState((prevState) => {
              return { ...prevState, selected: {} };
            })
          }
        >
          <Text style={styles.closebutton}>Close</Text>
        </TouchableHighlight>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "800",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 50,
  },

  // searchbar styling
  textBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 6,
    borderRadius: 16,
    borderColor: "#FFF",
    height: 60,
    width: "92%",
    marginBottom: 30,
  },
  iconStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 5,
    height: 42,
    width: 42,
    resizeMode: "stretch",
    alignItems: "center",
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "90%",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#197177",
    borderRadius: 8,
    marginBottom: 40,
  },
  input: {
    alignItems: "center",
    width: "88%",
    fontSize: 20,
  },

  // Results styling
  results: {
    flex: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  result: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  PosterResult: {
    width: 350,
    height: 500,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  heading: {
    color: "#197177",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,
    backgroundColor: "#FFF",
  },

  // Popup styling
  popup: {
    padding: 20,
  },
  selectedPoster: {
    width: 200,
    height: 300,
    borderRadius: 16,
    marginLeft: 20,
    marginBottom: 20,
  },
  poptitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
    marginLeft: 20,
  },
  closebutton: {
    padding: 20,
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#2484C4",
  },
});
