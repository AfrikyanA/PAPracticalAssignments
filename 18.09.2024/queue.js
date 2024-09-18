class my_queue extends Array {
    constructor(arr = []) {
        super();
        this.push(...arr);
    }

    enqueue(el){
        this.push(el);
    }
    dequeue(){
        return this.shift();
    }
    peek(){
        return this[0];
    }
    size(){
        return this.length;
    }
};