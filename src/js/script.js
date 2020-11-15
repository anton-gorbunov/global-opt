document.addEventListener('DOMContentLoaded', () => {

  //slider
const slider = tns({
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

  //modal

  const overlay = document.querySelector('.overlay'),
        modal = overlay.querySelector('#call'),
        modalMin = overlay.querySelector('#end'),
        closeBtns = overlay.querySelectorAll('.modal__close'),
        callBtns = document.querySelectorAll('[data-call]');

  function openModal(modalItem){
    overlay.classList.add('overlay_active');
    modalItem.classList.remove('modal_disable');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    overlay.classList.remove('overlay_active');
    document.body.style.overflow = '';
    for (let child of overlay.children){
        child.classList.add('modal_disable');
    }
  }
  function openThanksModal(messageArr){
    closeModal();
    openModal(modalMin);
    modalMin.querySelector('.modal__subtitle').innerHTML = messageArr[0];
    modalMin.querySelector('.modal__descr').innerHTML = messageArr[1];
   
    
    setTimeout(() => {
      closeModal();
    }, 2500);
  }
  document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && overlay.classList.contains('overlay_active')){
        closeModal();
      }
  });
  overlay.addEventListener('click', (event) => {
      if (event.target === overlay){
        closeModal();
      }
  }); 
  closeBtns.forEach(item => {
    item.addEventListener('click',closeModal);
  });

  callBtns.forEach(item => {
    item.addEventListener('click', () => {
      openModal(modal);
    });
  });
  // forms

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    sendForm(form);
  });

  function sendForm(form){
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const messages = {
        loading: 'icons/spinner.svg',
        success:['Спасибо за вашу заявку!','Наш менеджер свяжется с вами в ближайшее время!'],
        error:['Что-то пошло не так...','Попробуйте отправить заявку позже.']
      };
      let statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = 'display:block;margin:20px auto 0 auto;';
      form.insertAdjacentElement('afterEnd',statusMessage);
      let formData = new FormData(form);
      let obj = {};

      formData.forEach(function(value,key) {
        obj[key] = value;
      });

      fetch('mailer/smart.php', {
        method: 'POST',
        header: {
          'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
      }).
      then((data) => {
        data.text();
      }).
      then(() => {
        openThanksModal(messages.success);
        statusMessage.remove();
        
      }).
      catch(() => {
        openThanksModal(messages.error);
        statusMessage.remove();
      }).finally(() => {
        form.reset();
      });

    });
  }
  
});
