import React, {Component} from 'react';
import {
    StyleSheet,View,Text,Button, TextInput, TouchableOpacity
} from 'react-native';
import {Dimensions} from 'react-native';
import * as firebase from 'firebase';
import * as ActionTypes from '../../src/redux/actionTypes';
import {connect} from 'react-redux';

class LogInScreen extends Component{
    static navigationOptions = {
        title : ' Log in',
        headerTitleStyle:{
            fontFamily: 'Futura-CondensedExtraBold',
            fontSize: 32,
            fontWeight: 'bold'
        }
    };
    constructor(props){
        super(props);

        this.state = ({
            email : '',
            password: '',
            errorMessage: null
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log('login componentWillReceiveProps', JSON.stringify(nextProps.user));
        if(nextProps.user.userInfo) {
            this.props.navigation.navigate('Main');
        }
    }


    logIn = () => {
        let userInfo = {
            email: this.state.email,
            password: this.state.password
        };

        if (userInfo.email.trim() !== "" && userInfo.password.trim() !== "") {
            this.props.dispatch({type: ActionTypes.LOGIN, userInfo});
            console.log("1");
        }
        const {email, password} = this.state;
        if (email.trim() !== "" && password.trim() !== "") {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
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
    render() {
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
                <TouchableOpacity style={styles.button} onPress={()=>this.logIn(this.state.email,this.state.password)}>
                    <Text style={{textAlign: 'center', fontFamily: 'Futura-CondensedExtraBold', fontSize: 30, fontWeight: 'bold',color:'white'}}> LOG IN </Text>
                </TouchableOpacity>
                <Button title={'Don\'t have an account? Sign up.'} onPress={() => this.props.navigation.navigate('Signup')}/>
            </View>
        )
    }
}

    const mapStateToProps = state => ({
        user: state.user
    });
    const mapDispatchToProps = dispatch => ({
        dispatch: dispatch
    });
export default connect(mapStateToProps,mapDispatchToProps)(LogInScreen);

var fullWidth = Dimensions.get('window').width;
var fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    registration_form :{
        width: fullWidth,
        flexDirection: 'row',
        fontFamily: 'Futura-CondensedExtraBold',
        fontSize: 30,
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
