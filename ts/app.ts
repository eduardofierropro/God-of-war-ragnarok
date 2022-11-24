'use strict';


( ()=>{
    let sliderCounter : number   = 0
    let cardsVisible  : number   = 3 
    let isMobile      : boolean  = false
    const slider                 = (document.querySelector('.Slider') as HTMLDivElement) 
    const sliderMove             = (document.querySelector('.Slider-move') as HTMLDivElement )
    const sliderCards            = slider.querySelectorAll<HTMLDivElement>('.Slider-card') 
    const sliderArrow            = slider.querySelectorAll<HTMLButtonElement>('.Slider-arrow')
    const sliderLine             = slider.querySelectorAll<HTMLButtonElement>('.Slider-line')
    const sliderBtn              = slider.querySelectorAll<HTMLButtonElement>('.Slider-btn')
    const introDiv = (document.querySelector('.Intro')  as HTMLDivElement)
    const bg       = (introDiv.querySelector('.bg')     as HTMLImageElement)
    const polvo1   = (introDiv.querySelector('.polvo1') as HTMLImageElement)
    const polvo2   = (introDiv.querySelector('.polvo2') as HTMLImageElement)
    const polvo3   = (introDiv.querySelector('.polvo3') as HTMLImageElement)
    const nieve1   = (introDiv.querySelector('.nieve1') as HTMLImageElement)
    const nieve2   = (introDiv.querySelector('.nieve2') as HTMLImageElement)
    const kratos   = (introDiv.querySelector('.kratos') as HTMLImageElement)
    const freya    = (introDiv.querySelector('.freya')  as HTMLImageElement)
    const boy      = (introDiv.querySelector('.boy')    as HTMLImageElement)
    const trineo   = (introDiv.querySelector('.trineo') as HTMLImageElement)
    
    let elementos = [
        { elemento : freya  , velocidad : 6  , tipo : 'tipoFreya'},
        { elemento : boy    , velocidad : 9  , tipo : 'tipoBoy'  },
        { elemento : kratos , velocidad : 5  , tipo : 'tipoKratos'},
        { elemento : trineo , velocidad : 5  , tipo : 'tipoTrineo'},
        { elemento : polvo1 , velocidad : 20 , tipo : 'tipoPolvo'},
        { elemento : polvo2 , velocidad : 12 , tipo : 'tipoPolvo'},
        { elemento : polvo3 , velocidad : 10 , tipo : 'tipoPolvo'},
        { elemento : nieve1 , velocidad : 10 , tipo : 'tipoBoy'  },
        { elemento : nieve2 , velocidad : 5  , tipo : 'tipoFreya'},
        { elemento : bg     , velocidad : 10 , tipo : 'tipoBg'   }
    ]

    let sliderMoveValue  = () : void => {
        let operacion = 100 / sliderCards.length
        sliderMove.style.transform = `translateX(-${ operacion * sliderCounter * 3 }%)`
    }
    let sliderLineActive = () : void => {
        sliderLine.forEach( ( eachLine , i ) => {
            sliderBtn[i].classList.remove('isActive')
        })
        sliderBtn[sliderCounter].classList.add('isActive')
        sliderMoveValue()
    }
    let sliderNext       = () : void => {
        sliderCounter++
        sliderCounter === sliderCards.length - 1 && sliderArrow[1].classList.remove('isActive')
        sliderArrow[0].classList.add('isActive')
        sliderLineActive()
    }
    let sliderPrev       = () : void => {
        sliderCounter === 1 && sliderArrow[0].classList.remove('isActive')
        sliderCounter--
        sliderArrow[1].classList.add('isActive')
        sliderLineActive()
    }
    let windowResize     = () : void => {
        let { innerWidth } = window
        cardsVisible = ( innerWidth <= 700 ) ? 1 : 3
        isMobile     = ( innerWidth <= 700 ) ? true : false
    }
    let efectoScroll = ( elemento , velocidad , tipo ) => {
        
        window.addEventListener('scroll',()=>{
            let { scrollY , innerHeight } = window
            let { offsetTop }   = introDiv
            let operacion       = offsetTop - innerHeight / 1.5 
            let valorTransform  = ((scrollY - operacion) / velocidad) / 10

            let tipoTransform = {
                tipoFreya  : `translateX(-${ valorTransform }%) translateY(${ valorTransform }%) rotate(-${ valorTransform / 5 }deg)`,
                tipoKratos : `translateX(${ valorTransform }%)  translateY(-${ valorTransform }%) rotate(${ valorTransform / 2 }deg)`,
                tipoBoy    : `translateX(${ valorTransform * 2 }%)  translateY(-${ valorTransform }%) rotate(${ valorTransform  }deg)`,
                tipoTrineo : `translateX(${ valorTransform / 1.5 }%) translateY(-${ valorTransform }%) scale(1.4)`,
                tipoPolvo  : `scale(${ valorTransform })`,
                tipoRuido  : `translateX(-${ valorTransform }%)`,
                tipoBg     : `rotate(-${ valorTransform }deg) scale(1.4)`,
            }
            
            /* elemento.style.transform = (scrollY >= operacion ) 
                ? tipoTransform[tipo]
                : `translateX(0%) translateY(0%) rotate(0deg)` */
            elemento.style.transform = tipoTransform[tipo]
                
        })
    }

    sliderMoveValue()
    windowResize()
    

    sliderBtn.forEach( ( eachBtn , i ) => {
        sliderBtn[i].addEventListener('click',()=>{
            sliderCounter = i
            sliderArrow.forEach( ( eachArrow , i )=>{
                sliderArrow[i].classList.add('isActive')
            })
            
            sliderCounter === sliderCards.length - 1 && sliderArrow[1].classList.remove('isActive')
            sliderCounter === 0                      && sliderArrow[0].classList.remove('isActive')
            sliderLineActive()
        })
    })
    sliderArrow[1].addEventListener('pointerdown', sliderNext )
    sliderArrow[0].addEventListener('pointerdown', sliderPrev )
    window.addEventListener('resize', windowResize )
    

    
    elementos.forEach( ( {elemento ,velocidad , tipo } ) => efectoScroll(elemento ,velocidad , tipo) )

    const sliderBrilli = document.querySelectorAll<HTMLDivElement>('.Slider-brilli')

    window.addEventListener('deviceorientation', ( e ) => {
        console.clear()
        sliderBrilli.forEach( (brilli , i) => {
            sliderBrilli[i].style.transform = `rotate(45deg) translateY(-40%) translateX(${e.gamma}em)`
        })        
    },true)

    /* document.body.addEventListener('click',()=>{
        let deviceMotion : any = DeviceMotionEvent
        deviceMotion.requestPermission()
            .then( response => {
            
            if ( response == "granted" ) {
                console.log('asd')
                
            }
        })
    }) */
 

})()


