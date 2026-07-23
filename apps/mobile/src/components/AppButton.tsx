import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export function AppButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 12,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});