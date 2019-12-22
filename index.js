// util são variaveis que poderão ser reutilizadas de forma a não repetir código ou no futuro ser mais simples de mudar
const util = {
  API_URL: "https://api.unsplash.com/",
  CLIENT_ID: "dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",
  PER_PAGE: "24"
};

//getPhotos executa uma chamada API order_by latest
function getPhotos(page) {
  //caso a variável page esteja vazia significa que estamos a carregar a primeira página
  if (!page) {
    page = "1";
  }

  var url =
    util.API_URL +
    "photos?page=" +
    page +
    "&order_by=latest&per_page=" +
    util.PER_PAGE +
    "&client_id=" +
    util.CLIENT_ID;

  callApi(url);
}

//callApi executa a chamada API de forma mais genérica onde recebe por parâmetro um URL e depois só tem de executar para esse.
function callApi(url) {
  //antes executar a chamada API é removido o conteúdo que está na página.
  father = $("#photos-content")
    .children("div")
    .remove();

  father = $("#empty-content")
    .children("div")
    .remove();

  $.ajax({
    url: url,
    type: "get",
    async: true,
    success: function(data, status, response) {
      if (data.total == 0 || data.results == 0 || status !== "success") {
        //se a chamada API devolver 0 ou que o status seja diferente de success é apresentada a página "sem resultados"
        noResults();
      } else {
        //se não será apresentada a página com as fotos
        getPhotosResult(data);
      }
    }
  });
}

function noResults() {
  //antes de apresentar a página "sem resultados" é removido os botões da paginação
  document.getElementById("pag").style.display = "none";

  var father = $("#empty-content");

  var content = $('<div><h1>Nothing to show here :/</h1><h1 class="number">0</h1><h2>Results</h2></div>');

  father.append(content);
}

function getPhotosResult(data) {
  //antes de apresentar a página com as fotos é adicionado os botões da paginação
  document.getElementById("pag").style.display = "flex";

  //é guardado na variável page o número da página seguinte
  var page = getNextNumberPage("next");

  if (page == 2) {
    //Se a pagina seguinte for igual a 2 significa que atualmente está na pagina um
    //Então temos de colocar o botão da pagina anterior disable de forma a não executar nada
    document.getElementById("btn-previous").disabled = true;
  } else {
    //se não significa que o botão anterior pode ser executado
    document.getElementById("btn-previous").disabled = false;
  }

  //este if verifica se existe um "total_pages" no objeto que foi devolvido pela API
  if (data.total_pages) {
    if (data.total_pages < page) {
      //caso exista um total_pages menor que a proxima página significa que já não pode ser executado o botão da proxima página.
      document.getElementById("btn-next").disabled = true;
    } else {
      //caso seja maior significa que o botão seguinte pode ser executado
      document.getElementById("btn-next").disabled = false;
    }
  }

  //quando fazemos a chamada API por vezes ela não trás apenas um array com as fotos mas sim mais informações.
  //desta forma conseguimos controlar e guardar apenas as fotos na variavel result.
  var result = data;

  if (data.results) {
    result = data.results;
  }

  //foi criado um objeto "photo" para guardar a informação das fotos uma a uma com um for onde será enviado para uma função "createPhotoCard"
  var photo = {};
  for (var i = 0; i < result.length; i++) {
    photo = {
      img: result[i].urls.raw + "&fit=crop&w=500&h=500",
      imgAlt: result[i].alt_description,
      description: result[i].description ? result[i].description : "",
      userImg: result[i].user.profile_image.small,
      userName: result[i].user.name,
      download: result[i].urls.regular
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
      '</p></div><div class="transfer"><a target="_blank" href="' +
      data.download +
      '" ><i class="fas fa-download"></i></a></div></div></div></div></div>'
  );

  father.append(content);
}

//changePage é executado quando cliclamos nos botões. Os botões enviam como parâmetro se é para avançar para a proxima pagina ou recuar
function changePage(type) {
  //é guardado na variável page o número da página seguinte ou anterior
  var page = getNextNumberPage(type);

  //é guardado na variável query a query escrita pelo utilizador
  var query = getQuery();

  //se query existir significa que estamos na paginação da query introduzida pelo utilizador e é executado a função "getPhotosBySearch"
  if (query) {
    getPhotosBySearch(query, page);
  } else {
    //se não significa que estamos na paginação order_by latest
    //primeiramente é atualizado o URL de forma a sabermos em que pagina estamos
    //de seguinta é executada a função getPhotos
    window.history.pushState("", "", "?page=" + page);

    getPhotos(page);
  }
}

//esta função serve para obter o número da proxima pagina
function getNextNumberPage(type) {
  //na variavel url e guardado o url atual
  var url = window.location.href;

  var pageNumber;

  //indexOf verifica se existe "page" no url
  //caso exista é guardado no pageIndex a primeira posição que ocupa da variavel url
  //se não existe é guardado no pageIndex i valor -1
  var pageIndex = url.indexOf("page");

  if (pageIndex == -1) {
    //se não existir significa que estamos na primeira pagina.
    pageNumber = 1;
  } else {
    //pageString fica com o que está no url desde o pageIndex até ao fim
    var pageString = url.substring(pageIndex);

    //também é preciso ficar com a posição do "=" do pageString
    //Para depois quando formos obter o pageNumber apenas ficar com o número entre o igualIndex + 1 até ao fim
    //Isto se não existir "&query"
    var igualIndex = pageString.indexOf("=");

    //foi preciso verificar se existe "&query" no pageString
    //Para depois quando formos obter o pageNumber apenas ficar com o número entre o igualIndex + 1 e queryIndex
    var queryIndex = pageString.indexOf("&query");

    //aqui verifica se exite a queryString ou não para depois executar o que foi dito anteriormente.
    if (queryIndex == -1) {
      pageNumber = pageString.substring(igualIndex + 1);
    } else {
      pageNumber = pageString.substring(igualIndex + 1, queryIndex);
    }
  }

  if (type === "next") {
    //depois de encontramos qual é página atual é adicionado mais uma e retornado.
    pageNumber++;
    return pageNumber;
  } else if (type === "previous") {
    //depois de encontramos qual é página atual é removido uma e retornado.
    pageNumber--;
    return pageNumber;
  }
}

//esta função serve para obter a query introduzida pelo utilizador
function getQuery() {
  //na variavel url e guardado o url atual
  var url = window.location.href;

  var query;

  //indexOf verifica se existe "query" no url
  //caso exista é guardado no queryIndex a primeira posição que ocupa da variavel url
  //se não existe é guardado no queryIndex i valor -1
  var queryIndex = url.indexOf("query");
  if (queryIndex == -1) {
    //se não existir é retornado query a null.
    query = null;
  } else {
    //queryString fica com o que está no url desde o queryIndex até ao fim
    var queryString = url.substring(queryIndex);
    //também é preciso ficar com a posição do "=" do queryString
    //Para depois quando formos obter a query apenas ficar com o número entre o igualIndex + 1 até ao fim
    var igualIndex = queryString.indexOf("=");
    query = queryString.substring(igualIndex + 1);
  }

  return query;
}

//Quando o form for submetido será executado esta função
$("form").submit(function(event) {
  //preventDefault prevem de fazer o refresh que normalmente é executado por um form
  event.preventDefault();

  if (!$("input").val()) {
    //caso não exista valor no input é mostrada a modal "searchError"
    $("#searchError")
      .modal()
      .show();
  } else {
    //caso o input tenha valor é primeiramente verificado se já existe alguma query no URL
    //isto para nao voltar a fazer um pedido desnecessario
    var query = getQuery();

    if ($("input").val() !== query) {
      //caso a input tenha uma valor diferente da query atual do url aí sim é executado um novo pedido API (getPhotosBySearch)
      getPhotosBySearch($("input").val(), "1");
    }
  }
});

//getPhotosBySearch executa uma chamada API com uma query introduzida pelo utilizador
function getPhotosBySearch(query, page) {
  //caso a variável page esteja vazia significa que estamos a carregar a primeira página
  if (!page) {
    page = 1;
  }
  //é necessario atualizar o URL de forma a sabermos em que pagina estamos e a query que estamos a usar
  //de seguida é executada a chamada api com a query obtida
  window.history.pushState("", "", "?page=" + page + "&query=" + query);

  var url =
    util.API_URL +
    "search/photos?page=" +
    page +
    "&query=" +
    query +
    "&per_page=" +
    util.PER_PAGE +
    "&client_id=" +
    util.CLIENT_ID;

  callApi(url);
}
