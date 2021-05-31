// SHA256

function sha256Test() {
  let sha256 = new SHA256();
  document.getElementById("output").innerHTML = sha256(document.getElementById("input").value);

  if (document.getElementById("output").innerHTML == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")
    document.getElementById("issha256valid").innerHTML = "pass!";
  else
    document.getElementById("issha256valid").innerHTML = "fail!";
}

// RSA
// Call this code when the page is done loading.
$(function () {

  // Run a quick encryption/decryption when they click.
  $('#testme').click(function () {

    // Encrypt with the public key...
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey($('#pubkey').val());
    var encrypted = encrypt.encrypt($('#input').val());

    // Decrypt with the private key...
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey($('#privkey').val());
    var uncrypted = decrypt.decrypt(encrypted);

    // Now a simple check to see if the round-trip worked.
    if (uncrypted == $('#input').val()) {
      alert('Pass!');
    }
    else {
      alert('Fail!');
    }
  });
});

function getTxCSV() {
  let txid = 0; // temp value
  let sender_pk = document.getElementById("from").value;
  sender_pk = sender_pk.replace(/\\n/g, "\n");
  let reciver_pk = document.getElementById("to").value;
  reciver_pk = reciver_pk.replace(/\\n/g, "\n");
  let amount = parseInt(document.getElementById("amount").value);

  return txid + "," + sender_pk + "," + reciver_pk + "," + amount;
}

function toSenderField() {
  let t1 = document.getElementById('pubkey').value;
  t1 = t1.replace(/\n/g, "\\n");
  document.getElementById('from').value = t1;
}

function toReciverField() {
  let t1 = document.getElementById('pubkey').value;
  t1 = t1.replace(/\n/g, "\\n");
  document.getElementById('to').value = t1;
}

// sign
function signTest() {
  let msg = getTxCSV();
  let sender_sk = document.getElementById("privkey").value;

  let rsa1024 = new RSA1024();
  let signature = rsa1024.sign(sender_sk, msg);
  document.getElementById("signature").value = signature;

}

// verify
function verifyTest() {
  let msg = getTxCSV();
  let signature = document.getElementById("signature").value;
  let sender_pk = document.getElementById("from").value;
  sender_pk = sender_pk.replace(/\\n/g, "\n");
  let rsa1024 = new RSA1024();

  let verified = rsa1024.verify(msg, sender_pk, signature);

  if (verified)
    alert("Signature Pass!");
  else
    alert("Signature Faile!");

  return verified;

}

// Block
let block = new Block(50);
function addTxTest() {

  let sender_pk = document.getElementById("from").value;
  sender_pk = sender_pk.replace(/\\n/g, "\n");
  
  let reciver_pk = document.getElementById("to").value;
  reciver_pk = reciver_pk.replace(/\\n/g, "\n");

  let tx = new TX(block.Tx.length,
    sender_pk,
    reciver_pk,
    parseInt(document.getElementById("amount").value)
  );

  if(block.addTx(tx)) {
    alert("TX Verify Pass!");
    let tx_history = "";
    block.Tx.push(tx);
    for(let i = 0; i < block.Tx.length; i++){
      tx_history += "[ID: " + block.Tx[i].id.toString() + "] [From: " + block.Tx[i].sender_pk + "] [To: " + block.Tx[i].reciver_pk + "] [Amount: " + block.Tx[i].amount.toString() + "] [Signature: " + block.Tx[i].signature + "]<br /><br />"
    }
    document.getElementById("tx_history").innerHTML = tx_history;
  }
  else alert("TX Verify Fail!");
}

function mineTest(){
    /*-----MINE---- */
  // verify all TX record
  let invalid = false;
  for(let i = 0; i < block.Tx.length; i++){
    if(!block.Tx[i].verify()) {invalid = true; break}
  }
  if(invalid) alert("Invalid TX record detected!");
  else block.mine();
  document.getElementById("prev_hash").value = block.Prev_hash;
  document.getElementById("hash").value = block.Hash;
  document.getElementById("nonce").value = block.Nonce;
}
