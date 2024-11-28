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
        if (value == null) {
            return null;
        }

        if (!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(value);
            this.tail = this.tail.next;
        }
        return this;
    }

    prepend(value) {
        if (value == null) {
            return null;
        }

        if (!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            let newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
        }
        return this;
    }

    removeValue(value) {
        if (!this.head || value == null) {
            return null;
        }

        let prev = null;
        let curr = this.head;

        while (curr && curr.value != value) {
            prev = curr;
            curr = curr.next;
        }

        if (!curr) {
            return null;
        }

        if (this.head == curr) {
            this.head = curr.next;
        } else {
            prev.next = curr.next;
        }

        curr.next = null;
        return this;
    }

    removeAtIndex(index) {
        if (!this.head) {
            return null;
        }
        if (typeof index == 'number' && !isNaN(index)) {
            return null;
        }

        let prev = null;
        let curr = this.head;
        let count = 0;
        while (curr && count != index) {
            prev = curr;
            curr = curr.next;
            ++count;
        }

        if (!curr) {
            return null;
        }

        if (this.head == curr) {
            this.head = curr.next;
        } else {
            prev.next = curr.next;
        }
        
        curr.next = null;
        return this;
    }

    insert(value, index) {
        if (value == null || typeof index != 'number' || index < 0 || isNaN(index)) {
            return null;
        }
    
        if (!this.head) {
            if (index == 0) {
                this.head = new Node(value);
                this.tail = this.head;
                return this;
            }
            return null;
        }
    
        if (index == 0) {
            let newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
            return this;
        }
    
        let count = 0;
        let curr = this.head;
        let prev = null;
    
        while (curr && count != index) {
            prev = curr;
            curr = curr.next;
            count++;
        }
    
        if (count == index) {
            let newNode = new Node(value);
            newNode.next = curr;
            if (prev) {
                prev.next = newNode;
            }
            if (!newNode.next) {
                this.tail = newNode;
            }
            return this;
        }
    
        return null;
    }
    
    search(value) {
        if (!this.head || value == null) {
            return null;
        }

        let curr = this.head;

        while (curr && curr.value != value) {
            curr = curr.next;
        }

        if (!curr) {
            return null;
        }
        return curr;
    }

    reverse() {
        if (this.head || !this.head.next) {
            return this;
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
        return this;
    }

    [Symbol.iterator]() {
        let current = this.head;
        return {
            next() {
                if (current) {
                    let value = current.value;
                    current = current.next;
                    return {
                        value: value,
                        done: false
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        };
    }

    toString() {
        let curr = this.head;
        let result = [];
        while (curr) {
            result.push(curr.value);
            curr = curr.next;
        }
        return (result.join(" -> ") + " -> null");
    }

    isEmpty() {
        return (this.head == null);
    }

    size() {
        let count = 0;
        for (let curr = this.head; curr; curr = curr.next) {
            ++count;
        }
        return count;        
    }

    clear() {
        if (!this.head) {
            return null;
        }
        while (this.head) {
            let tmp = this.head.next;
            this.head.next = null;
            this.head = tmp;
        }
        this.tail = null;
        return this;
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