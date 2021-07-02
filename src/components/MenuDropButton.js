import React, {useState} from 'react';
import {Text, View, Dimensions, AsyncStorage} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { CustomButton, IconButtonDesign } from './CustomButton';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import email from 'react-native-email'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MenuDropdownButton = ({setMenuRef, hideMenu, showMenu,
    navigation, info}) => {
    const removeData = async () => {
        try {
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("curTitle");
            await AsyncStorage.removeItem("curImageUrl");
            await AsyncStorage.removeItem("curWebUrl");
        } catch (err) {
            alert(err);
        } finally {
            //
        }
    }

    const handleEmail = () => {
        const to = ['19521233@gm.uit.edu.vn'] // string or array of email addresses
        email(to, {
            subject: 'Report Error',
            body: 'Error description here'
        }).catch(console.error)
    }

    return (
        <View>
            <Menu
            ref={setMenuRef}
            button={<CustomButton
                onPress={showMenu}
                height={windowHeight/20}
                iconName='more-vert'
                iconSize={28}
                color={Constants.COLOR.white}
                backgroundColor={Constants.COLOR.green}/>}
            >
                <FontLoader>
                    <MenuItem style={{width: '100%'}}
                    textStyle={{
                        fontFamily: "RobotoBold",
                        fontSize: windowHeight/36,
                        color: Constants.COLOR.second_green,
                        alignSelf: 'center'
                    }}>
                        More
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem style={{width: '100%'}}
                    onPress={() => {hideMenu(); 
                        navigation.navigate("ChangePassScreen")}}
                    textStyle={{
                        fontFamily: "RobotoRegular",
                        fontSize: windowHeight/42,
                        color: Constants.COLOR.dark_green,
                    }}>
                        Change password
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem style={{width: '100%'}}
                    onPress={() => {
                        hideMenu(); 
                        handleEmail()
                    }}
                    textStyle={{
                        fontFamily: "RobotoRegular",
                        fontSize: windowHeight/42,
                        color: Constants.COLOR.dark_green,
                    }}>
                        Report Error
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem style={{width: '100%'}}
                    onPress={() => {
                        removeData();
                        navigation.navigate("Login");
                    }}
                    textStyle={{
                        fontFamily: "RobotoRegular",
                        fontSize: windowHeight/42,
                        color: Constants.COLOR.dark_green,
                    }}>
                        Logout
                    </MenuItem>
                </FontLoader>
            </Menu>
        </View>
    )
}

export default MenuDropdownButton