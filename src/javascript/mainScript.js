const 
CreateDivArguments = new Map([
    [0 , 16],
    [1 , 17],
    [2 , 17],
    [3 , 13],
    [4 , 13],
    [5 , 10]
]),
contentArray = ["ESC","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PS","SL","PB","`","1","2","3","4","5","6","7","8","9","0","-","+","BACKSPACE","INS","HM","PU","TAB","Q","W","E","R","T","Y","U","I","O","P","[","]","|","DEL","END","PD","CAPS","A","S","D","F","G","H","J","K","L",";","'","ENTER","SHFT","Z","X","C","V","B","N","M",",",".","/","r.SHFT","↑","CTRL","WIN","ALT","SPACE","r.ALT","MENU","r.CTRL","←","↓","→"],
idArray      = ["Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock", "Pause","Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace","Insert","Home","PageUp","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","Delete","End","PageDown","CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter","ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","ArrowUp","ControlLeft","MetaLeft","AltLeft","Space","AltRight","ContextMenu","ControlRight","ArrowLeft","ArrowDown","ArrowRight"];



window.addEventListener("load",function(){
        // СОЗДАНИЕ СЕКЦИЙ
        createSection(".main__content");

        // СОЗДАНИЕ ДИВОВ
        CreateDivArguments.forEach(function(CountOfDiv, NumberOfSection) {
                // console.log("В секции №"+ NumberOfSection + " создано " + CountOfDiv + " дивов")
                createDiv(NumberOfSection, CountOfDiv, ".main__content-section");
            }
        );

        // ВСТАВКА СОДЕРЖИМОГО В ДИВЫ
        insertDataDiv();

        // СМЕНА ЦВЕТА НА ПОСЛЕДНИЙ ВЫБРАННЫЙ
        setColorOnStart();

    }
)


// СОЗДАНИЕ СЕКЦИЙ ДЛЯ ДИВОВ
    const createSection = (appendSection) => { 
        for(let i = 0; i < 6; i++) {
            let sectionsForDiv = document.createElement("section");
            sectionsForDiv.classList.add("main__content-section");
            document.querySelector(`${appendSection}`).appendChild(sectionsForDiv);
        }
    }

// СОЗДАНИЕ ДИВОВ В СЕКЦИИ
    const createDiv = (numberOfSection, countOfKey, appendSection) => {
        for(let o = 0; o < contentArray.length; o++) {
            if(document.querySelectorAll(`${appendSection}`)[numberOfSection].childNodes.length < countOfKey) {
                let divPress = document.createElement("div");
                divPress.classList.add("main__content-section-key");
                document.querySelectorAll(`${appendSection}`)[numberOfSection].appendChild(divPress);
            } 
        }
    }


// ЗАПОЛНЕНИЕ ДИВОВ И ЗАДАНИЕ АЙДИ
    const insertDataDiv = () =>{
        for(let i = 0; i < idArray .length; i++) {
            let divPress = document.querySelectorAll(".main__content-section-key");
            divPress[i].innerText = contentArray[i];
            divPress[i].id = idArray [i];
        }
    }


// ФУНКЦИЯ МЕНЯЮЩАЯ ЦВЕТ КНОПОК ПРИ ЗАХОДЕ НА САЙТ, НА ПОСЛЕДНИЙ ВЫБРАННЫЙ ЦВЕТ ПРИ ВЫХОДЕ
    const setColorOnStart = () => {

        if(!localStorage.getItem("colorWhenPress") || localStorage.getItem("colorWhenPress") == "null") {
            console.log("Default press color has been set")
            localStorage.setItem("colorWhenPress", "g_color");
        } 

        if(!localStorage.getItem("colorOfAllDiv")) {
            console.log("Default div color has been set")
            localStorage.setItem("colorOfAllDiv", "#00ff80");
        }

        changeColorOfKeys(localStorage.getItem("colorOfAllDiv"));

    }


// ФУНКЦИЯ ОТВЕЧАЮЩАЯ ЗА ФОКУС КНОПКИ НА САЙТЕ ПРИ НАЖАТИИ И ОБРАТНО
    const keyChange = (focusClass,deleteClassOrAdd,opacity,event) => {

        let allInput = document.querySelectorAll(".colors__button");

        // ЕСЛИ КНОПКА ИЗ ЭВЕНТА СОВПАДАЕТ С АЙДИ КНОПКИ ТО ЕЙ ПРИСВАИВАЕТСЯ КЛАСС
        if(document.querySelector("#" + event.code +"")) {
            if(deleteClassOrAdd == "add") {
                document.querySelector("#" + event.code +"").classList.add(focusClass);
            } else if (deleteClassOrAdd == "remove") {
                document.querySelector("#" + event.code +"").classList.remove(focusClass);
            }
            document.querySelector("#" + event.code +"").style.opacity = opacity;
        }
    }


// ФУНКЦИЯ ОТВЕЧАЮЩАЯ ЗА СМЕНУ САМОГО ЦВЕТА ВСЕХ КНОПОК И ПОЛОСЫ НАЖАТЫХ КНОПОК
    const changeColorOfKeys = (color) => {
        let divPress = document.querySelectorAll(".main__content-section-key"),
        pressKeysLine = document.querySelector(".pressed_key");

        for(let i = 0; i < divPress.length; i++) {
            divPress[i].style = "border: .1vh solid " + color;
        }

        localStorage.setItem("colorOfAllDiv", color);
        pressKeysLine.style = "border-bottom: .1vh solid " + color;
    }


// ФУНКЦИЯ ВЫВОДЯЩАЯ НАЖАТЫЕ КНОПКИ В СТРОКУ
    const printPressKey = (event) => {
        let stringForPrint = document.querySelector(".pressed_key"),
        pressKeyBlock = document.createElement("span");

        pressKeyBlock.innerText = "<" + event.key + ">";
 
        stringForPrint.appendChild(pressKeyBlock);

        if(stringForPrint.childNodes.length > 12) {
            stringForPrint.childNodes[0].remove();
        }

    }    


// ФУНКЦИЯ УБИВАЮЩАЯ ЗАВИСШИЕ КЛАССЫ
    const fixColor = () => {
        let divPress = document.querySelectorAll(".main__content-section-key");

        for(let i = 0; i < divPress.length;i++){
            if(divPress[i].classList[1] == "g_color" ||  divPress[i].classList[1] == "y_color" || divPress[i].classList[1] == "b_color"){
                divPress[i].classList.remove("g_color","y_color","b_color");
            }
        }
    }




// СМЕНА ЦВЕТА ПРИ КЛИКЕ НА КНОПКИ ДЛЯ СМЕНЫ ЦВЕТА
    for(let i = 0; i < document.querySelectorAll(".colors__button").length; i++) {
            document.querySelectorAll(".colors__button")[i].addEventListener("click",function(){
                fixColor();

                // СМЕНА ЦВЕТА 
                changeColorOfKeys(document.querySelectorAll(".colors__button")[i].dataset.colorofborder)

                // ПОДМЕНА ЗНАЧЕНИЙ ДЛЯ ЗАЖАТИЯ КЛАВИШИ И ОТПУСКАНИЯ
                keyChange(document.querySelectorAll(".colors__button")[i].dataset.class,"add", 1, event, true)
                keyChange(document.querySelectorAll(".colors__button")[i].dataset.class,"remove", .3, event,  false);

                // СОХРАНЕНИЕ ПОСЛЕДНЕГО ЦВЕТА ДЛЯ НАЖАТИЯ
                localStorage.setItem("colorWhenPress", document.querySelectorAll(".colors__button")[i].dataset.class);

            }
        )
    }

// ВЫЗОВ ФУНКЦИЙ ПРИ НАЖАТИИ КНОПКИ
    document.body.addEventListener("keydown",function(){
            keyChange(localStorage.getItem("colorWhenPress"),"add", 1, event, true)
        }
    )


// ВЫЗОВ ФУНКЦИИ ПРИ ОТПУСКАНИИ КНОПКИ
    document.body.addEventListener("keyup",function() {
            keyChange(localStorage.getItem("colorWhenPress"),"remove", .3, event,  false);
            printPressKey(event);
        }
    )



