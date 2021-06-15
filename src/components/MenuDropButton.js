import React, {useState} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { CustomButton, IconButtonDesign } from './CustomButton';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MenuDropdownButton = ({setMenuRef, hideMenu, showMenu,
    navigation, info}) => {
    
    return (
        <View>
            <Menu
            ref={setMenuRef}
            button={<CustomButton
                onPress={showMenu}
                height={windowHeight/20}
                iconName='more-vert'
                iconSize={28}
                color={Constants.COLOR.dark_green}
                backgroundColor={Constants.COLOR.white}/>}
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
                    onPress={hideMenu}
                    textStyle={{
                        fontFamily: "RobotoRegular",
                        fontSize: windowHeight/42,
                        color: Constants.COLOR.dark_green,
                    }}>
                        Report Error
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem style={{width: '100%'}}
                    onPress={() => navigation.navigate('Login')}
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