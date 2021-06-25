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
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    useEffect(() => {
        let isMounted = true;
        _retrieveData();
        return () => { isMounted = false };
    }, [])
    
    return (
        <SafeAreaView style={{
            height: '100%', 
            backgroundColor: Constants.COLOR.white
        }}>
            <View
            style={{
                height: windowHeight/10,
                backgroundColor: Constants.COLOR.white,
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
                            color: Constants.COLOR.dark_green,
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
            {/* Avatar + name, mail + button settings
            <SafeAreaView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 4,
                    paddingTop: windowHeight/24,
                }}>
                    <View style={{
                        height: windowWidth/3,
                        width: windowWidth/3
                    }}>
                        {image != null ?
                        <Image source={{ uri: image }}
                        style={{ 
                            height: windowWidth/3,
                            width: windowWidth/3,
                            borderRadius: 100,
                            marginHorizontal: 4
                        }}/>
                        : <Image source={require('../../../images/back.png')}
                        style={{
                            height: windowWidth/3,
                            width: windowWidth/3,
                            borderRadius: 100,
                            marginHorizontal: 4
                        }}>
                        </Image>}
                        <TouchableOpacity onPress={pickImage}
                        style={{
                            position: 'absolute',
                            bottom: -2,
                            right: -10,
                            backgroundColor: Constants.COLOR.green,
                            padding: 4,
                            paddingHorizontal: 6,
                            borderRadius: 16,
                            alignItems: 'center'
                        }}>
                            <Foundation name="camera" size={26} 
                                color={Constants.COLOR.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                    }}>
                        {isLoading 
                        ? <View style={{
                            paddingStart: 16,
                            padding: 4,
                            alignItems: 'center',
                            width: 2*windowWidth/3
                        }}>
                            <FontLoader>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                style={{
                                    fontFamily: "SemiBold",
                                    fontSize: windowHeight/30,
                                    color: Constants.COLOR.green,
                                }}>
                                    Loading...
                                </Text>
                            </FontLoader>
                        </View>
                        : <View style={{
                            paddingStart: 16,
                            padding: 4,
                            alignItems: 'center',
                            width: 2*windowWidth/3
                        }}>
                            <FontLoader>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                style={{
                                    fontFamily: "SemiBold",
                                    fontSize: windowHeight/30,
                                    color: Constants.COLOR.green,
                                }}>
                                    {info.name}
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                style={{
                                    fontFamily: "SemiRegular",
                                    fontSize: windowHeight/38,
                                    color: Constants.COLOR.second_green,
                                }}>
                                    {info.mail}
                                </Text>
                            </FontLoader>
                            <View style={{
                                borderWidth: 0.4, 
                                borderColor: Constants.COLOR.green,
                                width: 2*windowWidth/3,
                                marginVertical: 4,}}>
                            </View>
                        </View>}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <IconButtonDesign
                            onPress={() => {
                                navigation.navigate('EditScreen', 
                                {   
                                    name: info.name, 
                                    mail: info.mail,
                                    description: info.description,
                                    job: info.job,
                                    phone: info.phone,
                                    gender: info.gender,
                                    liveIn: info.liveIn,
                                    note: info.note,
                                    birthday: info.birthday,
                                    height: info.height,
                                    weight: info.weight
                                });
                            }}
                            height={windowHeight/20}
                            iconName="edit"
                            text="Edit"
                            iconSize={28}
                            fontSize={windowHeight/28}
                            color={Constants.COLOR.green}
                            backgroundColor={Constants.COLOR.white}/>
                            <View style={{width: 8}}></View>
                            <MenuDropdownButton
                            setMenuRef={setMenuRef}
                            showMenu={showMenu}
                            hideMenu={hideMenu}
                            navigation={navigation}
                            info={info}>
                            </MenuDropdownButton>
                        </View>
                    </View>
                </View>
                <View style={{
                    borderWidth: 0.45,
                    borderColor: Constants.COLOR.second_green,
                    marginTop: 8,
                    marginHorizontal: 12,
                }}/>
            </SafeAreaView> */}

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