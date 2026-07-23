import { TextInput, StyleSheet } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export function AppInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
});
