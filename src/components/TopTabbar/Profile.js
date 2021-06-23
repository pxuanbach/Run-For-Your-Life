import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, Image, AsyncStorage,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import Constants from '../../utilities/Constants';
import FontLoader from '../../utilities/Font';
import Moment from 'moment';
import { Foundation } from '@expo/vector-icons';
import { IconButtonDesign } from '../CustomButton';
import ButtonSheetModal from '../CustomModal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Profile({navigation}) {
    const getDetails = () => {
        let data = {
            name: navigation.getParam("name") == null 
                ? 'Phạm Xuân Bách' : navigation.getParam("name"),
            mail: navigation.getParam("mail") == null 
                ? 'pxuanbach1412@gmail.com' : navigation.getParam("mail"),
            description: navigation.getParam("description") == null 
                ? 'tôi là...' : navigation.getParam("description"),
            job: navigation.getParam("job") == null 
                ? 'Student at UIT' : navigation.getParam("job"),
            phone: navigation.getParam("phone") == null 
                ? '0372363285' : navigation.getParam("phone"),
            gender: navigation.getParam("gender") == null 
                ? 'Male' : navigation.getParam("gender"),
            liveIn: navigation.getParam("liveIn") == null 
                ? 'Phan Rang-Tháp Chàm, Ninh Thuận, Vietnam' : navigation.getParam("liveIn"),
            birthday: navigation.getParam("birthday") == null 
                ? '2001-03-30' : navigation.getParam("birthday"),
            height: navigation.getParam("height") == null 
                ? '175' : navigation.getParam("height"),
            weight: navigation.getParam("weight") == null 
                ? '55' : navigation.getParam("weight"),
        };
        return data;
    }
    const [username, setUsername] = useState();
    const [info, setInfo] = useState(getDetails);
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    //run when navigate to this screen
    const unsubscribe = navigation.addListener('didFocus', () => {
        setInfo(getDetails);
        _retrieveData();
        console.log("get details")
    });

    useEffect(() => {
        let isMounted = true;
        unsubscribe;
        return () => { isMounted = false };
    }, []);

    return (
        <SafeAreaView style={{height: '100%', backgroundColor: Constants.COLOR.white}}>
            <ScrollView>
                
                <SafeAreaView>
                    <ButtonSheetModal
                    image={image}
                    setImage={setImage}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingVertical: 4,
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
                            : <Image source={require('../../images/back.png')}
                            style={{
                                height: windowWidth/3,
                                width: windowWidth/3,
                                borderRadius: 100,
                                marginHorizontal: 4
                            }}>
                            </Image>}
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
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
                            </View>
                        </View>
                    </View>
                    <View style={{
                        borderWidth: 0.45,
                        borderColor: Constants.COLOR.second_green,
                        marginTop: 8,
                        marginHorizontal: 12,
                    }}/>
                </SafeAreaView>
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

export default Profile