firebase.initializeApp({
    apiKey: "AIzaSyDIMxJWXlRi1snPkYoTKMUsm8DIkKidG8I",
    authDomain: "picomega-8b1c6.firebaseapp.com",
    databaseURL: "https://picomega-8b1c6.firebaseio.com",
    projectId: "picomega-8b1c6",
    storageBucket: "picomega-8b1c6.appspot.com",
    messagingSenderId: "520392487429",
    appId: "1:520392487429:web:969c4681a22ab2ad6ae26c",
    measurementId: "G-S0ZK3K7XH9"
});

var firestore = firebase.firestore();

//z
const docRef = firestore.doc("samples/sandwichData");
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latesHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");
const updateButton = document.querySelector("#updateButton");
const deleteButton = document.querySelector("#deleteButton")



saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    // It's Create New collection if not Exists
    // t Delete the other Fields, so you NEED to use merge: true
    docRef.set({
        hotDogStatus: textToSave
    }, { merge: true }).then(function() {
        console.log("Status saves!");
    }).catch(function(error) {
        console.log("Got an Error: ", error)
    });
});


loadButton.addEventListener("click", function() {

    docRef.get().then(function(doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
    }).catch(function(error) {
        console.log("Got an Error: ", error);
    });
});



// getRealtimeUpdates = function() {
//     docRef.onSnapshot(function(doc) {
//         if (doc && doc.exists) {
//             const myData = doc.data();
//             outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
//         }
//     })
// }


// getRealtimeUpdates()

updateButton.addEventListener("click", function() {
    const textToUpdate = inputTextField.value;
    // Does not Create New collection if not Exists
    // Does not Delete the other Fields, so no need to use merge: true 
    docRef.update({
        hotDogStatus: textToUpdate
    }).then(function() {
        console.log("Status Updated!");
    }).catch(function(error) {
        console.log("Got an Error: ", error)
    });
});







deleteButton.addEventListener("click", function() {

    docRef.update({
        test: firebase.firestore.FieldValue.delete()
    }).then(function() {
        console.log("Successfully deleted!");
    }).catch(function(error) {
        console.log("Got an Error: ", error)
    });
});