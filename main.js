var wrapper = document.querySelector('.wrapper');


(function() {


})();

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
    var newRow = rows.cloneNode(true);
    wrapper.appendChild(newRow);

}
function addCol() {

    var rows = document.querySelectorAll('.row');
    for(var i = 0; i < rows.length; i++)
        rows[i].appendChild(document.querySelector('.row .block').cloneNode());


}