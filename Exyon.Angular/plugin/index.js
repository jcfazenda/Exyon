



	setTimeout(function() { 

	  ExecuteCaptcha();
 				
	  return true;

	}, 6000);

 /* **** */
 function Framewindow() {

   console.log('Loading Execute Frame ...');

   try
   {
      var iframeWindow = parent.document.getElementsByTagName('iframe')[1].contentWindow;

      console.log('Frame window:', iframeWindow);

      iframeWindow.addEventListener("load", function() {
   
          var doc          = iframe.contentDocument || iframe.contentWindow.document; 
   
          console.log('Framewindow...', doc);
   
      }); 

   }catch(e){
      console.log('Framewindow: ' + e);
      return false;
   } 
}

function ExecuteCaptcha() {

   console.log('Loading Execute Captcha no Jscript ...');

   /* Captcha */
   /* Executa automaticamente os passos de desafio do capctcha */

   try
   {
      /* verifica a existencia da classe */
      if (document.querySelector('.rc-anchor-center-container') ){	  

          setTimeout(function() {   
             document.querySelector('.rc-anchor-center-container').click(); 
         }, 8000); 
		  
          setTimeout(function() {   
             var headset = ExecuteHeadset();
             if (headset === true) {
                return LinkAudio = GetLinkaudio();
             }

         }, 6000); 
  
     } else { 

        console.log('Return ExecuteCaptcha: ' + document.querySelector('.rc-anchor-center-container'));
        return false;	 
     }
      
   }catch(e){			

      console.log('ExecuteCaptcha: ' + e); 
      return false;
   }
   
} 

function ExecuteHeadset() {

   try
   {
      /* verifica a existencia do headset de Audio */
      if (document.getElementById('recaptcha-audio-button') ){	  

          setTimeout(function() {  

            document.getElementById('recaptcha-audio-button').click();
            return true;  

         }, 6000); 
  
     } else {  
	    console.log('Return ExecuteHeadset: ' + document.getElementById('recaptcha-audio-button'));
        return false;	 
     }
      
   }catch(e){			

      console.log('ExecuteHeadset: ' + e);
      return false;
   }
   
}

function GetLinkaudio() {

   try
   {
      /* verifica a existencia do headset de Audio */
      if (document.getElementById('audio-source') ){	  

          setTimeout(function() {  

            return document.getElementById('audio-source').getAttribute('src'); 

         }, 6000); 
  
     } else {  
        return false;	 
     }
      
   }catch(e){			

      console.log('GetLinkaudio: ' + e);
      return false;
   }
   
}

/* Escreve o resultado do audio no captcha */
function Writespeech(speech) {

   try
   {
      /* verifica a existencia do campo text do audio */
      if (document.getElementById('audio-response') ){	  

          setTimeout(function() {  
            document.getElementById('audio-response').value = speech; 
            return SendSpeech();

         }, 6000); 
  
     } else {  
        return false;	 
     }
      
   }catch(e){			

      console.log('GetLinkaudio: ' + e);
      return false;
   }
   
}

/* click final do desafio */
function SendSpeech() {

   try
   {
      /* verifica a existencia do botao de desafio */
      if (document.getElementById('recaptcha-verify-button') ){	  

         setTimeout(function() {  
            document.getElementById('recaptcha-verify-button').click(); 
            return true;
         }, 6000); 
  
     } else {  
        return false;	 
     }
      
   }catch(e){			

      console.log('Writespeech: ' + e);
      return false;
   }
   
}