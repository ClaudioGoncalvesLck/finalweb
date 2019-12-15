$(document).ready(function () {
  var request = $.ajax({
    url: "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",

    success: function (data) {
      var img = document.querySelectorAll(".card-img");
      var title = document.querySelectorAll(".card-title");
      var profile = document.querySelectorAll(".profile img");
      /*
      var download = document.querySelectorAll(".transfer a ");
      */
      console.log(data);
      for (i = 0; i < img.length; i++) {
        $(img[i]).attr("src", data[i].urls.regular);
        $(title[i]).html(data[i].description);
        $(profile[i]).attr("src", data[i].user.profile_image.small);
        /*
        $(download[i]).attr("href", data[i].links.download_location);
        */
      }
    }
  });
});

/*
$(document).ready(function () {
  var request = $.ajax({
    url: "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",

    success: function (data) {
      console.log("success", data);
      for (i = 0; i < data.length; i++) {
        $('.card-img').attr("src", data[i].urls.thumb)
      }
    }
  });
});
*/

/*
$(document).ready(function () {
  var bootstrapCol = "teste";
  var request = $.ajax({
    url: "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",

    success: function (data) {
      console.log("success", data);
      for (let i = 0; i < data.length; i++) {
        console.log(i);
      }
      $('.card-img').attr("src", data.responseTxt.responseJSON[1].urls.thumb)
    }
  });
});
*/