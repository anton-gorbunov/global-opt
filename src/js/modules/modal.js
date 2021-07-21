function getScrollWidth(){
    const div = document.createElement('div');
    div.style.height = '50px';
    div.style.width = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
}
function openModal(modalItem, overlay){
    overlay.classList.add('overlay_active');
    modalItem.classList.remove('modal_disable');
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${getScrollWidth()}px`;
}
function closeModal(overlay){
    overlay.classList.remove('overlay_active');
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
    for (let child of overlay.children){
        child.classList.add('modal_disable');
    }
}
const modal = () => {
    const overlay = document.querySelector('.overlay'),
          modal = overlay.querySelector('#call'),
          closeBtns = overlay.querySelectorAll('.modal__close'),
          callBtns = document.querySelectorAll('[data-call]');

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && overlay.classList.contains('overlay_active')){
            closeModal(overlay);
        }
    });
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay){
            closeModal(overlay);
        }
    }); 
    closeBtns.forEach(item => {
        item.addEventListener('click',() => closeModal(overlay));
    });

    callBtns.forEach(item => {
        item.addEventListener('click', () => {
        openModal(modal, overlay);
        });
    });
};

export default modal;
export {closeModal, openModal}