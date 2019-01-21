import * as firebase from 'firebase'
export const User = {
    loginWithEmail: (userParam) => {
        console.log('firebase user', userParam);
        return firebase.auth()
            .signInWithEmailAndPassword(userParam.userInfo.email, userParam.userInfo.password)
            .then(response => response)
    }
};