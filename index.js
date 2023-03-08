var body = document.querySelector("body");
var header = document.querySelector("header");
var c = false;

function change_theme() {
    if (c) {
        body.style.background = "linear-gradient(to top right, #F51720, #fa6226)";
        header.style.backgroundColor = "#F8D210";
    }
    else {
        body.style.background = "linear-gradient(to top right, #1352ff, #59f1bf)";
        header.style.backgroundColor = "#15d45e";
    }
    c = !c;
}