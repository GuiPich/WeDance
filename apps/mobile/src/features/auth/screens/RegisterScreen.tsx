import { View, Text, Image } from "react-native";

export function RegisterScreen() {
  return (
    <View>
      <Image
        source={require("../../../../assets/logoText.png")}
        style={{
          width: 220,
          height: 90,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 40,
        }}
      />

      <Text>Inscription WeDance!</Text>
    </View>
  );
}
