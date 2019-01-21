import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import AppContainer from './src/screens/AppContainer';
import firebaseConfig from "./src/firebase";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootSaga from './src/redux/saga/saga';
import allReducers from './src/redux/reducer';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    );
  }
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});