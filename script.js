// QR Generator
function generateQRCode() {
  const qrOutput = document.getElementById("qr-output");
  const input = document.getElementById("qr-input").value;

  qrOutput.innerHTML = ""; // clear previous
  if (!input.trim()) return;

  new QRCode(qrOutput, {
    text: input,
    width: 200,
    height: 200,
  });
}

// QR Scanner using html5-qrcode
window.addEventListener("load", () => {
  const qrResult = document.getElementById("qr-result");
  const video = document.getElementById("preview");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    qrResult.innerText = "Camera not supported on this browser.";
    return;
  }

  const html5QrCode = new Html5Qrcode("preview");
  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    },
    qrCodeMessage => {
      qrResult.innerText = "Scanned: " + qrCodeMessage;
    },
    errorMessage => {
      // console.log(errorMessage); // quiet
    }
  ).catch(err => {
    qrResult.innerText = "Unable to access camera: " + err;
  });
});

