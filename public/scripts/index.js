const DOM = {};
const VIEWS = {
    SIGNUP: 'signup',
    THANKYOU: 'thankyou',
    LOCATION: 'location',
};
const logoBtn = document.querySelector('.logo');
const locationBtn = document.querySelector('.nav .location');
const submitBtn = document.querySelector('.input__submit');
const gobackBtn = document.querySelector('.middle__thankyou button');
const MOBILE_BREAKPOINT = 767;

// Populate DOM object with references to 3 views: signup, thankyou and location
Object.keys(VIEWS).forEach((view) => {
    let element = document.querySelector('.middle__' + VIEWS[view]);
    DOM[VIEWS[view]] = element;
});

function Junipero(view) {
    this.view = view;
    this.render();
};

Junipero.prototype.setView = function (view) {
    this.view = view;
    switch (this.view) {
        case VIEWS.LOCATION:
            locationBtn.querySelector('p').innerText = 'Go Back';
            locationBtn.addEventListener('click', showSignup);
            locationBtn.removeEventListener('click', showLocation);
            break;
        case VIEWS.SIGNUP:
            locationBtn.querySelector('p').innerText = 'Location';
            locationBtn.addEventListener('click', showLocation);
            locationBtn.removeEventListener('click', showSignup);
            break;
    }
    this.render();

}

Junipero.prototype.clear = function () {
    Object.keys(DOM).forEach((view) => {
        let element = DOM[view];
        element.style.display = 'none';
        element.style.opacity = 0;
        element.style.transform = 'translateX(-100px)';
    });
}

Junipero.prototype.render = function () {
    this.clear();
    let element = DOM[this.view];
    element.style.display = 'block';

    anime({
        targets: element,
        opacity: 1,
        translateX: 0,
        duration: 300,
        easing: 'linear'
    });
}

var junipero = new Junipero(VIEWS.SIGNUP);

const showSignup = () => {
    junipero.setView(VIEWS.SIGNUP);
}

const showLocation = () => {
    junipero.setView(VIEWS.LOCATION);
}

const showThankyou = () => {
    junipero.setView(VIEWS.THANKYOU);
}

const onResize = () => {
    const WIDTH = window.innerWidth;
    if (WIDTH <= MOBILE_BREAKPOINT) {
        containerEl.appendChild(navEl);
        containerEl.appendChild(footerEl);
    } else {
        leftSectionEl.insertBefore(navEl, contentEl)
        leftSectionEl.appendChild(footerEl);
    }
}

submitBtn.addEventListener('click', showThankyou);
locationBtn.addEventListener('click', showLocation);
logoBtn.addEventListener('click', showSignup);
gobackBtn.addEventListener('click', showSignup);
window.addEventListener("resize", onResize);

const containerEl = document.querySelector('.container');
const leftSectionEl = document.querySelector('.left-section');
const navEl = document.querySelector('.nav');
const footerEl = document.querySelector('.footer');
const contentEl = document.querySelector('.content');
onResize();