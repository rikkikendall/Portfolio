// Rikki Kendall

var checkedTags = [];
var slideIndex;
var modal;
var gallery;
var view;
var clear;

$(document).ready(function () {
    
    $('#clickCuba').click(function() {
        $.getJSON('cuba1.json', function(checked) {
            $.each(checked.cuba, function(index, tag) {
                $('.container').append("<img class='cuba' src=" + tag.path + " alt=" + tag.caption + " />");
                console.log("hi");
            });
        });
    });
    
    $('#clickJapan').click(function() {
        $.getJSON('Japan.json', function(checked) {
            $.each(checked.japan, function(index, tag) {
                $('.container').append("<img class='japan' src=" + tag.path + " alt=" + tag.caption + " />");
                console.log("hi");
            });
        });
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
