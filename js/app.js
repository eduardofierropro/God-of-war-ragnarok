'use strict';
(function () {
    var sliderCounter = 0;
    var cardsVisible = 3;
    var isMobile = false;
    var slider = document.querySelector('.Slider');
    var sliderMove = document.querySelector('.Slider-move');
    var sliderCards = slider.querySelectorAll('.Slider-card');
    var sliderArrow = slider.querySelectorAll('.Slider-arrow');
    var sliderLine = slider.querySelectorAll('.Slider-line');
    var sliderBtn = slider.querySelectorAll('.Slider-btn');
    var introDiv = document.querySelector('.Intro');
    var bg = introDiv.querySelector('.bg');
    var polvo1 = introDiv.querySelector('.polvo1');
    var polvo2 = introDiv.querySelector('.polvo2');
    var polvo3 = introDiv.querySelector('.polvo3');
    var nieve1 = introDiv.querySelector('.nieve1');
    var nieve2 = introDiv.querySelector('.nieve2');
    var kratos = introDiv.querySelector('.kratos');
    var freya = introDiv.querySelector('.freya');
    var boy = introDiv.querySelector('.boy');
    var trineo = introDiv.querySelector('.trineo');
    var elementos = [
        { elemento: freya, velocidad: 6, tipo: 'tipoFreya' },
        { elemento: boy, velocidad: 9, tipo: 'tipoBoy' },
        { elemento: kratos, velocidad: 5, tipo: 'tipoKratos' },
        { elemento: trineo, velocidad: 5, tipo: 'tipoTrineo' },
        { elemento: polvo1, velocidad: 20, tipo: 'tipoPolvo' },
        { elemento: polvo2, velocidad: 12, tipo: 'tipoPolvo' },
        { elemento: polvo3, velocidad: 10, tipo: 'tipoPolvo' },
        { elemento: nieve1, velocidad: 10, tipo: 'tipoBoy' },
        { elemento: nieve2, velocidad: 5, tipo: 'tipoFreya' },
        { elemento: bg, velocidad: 10, tipo: 'tipoBg' }
    ];
    var sliderMoveValue = function () {
        var operacion = 100 / sliderCards.length;
        sliderMove.style.transform = "translateX(-".concat(operacion * sliderCounter * 3, "%)");
    };
    var sliderLineActive = function () {
        sliderLine.forEach(function (eachLine, i) {
            sliderBtn[i].classList.remove('isActive');
        });
        sliderBtn[sliderCounter].classList.add('isActive');
        sliderMoveValue();
    };
    var sliderNext = function () {
        sliderCounter++;
        sliderCounter === sliderCards.length - 1 && sliderArrow[1].classList.remove('isActive');
        sliderArrow[0].classList.add('isActive');
        sliderLineActive();
    };
    var sliderPrev = function () {
        sliderCounter === 1 && sliderArrow[0].classList.remove('isActive');
        sliderCounter--;
        sliderArrow[1].classList.add('isActive');
        sliderLineActive();
    };
    var windowResize = function () {
        var innerWidth = window.innerWidth;
        cardsVisible = (innerWidth <= 700) ? 1 : 3;
        isMobile = (innerWidth <= 700) ? true : false;
    };
    var efectoScroll = function (elemento, velocidad, tipo) {
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY, innerHeight = window.innerHeight;
            var offsetTop = introDiv.offsetTop;
            var operacion = offsetTop - innerHeight / 1.5;
            var valorTransform = ((scrollY - operacion) / velocidad) / 10;
            var tipoTransform = {
                tipoFreya: "translateX(-".concat(valorTransform, "%) translateY(").concat(valorTransform, "%) rotate(-").concat(valorTransform / 5, "deg)"),
                tipoKratos: "translateX(".concat(valorTransform, "%)  translateY(-").concat(valorTransform, "%) rotate(").concat(valorTransform / 2, "deg)"),
                tipoBoy: "translateX(".concat(valorTransform * 2, "%)  translateY(-").concat(valorTransform, "%) rotate(").concat(valorTransform, "deg)"),
                tipoTrineo: "translateX(".concat(valorTransform / 1.5, "%) translateY(-").concat(valorTransform, "%) scale(1.4)"),
                tipoPolvo: "scale(".concat(valorTransform, ")"),
                tipoRuido: "translateX(-".concat(valorTransform, "%)"),
                tipoBg: "rotate(-".concat(valorTransform, "deg) scale(1.4)")
            };
            /* elemento.style.transform = (scrollY >= operacion )
                ? tipoTransform[tipo]
                : `translateX(0%) translateY(0%) rotate(0deg)` */
            elemento.style.transform = tipoTransform[tipo];
        });
    };
    sliderMoveValue();
    windowResize();
    sliderBtn.forEach(function (eachBtn, i) {
        sliderBtn[i].addEventListener('click', function () {
            sliderCounter = i;
            sliderArrow.forEach(function (eachArrow, i) {
                sliderArrow[i].classList.add('isActive');
            });
            sliderCounter === sliderCards.length - 1 && sliderArrow[1].classList.remove('isActive');
            sliderCounter === 0 && sliderArrow[0].classList.remove('isActive');
            sliderLineActive();
        });
    });
    sliderArrow[1].addEventListener('pointerdown', sliderNext);
    sliderArrow[0].addEventListener('pointerdown', sliderPrev);
    window.addEventListener('resize', windowResize);
    elementos.forEach(function (_a) {
        var elemento = _a.elemento, velocidad = _a.velocidad, tipo = _a.tipo;
        return efectoScroll(elemento, velocidad, tipo);
    });
    var sliderBrilli = document.querySelectorAll('.Slider-brilli');
    window.addEventListener('deviceorientation', function (e) {
        console.clear();
        sliderBrilli.forEach(function (brilli, i) {
            sliderBrilli[i].style.transform = "rotate(45deg) translateY(-40%) translateX(".concat(e.gamma, "em)");
        });
    }, true);
    /* document.body.addEventListener('click',()=>{
        let deviceMotion : any = DeviceMotionEvent
        deviceMotion.requestPermission()
            .then( response => {
            
            if ( response == "granted" ) {
                console.log('asd')
                
            }
        })
    }) */
})();
