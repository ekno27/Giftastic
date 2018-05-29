$(document).ready(function() {
    var topics = [];
    
    //function that will display gifs and ratings given the giphy api 
    function displayGif(){
        var gif = $(this).attr("gif-name");
        // console.log(gif);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ gif + "&api_key=nylrv2kPZt4wIQ0buJWgy7jr085Dk7D2&limit=10";  //changed to 12 for the sake of even distribution regardless of window size
        //api call prep
        $.ajax({
            url: queryURL,
            method: "GET"

            }).then(function(response){
            //replaces instead of prepending 
            $("#gif-space").empty();
            // console.log(response);
            for (var i = 0;i<response.data.length;i++){
                var stillURL =  response.data[i]
                .images.fixed_height_still.url;
                // console.log(stillURL);
                var rating = response.data[i].rating;
                // console.log(rating);
                
                var movingURL = response.data[i].images.fixed_height.url;
                console.log(movingURL);

                var gifDiv = $("<div class='card '>");
                //adding necessary attributes to image tag
                    var image = $("<img>");
                        image.addClass("card-img-top gif-image");
                        image.attr("src", stillURL);
                        image.attr("still-url", stillURL);
                        image.attr("moving-url",movingURL);
                        image.attr("state", "still");
                        // console.log(image);
                    /**************END OF IMAGE ATTRIBUTES**************/
                    var textDiv = $("<div>");
                    textDiv.addClass("card-body");
                    var p= $("<p class='card-text'>").text("Rating: " + rating);                     
                    // var downloadLink = $("<a>"); 
                    // downloadLink.addClass("card-link");            
                    // downloadLink.attr("href", movingURL);
                    // downloadLink.text("Click to download ");
                    $(textDiv).append(p);
                    $(textDiv).append("<a class='card-link' href='"+movingURL+"' target='_blank' download> Click to see the gif on a new page</a>");
                    // $(textDiv).append(downloadLink);
                    $(gifDiv).append(image);
                    $(gifDiv).append(textDiv);
                    $("#gif-space").append(gifDiv);
               

            } //end of loop

        }); //end of ajax
    }//end of displayGIf 

    //function used to make buttons 
    function makeButtons(){
        $("#btn-space").empty();
        for (var i = 0 ;i<topics.length;i++){
           //created button
            var a =  $("<button>")
           a.addClass("gif-btn btn btn-sm");
           a.attr("gif-name",topics[i]);
           a.text(topics[i]);
        $("#btn-space").append(a);
        }
    }

   
    
   //event listnener that takes input and creates a button for it 
    $("#submit").on("click",function(){
        var topicInput = $("#interest-id").val().trim();
        var presentCheck = false;
        for( var i = 0;i<topics.length;i++){
            if(topics[i]===topicInput){
                presentCheck = true;
            }
        }
        if(presentCheck){
            alert(topicInput +" has already been added!");
        }
        else{
            topics.push(topicInput);
            //contracturally obligated to do this but ok
            makeButtons(); 
        }
       
    });

    $("#gif-space").on("click",".gif-image",function(){
        var state = $(this).attr("state");
        console.log(state);
        if (state === "still"){
            $(this).attr("state", "moving");
            $(this).attr("src", $(this).attr("moving-url"));
        }
        if(state ==="moving"){
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("still-url"));
        }
    })

    //event listener for all gif buttons 
    $("#btn-space").on("click",".gif-btn",displayGif);

}); //end of app.js
