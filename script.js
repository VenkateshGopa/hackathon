let searchby=1;
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
  const data = await get();
  display(data);
  console.log(data);
}
function display(data) {
  const div = document.getElementById("row");
  data.forEach((element) => {
    const newdiv = document.createElement("div");
    newdiv.className = "col-10 col-sm-5 col-md-3";
    const name = document.createElement("h3");
    name.innerHTML = `${element.name}`;
    newdiv.appendChild(name);
    const type = document.createElement("p");
    type.innerHTML = `Type : ${element.brewery_type}`;
    type.id="type";
    newdiv.appendChild(type);
    const address = document.createElement("p");
    if(element.street==null)
    address.innerHTML = `Address: , ${element.city}, ${element.state}, ${element.country}, ${element.postal_code}.`;
    else
    address.innerHTML = `Address: ${element.street}, ${element.city}, ${element.state}, ${element.country}, ${element.postal_code}.`;
    newdiv.appendChild(address);
    const web = document.createElement("p");
    if(element.website_url== null)
    web.innerHTML =`<i class="fa fa-globe" aria-hidden="true"></i> - Not Available`;
    else
    web.innerHTML =`<i class="fa fa-globe" aria-hidden="true"></i> ${element.website_url}`;
    newdiv.appendChild(web);
    const phone = document.createElement("p");
    if(element.phone == null)
    phone.innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i> - Not Available `;
    else
    phone.innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i> ${element.phone}`;
    newdiv.appendChild(phone);
    div.appendChild(newdiv);
  });
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
