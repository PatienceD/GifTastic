$(document).ready(function () {
    //original array of buttons with the text of an animal
    var animals = ["Dog", "Sheep", "Cat", "Cow"];

    //once the user clicks on a button, the function displayAnimalGif runs
    function displayAnimalGif() {
        $("#gifs-appear-here").empty();
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg13") {
                    var gifDiv = $("<div>");

                    //getting the rating and appending it to the gifDiv
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    gifDiv.append(p);

                    //getting the title and appending it to the gifDic
                    var title = results[i].title;
                    var p =$("<p>").text("Title: " + title);
                    gifDiv.append(p);

                    //getting the source and append it to the gifDiv
                    var source = results[i].source;
                    var p = $("<p>").text("Where to find: " + source);
                    gifDiv.append(p);

                    //creating an image and giving it a class
                    var animalImg = $("<img>");
                    animalImg.addClass("gif");
                    animalImg.attr("src", results[i].images.fixed_height_still.url);
                    animalImg.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImg.attr("data-animate", results[i].images.fixed_height.url);
                    animalImg.attr("data-state", "still");
                    gifDiv.append(animalImg);

                    $("#gifs-appear-here").prepend(gifDiv);
                    
                }
                
            }
        })

    }

    function renderButtons() {
        //for each button created, it is given a class and value
        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {
            var a = $("<button>");

            a.addClass("animal-btn");

            a.attr("data-animal", animals[i]);

            a.text(animals[i]);
            $("#buttons-view").append(a);

        }
    }
    renderButtons();

    $("#add-animal").on("click", function (event) {
        //getting the input from the text box, and making it a button
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
    })

    $(document).on("click", ".animal-btn", displayAnimalGif);

    //when the gif is clicked, run the function to start and stop animation
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })
});