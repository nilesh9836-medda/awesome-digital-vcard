// CONFIG - Change this for each client
/*const clientData = {
  name: "Nilesh Medda",
  org: "Web Developer",
  phone: "+91 9836XXXXXX",
  email: "contact.nileshmedda.dev@gmail.com",
  website: window.location.href,
  address: "Kolkata, West Bengal"
};


// 1. DOWNLOAD VCARD - Save to Contacts
function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${clientData.name}
ORG:${clientData.org}
TEL;TYPE=CELL:${clientData.phone}
EMAIL:${clientData.email}
URL:${clientData.website}
ADR:${clientData.address}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${clientData.name.replace(/\s+/g, '_')}.vcf`;
  link.click();
  URL.revokeObjectURL(url);
}

// 2. DOWNLOAD QR AS PNG - For Sharing
function downloadQRAsPNG() {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(clientData.website)}`;
  
  // Need to fetch as blob to force download
  fetch(qrUrl)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${clientData.name}_QR.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
}

// 3. DOWNLOAD QR AS PDF - For Print Shop
async function downloadQRAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(clientData.website)}`;

  // Add Title
  doc.setFontSize(20);
  doc.text(clientData.name, 20, 20);
  doc.setFontSize(12);
  doc.text(clientData.org, 20, 28);
  doc.text(`Phone: ${clientData.phone}`, 20, 36);
  doc.text(`Email: ${clientData.email}`, 20, 42);

  // Add QR Image
  // We need to load image as base64
  const img = await fetch(qrUrl).then(r => r.blob()).then(blob => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  });

  doc.addImage(img, 'PNG', 20, 50, 60, 60);
  doc.setFontSize(10);
  doc.text("Scan to visit my digital card", 20, 115);

  doc.save(`${clientData.name}_QR.pdf`);
}*/

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
  logoUrl: "https://digital-vcard-v2.netlify.app/assets/images/my-logo2.png" // <-- ADD YOUR LOGO HERE
};

// Auto generate QR with logo on page load
window.onload = function() {
  const qrImg = document.getElementById('qrImage');
  
  // Use QuickChart instead of qrserver
  const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(clientData.website)}&size=250&centerImageUrl=${encodeURIComponent(clientData.logoUrl)}&centerImageSize=50&ecLevel=H&margin=10`;
  
  qrImg.src = qrUrl;
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