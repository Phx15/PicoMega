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

// var firestore = firebase.firestore();
// const docRef = firestore.doc("samples/sandwichData");
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




var db = firebase.firestore();
var usersRef = db.collection("Users");







submitButton.addEventListener("click", function() {
    const userNameValue = userName.value;
    const eMailValue = eMail.value;
    const nameValue = name.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    const docRef = usersRef.doc(userNameValue);

    var cond0 = false;
    var cond1 = false;
    var cond2 = false;
    var cond3 = false;

    docRef.get().then(function(doc) {
        if (doc && doc.exists) {
            //This in case The User Name is Used
            delWarning("userName");
            delWarning("eMail");
            delWarning("name");
            delWarning("password");
            delWarning("confirmPassword");
            warning("User Name Used!", "userName");


            // console.log(doc.data().eMail);

        } else {
            delWarning("userName");
            delWarning("eMail");
            delWarning("name");
            delWarning("password");
            delWarning("confirmPassword");
            // docRef.set({
            //     userName: userNameValue,
            //     eMail: eMailValue,
            //     name: nameValue,
            //     password: passwordValue

            // }).then(function() {
            //     console.log("Data saved!");
            // }).catch(function(error) {
            //     console.log("Got an Error: ", error)
            // });


            // User Name validation 

            switch (isUserName(userNameValue)) {
                case 0:
                    cond0 = true;
                    // console.log("DONE!");
                    break;
                case 1:
                    warning("Must be 3 letters at least!", "userName");

                    break;
                case 2:
                    warning("Can't contain special characters or Space", "userName");

                    break;

                default:
                    warning("An Error has Occurred!", "userName");
                    //console.log("An Error has Occurred!");
            }




            // Email validation

            if (!validateEmail(eMailValue)) { // there is problem in the formt of E-mail

                warning("Enter valid format!", "eMail");
            } else {
                delWarning("eMail");
                isNewEmail(eMailValue).then(function(data) {
                    if (data) {

                        cond1 = true;

                        if (cond0 && cond1 && cond2 && cond3) { // I but the segment of code here because this code execute lately


                            docRef.set({
                                userName: userNameValue,
                                eMail: eMailValue,
                                name: nameValue,
                                password: passwordValue

                            }).then(function() {
                                console.log("Data saved!");
                                alert("Your Data has been Saved :)");
                                location.reload();

                            }).catch(function(error) {
                                console.log("Got an Error: ", error)
                            });




                        } // END of the segment
                    } else {
                        // console.log("The E-mail is Registered Already")
                        warning("The E-mail is Registered Already!", "eMail");
                    }

                })
            }


            //Name validation

            switch (isName(nameValue)) {
                case 0:
                    cond2 = true;
                    // console.log("DONE!");
                    break;
                case 1:
                    warning("Must be 3 letter at least!", "name");
                    //console.log("Must be 3 letter at least!");
                    break;
                case 2:
                    warning("Must contain English Letters only", "name");
                    //console.log("Must contain English Letters only");
                    break;

                default:
                    warning("An Error has Occurred!", "name");
                    //console.log("An Error has Occurred!");
            }

            //Password validation

            switch (isPassword(passwordValue, confirmPasswordValue)) {
                case 0:
                    cond3 = true;
                    // console.log("DONE!");
                    break;
                case 1:
                    warning("The two passwords Must be the SAME!", "confirmPassword");
                    //console.log("The two passwords Must be the SAME!");
                    break;
                case 2:
                    warning("Must contain At least one Letter!", "password");
                    //console.log("Must contain At least one Letter!");
                    break;
                case 3:
                    warning("Must be 6 digits at least!", "password");
                    //console.log("Must be 6 digits at least!");
                    break;
                default:
                    warning("An Error has Occurred!", "confirmPassword");
                    //console.log("An Error has Occurred!");
            }






        }
    }).catch(function(error) {
        console.log("Got an Error: ", error);
    });









});



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function break_() {

    await sleep(6000);
    return true
}

function warning(text, input) {
    var para = document.createElement("p"); //<p></p>
    var node = document.createTextNode(text);
    para.appendChild(node);

    para.style.color = "#ffffff"
    para.style.textAlign = "left"
    para.style.fontSize = "large"
    para.style.marginBottom = "2px"
    para.style.marginLeft = "20px"
    para.id = input + "-warning"
    var element = document.getElementById(input);

    element.after(para);

}


function delWarning(input) {
    var warnName = input + "-warning"
    try {
        var warnHolder = document.getElementById(warnName)
        warnHolder.parentNode.removeChild(warnHolder)
    } catch (err) {

    }

}



function isUserName(userName) {



    if (!(/^[A-Za-z0-9-_]*$/.test(userName)) || !(/(\s)*$/.test(userName))) {
        // "Can Not contain special characters"
        return 2
    }

    if (userName.length < 3) {
        // return "Must be 3 letters at least!"
        return 1
    }


    return 0

}


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function isNewEmail(email) {
    var isNew = true
    await
    usersRef
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                DBemail = doc.data().eMail

                if (email.localeCompare(DBemail) == 0) {
                    isNew = false

                }

                // console.log(doc.data().eMail);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    return isNew
}


function isName(name) {
    name = name.trim(); // to remove the white space


    if (!(/^[A-Za-z\s]*$/.test(name))) {
        // "Must contain English Letters only"
        return 2
    }

    if (name.length < 3) {
        // return "Must be 3 letters at least!"
        return 1
    }



    return 0

}


function isPassword(str1, str2) {
    str1 = str1.trim(); // to remove the white space
    str2 = str2.trim();
    if (str1.localeCompare(str2) != 0) {
        // return "The two passwords Must be the SAME!"
        return 1
    }

    if (!(str1.match(/[a-z]/g) || str1.match(/[A-Z]/g))) {
        // return "Must contain At least one Letter!"
        return 2
    }

    if (str1.length < 6) {
        // return "Must be 6 digits at least!"
        return 3
    }



    return 0
}






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