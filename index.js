$(document).ready(function() {
  $("#btn").click(function() {
    var request = $.ajax({
      url:
        "https://api.unsplash.com/photos?order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578",

      success: function(data) {
        console.log("success", data);
      }
    });
  });
});
