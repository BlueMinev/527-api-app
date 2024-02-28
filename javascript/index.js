window.addEventListener("load", function () {
  let form = document.querySelector("#search form");

  form.addEventListener("submit", sendMessage);

  async function sendMessage(evt) {
    evt.preventDefault();
    reset();
    document.querySelector("#loading").style.display = "block";
    let search = document.querySelector("#searchbar").value.trim();
    let fields_ok = true;
    let success = true;
    if (search.length == 0) {
      fields_ok = false;
    }
    if (fields_ok) {
      // hide form and show loading icon

      // prepare data for transport to server
      let url = "https://api.vam.ac.uk/v2/objects/search?q=";
      url = url + search;
      // create variables for data on html page that will be changed
      let result = document.querySelector("#result");
      document.querySelector("#loading").style.display = "block";
      // perfom fetch api
      fetch(url)
        .then(function (response) {
          document.querySelector("#result").style.display = "block";
          // hide loading icon when we receive a the response
          document.querySelector("#loading").style.display = "none";
          return response.json();
        })
        .then(function (value) {
          let pageSize = Number(value["info"]["page_size"]);
          for (let i = 0; i < pageSize; i++) {
            // sets base
            let title = "Unknown";
            let date = "Unknown";
            let desc = "There is no information available on this piece.";
            let imageValue =
              "https://cdn.glitch.global/8e9207b0-f392-4744-9556-fb5b58c2ee12/no_image.png?v=1708461833844";

            if (value["records"][i]["_primaryTitle"] === "") {
            } else {
              title = value["records"][i]["_primaryTitle"];
            }

            date = value["records"][i]["_primaryDate"];

            if (
              value["records"][i]["_images"]["_iiif_image_base_url"] ===
              undefined
            ) {
            } else {
              imageValue =
                value["records"][i]["_images"]["_iiif_image_base_url"] +
                "/full/full/0/default.jpg";
            }

            if (value["records"][i]["_currentLocation"]["type"] === "storage") {
              whereToFind = "This item is currently not being displayed";
            } else {
              whereToFind =
                "You can find this object : " +
                value["records"][i]["_currentLocation"]["displayName"];
            }

            let madeBy = value["records"][i]["_primaryMaker"]["name"];
            let type = value["records"][i]["objectType"];
            let imgdesc = "A photo of a " + type + " made by " + madeBy + ".";
            desc = "A " + type + " made by " + madeBy + "." + whereToFind + ".";

            var cardDiv = document.createElement("div");
            cardDiv.className = "card";

            var titleH2 = document.createElement("h2");
            titleH2.className = "title";
            cardDiv.textContent = title;
            var dateH3 = document.createElement("h3");
            dateH3.className = "date";
            dateH3.textContent = date;
            var imgElm = document.createElement("img");
            imgElm.className = "image";
            imgElm.setAttribute("src", imageValue);
            imgElm.setAttribute("alt", imgdesc);
            var para = document.createElement("p");
            para.className = "desc";
            para.textContent = desc;

            cardDiv.appendChild(titleH2);
            cardDiv.appendChild(dateH3);
            cardDiv.appendChild(imgElm);
            cardDiv.appendChild(para);
            result.appendChild(cardDiv);
          }
        })
        .catch(function (error) {
          console.log(error);
          document.querySelector("#error").style.display = "block";
          // hide loading icon when we receive a the response
          document.querySelector("#loading").style.display = "none";
        });
    }

    let reset_error = document.querySelector("#reset_error");
    reset_error.addEventListener("click", reset);

    function reset(evt) {
      document.querySelector("#result").style.display = "none";
      document.querySelector("#error").style.display = "none";
      document.querySelector("#loading").style.display = "none";
      document.querySelector("#result").innerHTML = "";
    }
  }
});
