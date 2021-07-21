const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
   
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 500) {
            upElem.classList.add('up-btn_active');
        } else {
            upElem.classList.remove('up-btn_active');
        }
    });

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.2;
    
        links.forEach(link => {
            if (link.getAttribute('href') != '#'){
                link.addEventListener('click', function(event) {
                    event.preventDefault();
        
                    let widthTop = document.documentElement.scrollTop,
                        hash = this.hash,
                        toBlock = document.querySelector(hash).getBoundingClientRect().top,
                        start = null;
        
                    requestAnimationFrame(step);
        
                    function step(time) {
                        if (start === null) {
                            start = time;
                        }
        
                        let progress = time - start,
                            r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
        
                            document.documentElement.scrollTo(0, r);
        
                        if (r != widthTop + toBlock) {
                            requestAnimationFrame(step);
                        } else {
                            location.hash = hash;
                        }
                    }
                });
            }
        });
};

export default scrolling;