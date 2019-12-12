$(document).ready(function () {
  var bootstrapCol = "teste";
  var request = $.ajax({
    url: "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",

    success: function (data) {
      console.log("success", data);
      for (let i = 0; i < data.length; i++) {
        console.log(i);
      }
    }
  });
});

/*
$(document).ready(function () {
  var bootstrapCol = "teste";
  var request = $.ajax({
    url: "https://api.unsplash.com/photos?random&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",
    type: "get",
    async: true,
    success: function (data, status, responseTxt) {
      console.log(responseTxt.responseJSON);
      $('.imagem').attr("src", responseTxt.responseJSON[1].urls.thumb)

      $("#wrapper>.row").append($("<div>", {
        class: bootstrapCol
      }));
    }
  });
});
*/