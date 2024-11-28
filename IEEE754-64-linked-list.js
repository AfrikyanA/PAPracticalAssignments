const { encodeIEEE754_64, decodeIEEE754_64 } = require('./encode-decode-IEEE754-64.js');

class Node {
    constructor(bit, next = null) {
        this.bit = (bit == 1) ? 1 : 0;
        this.next = next;
    }
};

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    #append(value) {
        if (!this.head) {
            this.head = new Node(Number(value));
            this.tail = this.head;
        } else {
            this.tail.next = new Node(Number(value));
            this.tail = this.tail.next;
        }
    }
    /**
     * Converts a double number to a 64-bit binary linked list.
     * @param {number} number - The double-precision floating-point number.
     * @returns {LinkedList} - A linked list representing the 64-bit binary number.
     */
    static fromDouble(number) {
        let list = new LinkedList;
        let { ieee754 } = encodeIEEE754_64(number);

        for (let char of ieee754) {
            list.#append(char);
        }
        return list;
    }

    /**
     * Converts the binary linked list back to a double-precision floating-point number.
     * @returns {number} - The double-precision number.
     */
    toDouble() {
        let res = decodeIEEE754_64(this.toBinaryString());
        return res?.value;
    }

    /**
     * Adds two linked lists representing 64-bit binary numbers.
     * @param {LinkedList} listA - The first linked list.
     * @param {LinkedList} listB - The second linked list.
     * @returns {LinkedList} - A new linked list representing the sum.
     */
    static add(listA, listB) {
        if (!listA || !listB) {
            return null;
        }

        let sum = listA.toDouble() + listB.toDouble();

        return LinkedList.fromDouble(sum);
    }

    /**
     * Converts the linked list to a binary string.
     * @returns {string} - The binary representation of the linked list.
     */
    toBinaryString() {
        if (!this.head) {
            return '';
        }
        let str = '';
        let tmp = this.head;
        while (tmp) {
            str = str + tmp.bit;
            tmp = tmp.next;
        }
        return str;
    }

    size() {
        let count = 0;
        for (let curr = this.head; curr; curr = curr.next) {
            ++count;
        }
        return count;        
    }
};