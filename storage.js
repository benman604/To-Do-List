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
var dbrefDataTasks
var dbrefDataCategories
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
        $('#list').empty()
        $('#example').show()
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
    dbrefDataTasks = database.ref('users/' + uid + '/data/tasks/').child('val')
    dbrefDataCategories = database.ref('users/' + uid + '/data/categories/').child('val')

    dbrefUserinfo.set({
        name : user.displayName,
        email : user.email,
        phone: user.phoneNumber
    })

    dbrefDataTasks.on('value', snap => {
        console.log(snap.val())

        tasks = []
        var savedtasks = JSON.parse(snap.val())
        if(savedtasks != null){
            for(var i=0; i < savedtasks.length; i++){
                var newtask = new Task(savedtasks[i].title, savedtasks[i].description, savedtasks[i].category, savedtasks[i].due, savedtasks[i].done, savedtasks[i].pinned)
                newtask.createdate = savedtasks[i].createdate
                tasks.push(newtask)
            }
    
            $('#example').hide()
    
            tasks = reorder2()
            for(var i=0; i < tasks.length; i++){
                showTask(i)
            }
        }

        reloadList()
    })

    dbrefDataCategories.on('value', snap => {
        console.log(snap.val())
        categories = JSON.parse(snap.val())
        updateCategories()
    })

    $('#pfp').attr('src', user.photoURL)
    $('#uname').text(user.displayName)
    $('.signedin').show()
    $('.signedout').hide()
    $('#signin-promo').hide()
}

function signedOutAction(){
    $('#pfp').attr('src', 'user-defualt.webp')
    $('.signedin').hide()
    $('.signedout').show()
    if(localStorage.getItem('tasks') == null){
        $('#list').empty()
        $('#example').show()
    }
}

function storeTodoData(key, value){
    if(uid != undefined){
        database.ref('users/' + uid + '/data/' + key).set({
            val: value
        })
    } else{
        localStorage.setItem(key, value)
    }
}