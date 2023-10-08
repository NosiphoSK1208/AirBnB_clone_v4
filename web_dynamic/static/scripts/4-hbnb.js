$(function () {
  // Serve API content for api_status
  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data["status"] === "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
  });
  // checkbox and display amenities
  let dict = {};
  $("input").change(function () {
    if (this.checked) {
      dict[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete dict[$(this).attr("data-id")];
    }
    let arr = "";
    let separator = "";
    for (let i in dict) {
      arr += separator;
      arr += dict[i];
      separator = ", ";
    }
    if (arr === "") {
      $("div.amenities h4").text(String.fromCharCode(160));
    } else {
      $("div.amenities h4").text(arr);
    }
  });

  // Search when button is clicked
  $("button").click(function () {
    let amenityIdList = [];
    for (let i in dict) {
      amenityIdList.push(i);
    }
    let postDict = {};
    postDict["amenities"] = amenityIdList;
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      data: JSON.stringify(postDict),
      success: function (result) {
        $("article").remove();
        for (let i in result) {
          let structure = [
            "<article>",
            '<div class="title">',
            "<h2>" + result[i].name + "</h2>",
            '<div class="price_by_night">' +
              "$" +
              result[i].price_by_night +
              "</div>",
            "</div>",
            '<div class="information">',
            '<div class="max_guest">',
            '<i class="fa fa-users fa-3x" aria-hidden="true"></i>',
            "<br />",
            result[i].max_guest + " Guests",
            "</div>",
            '<div class="number_rooms">',
            '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>',
            "<br />",
            result[i].number_rooms + " Bedrooms",
            "</div>",
            '<div class="number_bathrooms">',
            '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>',
            "<br />",
            result[i].number_bathrooms + " Bathroom",
            "</div>",
            "</div>",
            '<div class="description">',
            result[i].description,
            "</div>",
            "</article>",
          ];
          $(structure.join("")).appendTo("section.places");
        }
      },
      dataType: "json",
      contentType: "application/json",
    });
  });
});
