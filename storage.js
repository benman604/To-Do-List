var firebaseConfig = {
    apiKey: "AIzaSyA2RnHS1nI2nAfFG-XX-j-BgsRd_N3YhM0",
    authDomain: "to-do-list-efde4.firebaseapp.com",
    databaseURL: "https://to-do-list-efde4.firebaseio.com",
    projectId: "to-do-list-efde4",
    storageBucket: "to-do-list-efde4.appspot.com",
    messagingSenderId: "741087904263",
    appId: "1:741087904263:web:d11e30902db256d41220a2",
    measurementId: "G-WPJVHKFWM4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider()
var database = firebase.database()
var dbrefUserinfo
var dbrefData
var uid

function signin(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        signedInAction(result.user)
    }).catch(function(error) {
        console.log(error)
    });
}

function signout(){
    firebase.auth().signOut().then(function() {
        signedOutAction()
    }).catch(function(error) {
        alert("There was an error signing out! Error is \n " + error.message)
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        signedInAction(user)
    } else {
        signedOutAction()
    }
});

function signedInAction(user){
    uid = user.uid
    dbrefUserinfo = database.ref('users/' + uid + '/userInfo/')
    dbrefData = database.ref('users/' + uid + '/data/')
    dbrefUserinfo.set({
        name : user.displayName,
        email : user.email,
        phone: user.phoneNumber
    })
    $('#pfp').attr('src', user.photoURL)
    $('#uname').text(user.displayName)
    $('.signedin').show()
    $('.signedout').hide()
}

function signedOutAction(){
    $('#pfp').attr('src', 'user-defualt.webp')
    $('.signedin').hide()
    $('.signedout').show()
}

function storeTodoData(key, value){

}

function getTodoData(key){

}