// Rikki Kendall

var gallery;
var view;
var clear;
var checkedTags = [];
var slideIndex = 1;
var modal;

$(document).ready(function () {
    $.getJSON('cuba1.json', function(checked) {
    $('#clickCuba').click(function() {
        if(this.checked){
            $.each(checked.cuba, function(index, tag) {
                $('.container').append("<img class='cuba photos' src=" + tag.path + " alt=" + tag.caption + " />");
                console.log("hi");
                $("img").click(function() {
                modal($(this));
                }); 
                });
            }
        else {
                $.each(checked.cuba, function(index, tag) {
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
    var k;
    var photos = document.getElementsByClassName("photos");
    var modal = document.getElementsByClassName("modal-content");
    if (n > photos.length) {
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = photos.length;
    }
    for (k = 0; k < photos.length; k++){
        photos[k].style.display = "none";
    }
    if (photos.length > 0) {
        photos[slideIndex - 1].style.display = "block";  
    }
}
