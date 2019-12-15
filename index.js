$(document).ready(function() {
  var url =
    "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

<<<<<<< HEAD
    success: function (data) {
      var img = document.querySelectorAll(".card-img");
      var title = document.querySelectorAll(".card-title");
      var profile = document.querySelectorAll(".profile img");
      /*
      var download = document.querySelectorAll(".transfer a ");
      */
      console.log(location.href);
      for (i = 0; i < img.length; i++) {
        $(img[i]).attr("src", data[i].urls.regular);
        $(title[i]).html(data[i].description);
        $(profile[i]).attr("src", data[i].user.profile_image.small);
      }
=======
  $.ajax({
    url: url,
    type: "get",
    async: true,
    success: function(data, status, response) {
      getMoviesResult(data);
>>>>>>> master
    }
  });
});

<<<<<<< HEAD
function nextPagina() {
  var url = location.href;
  var next = location.href + "/?page2";

  $("#proximaPagina").attr("href", next)
}

/*
$(document).ready(function () {
  var request = $.ajax({
    url: "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",
=======
function getMoviesResult(data) {
  var movie = {};
  for (var i = 0; i < data.length; i++) {
    movie = {
      img: data[i].urls.regular,
      imgAlt: data[i].alt_description,
      description: data[i].description ? data[i].description : "",
      userImg: data[i].user.profile_image.small,
      userName: data[i].user.name
    };
    createMovieCard(movie);
  }
}
>>>>>>> master

function createMovieCard(data) {
  var father = $("#movies-content");

  var content = $(
    '      <div class="col-lg-3 col-md-4 col-sm-6"><div class="box card bg-dark text-white"><img src="' +
      data.img +
      '" class="card-img" alt="' +
      data.imgAlt +
      '" /><div class="card-img-overlay"><h5 class="card-title">' +
      data.description +
      '</h5><div class="card-bottom"><div class="profile"><img src="' +
      data.userImg +
      '" class="profile-img" alt="Autor" width="32" height="32" /><p class="card-text">' +
      data.userName +
      '</p></div><div class="transfer"><a href="' +
      data.img +
      '"><i class="fas fa-download"></i></a></div></div></div></div></div>'
  );

  father.append(content);
}
