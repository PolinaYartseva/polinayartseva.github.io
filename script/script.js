window.onscroll = function() {
    checkMarginToTop();
};

const nav = document.getElementById("nav");
const menuLink = document.querySelectorAll(".menu__link");

const sticky = nav.offsetTop;

function checkMarginToTop() {
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
        menuLink.forEach((el) => {
            el.classList.add("menu__link-white");
        })
    } else {
        nav.classList.remove("sticky");
        menuLink.forEach((el) => {
            el.classList.remove("menu__link-white");
        })
    }
}

const menuLinks = document.querySelectorAll('.mobile-menu__link');
const checkbox = document.getElementById('checkbox');

checkbox.checked = false;

menuLinks.forEach(linkButton => {
    linkButton.onclick = function() {
        checkbox.checked = false;
    };
});
