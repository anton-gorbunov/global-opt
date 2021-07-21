const humburger = () => {
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
}

export default humburger;