import { Pressable, Text, StyleSheet } from "react-native";

import { COLORS } from "../constants/colors";

type Props = {
  title: string;
  onPress: () => void;
};

export function AppButton({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
  },

  text: {
    color: COLORS.textWhite,
    fontWeight: "600",
    textAlign: "center",
  },
});
