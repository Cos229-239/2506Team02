import { StyleSheet } from 'react-native';

export const COLORS = {
  button: '#944C17',
  text: '#E59F34',
  background: '#3B291C',
};

export const GLOBAL_STYLES = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    minHeight: 60,
    textAlignVertical: 'top',
    color: COLORS.text,
    fontFamily: 'Aclonica',
  },
  button: {
    backgroundColor: COLORS.button,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: 'Aclonica',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: 'Aclonica',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 10,
    fontFamily: 'Aclonica',
  },
  drawerStyle: {
  shadowColor: '#000',
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
},
});
