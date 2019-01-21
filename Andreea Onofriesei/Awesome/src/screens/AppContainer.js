import {createAppContainer, createStackNavigator} from "react-navigation";
import Loading from './Loading';
import HomeScreen from "./HomeScreen";
import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignUpScreen";
import Main from './Main';
import ScanScreen from "./ScanScreen";

const AppNavigator = createStackNavigator(
    {   
        Loading: {screen : Loading},
        Home : {screen : HomeScreen},
        Login : {screen : LogInScreen},
        Signup : {screen : SignUpScreen},
        Main : {screen : Main},
        Scan : {screen : ScanScreen}
    },
    {
      initialRouteName: 'Home'
    },
    {
    defaultNavigationOptions: {
        headerTitleStyle:{
            fontFamily: 'Futura-CondensedExtraBold',
            fontSize: 32,
            fontWeight: 'bold'
        }
    }
    }

);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

