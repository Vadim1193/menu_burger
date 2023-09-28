
const toggleClass = () => {
    const isMobile = {
        Android: () => navigator.userAgent.match(/Android/i),
        BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        Opera: () => navigator.userAgent.match(/Opera Mini/i),
        Windows: () => navigator.userAgent.match(/IEMobile/i),
        any: () => {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    }
    
    const addClassMobile = () => document.body.classList.add('_mobile');
    const addClassPc = () => document.body.classList.add('_pc');

    const toggleActive = () => {
        let menuArrows = document.querySelectorAll('.menu__arrow');
        const arrayArrows = [...menuArrows];
        if (arrayArrows.length > 0) {
            arrayArrows.map((elemWithArrow) => {
                elemWithArrow.addEventListener("click", () => {
                    elemWithArrow.parentElement.classList.toggle('_active');
                })
            })
        }
    }

    isMobile.any() ? addClassMobile() : addClassPc();
    toggleActive();
}

toggleClass();

//-----------------------------------

const iconBurger = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

const animationBurger = () => {
    if (iconBurger !== null) {
        iconBurger.addEventListener('click', () => {
            document.body.classList.toggle('_lock');
            iconBurger.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        })
    } else return;
}
animationBurger();

//-----------------------------------

const menuLinks = document.querySelectorAll('.menu__link[data-goTo]');

function addListener() {
    menuLinks.forEach(link => {
        link.addEventListener('click', onMenuLinkClick);
    })
}

function onMenuLinkClick(event) {
    const menuLink = event.target;
    const validLink = menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto);

    const routerLink = () => {
        const headerCord = document.querySelector('header').offsetHeight;
        const goToBlock = document.querySelector(menuLink.dataset.goto);
        const goToBlockValue = goToBlock.getBoundingClientRect().top + pageYOffset - headerCord;
    
        if (iconBurger.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconBurger.classList.remove('_active');
            menuBody.classList.remove('_active');
        }
    
        window.scrollTo({
            top: goToBlockValue,
            behavior: "smooth"
        })
        event.preventDefault();
    }

    validLink ? routerLink() : console.warn('Invalid link');
}

const checkedLink = (data) => {
    if(data.length > 0) {
        addListener();
    }
}

checkedLink(menuLinks);