const accessKey = "Dzsax6OA1aK208FUA5lrOdrQ4HCZJ2j9mzu8wikqO94"

const formEl= document.querySelector("form");
const inputEl = document.getElementById("input-search");
 
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData ="";
let page  = 1;

async function truncateText(text, maxLines = 2) {
    const tempDiv = document.createElement("div");
    tempDiv.style.height = "auto";
    tempDiv.style.overflow = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.whiteSpace = "nowrap";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.wordWrap = "break-word"; // Added to support word wrap
    tempDiv.style.maxHeight = maxLines * parseFloat(getComputedStyle(tempDiv).lineHeight) + "px";
    tempDiv.innerHTML = text;
    document.body.appendChild(tempDiv);
    if (tempDiv.offsetHeight > parseFloat(getComputedStyle(tempDiv).maxHeight)) {
      while (tempDiv.offsetHeight > parseFloat(getComputedStyle(tempDiv).maxHeight)) {
        text = text.slice(0, -1);
        tempDiv.innerHTML = text + "...";
      }
    }
    document.body.removeChild(tempDiv);
    return text;
  }

async function truncateText(text, maxLines = 2) {
    const tempDiv = document.createElement("div");
    tempDiv.style.height = "auto";
    tempDiv.style.overflow = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.whiteSpace = "nowrap";
    tempDiv.style.visibility = "hidden";// Added to support word wrap
    tempDiv.style.maxHeight = maxLines * parseFloat(getComputedStyle(tempDiv).lineHeight) + "px";
    tempDiv.innerHTML = text;
    document.body.appendChild(tempDiv);
  
    // Wait for the text to be fully rendered and check if it needs truncation
    await new Promise((resolve) => {
      setTimeout(() => {
        if (tempDiv.offsetHeight > parseFloat(getComputedStyle(tempDiv).maxHeight)) {
          while (tempDiv.offsetHeight > parseFloat(getComputedStyle(tempDiv).maxHeight)) {
            text = text.slice(0, -5);
            tempDiv.innerHTML = text + "...";
          }
        }
        document.body.removeChild(tempDiv);
      resolve();
    });
  });

  return text;
}
async function searchImages(){
    inputData=inputEl.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
       }

    results.map((result) =>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement('a')  
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        // imageLink.textContent = truncateText(result.alt_description, 2); // Truncate to 2 lines
         
        imageLink.textContent= result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })
  page++;  
  if(page > 1){
    showMore.style.display = "block"
     
  }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault()
    page =1 ;
    searchImages()
})
showMore.addEventListener("click", ()=>{
   
    searchImages()
})