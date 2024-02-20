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
      var xhr = new XMLHttpRequest();
      var url = "https://api.vam.ac.uk/v2/objects/search?q="
      url= url + search;
        var title = document.querySelector("#title")
        var date = document.querySelector("#date")
        var image = document.querySelector("#image")
        var desc = document.querySelector("#desc")
      try {
        const response = await fetch ( url );
        const value = await response.json ();
      title.textContent=value["records"][0]["_primaryTitle"];
      date.textContent=value["records"][0]["_primaryDate"];
      imageValue=value["records"][1]["_images"]["_iiif_image_base_url"] + "/full/full/0/default.jpg";
      console.log(imageValue);
      image.setAttribute("src",imageValue);
      whereToFind=value["records"][0]["_currentLocation"]["displayName"]
      madeBy=value["records"][0]["_primaryMaker"]["name"]
      type=value["records"][0]["objectType"]
      description = "A " + type + " made by " + madeBy + ". \n You can find this object : " + whereToFind + "."
      desc.textContent=description;



      success=true;
        } catch (error) {
        console.log(error);
        success=false;
        }
    
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
