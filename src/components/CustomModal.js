import React, {useState, useEffect} from 'react';
import {
    View, Modal, Dimensions, Text, StyleSheet
} from 'react-native';
import Constants from '../utilities/Constants';
import FontLoader from '../utilities/Font';
import { IconButtonDesign } from './CustomButton';
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

const styles = StyleSheet.create({
    container: {
        padding: 4,
        marginTop: windowHeight/200,
        borderRadius: 10,
        alignSelf: 'center'
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

export default ButtonSheetModal