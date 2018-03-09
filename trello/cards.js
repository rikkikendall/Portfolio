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
var rootRef = firebase.database().ref();
var listRef = rootRef.child("lists").push();

var data;

var data = {
    "stack" : {
        "stack1": {
            "name": "Marvin Bagley III",
            "lists": [
                {
                    "title": "Baseball",
                    "cards": [
                        {
                            "title": "Ichiro Suzuki",
                            "description": "Right Field - Bats Left",
                            "deadline": "3/9/18",
                            "shouldDisplay": false
                        },
                        {
                            "title": "Yu Darvish",
                            "description": "Pitcher - Bats Right",
                            "deadline": "3/1/18",
                            "shouldDisplay": false
                        }
                    ]
                },
                {
                    "title": "Basketball",
                    "cards": [
                        {
                            "title": "Marvin Bagley III",
                            "description": "PF/C",
                            "deadline": "3/9/18",
                            "shouldDisplay": false
                        },
                        {
                            "title": "Gary Trent Jr",
                            "description": "SG",
                            "deadline": "3/1/18",
                            "shouldDisplay": false
                        }
                    ]
                }
            ]
        }
    }
};

function addListDisp() {
    var modal = document.getElementById('addList');
    modal.style.display = 'block';
}

function addListClose() {
    var modal = document.getElementById('addList');
    modal.style.display = 'none';
}

function addList() {
    var content = document.getElementById('listcontent');
    // MAKE SURE CONTENT IS THE ACTUAL TITLE
    var newList = {"title": content, "cards": []};
    listRef.set(newList);
    listRef.update({
        path: listRef.ref.toString()
    });
    var modal = document.getElementById('addList');
    if (content === "") {
        modal.style.display = 'none';
        alert("WHAT");
    }
    else{
        data.stack.stack1.lists.push(newList);
        modal.style.display = 'none';
    }
}

function getrid(){
    var content = document.getElementById('listgrcontent');
    var lists = data.stack.stack1.lists;
    var k;
    var modal = document.getElementById('getrid')
    for(k=lists.length-1; k>=0; k--){
        console.log(lists[k]);
        console.log(lists[k].title);
        if(lists[k]==content){
            lists.splice(k,1);
        }
    }
    modal.style.display = 'none';
}

function seeNewCard(index){
    var modal = document.getElementById('addcard'+index);
    modal.style.display= 'block';
}

function closethat(index){
    var modal = document.getElementById('addcard'+index);
    modal.style.display= 'none';
}

function NewCard(list,index){
    var content = document.getElementById('cardcontent'+index).content;
    var newCard = {"title":content, "description":"", "deadline":"", shouldDisplay:false};
    var cardRef = YOURLISTREF.ref("cards").push().set(newCard);
    var modal = document.getElementById('addcard'+index);
    if(content===""){
        alert("");
    }
    else{
        lists.cards.push(newCard);
    }
    modal.style.display = 'none';
}

function seeRemoveCard(){
    var modal = document.getElementById('removecard'+index);
    modal.style.display= 'block';
}

function closethat2(index){
    var modal = document.getElementById('removecard'+index);
    modal.style.display= 'none';
}

function getridCard(list,index){
    var content = document.getElementById('cardgrcontent');
    var lists = data.stack.stack1.lists;
    var k;
    var modal = document.getElementById('getridcard')
    if(content!==null){
        for(k=list.cards.length-1; k>=0; k--){
            if(lists[k].title==content){
            lists.cards.splice(k,1);
        }
        }
        modal.style.display='none';
    }
    else{
        modal.style.display = 'none';
        alert("");
    }
}

function closeModals(){
	console.log("closing")
	var k;
	for(k=0; k<data.stack.stack1.lists.length; k++){
		var i;
		for(i=0; i<data.stack.stack1.lists[i].cards.length; i++){
			data.stack.stack1.lists[i].cards[j].shouldDisplay=false;
		}
	}
}

//const app = new Vue({
var app = new Vue({
//    el: '#app',
    data: {
//        keyword: 'javascript'
        stack: data.stack.stack1,
        newList:"",
        newCard:"",
    },
    methods:{
        displayMod:function(card){
            card.shouldDisplay = true;
        },
        closeabove:function(card){
            card.shouldDisplay = false;
        }
    }
})

app.$mount('#app');
