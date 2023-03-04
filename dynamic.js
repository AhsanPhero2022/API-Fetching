const allData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showData(data.data.tools));
  toggleSpinner(true);
};

const showData = (singleData) => {
  const parants = document.getElementById("parants-div");
  singleData.forEach((totalData) => {
    const div = document.createElement("div");

    div.classList.add("col");
    div.innerHTML = `
     <div class="card h-100">
            <img src="${totalData.image}" class="p-4  card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${totalData.name}</h5>
              
             <ol>
              <li>1. ${totalData.features[0]}</li>
              <li>2. ${totalData.features[1]}</li>
              <li>3. ${totalData.features[3]}</li>
              </ol>
              
            
            
            <div class="card-footer">
        <small class="text-muted d-flex justify-content-between">
        <div>
        <h5 style="color: cyan;">${totalData.name}</h5>
        <p><i style="color: cyan;"  class="fa-regular fa-calendar-days"></i>
            ${totalData.published_in}</p>
        </div>
        <div>
        <label for="universId" onclick="fetchUniversId('${totalData.id}')" for="my-modal-5" class="btn btn-outline btn-info btn-circle btn-xs">
        <i class="fa-solid fa-angles-right"></i>
        </label>
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
const fetchUniversId = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  //   console.log(singleData);
  const res = await fetch(url);
  const data = await res.json();
  displayUniverDetails(data.data);
};

const displayUniverDetails = (univer) => {
  console.log(univer.features[1].feature_name);
  document.getElementById("modal-description").innerHTML = `
         

            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">${univer.description}</h2>
                <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-3 text-center py-6">
                <div class="bg-green-500 p-3 rounded-lg">
                <h3>${
                  !!univer.pricing ? univer.pricing[1].price : "Free of Cost/"
                } <br> ${univer.pricing ? univer.pricing[1].plan : "Pro"} </h3>
                </div>
                <div class="bg-blue-500 p-3 rounded-lg">
                <h3>${
                  !!univer.pricing ? univer.pricing[1].price : "Free of Cost/"
                } <br> ${univer.pricing ? univer.pricing[1].plan : "Pro"}</h3>
                </div>
                <div class="bg-red-500 p-3 rounded-lg">
                <h3">${
                  !!univer.pricing
                    ? univer.pricing[2].price.slice(0, 10)
                    : "Free of Cost/"
                } <br> ${
    univer.pricing ? univer.pricing[2].plan : "Enterprise"
  }</h3>
                </div>
                </div>
                
              </div>
            </div>



























            

            <div class="card w-96 bg-base-100 shadow-xl">
              
              <figure><img src="${univer.image_link}" alt="" /></figure>
              <div class="card-body">
            <p class="font-semibold">${
              univer.input_output_examples[0].input
                ? univer.input_output_examples[0].input
                : "No! Not Yet! Take a break!!!"
            }</p>
            <p>${
              univer.input_output_examples
                ? univer.input_output_examples[0].output
                : "No! Not Yet! Take a break!!!"
            }</p>
              </div>
            </div>
  `;
};
allData();
