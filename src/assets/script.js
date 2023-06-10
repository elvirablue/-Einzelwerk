
    function loaded() {
        const elementSkyParallax = document.querySelector("#skyParallax");
        let elementSmokeMove = document.querySelector("#smokeMove");
        elementSmokeMove.classList.add('-show');
        setTimeout(() => {
            let elementTitle = document.querySelector('#title');
            elementTitle.classList.add('-show');
        }, 750)

        document.addEventListener("mousemove", parallax);
        // Magic happens here
        function parallax(e) {
            let _w = window.innerWidth/2;
            let _mouseX = e.clientX;
            let sky = `${50 + (_mouseX - _w) * 0.15}% 50%`;
            elementSkyParallax.style.backgroundPosition = sky;
        }

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        let xDown = null;
        let yDown = null;

        function getTouches(evt) {
            return evt.touches || // чистый API JS
                    evt.originalEvent.touches; // jQuery
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        }

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            let xUp = evt.touches[0].clientX;
            let yUp = evt.touches[0].clientY;

            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/* отлавливаем разницу в движении */
                if ( xDiff > 0 ) {
                    /* swipe влево */
                } else {
                    /* swipe вправо */
                    const elementHamburger = document.body.querySelector('#hamburgerMenu');
                    if (elementHamburger.classList.contains('-open')) {
                        closeNavigation()
                    }
                }
            } else {
                if ( yDiff > 0 ) {
                    /* swipe вверх */
                } else {
                    /* swipe вниз */
                }
            }
            /* свайп был, обнуляем координаты */
            xDown = null;
            yDown = null;
        }
    }

    function toggleNavigation(event) {
        const target = event.currentTarget;
        if (target.classList.contains('-open')) {
            closeNavigation()
        } else {
            openNavigation()
        }
    }

    function openNavigation() {
        const elementHamburger = document.body.querySelector('#hamburgerMenu');
        elementHamburger.classList.add('-open');
        document.body.classList.add('--hidden');

        const elementNavigation = document.querySelector("#navigation");
        elementNavigation.classList.add('-show');
        setTimeout(() => {
            elementNavigation.classList.add('-open');
        }, 20)

        const elementHeaderActions = document.querySelector("#headerActions");
        elementHeaderActions.classList.add('-move');
    }

    function closeNavigation() {
        const elementHamburger = document.body.querySelector('#hamburgerMenu');
        elementHamburger.classList.remove('-open');

        const elementHeaderActions = document.querySelector("#headerActions");
        elementHeaderActions.classList.remove('-move');

        const elementNavigation = document.querySelector("#navigation");
        elementNavigation.classList.remove('-open');
        setTimeout(() => {
            elementNavigation.classList.remove('-show');
            document.body.classList.remove('--hidden');
        }, 500)



    }

    /* Функция предназначена для склонения слов используемых вместе с числительными
    * @param number (Number) - число
    * @param words (Array) - 3 слова соответствующие числительным (1, 2, 10)
    * @return string - 1 слово, соответствующее числу
    */
    function transChoose (number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function changeInputNumber(event) {
        const unit = event.target.nextElementSibling;
        console.debug(unit, event.target.value)
        unit.textContent = transChoose(Number(event.target.value), ['человек', 'человека', 'человек']);
    }

    function openPopupBuyTicket() {
        const template = document.querySelector('#formBuyTicket');
        const clone = template.content.cloneNode(true);
        openPopup(clone);
    }

    function openPopup(clone) {
        document.body.classList.add('--hidden');
        const elementPopup = document.querySelector("#popup");
        const popupContent = document.querySelector("#popupContent");
        const headerPopup = elementPopup.querySelector('.app-popup__header')
        popupContent.appendChild(clone);
        elementPopup.style.setProperty('--popup-header-height', (headerPopup?.clientHeight ?? 0).toString() + 'px');
        elementPopup.classList.add('-show');
        setTimeout(() => {
            elementPopup.classList.add('-animate');
        }, 20)
    }

    function submitFormBuyTicket(event) {
        event.preventDefault();
        const popupContent = document.querySelector("#popupContent");
        const form = popupContent.querySelector('.form');
        form.classList.add('-hide');
        setTimeout(() => {
            form.style.display = 'none';
            popupContent.querySelector('#formSuccess').classList.add('-show');
        }, 200)
    }

    function closePopup() {
        const elementPopup = document.querySelector("#popup");
        elementPopup.classList.remove('-animate');
        setTimeout(() => {
            elementPopup.classList.remove('-show');
            document.body.classList.remove('--hidden');
        }, 500)
        setTimeout(() => {
            const popupContent = document.querySelector("#popupContent");
            popupContent.innerHTML = '';
        }, 800)
    }







