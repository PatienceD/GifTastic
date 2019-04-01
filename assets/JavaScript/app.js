$(document).ready(function () {

    var topics = ["Animals", "Science", "History", "Art", "Countries", "Music"];

    // Generic function for capturing the movie name from the data-attribute
    function alertAnimalsName() {
        var AnimalsName = $(this).attr("data-name");
        //var AnimalsName = $(this).data("name"); <-- another way of typing it out
        alert(AnimalsName);
        console.log(AnimalsName);
    }

    // Function for displaying movie data
    function renderButtons() {
        debugger;
        // Deleting the topics prior to adding new topics
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("topic");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The topic from the textbox is then added to our array
        topic.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
    });

    // Function for displaying the movie info
    // We're adding a click event listener to all elements with the class "movie"
    // We're adding the event listener to the document itself because it will
    // work for dynamically generated elements
    // $(".movies").on("click") will only add listeners to elements that are on the page at that time
    $(document).on("click", ".animals", alertAnimalsName);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});