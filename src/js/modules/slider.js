import  {tns}  from "../../../node_modules/tiny-slider/src/tiny-slider";

const tinySlider = () => {
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
};

export default tinySlider;