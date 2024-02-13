window.addEventListener("load", function () {
  var form = document.querySelector("#search form");

  form.addEventListener("submit", sendMessage);

  async function sendMessage(evt) {
    evt.preventDefault();
    reset();
    var search = document.querySelector("#searchbar").value.trim();
    var fields_ok = true;
    if (search.length == 0) {
      fields_ok = false;
    }
    if (fields_ok) {
      console.log(search);
      // hide form and show loading icon
      document.querySelector("#loading").style.display = "block";
      // prepare data for transport to server
      var data = new FormData();
      data.append("search", search);
      // simulate delay when submitting the data to the server
      // (we'll add the real submit code in a later tutorial)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      var success = Math.random() > 0.25;
      // hide loading icon when we receive a the response
      document.querySelector("#loading").style.display = "none";
      // show success or error section depending on the response
      if (success) {
        document.querySelector("#result").style.display = "block";
      } else {
        document.querySelector("#error").style.display = "block";
      }
    }
  }

  var reset_error = document.querySelector("#reset_error");
  reset_error.addEventListener("click", reset);

  function reset(evt) {
    document.querySelector("#result").style.display = "none";
    document.querySelector("#error").style.display = "none";
    document.querySelector("#loading").style.display = "none";
    //document.querySelector("#searchbar").value = "";
  }
});
