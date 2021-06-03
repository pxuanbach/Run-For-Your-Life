import React from 'react';
import {Text, View, ImageBackground} from 'react-native';

function HomeTab() {
    return (
        <View>
            <ImageBackground
                source={require('../../images/back.png')}
                style={{height: '100%', width: '100%'}}>
                <Text 
                    style={{alignSelf: 'center', 
                    color: '#fff',
                    fontSize: 20,
                    marginTop: 100}}>
                    HOME
                </Text>
            </ImageBackground>
        </View>
    )
}

export default HomeTab