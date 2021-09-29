let searchby = 1;
let root = document.getElementById("root"); // getting hand over div element
// function header is used to create brand stickey top and search -----------------
function header() {
  // -------------- creating brand stickey top-------------------------
  brand = document.createElement("div");
  brand.innerHTML = "Open Brewery";
  brand.className = "text-warning bg-dark p-3 sticky-top h2";
  root.appendChild(brand);
  // -------------creating search field --------------------------------
  searchfield = document.createElement("div");
  searchfield.id = "searchfield";
  heading = document.createElement("h5");
  heading.innerHTML = "Search by ";
  searchfield.appendChild(heading);
  // creating dropdown for search-----------------------
  dropdowm = document.createElement("select");
  dropdowm.setAttribute("onchange", "set()");
  dropdowm.id = "searchby";
  // creating option1
  op1 = document.createElement("option");
  op1.value = "1";
  op1.innerHTML = "City";
  dropdowm.appendChild(op1);
  // creating option2
  op2 = document.createElement("option");
  op2.value = "2";
  op2.innerHTML = "State";
  dropdowm.appendChild(op2);
  searchfield.appendChild(dropdowm);
  //creating input search
  sfield = document.createElement("input");
  sfield.type = "text";
  sfield.id = "search";
  sfield.setAttribute("onkeyup", "search()");
  sfield.setAttribute("placeholder", "Search");
  searchfield.appendChild(sfield);
  root.appendChild(searchfield);
}
function footer(){
div= document.createElement("div");
div.className="bg-dark justify-content-center p-4 ";
tech = document.createElement("p");
tech.innerHTML=`Techs Used - <span>html,css,bootstrap,javascript</span>`;
tech.id="tech";
div.appendChild(tech);
content = document.createElement("p");
content.innerHTML=`Content Disclamier - <span>The contant of this website is taken from <a href="https://api.openbrewerydb.org/breweries">Open Brewery</a></span>`;
content.id="content";
div.appendChild(content);
socialmedia = document.createElement("p");
socialmedia.innerHTML=`<i class="fab fa-facebook-f"></i> <i class="fab fa-twitter"></i> <i class="fab fa-google"></i> <i class="fab fa-linkedin-in"></i> <i class="fab fa-youtube"></i>`;
socialmedia.id="social"
div.appendChild(socialmedia);
root.appendChild(div);
}
async function get() {
  const response = await fetch("https://api.openbrewerydb.org/breweries")
    .then(function (response) {
      return response.json();
    })
    .catch(function (err) {
      console.log(err.message);
    });
  return response;
}
async function getData() {
  header();
  const data = await get();
  display(data);
  footer();
  console.log(data);
}
function display(data) {
  div = document.createElement("div");
  div.className = "container-fluid row justify-content-center";
  div.id = "row";
  data.forEach((element) => {
    const newdiv = document.createElement("div");
    newdiv.className = "col-10 col-sm-5 col-lg-3";
    const name = document.createElement("h3");
    name.innerHTML = `${element.name}`;
    newdiv.appendChild(name);
    const type = document.createElement("p");
    type.innerHTML = `brewery type : ${element.brewery_type}`;
    type.id = "type";
    newdiv.appendChild(type);
    const address = document.createElement("p");
    if (element.street == null)
      address.innerHTML = `Address: , ${element.city}, ${element.state}, ${element.country}, ${element.postal_code.split('-')[0]}.`;
    else
      address.innerHTML = `Address: ${element.street}, ${element.city}, ${element.state}, ${element.country}, ${element.postal_code.split('-')[0]}.`;
    newdiv.appendChild(address);
    const web = document.createElement("p");
    if (element.website_url == null)
      web.innerHTML = `<i class="fa fa-globe" aria-hidden="true"></i> - Not Available`;
    else
      web.innerHTML = `<i class="fa fa-globe" aria-hidden="true"></i> ${element.website_url}`;
    newdiv.appendChild(web);
    const phone = document.createElement("p");
    if (element.phone == null)
      phone.innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i> - Not Available `;
    else
      phone.innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i>${element.phone}`;
    newdiv.appendChild(phone);
    div.appendChild(newdiv);
  });
  root.appendChild(div);
}
function set() {
  searchby = document.getElementById("searchby").value;
}
function search() {
  var search = document.getElementById("search");
  enteredvalue = search.value.toUpperCase();
  divelements = document.getElementById("row");
  innerdivs = divelements.getElementsByTagName("div");
  for (let i = 0; i < innerdivs.length; i++) {
    td = innerdivs[i].getElementsByTagName("p")[1];
    valu = td.innerHTML.split(",")[searchby];
    console.log(td.innerHTML.split(",")[searchby]);
    if (valu.toUpperCase().indexOf(enteredvalue) > -1)
      innerdivs[i].style.display = "";
    else innerdivs[i].style.display = "none";
  }
}
getData();
