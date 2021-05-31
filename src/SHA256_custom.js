function ror(n, d)
{
    return (n >> d)|(n << (32 - d));
}

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
    constructor(msg) { // Int32Array
        // init state register
        let prime_list = new Prime(64);

        this.state_reg = new Int32Array(8);
        this.constants = new Int32Array(64);
        this.msg_bits = msg.length * 32;
        for (let i = 0; i < 8; i++) {
            this.state_reg[i] = Math.sqrt(prime_list[i]) * Math.pow(2, 32);
        }
        for (let i = 0; i < 64; i++) {
            this.constants[i] = Math.cbrt(prime_list[i]) * Math.pow(2, 32);
        }

        // padding
        // one block
        if (this.msg_bits <= 448) {
            let msg_tmp = new Int32Array(64);
            for (let i = 0; i < msg.length; i++){
                msg_tmp[i] = msg[i];
            }
            msg = msg_tmp;
            msg[this.msg_bits / 32] = 0x80000000; // Put a 1 after the msg
            msg[15] = this.msg_bits;

        } else {
            // multiple block - TODO

        }

        // schedule
        // extend 512 bits to 2048 bits
        let int32;
        for (let i = 0; i < 48; i++) {
            int32 = new Int32Array(1);
            int32[0] = this.σ1(msg[i + 14]) + msg[i + 9] + this.σ0(msg[i + 1] + msg[i]);
            msg[i + 16] = int32[0];
        }

        // compression
        let tmp1;
        let tmp2;
        let state_reg_cone = new Int32Array(8);
        for (let i = 0; i < 8; i++){
            state_reg_cone[i] = this.state_reg[i];
        }

        for (let i = 0; i < 64; i++){
            tmp1 = this.Σ1(
                this.state_reg[4] + 
                this.choice(this.state_reg[4], this.state_reg[5], this.state_reg[6]) + 
                this.state_reg[7] + 
                msg[i] + 
                this.constants[i]
                );
            
            tmp2 = this.Σ0(this.state_reg[0] + this.majoirty(this.state_reg[0], this.state_reg[1], this.state_reg[2]));

            int32[0] = tmp1 + tmp2;
            // Move all WORD in state register down 1
            for (let i = 0; i < 7; i++){
                this.state_reg[i + 1] = this.state_reg[i];
            }
            this.state_reg[0] = int32[0];
            this.state_reg[4] += tmp1;
        }

        for (let i = 0; i < 8; i++){
            this.state_reg[i] += state_reg_cone[i];
        }

        return this.state_reg;
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
        for (let i = 31; i >= 0; i--) {
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
        for (let i = 31; i >= 0; i--) {
            tmp = x >>> i + y >>> i + z >>> i;

            if (tmp > 1) result ^ 1;
            else result & 1;

            if (i != 0) result << 1;
        }
    }
}
