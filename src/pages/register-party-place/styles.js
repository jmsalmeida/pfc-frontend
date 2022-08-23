import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  formContainer: { paddingVertical: 20 },
  inputContainer: { paddingVertical: 5 },
  inputContainerRow: { paddingVertical: 5, flexDirection: 'row', flex: 1 },
  hyperlinkStyle: { fontStyle: 'italic', color: 'blue' },
  radioTerms: { flexDirection: 'row', flex: 1, marginTop: 20 },
  submitButton: { paddingVertical: 10 },

  captionText: {
    fontSize: 12,
    paddingTop: 5,
    fontWeight: '400',
  },

  submitButton: { paddingVertical: 10 },
})
