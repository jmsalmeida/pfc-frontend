import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  actionButton: { marginTop: 20 },
  inputContainer: { paddingVertical: 5 },
  registerLabel: { textAlign: 'center', paddingTop: 50 },
  registerLink: {
    color: '#E09C0F',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logoImage: {
    width: 300,
    height: 300,
  },
});
