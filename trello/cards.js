
var config = {
    apiKey: "AIzaSyBEPme4kqo6xH8RRDbr2dNofVLfA1a4g9M",
    authDomain: "cs290-cards.firebaseapp.com",
    databaseURL: "https://cs290-cards.firebaseio.com",
    projectId: "cs290-cards",
    storageBucket: "cs290-cards.appspot.com",
    messagingSenderId: "736021692910"
};
firebase.initializeApp(config);
var database = firebase.database();
var rootRef = database.ref();
var storageRef = firebase.storage().ref();
var usersRef = database.ref('users');
var activityRef = database.ref('Log');
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
        CardClicked: null,
        ChangeCardDescription: false,
        CardCategory: "",
        Category: "",
        Comment: null,
        index: null,
        cindex: null,
        SelectedColor: "#0000FF",
        colors: ["#fff", "#0404B4"],
        clean: document.getElementById('clean'),
        select: document.getElementById('select'),
        startscreen: true,
        PictureName: "",
        Orientation: "normal",
        newItem: '',
        curImage:'',
        text: "",
        Logs: [],
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
            var dt = new Date();
            this.AddLog = dt.getHours() + ":" + dt.getMinutes() + " - " + message
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
            list.cards.push({
           // id:  Date.getDay() + "/" + Date().getMonth() + "/" + Date().getFullYear(),
            id: Date.now(),
            Name: list.ChangeText,
            Description: "",
            DueDate: "",
            Orientation: "",
            // Time: Date().getFullYear(),
            // Username: this.username,
//            Email: this.email,
            Category: "",
            Comments: [],
            files: [],
            stack: [],
            // Comments: []
          });
        //console.log("yeah");
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
    //     PictureUpload: function(){
    //     var files = [];
    //     const file = document.querySelector('#photo').files[0]
    //     const name = (+new Date()) + '-' + file.name;
    //     const metadata = {contentType: file.type};
    //     const task = ref.child(name).put(file, metadata);
    //     task.then((snapshot) => {
    //     const url = snapshot.downloadURL;
    //     console.log(url);
    //     document.querySelector('#someImageTagID').src = url;
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // },
//         Pic: function() {
//       // get file(s)
//       var files = e.target.files || e.dataTransfer.files;
//       // generate image ID
      // var imageName = Date.now() + "-" + files[0].name;
      //       var input = document.getElementById('files');
      //       firebase.storage().ref().put(files[0]).then(function(snapshot) {
      //           if (!("profile" in this.CardClicked)) {
      //               Vue.set(this.CardClicked, "profile", []);
      //           }
      //       firebase.storage().ref().getDownloadURL().then(function(url) { // URL URL URL
      //       this.CardClicked.profile.push(url);
      //       this.addToDatabase("lists", this.lists);
//             alert("Profile Picture Is In");
//                 });
//             });
//         },
        // storeImage: function() {
        //     // get input element user used to select local image
        //     var input = document.getElementById('files');
        //     // have all fields in the form been completed
        //     if (input.files.length > 0) {
        //         // var file = input.files[0];
        //         // get reference to a storage location and
        //         storageRef.put(files[0]).then(function(snapshot){
        //             if(!("image" in this.CardClicked)){
        //                 Vue.set(this.CardClicked, "image", []);
        //             }
        //         });
        //         storageRef.getDownloadURL().then(function(url){
        //             this.CardClicked.image.push(url);
        //             this.addToDatabase("lists", this.lists);
        //         });
        //                   // .then(snapshot => this.NewUser(snapshot.downloadURL));
        //                   // .then(function(url))
        //     }
        // },
        // storeImage: function(user){
        // var input = document.getElementById(user.image);
        // console.log(input);
        // if(input.files.length >0){
        //     var file = input.files[0];
        //     console.log(file);
        //     storageRef.child('images/' + file.name).put(file).then(snapshot => this.addImage(snapshot.downloadURL, user));
        //     input.value="";
        // }
        // },
        addImage: function(url, user){
            usersRef.child(user['.key']).update({image: url});        
        },
        PastUser: function() {
            if (this.users.indexOf(this.name) > -1) { // check if user exists
                this.login = true;
                return;
            }
        },
        NewUser: function() {
            this.users.push({
            id: Date.now(),
            Username: this.name,
            Email: this.email,
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
    }
});
//app.$mount('#app');

