import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button} from 'react-native'
import * as firebase from 'firebase';
import {connect} from 'react-redux';
class Main extends React.Component {
    static navigationOptions = {
        title : 'Student - Mobile',
        headerTitleStyle:{
            fontFamily: 'Futura-CondensedExtraBold',
            fontSize: 32,
            fontWeight: 'bold'
        }
    };
    state = {
        currentUser: null
    };
    componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
    }
    componentWillMount() {
        let user = this.props.user.email;
        console.log('main will mount props', user);
        if(user != null) {
            this.setState({currentUser: user})
        }
    }
    handleSignOut = () => {
        if(this.state.currentUser != null) {
            firebase
                .auth()
                .signOut()
                .then(() => this.props.navigation.navigate('Home'))
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    };
    render() {
        const { currentUser } = this.state;
        return (
            <View style={styles.container}>
                <Text style={{position: 'absolute',top: 50, fontFamily: 'Futura-CondensedExtraBold',fontSize: 22}}>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <View style={{position: 'absolute', top: 130, backgroundColor:'#9acaff',width:100,height:40, borderRadius:10}}>
                    <Button title='Scan' color='white' onPress={() => this.props.navigation.navigate('Scan')}/>
                </View>
                <View style={{position: 'absolute', bottom : 10, backgroundColor:'#9acaff',width:100, height:40, borderRadius:10}}>
                    <Button title="Sign Out" color='white' onPress={this.handleSignOut} />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});