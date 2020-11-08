document.addEventListener('DOMContentLoaded', () => {

  //slider
/* const slider = tns({
    container: '.comments__slider',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });
  document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
  });
  document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
  });
 */
  //to top button

  const btn = document.querySelector('.up-btn');

  document.addEventListener('scroll', () => {
      let scrolled = window.pageYOffset;
      let coords = document.documentElement.clientHeight;

      if (scrolled > coords ){
          btn.classList.add('up-btn_active');
      } else {
          btn.classList.remove('up-btn_active');
      }
  });

  btn.addEventListener('click', backToTop);
  
  function backToTop() {
      
      if (window.pageYOffset > 0) {
          window.scrollBy(0,-80);
          setTimeout(backToTop,0);
      } 
  }

  //hamburger
  const hamburger = document.querySelector('.header-hamburger__block'),
        menu = document.querySelector('.header__menu'),
        links = menu.querySelectorAll('.header__link');
  
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('header__menu_active');
    hamburger.classList.toggle('header-hamburger__block_active');
  });

  links.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.toggle('header__menu_active');
      hamburger.classList.toggle('header-hamburger__block_active');
    });
  });

});


$(document).ready(function () {
  $('.call').on('click', function () {
    $('.overlay, #call').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #call, #end').fadeOut('slow');
  });

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serializeArray()
    }).done(function () {
      $(this).find("input").val("");
      $('#call').fadeOut();
      $('.overlay, #end').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

});