var wrapper = document.querySelector('.wrapper');
var remCol = document.querySelector('#rem-col');
var remRow = document.querySelector('#rem-row');
var colCount = document.querySelectorAll('.row:last-child .block').length;
var rowCount = document.querySelectorAll('.row').length;

(function() {
    var block = document.querySelectorAll('.row .block');
    block.forEach(function (el) {
        addEvent(el);
    });

})();

function addEvent(obj) {
    obj.addEventListener("mouseover",function () {

        if (colCount > 1) {
            remCol.classList.toggle('hidden');
            remCol.style.display = "block";
            remCol.style.left = this.offsetLeft - 1 + "px";
        }
        if(rowCount>1) {
            remRow.classList.toggle('hidden');
            remRow.style.display = "block";
            remRow.style.top = this.offsetTop - 1 + "px";
        }

    });
    obj.addEventListener("mouseleave",function () {
        if(colCount>1)
            remCol.classList.toggle('hidden');
        if(rowCount>1)
        remRow.classList.toggle('hidden');
    });
    return obj;
}

//functions depending on argument adding/removing row/column
function add(trig) {
    if(trig){
        addRow();
    }
    else addCol();
}
function remove(trig) {
    if(trig){
        removeCol();
    }
    else removeRow();
}


function addRow() {
    rowCount++;
    var rows = document.querySelector('.wrapper .row');
    var newRow = rows.cloneNode(false);
    for(var i = 0; i < document.querySelectorAll('.row:last-child .block').length; i++)
        newRow.appendChild(addEvent(document.querySelector('.row .block').cloneNode()));
    wrapper.appendChild(newRow);

}

function removeRow() {
    rowCount--;
    var row = Math.round(remRow.offsetTop/102);
    var rows = document.querySelectorAll('.row');
    rows[row].remove();
    remRow.style.display = "none";
}

function addCol() {
    colCount++;
    var rows = document.querySelectorAll('.row');
    for(var i = 0; i < rows.length; i++)
        rows[i].appendChild(addEvent(document.querySelector('.row .block').cloneNode()));
}

function removeCol() {
    colCount--;
    var col = Math.round(remCol.offsetLeft/102);
    var rows = document.querySelectorAll('.row');
    rows.forEach(function (t) { t.children[col].remove(); });
    remCol.style.display = "none";
}