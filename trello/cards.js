Vue.directive('focus', {
  componentUpdated: function (el) {
    el.focus();
  }
});
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

//var fb = firebase.initializeApp(config).database();
////var datab = fb.database();

////var listRef = rootRef.child('lists').push();
////REFERENCES for Use
//var stackRef = rootRef('lists');
//var usersRef = rootRef('users');
//var imagesRef = rootRef('imgs');

//var storageRef = firebase.storage().ref();
//Vue Connect Firebase
//var VueFire;
//var Vue = Vue.use(VueFire);

//var menu = document.getElementById("change_chart");
//menu.addEventListener("change", options);



//const app = new Vue({

    var app = new Vue({
    el: "#app",
    data: {
        cards: [],
        users: [],
        lists: [],
        Username: false,
        Name: "",
        Description: "",
        Email: "",
        login: false,
        horizontal: false,
        See: null,
        ListName: "",
        ChangeListName: null,
        ChangeCard: false,
        ChangeDueDate: false,
        CardClicked: null,
        ChangeCardDescription: false,
        CardCategory: "",
        Comment: null,
        
        startscreen: true,
        PictureName: '',

        hide: false,
    },
//        firebase: {
//        cards: stackRef,
//        users: usersRef,
//        images: imagesRef
//    },
    methods: {
    	addToDatabase: function(key, data){
            database.ref("/"+key).set(data);
        },
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
        optionsSelect: function(val) {
        if (menu.value == '1') {
            this.CardCategory = Categories;
            this.addToDatabase("lists", this.lists);
        } else if (menu.value == '2') {
            this.CardCategory = To-Do;
            this.addToDatabase("lists", this.lists);
        }  else if (menu.value == '3') {
            this.CardCategory = Personal;
            this.addToDatabase("lists", this.lists);
        }
        },
        CommentSomething: function() {
        	this.Comment = null;
        	this.addToDatabase("lists", this.lists);
        },

        showInput: function(input) {
        input.isInputVisible = true;
        },

//        onEnterClicked: function() {
//            alert();
//        },
        PopUp: function(card) {
      		this.CardClicked = card;
    	},
    	NewUser: function() {
      			this.username = false;
      			this.addToDatabase("users", this.users);
    	},
        newCard: function(list) {
          	list.cards.push({
//            id: Date().getDay() + "/" + Date().getMonth() + "/" + Date().getFullYear(),
            id: Date.now(),
            Name: list.ChangeText,
            Description: "Click to edit description",
            DueDate: "Click to add a due date",
            Time: Date.now(),
//            Username: this.username,
//            Email: this.email,
            Category: "Categories",
            Comment: "",
            stack: []
          });
        //console.log("yeah");
          list.ChangeText = ""; // clear text
          this.addToDatabase("lists", this.lists);
        },
        newList: function() {
            this.lists.push({
//            id: Date().getDay + "/" + Date().getMonth + "/" + Date().getFullYear,
            id: Date.now(),
            title: this.ListName,
            cards: []
        });
        this.addToDatabase("lists", this.lists);
        this.ListName = "";
        },
        addCard: function(card) {
                Vue.set(card, "stack", []); 
                card.stack.push(this.todoText);
                this.todoText = ""; // clear input
                this.addToDatabase("stack", this.lists);
            }
        },
        storeImage: function() {
            var input = document.getElementById('files');
            if (input.files.length > 0) {
          		Vue.set(this.currentCard, "images", []);
            }
        }
    
});
//app.$mount('#app');

