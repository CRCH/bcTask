var wrapper = document.querySelector('.wrapper');
var remCol = document.querySelector('#rem-col');
var remRow = document.querySelector('#rem-row');


(function() {
    var block = document.querySelectorAll('.row .block');
    block.forEach(function (el) {
        addEvent(el);
    });

})();

function addEvent(obj) {
    obj.addEventListener("mouseover",function () {
        remCol.classList.toggle('hidden');
        remRow.classList.toggle('hidden');
        remCol.style.left = this.offsetLeft-1 + "px";
        remRow.style.top = this.offsetTop-1+"px";

    });
    obj.addEventListener("mouseleave",function () {
        remCol.classList.toggle('hidden');
        remRow.classList.toggle('hidden');
    });
    return obj;
}
//functions depending on argument adding/removing row/column
function add(trig) {
    if(trig){addRow();}
    else addCol();
}
function remove(trig) {
    if(trig){console.log('remove col');}
    else console.log('remove row');
}


function addRow() {
    var rows = document.querySelector('.wrapper .row');
    var newRow = rows.cloneNode(false);
    for(var i = 0; i < document.querySelectorAll('.row:last-child .block').length; i++)
        newRow.appendChild(addEvent(document.querySelector('.row .block').cloneNode()));
    wrapper.appendChild(newRow);

}
function addCol() {
    var rows = document.querySelectorAll('.row');
    for(var i = 0; i < rows.length; i++)
        rows[i].appendChild(addEvent(document.querySelector('.row .block').cloneNode()));


}