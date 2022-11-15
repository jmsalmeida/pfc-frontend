import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const mobileWidth = Dimensions.get('window').width;
const mobileHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  advancedFiltersModal: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',

    top: 0,
    zIndex: 999,
    position: 'absolute',
    width: mobileWidth,
    height: mobileHeight,

    closeIcon: {
      flex: 1,
      alignItems: 'flex-end',
    },

    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
    },

    tagsContent: {
      paddingVertical: 10,

      title: {
        paddingLeft: 10,
      },
    },
  },
});
