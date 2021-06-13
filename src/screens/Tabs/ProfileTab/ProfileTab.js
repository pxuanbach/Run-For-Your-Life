import React, { useEffect, useState } from 'react';
import {
    Text, View, ScrollView, SafeAreaView, 
    Image, Dimensions, StyleSheet
} from 'react-native';
import FontLoader from '../../../utilities/Font';
import Constants from '../../../utilities/Constants';
import { IconButtonDesign } from '../../../components/CustomButton';
import MenuDropdownButton from '../../../components/MenuDropButton';
import Moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ProfileTab({navigation}) {
    const [_menu, setMenu] = useState();
    const [info, setInfo] = React.useState({
        name: 'Phạm Xuân Bách',
        mail: 'pxuanbach1412@gmail.com',
        username: 'pxuanbach1412',
        password: '',
        description: 'tôi là...',
        job: 'Student at UIT',
        phone: '0372363285',
        gender: 'male',
        liveIn: 'Phan Rang-Tháp Chàm, Ninh Thuận, Vietnam',
        note: 'Mạnh, mạnh nữa, mạnh mãi',
        birthday: '2001-03-30',
        height: '175',
        weight: '55'
    });

    const setMenuRef = ref => {
        setMenu(ref);
    }
    const hideMenu = () => {
        _menu.hide();
    }

    const showMenu = () => {
        _menu.show();
    }

    return (
        <SafeAreaView style={{
            height: '100%', 
            backgroundColor: Constants.COLOR.white
        }}>
            {/* Avatar + name, mail + button settings */}
            <SafeAreaView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 4,
                    paddingTop: windowHeight/24,
                }}>
                    {/* avatar */}
                    <View style={{
                        height: windowWidth/3,
                        width: windowWidth/3
                    }}>
                        <Image source={require('../../../images/back.png')}
                        style={{
                            height: windowWidth/3,
                            width: windowWidth/3,
                            borderRadius: 100,
                            marginHorizontal: 4
                        }}>
                        </Image>
                    </View>
                    {/* name, mail + button settings */}
                    <View style={{
                        justifyContent: 'center',
                    }}>
                        <View style={{
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
                            {/* line */}
                            <View style={{
                                borderWidth: 0.4, 
                                borderColor: Constants.COLOR.green,
                                width: 2*windowWidth/3,
                                marginVertical: 4,}}>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <IconButtonDesign
                            onPress={() => navigation.navigate('EditScreen', 
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
                            })}
                            height={windowHeight/20}
                            iconName="edit"
                            text="Edit"
                            iconSize={28}
                            fontSize={windowHeight/28}
                            color={Constants.COLOR.green}
                            backgroundColor={Constants.COLOR.white}/>
                            <View style={{width: 8}}></View>
                            {/* dropdown menu */}
                            <MenuDropdownButton
                            setMenuRef={setMenuRef}
                            showMenu={showMenu}
                            hideMenu={hideMenu}
                            navigation={navigation}>
                            </MenuDropdownButton>
                        </View>
                    </View>
                </View>
                {/* line */}
                <View style={{
                    borderWidth: 0.45,
                    borderColor: Constants.COLOR.second_green,
                    marginVertical: 8,
                    marginHorizontal: 12,
                }}></View>
            </SafeAreaView>
            {/* Information */}
            <ScrollView>
                <View>     
                    <View style={{padding: 4}}>
                        <Text style={styles.title}>Description:</Text>
                        <View style={{
                            padding: 4
                        }}>
                            <Text style={styles.text}>{info.description}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Username:</Text>
                        <View style={{width: '85%'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                            style={styles.text}>{info.username}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Your birthday:</Text>
                        <View style={{width: '85%'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                            style={styles.text}>{Moment(info.birthday).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            padding: 4,
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.label}>Height:</Text>
                            <Text style={styles.text}>{info.height} cm</Text>
                        </View>
                        <View style={[styles.container, {paddingEnd: 28}]}>
                            <Text style={styles.label}>Weight:</Text>
                            <Text style={styles.text}>{info.weight} kg</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            padding: 4,
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.label}>Gender:</Text>
                            <Text style={styles.text}>{info.gender}</Text>
                            
                        </View>
                        <View style={[styles.container, {paddingEnd: 28}]}>
                            <Text style={styles.label}>Mobile:</Text>
                            <Text style={styles.text}>{info.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Job:</Text>
                        <Text style={styles.text}>{info.job}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Live in:</Text>
                        <View style={{width: '85%'}}>
                            <Text numberOfLines={2} ellipsizeMode='tail'
                            style={styles.text}>{info.liveIn}</Text>
                        </View>
                    </View>
                    <View style={{
                        padding: 4,
                    }}>
                        <Text style={styles.label}>Notes for me:</Text>
                        <View>
                            <Text numberOfLines={5} ellipsizeMode='tail'
                            style={styles.text}>{info.note}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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