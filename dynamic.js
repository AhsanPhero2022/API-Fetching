const allData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showData(data.data.tools.slice(0, 6)));

  toggleSpinner(true);
};

const showData = (singleData) => {
  document.getElementById("btn-sort").addEventListener("click", function () {
    const sortByDate = (a, b) => {
      const dateA = new Date(a.published_in);
      const dateB = new Date(b.published_in);

      if (dateA < dateB) return 1;
      else if (dateA > dateB) return -1;
      return 0;
    };
    const sortData = singleData.sort(sortByDate);
    showData(sortData);
  });

  const parants = document.getElementById("parants-div");
  parants.innerHTML = "";
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
  // console.log(univer);
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
                

                 <div class="flex justify-between">
    <div>
    <h3 class="font-semibold">
    Features
    </h3>
    <ul>
    <li><small>1. ${univer.features[1].feature_name}</small></li>
    <li><small>2. ${univer.features[2].feature_name}</small></li>
    <li><small>3. ${univer.features[3].feature_name}</small></li>
    </ul>
    </div> 

    <div>
  <h3 class="font-semibold">
  Integrations
  </h3>
  <ul>
  <li><small>1. ${
    univer.features[1].feature_name
      ? univer.features[1].feature_name
      : "No data Found"
  }</small></li>
    <li><small>2. ${
      univer.features[2].feature_name
        ? univer.features[2].feature_name
        : "No data Found"
    }</small></li>
    <li><small>3. ${
      univer.features[2].feature_name
        ? univer.features[2].feature_name
        : "No data Found"
    }</small></li>
    </ul>
    </div>
    </div>
  </div>
</div>
                
              </div>
            </div>






            

            <div class="p-4 card w-96 bg-base-100 shadow-xl">
              
              <figure><img class="relative" src="${
                univer.image_link[0]
              }" alt="" />
              <div id="hidden" class="hidden absolute top-7 right-7">${
                univer.accuracy.score
              }% accuracy</div>
              </figure>
              <div class="card-body">
            <p class="font-semibold">${
              univer.input_output_examples[0].input
                ? univer.input_output_examples[0].input
                : "No! Not Yet! Take a break!!!"
            }</p>
            <p>${
              univer.input_output_examples[1].output
                ? univer.input_output_examples[1].output
                : "No! Not Yet! Take a break!!!"
            }</p>
              </div>
            </div>
  `;

  if (univer.accuracy.score) {
    document.getElementById("hidden").classList.remove("hidden");
  }
};

// document
//   .getElementById("btn-show-all")
//   .addEventListener("click", function () {});

allData();
