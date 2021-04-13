import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=5d6a2d9e";
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {},
  });
  return (
      <StatusBar style="auto" />
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
});
