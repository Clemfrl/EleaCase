
export default function App() {
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
