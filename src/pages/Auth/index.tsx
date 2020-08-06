import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Platform,
    Text,
    Keyboard,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import * as EmailValidator from 'email-validator';
import styles from './styles';
import Constants from 'expo-constants';
import { Picker, PickerIOS } from '@react-native-community/picker';
import api from '../../services/api';
import { useUserID, useSavedUser, useEmail, useNameUser, useCourse } from '../../Context/contextPlayer';


const Auth: React.FC = () => {
    const navigation = useNavigation();
    const [isVisibleSubmit, setIsVisibleSubmit] = useState<boolean>(true);
    const { select, setSelect } = useCourse();
    const { name, setName } = useNameUser();
    const [aguarde, setAguarde] = useState<boolean>(false);
    const [recover, setRecover] = useState<boolean>(false);
    const { email, setEmail } = useEmail();
    const [hash, setHash] = useState<string>('');
    const { userId, setUserId } = useUserID();
    const { userSaved, setUserSaved } = useSavedUser();
    const [isCode, setIsCode] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    function handleKeyboardHide() {
        setIsVisibleSubmit(true);
        return true
    };
    function handleKeyboardShow() {
        setIsVisibleSubmit(false);
        return true
    }
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow)
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide)
        return () => {
            Keyboard.removeListener('keyboardDidHide', handleKeyboardHide)
            Keyboard.removeListener('keyboardDidShow', handleKeyboardShow)
        };
    }, []);



    function finish(res: any) {
        setUserSaved(true);
        setUserId(res.id);
        navigation.goBack();

    }
    function finishRestore(res: any) {
        setUserId(res.id);
        setUserSaved(true);
        setSelect(res.course);
        navigation.goBack();

    }
    function sendEmail() {
        Toast.showWithGravity('Verifique seu email!', Toast.LONG, Toast.TOP);
        api.post('/users/email_send', {
            email
        }).then(res => {
            console.log(res.data)
            if (res.data.error == true) {
                return Toast.showWithGravity('Ocorreu um erro ao enviar email!', Toast.LONG, Toast.TOP);
            }
            setHash(res.data.hash);
        }).catch((res) => {
            console.log(res)
            return Toast.showWithGravity('Ocorreu um erro ao enviar email!', Toast.LONG, Toast.TOP);
        })
    }

    function validationEmail() {
        api.post('/users/validation', {
            email,
            code: code.toLowerCase(),
            hash
        }).then((res) => {
            if (res.data.email == email.toLowerCase()) {
                return saveUser(res.data, 'restore');
            }
            setCode('');
            console.log(res.data)
            return Toast.showWithGravity('Código inválido', Toast.LONG, Toast.TOP);

        })
    }

    const saveUser = async (res: any, type: string) => {
        if(res.id == null){
            console.log(res)
            return Toast.showWithGravity('Ocorreu um erro', Toast.LONG, Toast.TOP);

        }
        const value = {
            name,
            course: select,
            userID: res.id,
            email,
            userSaved: true
        }
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user', jsonValue);

        } catch (e) {
            Toast.showWithGravity('Ocorreu um erro', Toast.LONG, Toast.TOP);
        }
        if (type === 'create') {
            return finish(res);
        }
        return finishRestore(res)
    }

    function submit() {
        if(email.length === 0){
            return Toast.showWithGravity('Insira seu email', Toast.LONG, Toast.TOP);
        }
        if(name.length === 0){
            return Toast.showWithGravity('Insira seu nome', Toast.LONG, Toast.TOP);
        }
        setAguarde(true);
        api.post('/users/create', {
            course: select,
            email: email.toLowerCase(),
            like: false,
            name
        }).then(res => {
            console.log(res.data);
            if (res.data.message == 'email existente') {
                setIsCode(true);
                Toast.showWithGravity('Usuário existente', Toast.LONG, Toast.TOP);
                return sendEmail();

            }

            saveUser(res.data, 'create');
        })
        setAguarde(false)
    }


    if (isCode) {
        return (
            <>
                <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#258E4A', }} />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                        <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                    </TouchableOpacity>
                    <Text style={styles.textLive}>RADIO CAMPUS IFAC</Text>
                    <TouchableOpacity style={styles.ViewIconHeader} >
                        <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.containerInputsVefi}>
                    <View style={[styles.containerViewInput]}>
                        <Text style={styles.textLive}>Código</Text>
                        <TextInput style={styles.input}
                            placeholder={'Insira o código'}
                            value={code}
                            onChangeText={(e) => setCode(e)}
                        />
                    </View>

                    <TouchableOpacity disabled={aguarde} activeOpacity={0.4} style={styles.submit} onPress={() => validationEmail()} >
                        <Text style={styles.textSubmit}>Verificar</Text>
                    </TouchableOpacity>
                    </View>
                    {aguarde && <Text>Aguarde...</Text>}
                </View>

            </>
        );
    }
    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#258E4A', }} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={styles.textLive}>RADIO CAMPUS IFAC</Text>
                <TouchableOpacity style={styles.ViewIconHeader} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
            <Text style={[styles.textHeader]}>Cadastro</Text>
                <View style={[styles.containerViewInput]}>
                    <Text style={styles.textLive}>Nome</Text>
                    <TextInput style={styles.input}
                        placeholder={'Maria Joaquina'}
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />
                </View>
                <View style={[styles.containerViewInput]}>
                    <Text style={styles.textLive}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder={'mariajoaquina@gmail.com'}
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />
                </View>
                {Platform.OS === 'ios' ?
                    <View style={[styles.containerViewInput]}>
                        <Text style={styles.textLive}>Curso</Text>
                        <PickerIOS
                            itemStyle={styles.input}
                            selectedValue={select}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelect(String(itemValue))
                            }>
                            <PickerIOS.Item label="REDES DE COMPUTADORES" value="REDES DE COMPUTADORES" color='black' />
                            <PickerIOS.Item label="INFORMÁTICA PARA INTERNET" value="INFORMÁTICA PARA INTERNET" color='black' />
                            <PickerIOS.Item label="EDIFICAÇÕES" value="EDIFICAÇÕES" color='black' />
                        </PickerIOS>
                    </View>

                    :
                    <View style={[styles.containerViewInput]}>
                        <Text style={styles.textLive}>Curso</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={select}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelect(String(itemValue))
                                }>
                                <Picker.Item label="REDES DE COMPUTADORES" value="REDES DE COMPUTADORES" color='black' />
                                <Picker.Item label="INFORMÁTICA PARA INTERNET" value="INFORMÁTICA PARA INTERNET" color='black' />
                                <Picker.Item label="EDIFICAÇÕES" value="EDIFICAÇÕES" color='black' />
                            </Picker>
                        </View>
                    </View>}
                {isVisibleSubmit && <>
                    <TouchableOpacity disabled={aguarde} activeOpacity={0.4} style={styles.submit} onPress={() => submit()}>
                        <Text style={styles.textSubmit}>Cadastrar</Text>
                    </TouchableOpacity></>}
                {aguarde && <Text>Aguarde...</Text>}
                {recover && <TouchableOpacity onPress={() => { }}><Text style={styles.textLive}>Recuperar usuário</Text></TouchableOpacity>}
            </View>

        </>
    );
}
export default Auth;