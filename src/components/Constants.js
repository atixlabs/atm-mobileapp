import {
  Dimensions,
  StatusBar,
} from 'react-native';

const Constants = {
	/**Real height of the screen without the StatusBar height */
	realHeight: Dimensions.get('window').height - StatusBar.currentHeight,

	/**Real width of the screen */
	realWidth: Dimensions.get('window').width,
}

export default Constants;