const navigationBar = document.getElementsByTagName("nav");
const closeIcon = document.getElementById("closeicon");
const heroSection = document.querySelector("hero-section");
const barIcon = document.getElementById("baricon");

barIcon.addEventListener("click", function(){
    navigationBar.style.width = "300px";
    closeIcon.style.display ="block";
    heroSection.style.display ="none";
})