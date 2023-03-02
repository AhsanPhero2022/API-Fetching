const allData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showData(data.data));
};

const showData = (singleData) => {
  console.log(singleData);
  const parants = document.getElementById("parants-div");
  singleData.tools.forEach((totalData) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
     <div class="card h-100">
            <img src="${totalData.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
            </div>
          </div>
    `;
    parants.appendChild(div);
  });
};
allData();
