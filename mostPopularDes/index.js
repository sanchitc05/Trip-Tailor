var btns = document.getElementsByClassName("rotate-btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].style.backgroundColor = "white";
}
document.querySelectorAll('.rotate-btn').forEach(button => {
    button.addEventListener('click', function() {
      const destinationBox = this.closest('.destination-box');
      destinationBox.classList.toggle('flipped'); 
      
  

      const backImage = destinationBox.querySelector('.destination-box-back img');
  
      if (destinationBox.classList.contains('flipped')) {

        if (backImage) {
          backImage.style.opacity = '0.6';
        }
      } else {

        if (backImage) {
          backImage.style.opacity = '1';
        }
      }
    });
  });
  