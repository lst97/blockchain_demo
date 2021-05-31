class Coinbase{
    constructor(amount, pk){
        this.amount = amount;
        this.pk = pk;
    }
}

class TX{
    id = new Int32Array(1);
    constructor(id, sender, reciver, amount){
        this.amount = amount;
        this.sender_pk = sender;
        this.reciver_pk = reciver;
        this.id = id;
    }

    toCSV(){
        let str = "";
        str += this.id.toString() + "," + this.sender_pk + "," + this.reciver_pk + "," + this.amount.toString();
        return str;
    }

    sign(sk){
        let msg = this.toCSV();
        let rsa1024 = new RSA1024();
        this.signature = rsa1024.sign(sk, msg);
        return this.signature;
    }

    verify(){
        let msg = this.toCSV();
        let rsa1024 = new RSA1024();
        let verified = rsa1024.verify(msg, this.sender_pk, this.signature);
        return verified ? true : false;
    }
}

class Block{
    Nonce = 0;
    Hash = 0;
    Tx = [];
    constructor(){
        this.Prev_hash = 0;
        this.id = 0;
    }

    addTx(tx){
        
        tx.sign(document.getElementById("privkey").value);
        return tx.verify ? true : false;
    }

    toCSV(){
        let e = [];
        e.push(this.id.toString());
        for (let i = 0; i < this.Tx.length; i++){
            e.push(this.Tx[i].id.toString(), this.Tx[i].sender_pk, this.Tx[i].reciver_pk, this.Tx[i].amount.toString(), this.Tx[i].signature);
        }
        e.push(this.prev_hash);
        e.push(this.Nonce.toString());

        let str = "";
        for(let i = 0; i < e.length; i++){
            str += e[i];
            if (i + 1 != e.length) str += ",";
        }

        return str;
    }

    mine(){
        let sha256 = new SHA256();
        while(true){
            let data = this.toCSV();
            let tmp_hash = sha256(data).toString();
            if (parseInt(tmp_hash[0]) + parseInt(tmp_hash[1]) + parseInt(tmp_hash[2]) + parseInt(tmp_hash[3]) == 0) {
                this.Hash = tmp_hash;
                break;
            }
            this.Nonce++;
        }
    }
}
