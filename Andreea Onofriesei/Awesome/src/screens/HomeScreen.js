import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Image, ImageBackground} from 'react-native';
import * as firebase from "firebase";

class HomeScreen extends Component{
    static navigationOptions = {
        title: 'Welcome',
        headerTitleStyle:{
            fontFamily: 'Futura-CondensedExtraBold',
            fontSize: 32,
            fontWeight: 'bold'
        }
    };

    state = {
        currentUser : null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Home')
        });
        var {currentUser} = firebase.auth();
        this.setState({currentUser: currentUser});
    };

    render() {

        return(
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems:'center', flexDirection: 'row', position:'absolute', top:'30%'}}>
                    <Image source={require('../../media/lightbulb.png')} style={styles.logo}/>
                    <Text style={{textAlign: 'center', fontFamily:'Futura-CondensedExtraBold',fontSize:34,fontWeight: 'bold'}}> Student Mobile </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems:'center', flexDirection: 'row', position:'absolute', bottom: '20%'}}>
                   <ImageBackground source={require('../../media/button.png')} style={{width: 130, height:40}}>
                        <Button style={styles.buttons} color='white' title={'LOG IN'} onPress={() => this.props.navigation.navigate('Login')}/>
                   </ImageBackground>
                    <ImageBackground source={require('../../media/button.png')} style={{width: 130, height:40}}>
                        <Button style={styles.buttons} color='white' title={'SIGN UP'} onPress={() => this.props.navigation.navigate('Signup')}/>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontFamily: 'Futura-CondensedExtraBold'
    },
    buttons: {
        color: 'black'
    },
    logo :{
        width: 100,
        height: 100,
    }
});
