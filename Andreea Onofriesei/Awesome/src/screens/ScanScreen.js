import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import * as firebase from 'firebase';
export default class ScanScreen extends React.Component {
    static navigationOptions = {
        title: 'Scan',
        headerTitleStyle:{
            fontFamily: 'Futura-CondensedExtraBold',
            fontSize: 32,
            fontWeight: 'bold'
        }
    };
    constructor(props)
    {
        super(props);

        this.state = {
            hasCameraPermission: null,
            currentUser : null
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { currentUser } = firebase.auth();
        console.log(currentUser);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.setState({ currentUser });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}

                />
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '-' + dd + '-' + yyyy;
        console.log(today);
        var random = Math.floor(Math.random() * 100 + 1);
        //alert(`Bar code with type ${type}  and data ${data} has been scanned!`);
        firebase.database().ref('presence/'+today+'_'+random).set({
            presence_id : data,
            user_email : this.state.currentUser.email
        }).then( alert('Presence was added'))
        .catch(error => alert('Some error occurred.'))


    }
}