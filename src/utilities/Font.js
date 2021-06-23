import React from 'react';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);
  
    React.useEffect(() => {
      let cleaned = true;
      async function loadFonts() {
        await Font.loadAsync({
          SemiRegular: require('../../src/fonts/BarlowSemiCondensed-Regular.ttf'),
          SemiBold: require('../../src/fonts/BarlowSemiCondensed-SemiBold.ttf'),
          RobotoBold: require('../../src/fonts/RobotoBold.ttf'),
          RobotoRegular: require('../../src/fonts/RobotoRegular.ttf'),
        });
  
        setFontsLoaded(true);
      }
      loadFonts();
      return () => { cleaned = false };
    }, []);
  
    if (!fontsLoaded) {
      return null;
    }
  
    return children;
  };

  export default FontLoader