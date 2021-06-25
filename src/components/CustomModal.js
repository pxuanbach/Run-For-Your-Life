import React, {useState, useEffect} from 'react';
import {
    View, Modal, Dimensions, Text, StyleSheet, TouchableOpacity
} from 'react-native';

import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import { IconButtonDesign, PhraseButton } from './CustomButton';
import * as ImagePicker from 'expo-image-picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ButtonSheetModal = ({image, setImage, modalVisible, setModalVisible}) => {

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/jamesnguyen/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'nub4abmm';

    const uploadHandle = (pickerResult) => {
        let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
    
        let data = {
          "file": base64Img,
          "upload_preset": CLOUDINARY_UPLOAD_PRESET,
        }
    
        fetch(CLOUDINARY_URL, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
          let data = await r.json()
          setImage(data.url);
          console.log(data.url) //
        }).catch(err => console.log(err))
      };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status === 'granted'){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true
              });
          
              console.log(result);
              if (result.cancelled === true) {
                  return;
              }
              //setImage(result.uri);
              uploadHandle(result);
        }
        else {
            Alert.alert("you need to give up permission to work")
        }
        
      };
    
    //Chưa hoàn thành
    const pickFromCamera = async ()=>{
        const {status} =  await ImagePicker.requestCameraPermissionsAsync();
        if(status === 'granted'){
             let result =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality: 0.5,
                  base64: true
              })
              if (!result.cancelled) {
                  console.log(result);
                  //setImage(result.uri);
                uploadHandle(result);
              }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }

    return (
        <View>
            <Modal
            transparent={true}
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{
                    backgroundColor: Constants.COLOR.white,
                    flex: 1,
                    flexDirection: "column",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    marginTop: 2*windowHeight/3 - 16,
                    borderColor: Constants.COLOR.second_green,
                    borderWidth: 1
                }}>
                    <View style={styles.container}>
                        <FontLoader>
                            <Text style={styles.text}>
                                Upload Photo
                            </Text>
                            <Text style={styles.subText}>
                                Choose Your Profile Picture
                            </Text>
                        </FontLoader>
                    </View>
                    <View style={styles.container}>
                        <IconButtonDesign
                        onPress={() => {
                            pickFromCamera();
                            setModalVisible(false)
                        }}
                        height={windowHeight/20}
                        width={2*windowWidth/3}
                        fontSize={windowHeight/36}
                        text="Take Photo"/>
                    </View>
                    <View style={styles.container}>
                        <IconButtonDesign
                        onPress={() => {
                            pickImage();
                            setModalVisible(false);
                        }}
                        height={windowHeight/20}
                        width={2*windowWidth/3}
                        fontSize={windowHeight/36}
                        text="Choose From Library"/>
                    </View>
                    <View style={styles.container}>
                        <IconButtonDesign
                        onPress={() => setModalVisible(false)}
                        height={windowHeight/20}
                        width={2*windowWidth/3}
                        fontSize={windowHeight/36}
                        text="Cancel"/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const TestRModal = ({setR, modalVisible, setModalVisible, setCalorie, setIsTested, gender, weight, height, birthday}) => {
    const calculateDailyCalorie = (R) => {
        let bmr = 0;
        var currentDay = new Date();
        if (gender === "Male") {
            bmr = (13.397 * weight) + (4.799 * height) 
                - (5.677 * (currentDay.getFullYear() - birthday.getFullYear())) + 88.362;
        }
        else {
            bmr = (9.247 * weight) + (3.098 * height) 
                - (4.33 * (currentDay.getFullYear() - birthday.getFullYear())) + 447.593;
        }
        console.log(R*bmr);
        setCalorie((R*bmr).toFixed(2));
    }

    const infoValid = () => {
        var currentDay = new Date();
        if (gender === "" || weight === 0 || height === 0 || birthday.getFullYear() === currentDay.getFullYear())
            return false;
        return true;
    }

    return (
        <View>
            <Modal
            transparent={true}
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
                <View style={{
                    flex: 1,
                    marginHorizontal: 12,
                    marginVertical: windowHeight/7,
                    backgroundColor: Constants.COLOR.white,
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: Constants.COLOR.second_green
                }}>
                    {infoValid() ? <View style={{
                        padding: 4,
                        width: '93%'
                    }}>
                        <FontLoader>
                            <Text style={{
                                fontFamily: 'SemiBold',
                                fontSize: windowHeight/28,
                                color: Constants.COLOR.dark_green,
                                paddingHorizontal: 12, 
                            }}>
                                Calculator
                            </Text>
                            <Text style={{
                                fontFamily: 'RobotoRegular',
                                fontSize: windowHeight/36,
                                color: Constants.COLOR.second_green,
                                paddingHorizontal: 12,
                                padding: windowHeight/100, 
                            }}>
                                Activity level
                            </Text>
                        </FontLoader>
                        <View>
                            <PhraseButton
                            onPress={() => {
                                setR(1.2);
                                calculateDailyCalorie(1.2);
                                setIsTested(true);
                                setModalVisible(false);
                            }}
                            windowHeight={windowHeight}
                            phrase="Sedentary people (office work, only eating and sleeping)"
                            />
                            <PhraseButton
                            onPress={() => {
                                setR(1.375);
                                calculateDailyCalorie(1.375);
                                setIsTested(true);
                                setModalVisible(false);
                            }}
                            windowHeight={windowHeight}
                            phrase="Light exercisers (exercise 1-3 times/week)"
                            />
                            <PhraseButton
                            onPress={() => {
                                setR(1.55);
                                calculateDailyCalorie(1.55);
                                setIsTested(true);
                                setModalVisible(false);
                            }}
                            windowHeight={windowHeight}
                            phrase="Moderately active people (exercise 3-5 times/week, exercise every day)"
                            />
                            <PhraseButton
                            onPress={() => {
                                setR(1.725);
                                calculateDailyCalorie(1.725);
                                setIsTested(true);
                                setModalVisible(false);
                            }}
                            windowHeight={windowHeight}
                            phrase="Heavy exercisers (regularly active, playing sports and exercising 6-7 times a week)"
                            />
                            <PhraseButton
                            onPress={() => {
                                setR(1.9);
                                calculateDailyCalorie(1.9);
                                setIsTested(true);
                                setModalVisible(false);
                            }}
                            windowHeight={windowHeight}
                            phrase="Very heavy exercisers (exercise 2 times/day, manual labor)"
                            />
                        </View>
                    </View> : <View style={{
                        padding: 4,
                        width: '93%',
                        height: '80%'
                    }}>
                        <FontLoader>
                            <Text style={{
                                fontFamily: 'RobotoRegular',
                                fontSize: windowHeight/36,
                                color: Constants.COLOR.second_green,
                                paddingHorizontal: 12,
                                paddingTop: windowHeight/30, 
                            }}>
                                Your infomation is invalid.
                            </Text>
                            <Text style={{
                                fontFamily: 'RobotoRegular',
                                fontSize: windowHeight/36,
                                color: Constants.COLOR.second_green,
                                paddingHorizontal: 12,
                            }}>
                                Please! update your infomation.
                            </Text>
                        </FontLoader>
                    </View>}
                    <View style={{
                        alignSelf: 'center',
                        padding: windowHeight/120
                    }}>
                        <IconButtonDesign
                        onPress={() => setModalVisible(!modalVisible)}
                        text="Close"
                        width={120}
                        height={46}
                        iconName="cancel">
                        </IconButtonDesign>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        marginTop: windowHeight/200,
        borderRadius: 10,
        alignSelf: 'center'
    },
    testContainer: {
        flexDirection: 'row',
        paddingVertical: 4
    },
    text: {
        fontFamily: "SemiBold",
        fontSize: windowHeight/34,
        paddingHorizontal: 32,
        color: Constants.COLOR.dark_green,
        textAlign: 'center',
    },
    subText: {
        fontFamily: "SemiRegular",
        fontSize: windowHeight/42,
        paddingHorizontal: 32,
        color: Constants.COLOR.dark_green,
        textAlign: 'center',
    }
})

export {
    TestRModal,
    ButtonSheetModal
} 