$(document).ready(function() {

  /* QUOTE */

    $(".stamp").on("click", function() {
      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(json) {

        var text = json.quoteText;
        var author = json.quoteAuthor || "Unknown";

        $(".qoute_text q").html(text);
        $(".quote_author").html("&mdash; " + author);

      });
    });

      /* TO TWITT QUOTE */

      $(".twitt").on("click", function() {
        window.open("http://twitter.com/intent/tweet?text="
        + $(".qoute_text q").text() + " " + $(".quote_author").text());
    });

      /* WEATHER */

//            if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {

//     var lat = position.coords.latitude,
//         long = position.coords.longitude;

//         $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long, function(place) {
//           var city = place.results[2].address_components[3].long_name;
//           var address = place.results[2].formatted_address;
//             $(".city").html(city);
//             $(".address").html(address);

//       });

//         $.getJSON("https://api.forecast.io/forecast/59cc2f4de69391e00000c6963bd532e7/" + lat + "," + long + "?callback=?", function(weather) {
//          var tempF = Math.round(weather.currently.temperature);
//          var tempC = Math.round((weather.currently.temperature - 32) * 5 / 9);
//          var tempLikeF = Math.round(weather.currently.apparentTemperature);
//          var tempLikeC = Math.round((weather.currently.apparentTemperature - 32) * 5 / 9);
//          var summary = weather.currently.summary;
//          var icon = weather.currently.icon;

//          $(".temp_value").html(tempF);
//          $(".summary").html(summary);
//          $(".tempLike_value").html(tempLikeF);
//          $(".weather_icon i").addClass("wi-forecast-io-" + icon);

//          $(".temp_btn").on("click", function () {
//             $(".c").toggleClass("selected");
//             $(".f").toggleClass("selected");
//             if ($(".c").is(".selected")) {
//               $(".temp_value").hide().html(tempC).fadeIn("slow");
//               $(".tempLike_value").hide().html(tempLikeC).fadeIn("slow");
//             } else {
//               $(".temp_value").hide().html(tempF).fadeIn("slow");
//               $(".tempLike_value").hide().html(tempLikeF).fadeIn("slow");
//             }
//          });
//       });



//   });
// }

  /* WIKI */

  /* RANDOM_BTN */

  $(".rendom").on("click", function () {
     $(this).addClass("click");
      setTimeout(function() { $(".rendom").removeClass("click"); }, 500)

  });

      /* AJAX REQUEST */

  function callJson() {

      var text = $("#input_text").val();
     $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=query&format=json&srwhat=text&limit=15&list=search&srsearch=" + text + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          var answer = data["query"]["search"],
              html = "";
            if (answer.length == 0) {
              $(".result").html("<span class='error_text'>Ooops! No results, try another request...</span>");
            } else {

                for (var i = 0; i < answer.length; i++) {
                   html += "<li><a target='_blank' href='http://www.wikipedia.org/wiki/";
                   html += answer[i]["title"] + "'>" + "<div class='title'>" + answer[i]["title"] + "</div>";
                   html += answer[i]["snippet"] + "</a></li>";
                }
                $(".result").html(html);
            }
        },
        error: function (errorMessage) {
          $(".result").html("<span class='error_text'>Ooops! Try another request...</span>");
        }
     });
  }

  function getResult(){

    var text = $("#input_text").val();

  if (text) {
        callJson();
    } else {
        $(".result").html("<span class='error_text'>Ooops! You need to type some search...</span>");
    }
        $("#input_text").val("");
  };

    /* SEARCH_BTN, FORM SUBMIT*/

    $("#search_btn").on("click", getResult);
    $("#wiki").on("submit", function(e) {
      getResult();
      e.preventDefault();

    });






  });