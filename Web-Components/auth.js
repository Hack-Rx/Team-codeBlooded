// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //extra user details
    var firebaseRef = firebase.database().ref();

        var Fullname = fullname.value;
        var Username = username.value;
        var Age = age.value;
        var Email = email1.value

        firebaseRef.child("User Profiles").child(Username).child("Full name").set(Fullname);
        firebaseRef.child("User Profiles").child(Username).child("Username").set(Username);
        firebaseRef.child("User Profiles").child(Username).child("Age").set(Age);
        firebaseRef.child("User Profiles").child(Username).child("Email").set(Email);

    //console.log(email, password)
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
    });
});
/*
// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
        // success login
        window.alert("Login Success");
    })
}) */