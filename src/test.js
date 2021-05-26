// SHA256

function sha256Test(){
    let msg = new Int32Array(3); // need fix for dynamic length
    let str = document.getElementById("input").value;

    for (let i = 0; i < 3; i++){
        msg[i] = str.charCodeAt(i);
    }
    let sha256 = new SHA256(msg);
    let output = "";
    
    for (let i = 0; i < 8; i++){
        output += decimalToHexString(sha256[i]);
    }

    document.getElementById("output").innerHTML = output;
}

function decimalToHexString(x)
{
  if (x < 0)
  {
    x = 0xFFFFFFFF + x + 1;
  }

  return x.toString(16);
}
