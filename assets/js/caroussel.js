let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) { // fleches gauche et droite 
  showSlides(slideIndex += n);
  
}

function currentSlide(n) { // Points pour directement aller sur une photo
  showSlides(slideIndex = n);
}

function showSlides(n) { // show image
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length){
    slideIndex = 1;
  }    
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  var num=slideIndex+" / 17";
  document.getElementById("numbertext").innerHTML=num;
  console.log(num);
}