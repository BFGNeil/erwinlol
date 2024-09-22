import { ThemedText } from "./ThemedText";

export default function TrimmedText({ text, maxLength }) {
  return (
    <ThemedText>
      {text.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
    </ThemedText>
  );
}
