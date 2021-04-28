import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
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

//Calling Movie API
export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=5d6a2d9e";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  //Calling results from the search
  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  //Calling informations for the popup
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
      <StatusBar style="light" />
      <Text style={styles.title}>Find a movie, a TV show or many more...</Text>

      {/* Displaying Searchbar */}
      <View style={styles.textBox}>
        <Image
          source={require("./assets/loupe.png")}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Enter a movie..."
          style={styles.input}
          onChangeText={(text) =>
            setState((prevState) => {
              console.log();
              return { ...prevState, s: text };
            })
          }
          onSubmitEditing={search}
          value={state.s}
        />
      </View>

      {/* Displaying Alert if no results */}
      {!state.results && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            No results, please try something else.
          </Text>
        </View>
      )}

      {/* Displaying keyword results */}
      <ScrollView style={styles.results}>
        {state.results &&
          state.results.map((result) => (
            <TouchableHighlight
              key={result.imdbID}
              onPress={() => openPopup(result.Title)}
            >
              <View style={styles.result}>
                <Image
                  source={{ uri: result.Poster }}
                  style={styles.resultPoster}
                  resizeMode="cover"
                />
                <View style={styles.resultBlock}>
                  <Text style={styles.blockTitle}>{result.Title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.blockType}>{result.Type}</Text>
                    <Text style={styles.blockYerar}>{result.Year}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          ))}
      </ScrollView>

      {/* Displaying Movie informations */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title != "undefined"}
        style={{ backgroundColor: "#000" }}
      >
        <SafeAreaView style={{ backgroundColor: "#000" }}>
          <ScrollView style={styles.popup}>
            <TouchableHighlight
              underlayColor=""
              onPress={() =>
                setState((prevState) => {
                  return { ...prevState, selected: {} };
                })
              }
            >
              <Image
                source={require("./assets/arrow-white.png")}
                style={styles.iconStyle}
              />
            </TouchableHighlight>

            <Image
              source={{ uri: state.selected.Poster }}
              style={styles.selectedPoster}
            />

            <Text style={styles.popTitle}>
              {state.selected.Title} ({state.selected.Year})
            </Text>

            <Text style={{ marginLeft: 20, color: "#FFF" }}>
              Rating: {state.selected.imdbRating} (IMDB)
            </Text>
            <Text style={{ marginLeft: 20, color: "#FFF" }}>
              Genre: {state.selected.Genre}
            </Text>
            <Text style={{ marginLeft: 20, color: "#FFF" }}>
              Director: {state.selected.Director}
            </Text>
            <Text style={{ marginLeft: 20, marginRight: 20, color: "#FFF" }}>
              Actors: {state.selected.Actors}
            </Text>
            <Text style={{ margin: 20, color: "#FFF" }}>
              {state.selected.Plot}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    alignSelf: "center",
  },
  searchIcon: {
    marginRight: 7,
    height: 32,
    width: 32,
    resizeMode: "stretch",
    alignItems: "center",
  },

  input: {
    alignItems: "center",
    width: "88%",
    fontSize: 20,
  },

  // No results styling
  noResults: {
    flex: 1,
  },
  noResultsText: {
    color: "white",
    textAlign: "center",
  },

  // Results styling
  results: {
    marginHorizontal: 20,
  },
  result: {
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    padding: 8,
    marginBottom: 16,
  },
  resultBlock: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  resultPoster: {
    borderRadius: 4,
    height: 70,
    width: 50,
    marginRight: 8,
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
    backgroundColor: "#000",
    height: "100%",
  },
  iconStyle: {
    marginLeft: 5,
    marginBottom: 15,
    height: 30,
    width: 30,
    resizeMode: "stretch",
    alignItems: "center",
  },
  selectedPoster: {
    maxWidth: "100%",
    height: 600,
    borderRadius: 16,
    borderWidth: 3,
    marginBottom: 20,
  },
  popTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
    marginLeft: 20,
    color: "white",
  },
});
