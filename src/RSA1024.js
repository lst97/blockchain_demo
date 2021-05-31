class RSA1024{
    constructor(){
        this.keySize = 1024;
        this.crypt = new JSEncrypt({ default_key_size: this.keySize });
        this.crypt.getKey();
        this.sk = this.crypt.getPrivateKey();
        this.pk = this.crypt.getPublicKey();

        return this;
    }

    sign(sk, msg){
        this.crypt.setPrivateKey(sk);
        let sha256 = new SHA256();
        return this.crypt.sign(msg, sha256, "sha256");
    }

    verify(msg, pk, signature){
        // Verify with the public key...
        this.crypt.setPublicKey(pk);
        let sha256 = new SHA256();
        return this.crypt.verify(msg, signature, sha256);
    }
}

function generateKeysTest(){
    let rsa1024 = new RSA1024();
    document.getElementById('pubkey').value = rsa1024.pk;
    document.getElementById('privkey').value = rsa1024.sk;
}
