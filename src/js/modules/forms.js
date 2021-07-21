import {openModal, closeModal} from "./modal";

const forms = () => {
    const forms = document.querySelectorAll('form'),
          overlay = document.querySelector('.overlay'),
          modalMin = overlay.querySelector('#end');

    forms.forEach(form => {
        sendForm(form);
    });

    function sendForm(form){
        form.addEventListener('submit', (event) => {
        event.preventDefault();

        function openThanksModal(messageArr){
            closeModal(overlay);
            openModal(modalMin, overlay);
            modalMin.querySelector('.modal__subtitle').innerHTML = messageArr[0];
            modalMin.querySelector('.modal__descr').innerHTML = messageArr[1];
        
            
            setTimeout(() => {
            closeModal(overlay);
            }, 2500);
        }
        
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
};

export default forms;