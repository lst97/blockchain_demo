import bitwiseRotation from 'bitwise-rotation';

const rotationObject = bitwiseRotation(32);
const { ror, rol } = rotationObject;

class Prime {
    constructor(amounts) {
        let prime_list = [];
        let i = 0;
        let guess = 2;
        while (i < amounts) {
            if (this.isPrime(guess)) {
                prime_list.push(guess);
                i++;
            }
            guess++;
        }
        return prime_list;
    }

    isPrime(num) {
        for (var i = 2; i < num; i++)
            if (num % i === 0) return false;
        return num > 1;
    }
}

class SHA256 {
    constructor(msg) {
        // init state register
        // Prime formular?
        let prime_list = new Prime(64);

        this.state_reg = [];
        this.constants = [];
        this.msg_length; // not sure how to calc size yet.
        for (let i = 0; i < 8; i++) {
            this.state_reg.push(Math.sqrt(prime_list[i]) * Math.pow(2, 32));
        }
        for (let i = 0; i < 64; i++) {
            this.constants.push(Math.cbrt(prime_list[i]));
        }

        // Padding

    }

    σ0(x) {
        return ror(x, 7) ^ ror(x, 18) ^ (x >>> 3);
    }

    σ1(x) {
        return ror(x, 17) ^ ror(x, 19) ^ (x >>> 10);
    }

    Σ0(x) {
        return ror(x, 2) ^ ror(x, 13) ^ ror(x, 22);
    }

    Σ1(x) {
        return ror(x, 6) ^ ror(x, 11) ^ ror(x, 25);
    }

    choice(x, y, z) {
        let result = 0;
        let bit = 0;
        for (let i = 31; i >= 0; i++) {
            bit = Math.pow(2, i);

            if (x & bit == 1) result ^ (y >>> i);
            else result ^ (z >>> i);

            if (i != 0) result << 1;
        }
        return result;
    }

    majoirty(x, y, z) {
        let result = 0;
        let tmp = 0;
        for (let i = 31; i >= 0; i++) {
            tmp = x >>> i + y >>> i + z >>> i;

            if (tmp > 1) result ^ 1;
            else result & 1;

            if (i != 0) result << 1;
        }
    }
}