var tvShows = ["The Walking Dead", "Rick and Morty", "The Office", "King of the Hill", "Breaking Bad"];

$(document).ready(function(){


function displayTvGifs() {
        
        var tvShow = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&limit=10&rating=&images&api_key=5ca4668569374e10a898b50de5f2a13a";

        $("#tvshows-view").empty();
       
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          var results = response.data;
          console.log(results);
          // Creating a div to hold the movie
          for (i = 0; i < results.length; i++) {
            var showDiv = $("<div class='show'>");
            var rating = results[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            var theGifs = $("<img>");
            theGifs.attr("src", results[i].images.fixed_height.url);
            theGifs.attr("data-state", "animate");
            theGifs.attr("data-animate", results[i].images.fixed_height.url);
            theGifs.attr("data-still", results[i].images.fixed_height_still.url);
            showDiv.append(theGifs);
            showDiv.append(pOne);
            $("#tvshows-view").prepend(showDiv);
            
            //play/pause feature//

            theGifs.on("click", function() {
              console.log(this);
             var state = $(this).attr("data-state");
             if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
             $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            } 
                  
            });
          }
        
         
        });

      }

function renderButtons() {
        $("#tv-buttons").empty();
        

        for (i =0; i < tvShows.length; i++) {
              var btn = $("<button>");
              btn.addClass("tvShow");
              btn.attr("data-name", tvShows[i]);
              btn.text(tvShows[i]);
              $("#tv-buttons").append(btn);
              $("#tv-input").val("");
        }
      }

 $("#add-tvshow").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var tvShow = $("#tv-input").val().trim();

        // Adding movie from the textbox to our array
        tvShows.push(tvShow);

        renderButtons();

      });

 $(document).on("click", ".tvShow", displayTvGifs);

renderButtons();

});


  
      

      