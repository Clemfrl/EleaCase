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
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      console.log(results);
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
      <Text style={styles.title}>Elea Health DataBase</Text>
      <TextInput
        style={styles.searchbox}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <Text style={styles.title}>Find a movie, a TV show or many more...</Text>
      <View style={styles.textBox}>
        <Image
          source={require("./assets/loupe.png")}
          style={styles.iconStyle}
        />
        <TextInput
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
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.Title)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: result.Poster }}
                style={{
                  width: "100%",
                  height: 300,
                }}
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
            style={{
              width: "80%",
              height: 300,
            }}
          />
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text>Rating: {state.selected.imdbRating}</Text>
          <Text>Genre: {state.selected.Genre}</Text>
          <Text>Director: {state.selected.Director}</Text>
          <Text style={{ marginBottom: 20 }}>
            Actors: {state.selected.Actors}
          </Text>
          <Text>{state.selected.Plot}</Text>
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
    backgroundColor: "#264653",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,
    backgroundColor: "#445565",
  },
  popup: {
    padding: 20,
  },
  poptitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
  closebutton: {
    padding: 20,
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#2484C4",
  },
});
