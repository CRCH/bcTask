var container = document.querySelector('.wrapper');
(function() {
    console.log(container);

})();

//functions depending on argument adding/removing row/column
function add(trig) {
    if(trig){console.log('add col');}
    else console.log('add row');
}
function remove(trig) {
    if(trig){console.log('remove col');}
    else console.log('remove row');
}