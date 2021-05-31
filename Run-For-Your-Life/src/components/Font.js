import React from 'react';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);
  
    React.useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
            Montserrat: require('../../src/fonts/Montserrat.ttf'),
            MontserratRegular: require('../../src/fonts/Montserrat-Regular.ttf'),
            RobotoBold: require('../../src/fonts/RobotoBold.ttf'),
            RobotoRegular: require('../../src/fonts/RobotoRegular.ttf'),
            SemiRegular: require('../../src/fonts/BarlowSemiCondensed-Regular.ttf'),
            SemiBold: require('../../src/fonts/BarlowSemiCondensed-SemiBold.ttf'),
        });
  
        setFontsLoaded(true);
      }
  
      loadFonts();
    }, []);
  
    if (!fontsLoaded) {
      return null;
    }
  
    return children;
  };

  export default FontLoader