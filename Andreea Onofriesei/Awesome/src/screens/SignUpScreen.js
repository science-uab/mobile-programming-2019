import React, {Component} from 'react';
import {
    StyleSheet,View,Text,Button, TextInput, TouchableOpacity
} from 'react-native';
import {Dimensions} from 'react-native';
import * as firebase from 'firebase';

class SignUpScreen extends Component{
    static navigationOptions = {
        title: 'Registration',
        headerTitleStyle:{
            fontFamily: 'Futura-CondensedExtraBold',
            fontSize: 32,
            fontWeight: 'bold'
        }
    };
    constructor(props) {
        super(props);

        this.state = ({
            email: '',
            password: '',
            errorMessage: null
        });
    }

   signUp = () => {
       const {email, password} = this.state;
       if (email.trim() !== "" && password.trim() !== "") {
           firebase
               .auth()
               .createUserWithEmailAndPassword(email, password)
               .then(() => this.props.navigation.navigate('Main'))
               .catch(error => this.setState({errorMessage: error.message}))
       } else {
           Alert.alert(
               'Warning',
               'Enter email and password',
               [
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: true}
           )
       }
   };

    render(){
        return(
            <View style={styles.container}>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput style={styles.registration_form}
                           placeholder='Email'
                            autoCorrect={false}
                           autoCapitalize='none'
                           keyboardType='email-address'
                           onChangeText={(email) => this.setState({email})}
                />
                <TextInput style={styles.registration_form}
                            placeholder='Password'
                            autoCorrect={false}
                           autoCapitalize='none'
                           secureTextEntry={true}
                           onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.signUp(this.state.email,this.state.password)}>
                    <Text style={{textAlign: 'center', fontFamily: 'Futura-CondensedExtraBold', fontSize: 30, fontWeight: 'bold',color:'white'}}> SIGN UP </Text>
                </TouchableOpacity>
                <Button title={'Already have an account? Log in instead.'} onPress={() => this.props.navigation.navigate('Login')} style={{fontFamily:'Futura-CondensedExtraBold', padding:10}}/>
            </View>
        )
    }
}
export default SignUpScreen;
var fullWidth = Dimensions.get('window').width;
var fullHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    registration_form :{
        width: fullWidth,
        height:40,
        flexDirection: 'row',
        fontFamily: 'Futura-CondensedExtraBold',
        fontSize: 25,
        color : '#4b4b4b',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: 'grey',
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        width:200,
        height: 50,
        backgroundColor: '#9acaff',
        borderRadius:10,
        alignItems: 'center',
        margin:15,
        padding:10
    }
});