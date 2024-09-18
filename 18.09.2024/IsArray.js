function isArray(value) {
    return value instanceof Array;

    //return Array.prototype.isPrototypeOf(value);

    //return value && value.constructor === Array;

    //return Object.prototype.toString.call(value) === '[object Array]';
    
    //return Object.getPrototypeOf(value) === Array.prototype;
    
    /*try {
        value.slice();
        return true;
      } catch (e) {
        return false;
      }*/
}

console.log(isArray("[1,2,3]"));