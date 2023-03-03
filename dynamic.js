const allData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showData(data.data));
  toggleSpinner(true);
};

const showData = (singleData) => {
  // console.log(singleData);
  const parants = document.getElementById("parants-div");
  singleData.tools.forEach((totalData) => {
    const div = document.createElement("div");

    div.classList.add("col");
    div.innerHTML = `
     <div class="card h-100">
            <img src="${totalData.image}" class="p-4  card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${totalData.name}</h5>
              
             <ol>
              <li>${totalData.features[0]}</li>
              <li>${totalData.features[1]}</li>
              <li>${totalData.features[3]}</li>
              </ol>
              
            
            
            <div class="card-footer">
        <small class="text-muted d-flex justify-content-between">
        <div>
        <h5 style="color: cyan;">${totalData.name}</h5>
        <p><i style="color: cyan;"  class="fa-regular fa-calendar-days"></i>
            ${totalData.published_in}</p>
        </div>
        <div>
        <button onclick="modalData('${totalData.id}')" type="button" class="rounded-circle btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fa-solid fa-angles-right"></i>
      </button>
        </div>
        </small>
        
      </div>
            </div>
          </div>
    `;
    parants.appendChild(div);
  });
  toggleSpinner(false);
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// Modal start
const modalData = (tools_id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${tools_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};

allData();
