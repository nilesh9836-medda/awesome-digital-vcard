function hamburgerActive() {
  document.querySelector('.body').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  document.querySelector('.nav').classList.add('active');
}

function overlayClose() {
  document.querySelector('.nav').classList.remove('active');
  document.querySelector('.qr-section').classList.remove('active');
  document.querySelector('.upi-qr').classList.remove('active');
  document.querySelector('.lightbox').classList.remove('active');
  document.querySelector('.overlay').classList.remove('blurred');
  document.querySelector('.overlay').classList.remove('active');
  document.querySelector('.body').classList.remove('active');
}

// CONFIG - Change this for each client
const clientData = {
  name: "Nilesh Medda",
  org: "Web Developer",
  phone: "+91 9836XXXXXX",
  email: "contact.nileshmedda.dev@gmail.com",
  website: window.location.href,
  address: "Kolkata, West Bengal",
  logoUrl: "https://awesome-digital-vcard.pages.dev/assets/images/my-logo2.png", // <-- ADD YOUR LOGO HERE
  qrLogo: "https://awesome-digital-vcard.pages.dev/assets/icons/favicon-32x32.png"
};

// Auto generate QR with logo on page load
window.onload = function() {
  const qrImg = document.getElementById('qrImage');
  const printQR = document.getElementById('print-qr-img');
  
  // Use QuickChart instead of qrserver
  const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(clientData.website)}&size=250&centerImageUrl=${encodeURIComponent(clientData.qrLogo)}&centerImageSize=50&ecLevel=H&margin=10`;
  
  qrImg.src = qrUrl;
  printQR.src = qrUrl;
};

function lightboxActive() {
  document.querySelector('.body').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  document.querySelector('.overlay').classList.add('blurred');
  document.querySelector('.lightbox').classList.add('active');
  document.querySelector('.qr-section').classList.add('active');
}

function payment() {
  document.querySelector('.body').classList.add('active');
  document.querySelector('.overlay').classList.add('active');
  document.querySelector('.overlay').classList.add('blurred');
  document.querySelector('.lightbox').classList.add('active');
  document.querySelector('.upi-qr').classList.add('active');
}

async function copyID() {
  const btn = document.querySelector('.cpy');
  let elem = document.querySelector('.id-txt');
  try {
    await navigator.clipboard.writeText(elem.textContent);
    btn.innerText = "✓ Copied!";
    setTimeout(()=> btn.innerText = "Copy", 2000);
  } catch (err) {
    // fallback for old phones
    const input = document.createElement('input');
    input.value = elem.textContent;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    btn.innerText = "✓ Copied!";
  }
}

function shareCard() {
  // Check if browser supports sharing
  if (navigator.share) {
    navigator.share({
      title: `${clientData.name} card`,
      text: `Check out ${clientData.name} card`,
      url: window.location.href
    })
   .then(() => console.log('Shared successfully'))
   .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback - copy link
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied! ' + window.location.href);
  }
}

function downloadVCard() {

    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${clientData.name}`,
        `ORG:${clientData.org}`,
        `TEL;TYPE=CELL:${clientData.phone}`,
        `EMAIL:${clientData.email}`,
        `URL:${clientData.website}`,
        `ADR;TYPE=WORK:;;${clientData.address};;;;`,
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob(
        [vcard],
        { type: "text/vcard" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${clientData.name.replace(/\s+/g, "_")}.vcf`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}