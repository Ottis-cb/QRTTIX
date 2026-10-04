//Mode sombre et mode clair


const mode = document.getElementById('mode');

mode.addEventListener("click", function(){
    document.body.classList.toggle('light');
    if(document.body.classList.contains("light")){
       mode.innerHTML='<img src="./resssources/icon/moon-svgrepo-com.svg" alt="moon logo">';
    }else{
       mode.innerHTML='<img src="./resssources/icon/light-svgrepo-com.svg" alt="ligth logo">'; 
    }
})


//qr code
const input = document.querySelector('input');
const button = document.querySelector('.génerer');
const qr = document.querySelector('.qrcode');
const download = document.querySelector('#download');

input.addEventListener('input', function(){
   if (input.value.trim() === ''){
      input.style.border = '1px solid red' ;
   }else {
      input.style.border = '1px solid green' ;
   }
});

button.addEventListener('click', function() {

   if (input.value.trim() === ''){
      input.style.border = '1px solid red' ;
      return;
   }
   qr.innerHTML = '';
   new QRCode (qr, {
      text: input.value,
      width: 170,
      height: 170
});
   download.style.display = 'block';
});

download.addEventListener('click', function(){
   const canvas = qr.querySelector('canvas');
   if (!canvas) {
      alert('Veuillez générer un Qr code avant de le télécharger.');
      return;
   }
   canvas.toBlob(function (blob){
      if(!blob){
         alert("Impossible de générer l'image");
         return;
      }
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = 'QRTTIX-QRCode_by_Ottis.png'

      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function(){
         URL.revokeObjectURL(url);
      }, 1000)
   }, 'image/png');
});