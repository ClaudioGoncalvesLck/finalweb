function getPhotos() {
  var url =
    "https://api.unsplash.com/photos?order_by=latest&per_page=24&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  callApi(url);
}

function callApi(url) {
  $.ajax({
    url: url,
    type: "get",
    async: true,
    success: function(data, status, response) {
      if (data.total_pages) {
        localStorage.setItem("total_pages", data.total_pages);
      }
      if (data.total == 0 || data.results == 0) {
        noResults();
      } else {
        getPhotosResult(data);
      }
    }
  });
}

function noResults() {
  var father = $("#empty-content");

  var content = $('<h1>Nothing to show here :/</h1><h1 class="number">0</h1><h2>Results</h2>');

  father.append(content);

  document.getElementById("pag").style.display = "none";
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

function changePage(type) {
  var page = getNextNumberPage(type);

  var query = getQuery();

  if (!page || localStorage.getItem("total_pages") < page) {
    return;
  }

  if (query) {
    getPhotosBySearch(query, page);
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

function getNextNumberPage(type) {
  var url = window.location.href;

  var pageNumber;

  var pageIndex = url.indexOf("page");
  if (pageIndex == -1) {
    pageNumber = 1;
  } else {
    var pageString = url.substring(pageIndex);
    var igualIndex = pageString.indexOf("=");
    var queryIndex = pageString.indexOf("&query");
    if (queryIndex == -1) {
      pageNumber = pageString.substring(igualIndex + 1);
    } else {
      pageNumber = pageString.substring(igualIndex + 1, queryIndex);
    }
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

function getQuery() {
  var url = window.location.href;

  var query;

  var queryIndex = url.indexOf("query");
  if (queryIndex == -1) {
    query = null;
  } else {
    var queryString = url.substring(queryIndex);

    var igualIndex = queryString.indexOf("=");
    query = queryString.substring(igualIndex + 1);
  }

  return query;
}

$("form").submit(function(event) {
  event.preventDefault();

  if ($("input").val()) {
    getPhotosBySearch($("input").val(), null);
  } else {
    $("#searchError")
      .modal()
      .show();
  }
});

function getPhotosBySearch(query, page) {
  if (!page) {
    page = 1;
  }

  window.history.pushState("", "", "?page=" + page + "&query=" + query);

  var url =
    "https://api.unsplash.com/search/photos?page= " +
    page +
    " &query=" +
    query +
    "&per_page=24&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  father = $("#photos-content")
    .children("div")
    .remove();

  callApi(url);
}
