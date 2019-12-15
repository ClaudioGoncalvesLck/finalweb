function getPhotos() {
  var url =
    "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  $.ajax({
    url: url,
    type: "get",
    async: true,
    success: function(data, status, response) {
      getphotosResult(data);
    }
  });
}

function getphotosResult(data) {
  var photo = {};
  for (var i = 0; i < data.length; i++) {
    photo = {
      img: data[i].urls.regular,
      imgAlt: data[i].alt_description,
      description: data[i].description ? data[i].description : "",
      userImg: data[i].user.profile_image.small,
      userName: data[i].user.name
    };
    createphotoCard(photo);
  }
}

function createphotoCard(data) {
  var father = $("#photos-content");

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

function nextPage() {
  $("#movies-content")
    .children("div")
    .remove();

  var page = 0;
  console.log(window.location.href.indexOf);

  if (window.location.href.indexOf("page") != -1) {
    console.log("primeiro");
    page++;
  } else {
    page = 2;
    console.log("segundo");
  }

  var url =
    "https://api.unsplash.com/photos?page=" +
    page +
    "&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  $.ajax({
    url: url,
    type: "get",
    async: true,
    success: function(data, status, response) {
      getMoviesResult(data);
    }
  });
}

$("form").submit(function(event) {
  event.preventDefault();

  if ($("input").val()) {
    getPhotosBySearch($("input").val());
  } else {
    $("#searchError")
      .modal()
      .show();
  }
});

function getPhotosBySearch(search) {
  var url2 =
    "https://api.unsplash.com/photos?page=1&query=" +
    search +
    "&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  father = $("#photos-content")
    .children("div")
    .remove();

  $.ajax({
    url: url2,
    type: "get",
    async: true,
    success: function(data, status, response) {
      getphotosResult(data);
    }
  });
}
