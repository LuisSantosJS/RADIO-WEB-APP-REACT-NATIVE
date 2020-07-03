import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Keyboard,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import * as EmailValidator from 'email-validator';
import styles from './styles';
import { Picker } from '@react-native-community/picker';
import api from '../../services/api';
import { useUserID, useSavedUser, useEmail, useNameUser, useCourse, useControlSave } from '../../Context/contextPlayer';

const Auth: React.FC = () => {
    const navigation = useNavigation();
    const [isVisibleSubmit, setIsVisibleSubmit] = useState<boolean>(true);
    const [select, setSelect] = useState<string>('REDES DE COMPUTADORES');
    const [name, setName] = useState<string>('');
    const [aguarde, setAguarde] = useState<boolean>(false);
    const [recover, setRecover] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [hash, setHash] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);

    const [userSaved, setUserSaved] = useState<boolean>(false);
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

    async function handleSubmit() {
        setAguarde(true)
        const validEmail = EmailValidator.validate(email);
        if (!validEmail) {
            setAguarde(false)
            return Toast.showWithGravity('Insira um email válido!', Toast.LONG, Toast.TOP);
        }
        if (name.length == 0) {
            setAguarde(false)
            return Toast.showWithGravity('Insira seu nome!', Toast.LONG, Toast.TOP);
        }

        try {
            const DATA = {
                name,
                email,
                course: select
            }
            const res = await api.post('users/create', DATA);
            if (res.data.message == 'email existente') {
                setRecover(true);
                setAguarde(false)
                return Toast.showWithGravity('Usuario existente', Toast.LONG, Toast.TOP);
            }
            console.log('dados', res.data)
            setUserId(Number(res.data.id));
            setUserSaved(true);
            setSelect(String(res.data.course));
            setName(res.data.name);
            setEmail(res.data.email)
            Toast.showWithGravity('Usuario Criado', Toast.LONG, Toast.TOP);
            return finish()

        }
        catch (err) {
            setAguarde(false)
            return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
        }


    }
    async function sendEmail() {
        setAguarde(true)
        if (email.length == 0) {
            setAguarde(false)
            return Toast.showWithGravity('Insira seu email', Toast.LONG, Toast.TOP);
        }
        setIsCode(true);
        Toast.showWithGravity('Verifique seu email', Toast.LONG, Toast.TOP);
        try {
            const DATA = {
                email: email
            }
            const res = await api.post('users/email_send', DATA);
            setHash(res.data.hash);
            if (res.data.error == true) {
                return Toast.showWithGravity('ERRO AO ENVIAR EMAIL', Toast.LONG, Toast.TOP);
            }
            return Toast.showWithGravity('Verifique seu email', Toast.LONG, Toast.TOP);
        } catch (err) {
            setAguarde(false)
            return Toast.showWithGravity('Ocorreu um erro ao enviar email', Toast.LONG, Toast.TOP);
        }

    }

    async function finish() {
        const value = {
            userId,
            userSaved: true,
            course: select,
            name,
            email
        }
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user', jsonValue);
            return navigation.goBack();
        } catch (e) {
            console.log('errroorororoorr')
        }
        return  setAguarde(false)
    }

    async function validateEmail() {
        setAguarde(true)
        if (code.length == 0) {
            setAguarde(false)
            return Toast.showWithGravity('Insira o código', Toast.LONG, Toast.TOP);
        }
        try {
            const DATA = {
                hash: hash,
                email: email,
                code: code.toLowerCase()
            };
            const res = await api.post('users/validation', DATA)
            if (res.data.message == "validator inválido") {
                setAguarde(false)
                return Toast.showWithGravity('Código inválido', Toast.LONG, Toast.TOP);
            }
            console.log('dados', res.data)
            setUserId(Number(res.data.id));
            setUserSaved(true);
            setSelect(String(res.data.course));
            setName(res.data.name);
            setEmail(res.data.email)
            Toast.showWithGravity('Usuário Recuperado', Toast.LONG, Toast.TOP);
            return finish();
        }
        catch{
            setAguarde(false)
            return Toast.showWithGravity('Ocorreu um erro!', Toast.LONG, Toast.TOP);
        }

    }
    if (isCode) {
        return (
            <>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                        <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                    </TouchableOpacity>
                    <Text style={styles.textLive}>THE STUDENT VOICE</Text>
                    <TouchableOpacity style={styles.ViewIconHeader} >
                        <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={[styles.containerViewInput]}>
                        <Text style={styles.textLive}>Código</Text>
                        <TextInput style={styles.input}
                            placeholder={'Insira o código'}
                            value={code}
                            onChangeText={(e) => setCode(e)}
                        />
                    </View>

                    <TouchableOpacity disabled={aguarde} activeOpacity={0.4} style={styles.submit} onPress={validateEmail} >
                        <Text style={styles.textSubmit}>Verificar</Text>
                    </TouchableOpacity>
                    {aguarde && <Text>Aguarde...</Text>}
                </View>

            </>
        );
    }
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={styles.textLive}>THE STUDENT VOICE</Text>
                <TouchableOpacity style={styles.ViewIconHeader} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
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
                {isVisibleSubmit && <>
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
                    </View>

                    <TouchableOpacity disabled={aguarde} activeOpacity={0.4} style={styles.submit} onPress={handleSubmit}>
                        <Text style={styles.textSubmit}>Cadastrar</Text>
                    </TouchableOpacity></>}
                {aguarde && <Text>Aguarde...</Text>}
                {recover && <TouchableOpacity onPress={sendEmail}><Text style={styles.textLive}>Recuperar usuário</Text></TouchableOpacity>}
            </View>

        </>
    );
}
export default Auth;