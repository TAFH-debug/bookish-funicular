var body = document.querySelector("body");
var clr = document.querySelector("#color");

var idx = 0;
var is_delete = false;
var is_color = false;

function color_card() {
  is_color = true;
  is_delete = false;
  document.body.style.cursor = "crosshair";
}

function delete_card() {
  is_delete = true;
  is_color = false;
  document.body.style.cursor = "crosshair";
}

function add_card() {
    var p = document.createElement("p");
    var text = document.createElement("textarea");
    var label = document.createElement("h2");

    label.contentEditable = true;
    idx++;
    text.id = "story" + idx;
    text.name = "story";
    text.rows = 5;
    text.cols = 33;

    p.className = "card";

    (function init() {
        p.removeEventListener('click', init, false);
        p.className = p.className + ' resizable';
        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        p.appendChild(label);
        p.appendChild(text);
        p.appendChild(resizer);
        resizer.addEventListener('mousedown', initDrag, false);
    })()

    p.onmousedown = function(e) {
        if (is_color) {
          p.style.background = clr.value;
          is_color = false;
          document.body.style.cursor = "default";
          return;
        }

        if (is_delete) {
          body.removeChild(p);
          is_delete = false;
          document.body.style.cursor = "default";
          return;
        }

        if (drag) return;
        p.style.position = 'absolute';

        document.body.appendChild(p);
        p.style.zIndex = 1000;
        function moveAt(e) {
          p.style.left = e.pageX - p.offsetWidth / 2 + 'px';
          p.style.top = e.pageY - p.offsetHeight / 2 + 'px';
        }
        document.onmousemove = function(e) {
          moveAt(e);
        }
        p.onmouseup = function() {
          document.onmousemove = null;
          p.onmouseup = null;
        }
    }

    var startX, startY, startWidth, startHeight, drag = false;

    function initDrag(e) {
       drag = true;
       startX = e.clientX;
       startY = e.clientY;
       startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
       startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
       document.documentElement.addEventListener('mousemove', doDrag, false);
       document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
       p.style.width = (startWidth + e.clientX - startX) + 'px';
       p.style.height = (startHeight + e.clientY - startY) + 'px';
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
        drag = false;
    }

    body.appendChild(p);
}