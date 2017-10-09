import{firebaseModule}from"firebase-config";class DataBase{constructor(e){this.database=e.database,this.auth=e.auth}createUser(e){return this.auth.createUserWithEmailAndPassword(e.email,e.password)}signInWithEmail(e){return this.auth.signInWithEmailAndPassword(e.email,e.password)}signOut(){return this.auth.signOut()}getCurrentUser(){return this.auth.currentUser}onAuthStateChanged(e){return this.auth.onAuthStateChanged(function(t){e(t)})}updateUserProfile(e){return this.getCurrentUser().updateProfile(e)}resetPassword(e){return this.auth.sendPasswordResetEmail(e)}createReview(e){this.database.ref("reviews/"+e.authorUid+e.title).set(e).catch(e=>{console.log(e.message)})}getAllReviews(){return new Promise((e,t)=>{this.database.ref("reviews/").once("value",t=>{e(t.val())})})}getReviews(e){return new Promise((t,a)=>{this.database.ref("reviews/").orderByChild(e.prop).equalTo(e.value.toUpperCase()).once("value",e=>{t(e.val())})})}getReview(e){return new Promise((t,a)=>{this.database.ref("reviews/").child(e).once("value",e=>{t(e.val())})})}createComment(e){this.database.ref("comments/").push(e).catch(e=>{console.log(e.message)})}getComments(e){return new Promise((t,a)=>{this.database.ref("comments/").orderByChild(e.prop).equalTo(e.value).once("value",e=>{t(e.val())})})}}const dataBase=new DataBase(firebaseModule);export{dataBase};