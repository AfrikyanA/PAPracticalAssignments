class BigInt {
    constructor(value){
        this.negative = value.startsWith('-');
        this.value = this.negative ? value.slice(1) : value;
    }

    toString(){
        return (this.negative ? ('-') + this.value : this.value);
    }

    plus(oth){
        let a = this.value.split('').reverse();
        let b = oth.value.split('').reverse();
        let carry = 0;
        let result = [];

        let maxLength = Math.max(a.length, b.length);
        for(let i = 0; i < maxLength || carry; ++i){
            let digitA = i >= a.length ? 0 : parseInt(a[i],10);
            let digitB = i >= b.length ? 0 : parseInt(b[i],10);

            let sum = digitA + digitB + carry;
            carry = Math.floor(sum / 10);
            result.push(sum % 10);
        }
        return (new BigInt(result.reverse().join('')));
    }
};

let a = new BigInt("123");
let b = new BigInt("4560");
let c = a.plus(b);

console.log(c.toString());