const $ = window.$;
$(function () {
  const amenitiesList = [];
  $("input[type=checkbox]").prop("checked", false);

  $(".amenities h4").css({
    width: "100%",
    height: "100%",
    "white-space": "nowrap",
    overflow: "hidden",
    "text-overflow": "ellipsis",
    "padding-bottom": "16px",
  });

  $('input[type="checkbox"]').click(function () {
    const $checkbox = $(this);
    if ($checkbox.prop("checked") === true) {
      amenitiesList.push($checkbox.data("name"));
    } else {
      amenitiesList.forEach((elemt, index) => {
        if (elemt === $checkbox.data("name")) {
          amenitiesList.splice(index, 1);
        }
      });
    }
    $(".amenities h4").text(amenitiesList.join(", "));
  });
});

/* code for task 3 */
$(document).ready(function () {
  $.get("http://localhost:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    }
  }).fail(function () {
    $("div#api_status").removeClass("available");
  });
});
