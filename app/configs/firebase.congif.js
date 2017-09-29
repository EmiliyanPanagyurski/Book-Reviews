const firebaseModule = (function () {

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyBZkLiK66MjtsCekkev1vaTLTAMS7RbvjY",
        authDomain: "book-reviews-6be1a.firebaseapp.com",
        databaseURL: "https://book-reviews-6be1a.firebaseio.com",
        projectId: "book-reviews-6be1a",
        storageBucket: "",
        messagingSenderId: "247291411900"
    };

    firebase.initializeApp(config);

    const database = firebase.database();
    const auth = firebase.auth();

    return {
        database,
        auth
    };
}());

export { firebaseModule };