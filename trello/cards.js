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
//function optionsSelect(val) {
//    addCard();
//    if (val > 0) {
//        console.log("HELLO"+val);
//    }
//    if (menu.value == '1') {
//        //do something
//        alert(1)
//    } else if (menu.value == '2') {
//    //do something
//    alert(2)
//  }  else if (menu.value == '3') {
//    //do something
//    alert(3)
//  }


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
        
        startscreen: true,
        PictureName: '',

        hide: false,
//        newInLi: '',
        Categories: [
            { text: 'Categories'},
            { text: 'Work'},
            { text: 'Play'},
            { text: 'Important'},
            { text: 'Personal'},
        ]
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
            Category: "uncategorized",
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
            if (!("stack" in card)) { 
                    Vue.set(card, "stack", []); 
                }
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

