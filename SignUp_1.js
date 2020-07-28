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
const docRef = firestore.doc("samples/sandwichData");
//اي شي


// const outputHeader = document.querySelector("#hotDogOutput");
// const inputTextField = document.querySelector("#latesHotDogStatus");
// const saveButton = document.querySelector("#saveButton");
// const loadButton = document.querySelector("#loadButton");
// const updateButton = document.querySelector("#updateButton");
// const deleteButton = document.querySelector("#deleteButton");
const userName = document.querySelector("#userName");
const eMail = document.querySelector("#eMail");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const submitButton = document.querySelector("#submit");









submitButton.addEventListener("click", function() {
    const userNameValue = userName.value;
    const eMailValue = eMail.value;
    const nameValue = name.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    const docRef = firestore.doc("Users/" + userNameValue);




    docRef.get().then(function(doc) {
        if (doc && doc.exists) {
            console.log("User Name Used!");
            userName.value = "User Name Used!"
            userName.style.color = "#ff0000"
        } else {
            docRef.set({
                userName: userNameValue,
                eMail: eMailValue,
                name: nameValue,
                password: passwordValue

            }).then(function() {
                console.log("Data saved!");
            }).catch(function(error) {
                console.log("Got an Error: ", error)
            });
        }
    }).catch(function(error) {
        console.log("Got an Error: ", error);
    });

});






// loadButton.addEventListener("click", function() {

//     docRef.get().then(function(doc) {
//         if (doc && doc.exists) {
//             const myData = doc.data();
//             outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
//         }
//     }).catch(function(error) {
//         console.log("Got an Error: ", error);
//     });
// });








// updateButton.addEventListener("click", function() {
//     const textToUpdate = inputTextField.value;
//     // Does not Create New collection if not Exists
//     // Does not Delete the other Fields, so no need to use merge: true 
//     docRef.update({
//         hotDogStatus: textToUpdate
//     }).then(function() {
//         console.log("Status Updated!");
//     }).catch(function(error) {
//         console.log("Got an Error: ", error)
//     });
// });





// deleteButton.addEventListener("click", function() {

//     docRef.update({
//         test: firebase.firestore.FieldValue.delete()
//     }).then(function() {
//         console.log("Successfully deleted!");
//     }).catch(function(error) {
//         console.log("Got an Error: ", error)
//     });
// });