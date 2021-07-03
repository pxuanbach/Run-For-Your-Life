import React, { useEffect, useState, useRef } from 'react';
import {
    Text, View, ScrollView, SafeAreaView,
    Dimensions, StyleSheet, AsyncStorage
} from 'react-native';
import FontLoader from '../../../utilities/Font';
import Constants from '../../../utilities/Constants';
import { CustomButton } from '../../../components/CustomButton';
import MenuDropdownButton from '../../../components/MenuDropButton';
import TopTabbar from '../../../components/TopTabbar/TopTabbar';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

//2 func for hooks
const useComponentWillMount = (func) => {
    const willMount = useRef(true)

    if (willMount.current) func()

    willMount.current = false
}
const useComponentDidMount = func => useEffect(func, []);

function ProfileTab({navigation}) {
    const [_menu, setMenu] = useState();
    const [image, setImage] = useState('https://i.postimg.cc/prCqJnSB/Screen-Shot-2021-06-25-at-17-26-19.png');
    const [username, setUsername] = useState();

    const setMenuRef = ref => {
        setMenu(ref);
    }
    const hideMenu = () => {
        _menu.hide();
    }

    const showMenu = () => {
        _menu.show();
    }

    const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("username");
          if (value !== null) {
            setUsername(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    useEffect(() => {
        let isMounted = true;
        _retrieveData();
        return () => { isMounted = false; };
    }, [])
    
    return (
        <SafeAreaView style={{
            height: '100%', 
            backgroundColor: Constants.COLOR.white
        }}>
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.green,
                flexDirection: "row",
                alignItems: 'center',
                paddingHorizontal: 2,
                paddingVertical: 4,               
                paddingTop: windowHeight/24
            }}>
                <View style={{
                    width: '70%',
                    justifyContent: 'flex-start'
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: "SemiBold",
                            fontSize: windowHeight/30,
                            paddingHorizontal: 12,
                            color: Constants.COLOR.white,
                        }}>
                            {username}
                        </Text>
                    </FontLoader>
                </View>
                <View style={{
                    width: '30%',
                    alignItems: 'flex-end'
                }}>
                    <MenuDropdownButton
                    setMenuRef={setMenuRef}
                    showMenu={showMenu}
                    hideMenu={hideMenu}
                    navigation={navigation}>
                    </MenuDropdownButton>
                </View>
            </View>
            {/* Information */}
            <TopTabbar></TopTabbar>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        flexDirection: 'row'
    },
    title: {
        fontSize: windowHeight/32,
        paddingLeft: 4,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiRegular'
    },
    label: {
        fontSize: windowHeight/38,
        paddingLeft: 8,
        color: Constants.COLOR.dark_green,
        fontFamily: 'SemiRegular'
    },
    text: {
        fontSize: windowHeight/38,
        paddingLeft: 8,
        color: Constants.COLOR.second_green,
        fontFamily: 'SemiRegular'
    },
})

export default ProfileTab