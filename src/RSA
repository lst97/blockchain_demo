function nBitRandom(n) {
    let result = BigInt(0);
    for (let i = 0; i < n; i++) {
        result = result | BigInt(Math.floor(Math.random() * 2));
        if (i + 1 != n) result = result << BigInt(1);
    }

    return result;
}

function getLowLevelPrime(n){
    let first_primes_list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
        31, 37, 41, 43, 47, 53, 59, 61, 67, 
        71, 73, 79, 83, 89, 97, 101, 103, 
        107, 109, 113, 127, 131, 137, 139, 
        149, 151, 157, 163, 167, 173, 179, 
        181, 191, 193, 197, 199, 211, 223,
        227, 229, 233, 239, 241, 251, 257,
        263, 269, 271, 277, 281, 283, 293,
        307, 311, 313, 317, 331, 337, 347, 349]

    while (true){
        let pc = nBitRandom(n);
        for(let i = 0; i < first_primes_list.length; i++){
            divisor = BigInt(first_primes_list[i]);
            if (pc % divisor == 0 && divisor * divisor <= pc)
                break;
            else
                return pc;
        }
    }
}

// https://devimalplanet.com/how-to-generate-random-number-in-range-javascript
function randBigInt(lowBigInt, highBigInt) {
    if (lowBigInt >= highBigInt) {
      throw new Error('lowBigInt must be smaller than highBigInt');
    }
  
    const difference = highBigInt - lowBigInt;
    const differenceLength = difference.toString().length;
    let multiplier = '';
    while (multiplier.length < differenceLength) {
      multiplier += Math.random()
        .toString()
        .split('.')[1];
    }
    multiplier = multiplier.slice(0, differenceLength);
    const divisor = '1' + '0'.repeat(differenceLength);
  
    const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);
  
    return lowBigInt + randomDifference;
  }

function bigIntPow(n, p){
    for (let i = BigInt(0); i < p; i++){
        n *= n;
    }
    return n;
}

function isMillerRabinPassed(mrc){
    // Run 20 iterations of Rabin Miller Primality test
    let maxDivisionsByTwo = BigInt(0);
    let ec = BigInt(mrc - BigInt(1));
    while (ec % BigInt(2) == 0){
        ec = ec >> BigInt(1);
        maxDivisionsByTwo += BigInt(1);
    }
    if ((maxDivisionsByTwo * maxDivisionsByTwo) * ec == mrc - BigInt(1)){
        return false;
    }
  
    function trialComposite(round_tester){
        // Uncaught RangeError: BigInt is too large to allocate !!!
        if (bigIntPow(round_tester, ec) % mrc == 1) return false;

        for (let i = 0; i < maxDivisionsByTwo; i++){
            if (Mathpow(round_tester, Math.pow(2, i) * ec) % mrc == mrc - BigInt(1)) return false;
            return true;
        }
    }
  
    // Set number of trials here
    numberOfRabinTrials = 20 
    for (let i = 0; i < numberOfRabinTrials; i++){
        round_tester = randBigInt(BigInt(2), mrc);
        
        if (trialComposite(round_tester)) return false;
    }
    return true;
}

class RSA {
    randomPrime(n) {
        while(true){
            // Sieve of Eratosthenes (low level prime)
            let prime_candidate = BigInt(getLowLevelPrime(n));
            if (!isMillerRabinPassed(prime_candidate)) continue;
            else return prime_candidate;
        }
    }

    /* use jquery library instead
    generate(keysize) {
        const e = bigInt(65537);
        let p;
        let q;
        let totient;

        do {
            p = this.randomPrime(keysize / 2);
            q = this.randomPrime(keysize / 2);
            totient = bigInt.lcm(
                p.prev(),
                q.prev()
            );
        } while (bigInt.gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());

        return {
            e,
            n: p.multiply(q),
            d: e.modInv(totient),
        };
    }

    encrypt(encodedMsg, n, e) {
        return bigInt(encodedMsg).modPow(e, n);
    }

    decrypt(encryptedMsg, d, n) {
        return bigInt(encryptedMsg).modPow(d, n);
    }

    encode(str) {
        const codes = str
            .split('')
            .map(i => i.charCodeAt())
            .join('');

        return bigInt(codes);
    }

    decode(code) {
        const stringified = code.toString();
        let string = '';

        for (let i = 0; i < stringified.length; i += 2) {
            let num = Number(stringified.substr(i, 2));

            if (num <= 30) {
                string += String.fromCharCode(Number(stringified.substr(i, 3)));
                i++;
            } else {
                string += String.fromCharCode(num);
            }
        }

        return string;
    }
    */
}
