import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, Image, AsyncStorage,
    SafeAreaView, StyleSheet, ScrollView, TouchableOpacity,Alert
} from 'react-native';
import Constants from '../../utilities/Constants';
import FontLoader from '../../utilities/Font';
import Moment from 'moment';
import { Foundation } from '@expo/vector-icons';
import { IconButtonDesign } from '../CustomButton';
import {ButtonSheetModal} from '../CustomModal';
import jwt_decode from "jwt-decode";
import Axios from 'axios';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Profile({navigation}) {
    const getDetails = () => {
        let data = {
            fullname: navigation.getParam("name") == null 
                ? 'Loading...' : navigation.getParam("name"),
            mail: navigation.getParam("mail") == null 
                ? 'Loading...' : navigation.getParam("mail"),
            description: navigation.getParam("description") == null 
                ? 'Loading...' : navigation.getParam("description"),
            job: navigation.getParam("job") == null 
                ? 'Loading...' : navigation.getParam("job"),
            phone: navigation.getParam("phone") == null 
                ? 'Loading...' : navigation.getParam("phone"),
            gender: navigation.getParam("gender") == null 
                ? 'Loading...' : navigation.getParam("gender"),
            address: navigation.getParam("address") == null 
                ? 'Loading...' : navigation.getParam("address"),
            birthday: navigation.getParam("birthday") == null 
                ? 'Loading...' : navigation.getParam("birthday"),
            height: navigation.getParam("height") == null 
                ? 'Loading...' : navigation.getParam("height"),
            weight: navigation.getParam("weight") == null 
                ? 'Loading...' : navigation.getParam("weight"),
        };
        return data;
    }
    const [username, setUsername] = useState([]);
    const [info, setInfo] = useState({});
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
    useEffect( () => {
        console.log("get details")
        AsyncStorage.getItem("authToken")
        .then( async (token) => { 
            
            var vl = jwt_decode(token)
            console.log('Token decode',vl._id)
            Axios.get(`https://runapp1108.herokuapp.com/api/users/getInfo/${vl._id}`)
            .then( (res)=>{
                setInfo(res.data)
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
            
        }) 
                  
    },[])
       



    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <SafeAreaView>
                    <ButtonSheetModal
                    image={image}
                    setImage={setImage}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}/>
                    {/* Photo + Name, Email */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: 8,
                        padding: 4,
                        paddingVertical: 8,
                        backgroundColor: Constants.COLOR.white
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
                                        {info.fullname}
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
                                        name: info.fullname, 
                                        mail: info.mail,
                                        description: info.description,
                                        job: info.job,
                                        phone: info.phone,
                                        gender: info.gender,
                                        address: info.address,
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
                </SafeAreaView>
                <View>     
                    <View style={{
                        padding: 4, 
                        marginBottom: 4,
                        backgroundColor: Constants.COLOR.white,
                    }}>
                        <Text style={styles.title}>Description:</Text>
                        <View style={{
                            padding: 4
                        }}>
                            <Text style={styles.text}>{(!info.description)?   'I am ...'  :info.description}</Text>
                        </View>
                    </View>


                    <View style={{
                        marginVertical: 4,
                        backgroundColor: Constants.COLOR.white,
                    }}>
                        <View style={styles.container}>
                            <Text style={styles.label}>Your birthday:</Text>
                            <View style={{width: '85%'}}>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                style={styles.text}>{ (!info.birthday)?   ''  :   Moment(info.birthday).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>

                            <View style={{
                                padding: 8,
                                flexDirection: 'row'
                            }}>
                                <Text style={styles.label}>Height:</Text>
                                <Text style={styles.text}>{info.height} cm</Text>
                            </View>
                            <View style={[styles.container, {paddingEnd: 28}]}>
                                <Text style={styles.label}>Weight:</Text>
                                <Text style={styles.text}>{(!info.weight)?  '' : info.weight } kg</Text>
                            </View>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>

                            <View style={{
                                padding: 8,
                                flexDirection: 'row'
                            }}>
                                <Text style={styles.label}>Gender:</Text>
                                <Text style={styles.text}>{info.gender}</Text>
                                
                            </View>
                            <View style={[styles.container, {paddingEnd: 28}]}>
                                <Text style={styles.label}>Mobile:</Text>
                                <Text style={styles.text}>{(!info.phone)?   ''  :info.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Job:</Text>
                            <Text style={styles.text}>{(!info.job)?   ''  :info.job}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Live in:</Text>
                            <View style={{width: '85%'}}>
                                <Text numberOfLines={2} ellipsizeMode='tail'
                                style={styles.text}>{info.address}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
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