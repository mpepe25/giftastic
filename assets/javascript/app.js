// This is an array for the recommended tvshows
var tvshows = ["How I Met Your Mother", "Star", "How to Get Away With Murder", "Empire"];

function renderbuttons(){
    
        $("#tvshowButtons").empty();  
         // Looping through each result item
         for (var i = 0; i < tvshows.length; i++) {
             var a = $("<button>");
             a.addClass("tvshows");
             a.attr("data-name",tvshows[i]);
             a.text(tvshows[i]);
             $("#tvshowButtons").append(a);

            // // Creating and storing a div tag
            // var tvDiv = $("<div>"); 
}
}
renderbuttons();

$("#add-tvshow").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var itemEnter = $("#tvshow-input").val().trim();
    console.log(itemEnter)
    // Adding movie from the textbox to our array
    tvshows.push(itemEnter);

    // Calling renderButtons which handles the processing of our movie array
    renderbuttons();
   
    
});
$(document).on("click", ".tvgif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

$(document).on("click", ".tvshows", function(){
    $("#giftastic").empty();
    var item = $(this).attr("data-name");
    console.log(item)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AZxXxz6dsRso0hVFUCNjLVtVNC8Hnfzn&q="+ item +"&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
console.log(results)
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var tvDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var tvImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          tvImage.attr("src", results[i].images.fixed_height_still.url);
          tvImage.attr("data-still", results[i].images.fixed_height_still.url);
          tvImage.attr("data-animate", results[i].images.fixed_height.url);
          tvImage.attr("data-state", "still");
        tvImage.addClass("tvgif");
          // Appending the paragraph and image tag to the tvDiv
          tvDiv.append(p);
          tvDiv.append(tvImage);

          // Prependng the tvDiv to the HTML page in the "#gifs-appear-here" div
          $("#giftastic").prepend(tvDiv);
        }
          console.log(queryURL);
        console.log(response);
      })
      renderbuttons();

})
//   function showGifs(){
    
// function showGifs() {
//     var item = $(this).attr("data-name");
//     console.log(item)
    
 

// // $(document).on("click", ".movie-btn", showGifs);
// // showBtns()