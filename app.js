const searchForm = document.querySelector("#search-form");
const searchBox = document.querySelector("#search-box");
const searchResult = document.querySelector("#search-result");
const showMoreImage = document.querySelector("#show-more-img");

let accsesKey = "49YQB--hRvP4XyY5Tk8NcRQPWk0VPX4cOvoYhuUOGRQ";
let keyword = "";
let page = 1;

let imageSearch = async () => {
  keyword = searchBox.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accsesKey}&per_page=12`;

  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;
  if (page === 1) {
    searchResult.innerHTML = "";
  }
    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
  showMoreImage.style.display = "block";
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  imageSearch();
});

showMoreImage.addEventListener("click", () => {
  page++;
  imageSearch();
});
