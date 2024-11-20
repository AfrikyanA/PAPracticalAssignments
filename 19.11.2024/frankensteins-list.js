const fs = require('fs');

class Node {
    constructor(value, prev = null, next = null,) {
        this.value = value;
        this.next = next;
        this.prev = prev;
        this.greater = null;
        this.lesser = null;
    }
};

class FrankensteinList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    serialize(filePath) {
        if (!filePath || typeof filePath != 'string') {
            console.error("Incorrect file path");
            return null;
        }

        let nodes = [];
        let current = this.head;

        while (current) {
            nodes.push({
                value: current.value,
                next: current.next ? current.next.value : null,
                prev: current.prev ? current.prev.value : null,
                greater: current.greater ? current.greater.value : null,
                lesser: current.lesser ? current.lesser.value : null
            });
            current = current.next;
        }

        const data = JSON.stringify(nodes, null, 2);
        fs.writeFileSync(filePath, data, 'utf8');
        console.log(`List serialized to ${filePath}`);
    }

    deserialize(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`File ${filePath} does not exist.`);
            return null;
        }

        const data = fs.readFileSync(filePath, 'utf8');
        if (!data.trim()) {
            console.error(`File "${filePath}" is empty.`);
            return null;
        }

        const nodes = JSON.parse(data);
        if (!Array.isArray(nodes) || typeof nodes[0] != 'object') {
            console.error(`File "${filePath}" does not contain a valid serialized list.`);
            return null;
        }
        this.clear();

        const nodeMap = new Map();

        // create nodes
        for (const nodeData of nodes) {
            const newNode = new Node(nodeData.value);
            nodeMap.set(nodeData.value, newNode);

            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
        }

        // restore greater and lesser
        for (const nodeData of nodes) {
            const node = nodeMap.get(nodeData.value);
            node.greater = nodeMap.get(nodeData.greater) || null;
            node.lesser = nodeMap.get(nodeData.lesser) || null;
        }

        console.log(`List deserialized from ${filePath}`);
    }

    #findByValue(value) {
        let curr = this.head;

        while (curr && curr.value != value) {
            curr = curr.next;
        }
        return curr;
    }

    #setLesserAndGreater() {
        let nodes = [];
        let current = this.head;
        while (current) {
            nodes.push(current);
            current = current.next;
        }
    
        nodes.sort((a, b) => a.value - b.value);
        
        for (let i = 0; i < nodes.length; ++i) {
            if (i === 0) {
                nodes[i].lesser = null;
                nodes[i].greater = nodes[i + 1] || null;
            } else if (i === nodes.length - 1) {
                nodes[i].lesser = nodes[i - 1];
                nodes[i].greater = null;
            } else {
                nodes[i].lesser = nodes[i - 1];
                nodes[i].greater = nodes[i + 1];
            }
        }
    }

    insert(value) {
        if (value == null) {
            return null;
        }
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = this.tail.next; 
        }
        this.#setLesserAndGreater();
        return this;
    }

    remove(value) {
        if (!this.head || value == null) {
            return null;
        }

        let curr = this.#findByValue(value);
        
        if (!curr) {
            return null;
        }

        if (this.head == curr) {
            if (!this.head.next) {
                this.head = null;
                this.tail = null;
                return null;
            }
            curr.next.prev = null;
            this.head = curr.next;
            curr.next = null;
        } else if (!curr.next) {
            this.tail = curr.prev;
            curr.prev.next = null;
            curr.prev = null;
        } else {
            curr.prev.next = curr.next;
            curr.next.prev = curr.prev;
            curr.next = null;
            curr.prev = null;
        }

        this.#setLesserAndGreater();
        return this;
    }

    insertInSortedOrder(value) {
        if (value == null) {
            return null;
        }

        let newNode = new Node(value);
        if (value < this.head.value) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;

            this.#setLesserAndGreater();
            return this;
        }

        if (value > this.tail.value) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;

            this.#setLesserAndGreater();
            return this;
        }

        let curr = this.head;

        while (curr) {
            
            if (value > curr.value && value < curr.next.value) {
                newNode.next = curr.next;
                newNode.prev = curr;
                curr.next.prev = newNode;
                curr.next = newNode;

                this.#setLesserAndGreater();
                return this;
            }
            curr = curr.next;
        }
    }
    
    toString() {
        if (!this.head) {
            return "null";
        }
        let curr = this.head;
        let result = [];
        while (curr) {
            result.push(curr.value);
            curr = curr.next;
        }
        return ("null <- " + result.join(" <-> ") + " -> null");
    }

    printLesserAndGreater() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push({
                Value: current.value,
                Lesser: current.lesser?.value || "null",
                Greater: current.greater?.value || "null"
            });
            current = current.next;
        }
        console.log(result);
    }

    isEmpty() {
        return (this.head == null);
    }

    size() {
        let count = 0;
        let curr = this.head;
        while (curr) {
            curr = curr.next;
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
            this.head.prev = null;
            this.head = tmp;
        }

        this.tail = null;
        return this;
    }
};