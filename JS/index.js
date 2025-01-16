function fouropenPopup() {
    var element = document.getElementById("four-popup");
    if (window.getComputedStyle(element).display === "none") {
        element.style.display = "flex";
    }
}
function fourexitPopup() {
    var element = document.getElementById("four-popup");
    if (window.getComputedStyle(element).display === "flex") {
        element.style.display = "none";
    }
}
function fouropenMenu() {
    var element = document.getElementById("four-info");
    element.classList.remove("block");
}
function fourexitMenu() {
    var element = document.getElementById("four-info");
    element.classList.add("block");
}
function fiveopenMenu() {
    var element = document.getElementById("five-info");
    element.classList.remove("block");
}
function fiveexitMenu() {
    var element = document.getElementById("five-info");
    element.classList.add("block");
}
function fiveopenPopup() {
    var element = document.getElementById("five-popup");
    if (window.getComputedStyle(element).display === "none") {
        element.style.display = "flex";
    }
}
function fiveexitPopup() {
    var element = document.getElementById("five-popup");
    if (window.getComputedStyle(element).display === "flex") {
        element.style.display = "none";
    }
}
function fiveVoltar() {
    var element1 = document.getElementById("five");
    element1.classList.remove("action");
    var element2 = document.getElementById("four");
    element2.classList.add("action");
}
function fourentrarCard() {
    var element1 = document.getElementById("five");
    element1.classList.add("action");
    var element2 = document.getElementById("four");
    element2.classList.remove("action");
}
function fourlogOut() {
    var element1 = document.getElementById("four");
    element1.classList.remove("action");
    var element2 = document.getElementById("one");
    element2.classList.add("action");
    document.getElementById('four-cards-position').innerText = ''
}
function fivelogOut() {
    var element1 = document.getElementById("five");
    element1.classList.remove("action");
    var element2 = document.getElementById("one");
    element2.classList.add("action");
}
function threeLogin() {
    var element1 = document.getElementById("three");
    element1.classList.remove("action");
    var element2 = document.getElementById("two");
    element2.classList.add("action");
}
function twoCadastro() {
    var element1 = document.getElementById("three");
    element1.classList.add("action");
    var element2 = document.getElementById("two");
    element2.classList.remove("action");
}
function twoLogin() {
    var element1 = document.getElementById("two");
    element1.classList.remove("action");
    var element2 = document.getElementById("four");
    element2.classList.add("action");
}
function oneLogin() {
    var element1 = document.getElementById("one");
    element1.classList.remove("action");
    var element2 = document.getElementById("two");
    element2.classList.add("action");
}
function oneCadastro() {
    var element1 = document.getElementById("one");
    element1.classList.remove("action");
    var element2 = document.getElementById("three");
    element2.classList.add("action");
}

function threeCadastro() {
    var element1 = document.getElementById("three");
    element1.classList.remove("action");
    var element2 = document.getElementById("four");
    element2.classList.add("action");
}
function fiveLogin() {
    var element1 = document.getElementById("five");
    element1.classList.remove("action");
    var element2 = document.getElementById("two");
    element2.classList.add("action");
}
function fourLogin() {
    var element1 = document.getElementById("four");
    element1.classList.remove("action");
    var element2 = document.getElementById("two");
    element2.classList.add("action");
    document.getElementById('four-cards-position').innerText = ''
}
function gerarCodigoAlfanumerico(tamanho) {
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var codigo = '';
    for (var i = 0; i < tamanho; i++) {
        var randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];
    } return codigo;
}

function fourcriarSala() {
    var novaDiv = document.createElement("div");
    novaDiv.className = "four-card";
    novaDiv.setAttribute("onclick", "fourentrarCard()");
    var titulo = document.createElement("h3");
    titulo.id = "four-name-card";
    titulo.textContent = document.getElementById("name-class").value;
    var paragrafo = document.createElement("p");
    paragrafo.textContent = gerarCodigoAlfanumerico(8);
    novaDiv.appendChild(titulo);
    novaDiv.appendChild(paragrafo);
    var container = document.getElementById("four-cards-position");
    container.appendChild(novaDiv);
}