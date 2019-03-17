function alert(){
    console.log(123)
}
function add(n){
    return n++;
}
function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}