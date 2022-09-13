import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  formContainer: { paddingVertical: 20 },
  inputContainer: { paddingVertical: 5 },

  inputContainerMask: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'normal',
    backgroundColor: '#DDD',
    borderColor: 'rbg(0, 0, 0',
    color: 'rgb(34, 43, 69',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 18,
    paddingLeft: 18,
  },

  inputTitle: {
    marginTop: 10,
    marginBottom: 5,
  },

  inputContainerRow: { paddingVertical: 5, flexDirection: 'row', flex: 1 },
  hyperlinkStyle: { fontStyle: 'italic', color: 'blue' },
  radioTerms: { flexDirection: 'row', flex: 1, marginTop: 20 },
  submitButton: { paddingVertical: 10 },

  captionText: {
    fontSize: 12,
    paddingTop: 5,
    fontWeight: '400',
  },
});
