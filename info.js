const robotid = new URLSearchParams(window.location.search).get('robotID')

console.log(robotid);

fetch(`http://localhost:3000/all/${robotid}`)
.then(res=>res.json())
.then(element => {
    console.log(element);

    document.body.innerHTML=` <div class="card">
    <div class="flag" >
    <img src="${element.avatar}" alt="flag">
         </div>
      <div class="info">
          <p>Name : ${element.firstName}</p>
            <p>Capital :  ${element.lastname}</p>
           <p>Population : ${element.gender}</p>
         </div>
           </div>`

})