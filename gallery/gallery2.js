// Rikki Kendall

var checkedTags = [];
var slideIndex = 1;
var modal;
var gallery;
var view;
var clear;

$(document).ready(function () {
    $.getJSON('cuba1.json', function(havana) {
    $('#clickCuba').click(function() {
        if(this.checked){
            $.each(havana.cuba, function(index, tag) {
                $('.container').append("<img class='cuba photos' src=" + tag.path + " alt=" + tag.caption + " />");
                console.log("hi");
                $("img").click(function() {
                modal($(this));
                }); 
                });
            }
        else {
                $.each(havana.cuba, function(index, tag) {
                    $('.cuba').remove();
                    $('.modal').css("display", "none");
                    $('button').css("display", "none");
                });
            }
        }); 
    });
    $.getJSON('Japan.json', function(checked) {
    $('#clickJapan').click(function() {
        if(this.checked){
            $.each(checked.japan, function(index, tag) {
                $('.container').append("<img class='japan photos' src=" + tag.path + " alt=" + tag.caption + " />");
                console.log("hi");
                $("img").click(function() {
                modal($(this));
                }); 
                });
            }
        else {
                $.each(havana.cuba, function(index, tag) {
                    $('.japan').remove();
                    $('.modal').css("display", "none");
                    $('button').css("display", "none");
                });
            }             
        });
    });
    $('.prev').click(function() {
        showDivs(slideIndex -= 1);
    });
    
    $('.next').click(function() {
        showDivs(slideIndex += 1);
    });
});

function createGallery() {
	var checked = $(":checkbox:checked");
	$.each(checked, (index, tag) => {
		console.log(tag.value);
    	checkedTags.push(tag.value);
  	});
  	var i;
	for (i = 0; i < checkedTags.length; ++i) {
		if (checkedTags[i] === "cuba") {
			$.getJSON("cuba1.json");
		}
		else if (checkedTags[i] === "japan") {
			$.getJSON("Japan.json");
		}
	}
	console.log("Created gallery!");
	view.hide();
	clear.show();
}

function clearGallery() {
	view.show();
	checkedTags = [];
	gallery.empty();
	console.log("Cleared");
}

function modal(img) {
    $('button').css("display", "inline");
    $('#myModal').css("display", "block");
    $('#img01').attr("src", img.attr("src")).attr("alt", img.attr("alt"));
    $('#caption').html(img.attr("alt"));
    
    $('.close').click(function() {
        $('.modal').css("display", "none");
        $('button').css("display", "none");
    });
}

function showDivs(n) {
    var i;
    var photos = document.getElementsByClassName("photos");
    var modal = document.getElementsByClassName("modal-content");
    if (n > photos.length) {
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = photos.length;
    }
    for (i = 0; i < photos.length; i++){
        photos[i].style.display = "none";
    }
    if (photos.length > 0) {
        photos[slideIndex - 1].style.display = "block";  
    }
}


//document.addEventListener("DOMContentLoaded", ()=>{
//  let jsonstr=`[
//    {"id":"cuba", "first_name":"Sam","last_name":"Smith", "phone":"111-222-3333","email":"ssmith@yahoo.com","address":"33 Birch Rd","city":"Miami","state":"FL"},
//    {"id":"3", "first_name":"Brad","last_name":"Traversy", "phone":"211-322-4333","email":"brad@test.com","address":"222 South St","city":"Portland","state":"FL"}
//  ]`
//  let jsonobj=JSON.parse(jsonstr)
//  let form=document.querySelector("form")
//  };
  
////Read JSON
//function readJSON(file) {
//	console.log("reading JSON from: ", file);
//	$.getJSON(file, function (data) {
//	    $.each(data.photos, function () {
//			console.log(this.path,this.caption,this);
//			var col = $("<div\>");
//			col.addClass("col-xs-12 col-sm-6 col-md-4");
//			var img = $('<img id="dynamic">'); 
//			img.attr('src',this.path);
//			img.attr('data-caption',this.caption);
//			img.attr('alt',this.caption);
//			img.on('click', function() {
//   			 	zoom(this);
// 			});
//			col.append(img);
//			gallery.append(col);
//			console.log("img added");
//	    });
//	});
//}

//function readJSONSlideshow() {
//	console.log("hi");
//	$.getJSON("cuba1.json", function (data) {
//		console.log("hi2",data);
//		var imgList = "";
//	    $.each(data.photos, function (i) {
//			if (i === 0) {
//                imgList += '<img class="slideshow" onclick="clickedSlideshow()" alt="" ' + '" src= "' + this.path + '" style="display: block;">';
//            } else {
//                imgList += '<img class="slideshow" onclick="clickedSlideshow()" alt="" ' + '" src= "' + this.path + '" style="display: none;">';
//            }
//	    });
//    	console.log(imgList);
//	    $('.slideclass').append(imgList);
//	});
//}

//Modal zoom
function zoom(photo) {
	console.log("Zoom clicked",photo);
	var modal = document.getElementsByClassName("modal-content");;
    // var img = photo;
    var modalImg = document.getElementById("cuba");
    var caption = document.getElementById("caption");

	modal.style.display = "block";
    modalImg.src = photo.src;
    caption.innerHTML = $(photo).attr('data-caption');
    console.log(photo.src, $(photo).attr('data-caption'));
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
        console.log("close");
    };
}

////Slideshow fluff
//function plusDivs(n) {
//    showDivs(slideIndex += n);
//}

//function showDivs(n) {
//    var i;
//    var x = $('.slideshow');
//    console.log(x);
//    if (n > x.length) {
//        slideIndex = 1;
//    }
//    if (n < 1) {
//        slideIndex = x.length;
//    }
//    for (i = 0; i < x.length; i++) {
//        x[i].style.display = "none";
//    }
//    console.log("slideindex",slideIndex);
//    console.log("hii", x, x[slideIndex+1]);
//    x[slideIndex-1].style.display = "block";
//}

//function clickedSlideshow() {
//	console.log(slideIndex, " slide clicked!");
//	console.log(checkedTags);
//	gallery.empty();
//	checkedTags = [];
//	if (slideIndex === 1) {
//		checkedTags.push("Cuba");
//	}
//	else if (slideIndex === 2) {
//		checkedTags.push("Japan");
//	}
//	createGallery();
//}

//$(document).ready(()=>{
//	readJSONSlideshow();
//	modal = $('#myModal');
//    gallery = $("#gallery");
//    view = $("#view");
//    clear = $("#clear");
//    view.click((e) =>{
//    	e.preventDefault();
//		createGallery();
//    });
//    clear.click((e) =>{
//    	e.preventDefault();
//      	clearGallery();
//    });
//    slideIndex = 1;
//
//});