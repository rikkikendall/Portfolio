
var config = {
    apiKey: "AIzaSyBEPme4kqo6xH8RRDbr2dNofVLfA1a4g9M",
    authDomain: "cs290-cards.firebaseapp.com",
    databaseURL: "https://cs290-cards.firebaseio.com",
    projectId: "cs290-cards",
    storageBucket: "gs://cs290-cards.appspot.com/",
    messagingSenderId: "736021692910"
};
firebase.initializeApp(config);
var database = firebase.database();
var rootRef = database.ref();
var storageRef = firebase.storage().ref();
var usersRef = database.ref('users');
var activityRef = database.ref('Log');
// var imgRef = database.ref('images');
//var fb = firebase.initializeApp(config).database();
////var datab = fb.database();

////var listRef = rootRef.child('lists').push();
////REFERENCES for Use

//var storageRef = firebase.storage().ref();

//const app = new Vue({
// Vue.use(VueFire);

var app = new Vue({
    el: "#app",
    data: {
        cards: [],
        users: [],
        lists: [],
        Username: "",
        name: "",
        Description: "",
        email: "",
        login: false,
        horizontal: false,
        See: null,
        ListName: "",
        ChangeListName: null,
        ChangeUser: false,
        ChangeCard: false,
        ChangeDueDate: false,
        ChangeCategory: false,
        CardClicked: null,
        ChangeCardDescription: false,
        Category: "Uncategorized",
        Comment: null,
        index: null,
        cindex: null,
        SelectedColor: "#0000FF",
        colors: ["#fff", "#0404B4"],
        select: document.getElementById('select'),
        startscreen: true,
        PictureName: "",
        Orientation: "normal",
        newItem: '',
        curImage:'',
        text: "",
        Logs: [],
        NewImage: null
    },
       firebase: {
       users: usersRef,
       // images: imagesRef
   },
    methods: {
    	addToDatabase: function(key, data){
            database.ref("/"+key).set(data);
        },
//        onEnterClicked: function() {
//            alert();
//        },
    	ListTitle: function() {
        	this.ChangeListName = null;
        	this.addToDatabase("lists", this.lists);
        },
        CardCategory: function() {
            this.ChangeCategory = false;
            this.addToDatabase("lists", this.lists);
        },
        CardDescription: function() {
        	this.ChangeCardDescription = false;
        	this.addToDatabase("lists", this.lists);
        },
        CardItself: function() {
        	this.ChangeCard = false;
        	this.addToDatabase("lists", this.lists);
        },
        CardDueDate: function() {
        	this.ChangeDueDate = false;
        	this.addToDatabase("lists", this.lists);
        },
        ActivityLog: function(message) {
            var log = new Date();
            this.AddLog = log.getHours() + ":" + log.getMinutes() + " - " + message;
            this.Logs.push(this.AddLog);
            activityRef.push({
                activity: this.AddLog
            });
        },
        changeBackground: function(color) {
             document.body.style.background = color;
        },
        // BackgroundColor: function(val) {
        // if (menu.value == '1') {
        //     document.getElementById('optionID') = '#000';
        // } else if (menu.value == '2') {
        //     this.CardCategory = To-Do;
        // }  else if (menu.value == '3') {
        // }
        // },
        // BackgroundC: function() {
        //     select.options[select.selectedIndex].style.backgroundColor = 'red';
        // }
        optionsSelect: function(val) {
        if (menu.value == '1') {
            this.Category = "";
            this.addToDatabase("lists", this.lists);
        } else if (menu.value == '2') {
            this.Category = To-Do;
            this.addToDatabase("lists", this.lists);
        }  else if (menu.value == '3') {
            this.Category = Personal;
            this.addToDatabase("lists", this.lists);
        }
        },
        newCard: function(list) {
            var log = new Date();
            list.cards.push({
           // id:  Date.getDay() + "/" + Date().getMonth() + "/" + Date().getFullYear(),
            id: Date.now(),
            Name: list.ChangeText,
            Description: "",
            DueDate: "",
            Orientation: "",
            time: log.getFullYear(),
            // Time: Date().getFullYear(),
            Category: "",
            Comments: [],
            images: [],
            stack: [],
          });
        //console.log("yeah");
        this.Time = log.getHours() + ":" + log.getMinutes();
        this.AddLog = "Card Added";
        this.ActivityLog(this.AddLog);
          list.ChangeText = ""; 
          this.addToDatabase("lists", this.lists);
        },
        CommentSomething: function(card) {
            card.Comments.push({
            Who: this.Username,
            What: this.Comment,
            });
            this.Comment = ""; 
            this.addToDatabase("lists", this.lists);
        },
        NewUser: function() {
            this.users.push({
            id: Date.now(),
            Username: this.name,
            Email: this.email,
            // let file = document.getElementById('card-image-upload').files[0]
            // if (file) {
            //     await imgRef.child(file.name).put(file).then(function(snapshot) {
            //     image: snapshot.downloadURL;
            // });
            });
             this.login = true;
             this.addToDatabase("users", this.users);
        },
        ChangeUserInfo: function() {
            this.ChangeUser = false;
            this.addToDatabase("users", this.users);
            this.AddLog = "Changed User Info";
            this.ActivityLog(this.AddLog);
        },
        GetRidCard: function(index, cindex) {
             this.lists[index].cards.splice(cindex, 1);
             this.addToDatabase("lists", this.lists);
            this.AddLog = "Removed Card";
             this.ActivityLog(this.AddLog);
        },
        GetRidList: function(index) {
            this.lists.splice(index, 1);
            this.addToDatabase("lists", this.lists);
            this.AddLog = "Removed List";
             this.ActivityLog(this.AddLog);
        },
        ChangeOrientation: function() {
            if(this.horizontal) {
                this.Orientation = "normal";
                this.horizontal = false;
            }
            else {
                this.Orientation = "";
                this.horizontal = true;
            }
        this.AddLog = "Changed Orientation";
        this.ActivityLog(this.AddLog);
        },
        PopUp: function(card) {
      		this.CardClicked = card;
    	},

        StackTodo: function(card) {
            card.stack.push(this.text);
            this.text = ""; 
            this.addToDatabase("lists", this.lists);
        },
        newList: function() {
            this.lists.push({
//            id: Date().getDay + "/" + Date().getMonth + "/" + Date().getFullYear,
            id: Date.now(),
            title: this.ListName,
            cards: []
        });
        this.AddLog = "List Added";
        this.ActivityLog(this.AddLog);
        this.addToDatabase("lists", this.lists);
        this.ListName = "";
        },
        uploadImage: function() {
            let file = document.getElementById('card-image-upload').files[0];

            firebase.storage().ref(file.name).put(file).then(function(snapshot) {
                console.log(snapshot.downloadURL);
            });
        },
    }
});
//app.$mount('#app');

