import { Text } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';

export function Tag({ isSelected, content, afterSelection }) {
  const unselectedStyles = [styles.tagContainer];
  const selectedStyles = [styles.tagContainer, styles.activeTag];

  const selectTag = () => {
    if (afterSelection) afterSelection();
  };

  return (
    <TouchableOpacity
      style={isSelected ? selectedStyles : unselectedStyles}
      onPress={() => selectTag()}
    >
      <Text style={styles.tagContent}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    margin: 4,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },

  tagContent: {
    minWidth: 60,
    fontSize: 12,
    color: '#1c1b1b',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  activeTag: {
    color: '#fff',
    backgroundColor: 'orange',
  },
});
