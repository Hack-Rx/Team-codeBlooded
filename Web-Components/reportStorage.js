function reportSubmit(){

    //window.alert("Values Added");

    var firebaseRef = firebase.database().ref();

    var Fullname = fullname.value;
    var Phonenumber = phonenumber.value;
    var Address = address.value;
    var Relation = relation.value
    var Anythingelse = anythingelse.value

   // firebaseRef.child("Text").set(messageText);
   firebaseRef.child("Reports").child(Fullname).child("Full name").set(Fullname);
   firebaseRef.child("Reports").child(Fullname).child("Phonenumber").set(Phonenumber);
   firebaseRef.child("Reports").child(Fullname).child("Address").set(Address);
   firebaseRef.child("Reports").child(Fullname).child("Relation").set(Relation);
   firebaseRef.child("Reports").child(Fullname).child("Anythingelse").set(Anythingelse);

}