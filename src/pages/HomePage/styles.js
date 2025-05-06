import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapUnfocus: {
    opacity: 0.5,
    flex: 1,
  },
  userIcon: {
    position: "absolute",
    top: 30,
    left: 60,
    zIndex: 1,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  menuIcon: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  menuOpened: {
    position: "absolute",
    width: "90%",
    top: 175,
    left: 25,
    zIndex: 10, // aumenta sobreposição

    backgroundColor: "#fff", // branco puro para contraste
    padding: 12,
    borderRadius: 24,

    borderWidth: 2,
    borderColor: "#FEFEFE", // roxo suave para destaque

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 10, // mais destacado no Android
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  menuHeader: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 2,
    left: 4,
    zIndex: 1,
    padding: 2,
    backgroundColor: "#fcfcff",
    borderRadius: 50,
  },
});
