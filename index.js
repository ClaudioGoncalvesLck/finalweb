function getPhotos() {
  var url =
    "https://api.unsplash.com/photos?order_by=latest&per_page=24&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  callApi(url);
}

function getPhotosResult(data) {
  var result = data;
  if (data.results) {
    result = data.results;
  }
  var photo = {};
  for (var i = 0; i < result.length; i++) {
    photo = {
      img: result[i].urls.regular,
      imgAlt: result[i].alt_description,
      description: result[i].description ? result[i].description : "",
      userImg: result[i].user.profile_image.small,
      userName: result[i].user.name
    };
    createPhotoCard(photo);
  }
}

function createPhotoCard(data) {
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

function getNextNumberPage(type) {
  var url = window.location.href;

  var pageNumber;

  var pageIndex = url.indexOf("page");
  if (pageIndex == -1) {
    pageNumber = 1;
  } else {
    var pageString = url.substring(pageIndex);
    var igualIndex = pageString.indexOf("=");
    pageNumber = pageString.substring(igualIndex + 1);
  }

  pageNumber = Number(pageNumber);

  if (pageNumber >= 1 && type === "next") {
    pageNumber++;
    return pageNumber;
  } else if (pageNumber > 1 && type === "previous") {
    pageNumber--;
    return pageNumber;
  }
}

function changePage(type) {
  var page = getNextNumberPage(type);

  if (!page) {
    return;
  }

  if ($("input").val()) {
    getPhotosBySearch($("input").val(), page);
  } else {
    $("#photos-content")
      .children("div")
      .remove();

    window.history.pushState("", "", "?page=" + page);

    var url =
      "https://api.unsplash.com/photos?page=" +
      page +
      "&per_page=24&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

    callApi(url);
  }
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

function getPhotosBySearch(search, page) {
  if (!page) {
    page = 1;
  }

  window.history.pushState("", "", "?page=" + page);

  var url =
    "https://api.unsplash.com/search/photos?page= " +
    page +
    " &query=" +
    search +
    "&per_page=24&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  father = $("#photos-content")
    .children("div")
    .remove();

  callApi(url);
}

function noResults() {
  var father = $("#empty-content");

  var content = $('<h1>Nothing to show here :/</h1><h1 class="number">0</h1><h2>Results</h2>');

  father.append(content);

  document.getElementById("pag").style.display = "none";
}

function callApi(url) {
  $.ajax({
    url: url,
    type: "get",
    async: true,
    success: function(data, status, response) {
      console.log(data);
      if (data.total == 0) {
        noResults();
      } else {
        getPhotosResult(data);
      }
    }
  });
}
