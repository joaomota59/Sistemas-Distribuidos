<!--Asynchronous-->
<!--JavaScript-->     
<!--And-->	
<!--XML-->


var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();<!--estabelece a conexao e recebe DATA-->
  ourRequest.open('GET', 'https://raw.githubusercontent.com/joaomota59/Sistemas-Distribuidos/master/animais'+pageCounter+'.json'); <!--metodo GET receber DATA, segundo parametro: a url que quer receber os dados-->
  ourRequest.onload = function() {<!--método que diz o que fazer quando a DATA é carregada--> 
    if (this.readyState == 4 && this.status == 200) {
      <!-- var ourData = this.responseText le o json como fosse um texto normal de um txt -->
      var ourData = JSON.parse(this.responseText); <!--le o txt mas filta no formato JSON separando cada objeto do array-->
      renderHTML(ourData);<!--chama a função renderHTML criada abaixo-->
    } else {
      console.log("Foi conectado ao servidor mas retornou um erro!");
    }
    
  };

  ourRequest.onerror = function() {
    console.log("Erro de Conexão.");
  };

  ourRequest.send();
  pageCounter++;
  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var htmlString = "";

  for (i = 0; i < data.length; i++) { <!--array de objetos-->
    htmlString += "<p>" + data[i].nome + " é um " + data[i].tipo + " que gosta de ";
    
    for (ii = 0; ii < data[i].gostos.likes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].gostos.likes[ii];
      } else {
        htmlString += " e " + data[i].gostos.likes[ii];
      }
    }

    htmlString += ' e não gosta de ';

    for (ii = 0; ii < data[i].gostos.dislikes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].gostos.dislikes[ii];
      } else {
        htmlString += " e " + data[i].gostos.dislikes[ii];
      }
    }

    htmlString += '.</p>';

  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}