class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
};

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        if (!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(value);
            this.tail = this.tail.next;
        }
    }

    prepend(value) {
        if (!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            let newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    removeValue(value) {
        if (!this.head) {
            return false;
        }

        let prev = null;
        let curr = this.head;

        while (curr != null && curr.value != value) {
            prev = curr;
            curr = curr.next;
        }

        if (curr === null) {
            return false;
        }

        if (this.head === curr) {
            this.head = curr.next;
        } else {
            prev.next = curr.next;
        }

        curr.next = null;
        return true;
    }

    removeAtIndex(index) {
        if (!this.head) {
            return false;
        }
        if (typeof value === 'number' && !isNaN(value)) {
            return false;
        }

        let prev = null;
        let curr = this.head;
        let count = 0;
        while (curr != null && count != index) {
            prev = curr;
            curr = curr.next;
            ++count;
        }

        if (curr === null) {
            return false;
        }

        if (this.head === curr) {
            this.head = curr.next;
        } else {
            prev.next = curr.next;
        }
        
        curr.next = null;
        return true;
    }

    search(value) {
        if (!this.head) {
            return null;
        }

        let curr = this.head;

        while (curr != null && curr.value != value) {
            curr = curr.next;
        }

        if (curr === null) {
            return null;
        }
        return curr;
    }

    insert(value, index) {
        if (typeof index !== 'number' || index < 0 || isNaN(index)) {
            return null;
        }
    
        if (this.head === null) {
            if (index === 0) {
                this.head = new Node(value);
                this.tail = this.head;
                return this.head;
            }
            return null;
        }
    
        if (index === 0) {
            let newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
            return this.head;
        }
    
        let count = 0;
        let curr = this.head;
        let prev = null;
    
        while (curr !== null && count !== index) {
            prev = curr;
            curr = curr.next;
            count++;
        }
    
        if (count === index) {
            let newNode = new Node(value);
            newNode.next = curr;
            if (prev) {
                prev.next = newNode;
            }
            if (newNode.next === null) {
                this.tail = newNode;
            }
            return this.head;
        }
    
        return null;
    }
    

    reverse() {
        if (this.head === null) {
            return null;
        }

        let prev = null;
        let curr = this.head;
        let tmp = null;
        while (curr) {
            tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }
        this.head = prev;
        return this.head;
    }

    toString() {
        let curr = this.head;
        let result = [];
        while (curr !== null) {
            result.push(curr.value);
            curr = curr.next;
        }
        return (result.join(" -> ") + " -> null");
    }

    isEmpty() {
        return Boolean(!this.head);
    }

    size() {
        let count = 0;
        let curr = this.head;
        while (curr != null) {
            curr = curr.next;
            ++count;
        }
        return count;
    }
};

const list = new LinkedList();

list.append(10);
list.append(20);
list.prepend(5);
console.log(list.toString()); // Output: "5 -> 10 -> 20 -> null"

console.log(list.size()); // Output: 3

list.removeValue(10);
console.log(list.toString()); // Output: "5 -> 20 -> null"

list.insert(15, 1); // Insert 15 at index 1
console.log(list.toString()); // Output: "5 -> 15 -> 20 -> null"

list.reverse();
console.log(list.toString()); // Output: "20 -> 15 -> 5 -> null"

console.log(list.search(15)); // Output: Node { value: 15, next: Node { value: 5, next: null } }
console.log(list.search(100)); // Output: null
