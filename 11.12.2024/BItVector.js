class BitVector {
    constructor() {
        this.array = [0];
    }

    set(pos, bit) {
        if (bit < 0 || bit > 1 || pos < 0 || !Number.isInteger(pos)) {
            return;
        }

        let i = Math.floor(pos / 64);
        let bitPos = pos % 64;

        while (i >= this.array.length) {
            this.array.push(0);
        }

        if (bit) {
            this.array[i] |= (1 << bitPos);
        } else {
            this.array[i] &= ~(1 << bitPos);
        }
    }

    get(pos) {
        if (pos < 0 || !Number.isInteger(pos)) {
            return false;
        }

        let i = Math.floor(pos / 64);
        let bitPos = pos % 64;

        if (i >= this.array.length) {
            return false;
        }

        return Boolean(this.array[i] & (1 << (bitPos)));
    }
};