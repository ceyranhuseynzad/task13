const wrapper = document.querySelector('.mainWrapper');
const inputEl = document.querySelector('#searchBar');
const selectEl = document.querySelector('#gender');
const loadBtn = document.querySelector('#load');


function goTo(id) {
    window.location = `./info.html?robotID=${id}`
}

let loadCount = 4;

loadBtn.addEventListener('click', ()=>{
    loadCount +=4;
    getAllRobots()
}
)


const getAllRobots = function () {

    

    wrapper.innerHTML = '';

    fetch('http://localhost:3000/all/')
        .then(res => res.json())
        .then(data => {

            let countedData = data.slice(0, loadCount)

            if(loadCount>=data.length){
                loadBtn.style.display="none"
            }
            wrapper.innerHTML = '';

            countedData.forEach(element => {



                wrapper.innerHTML += `
            <div class="card" onclick='goTo("${element.id}")'>
               <div class="flag" >
               <img src="${element.avatar}" alt="flag">
                    </div>
                 <div class="info">
                     <p>Name : ${element.firstname}</p>
                       <p>Firstname :  ${element.lastname}</p>
                      <p>Gender : ${element.gender}</p>
                      
                    </div>
                      </div>`
            });



            inputEl.addEventListener('input', (e) => {
                let filtered = data.filter((dt) => dt.firstname.toLowerCase().startsWith((e.target.value).toLowerCase()))

                wrapper.innerHTML = '';

                filtered.forEach(robot => {
                    wrapper.innerHTML += `
                <div class="card" onclick='goTo("${robot.id}")'>
                <div class="flag" >
                <img src="${robot.avatar}" alt="flag">
                     </div>
                  <div class="info">
                      <p>Name : ${robot.firstname}</p>
                        <p>Firstname :  ${robot.lastname}</p>
                       <p>Gender : ${robot.gender}</p>
                       
                     </div>
                       </div>`
                })

            })

            selectEl.addEventListener('change', (e) => {
                let gender = e.target.value;

            

                if (gender == 'all') {
                    getAllRobots()
                } else {
                    let genFilter = data.filter((element)=>{
                        return element.gender == gender;
                    })
                    wrapper.innerHTML = '';
                    genFilter.forEach(robot => {
                        wrapper.innerHTML += `
                    <div class="card" onclick='goTo("${robot.id}")'>
                    <div class="flag" >
                    <img src="${robot.avatar}" alt="flag">
                         </div>
                      <div class="info">
                          <p>Name : ${robot.firstname}</p>
                            <p>Firstname :  ${robot.lastname}</p>
                           <p>Gender : ${robot.gender}</p>
                           
                         </div>
                           </div>`
                    })
                }
            })

        })
}


getAllRobots();



