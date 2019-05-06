var nizReci = ["sloba", "krevet"];
var rech = nizReci[Math.floor(Math.random() * nizReci.length)];
var novaRecBtn = document.getElementById('nova-rec-btn');
var brojac = 10;
var brojacTacnih = 0;


novaRecBtn.addEventListener('click',()=>{
    // rech = nizReci[Math.floor(Math.random() * nizReci.length)];
    // document.getElementById("skrivena_rec").innerHTML='';
    // brojac=10;
    // brojacTacnih=0;
    //  document.getElementById("br_brojac").innerText = 10;
    //   document.getElementById("unos").disabled = false;
    //   document.getElementById("konacno").disabled = false;
    //   document.getElementById('konacno').setAttribute('placeholder','Probajte konacno'); 
      
    // for (i in rech) {
    //     var slovo = document.createElement("div");
    //     slovo.setAttribute("class", "slova");
    //     document.getElementById("skrivena_rec").appendChild(slovo);
    //   }
    window.location.reload();
})


document.getElementById("br_brojac").innerText = brojac;
var brojac_tacno = 0;
function brojPokusaja() {
  if (brojac > 0) {
    brojac--;
    document.getElementById("br_brojac").innerText = brojac;
  }
}
setTimeout(() => {
  brojPokusaja;
}, 2000);

for (i in rech) {
  var slovo = document.createElement("div");
  slovo.setAttribute("class", "slova");
  document.getElementById("skrivena_rec").appendChild(slovo);
}

function showAlert(text, success) {
  if (!success) {
    document.getElementById("brojac").style.backgroundColor = "red";
    document.getElementById("obavestenje").style.backgroundColor = "red";
    document.getElementById("obavestenje_txt").innerHTML = text;
  } else {
    document.getElementById("obavestenje").style.backgroundColor = "green";
    document.getElementById("obavestenje_txt").innerHTML = text;
  }
}

document.getElementById("unos").addEventListener("input", function(event) {
  let unetoSlovo = event.target.value;
  let uneto = [];
  var divovi_slova = document.querySelectorAll(".slova");

  if (brojac > 0) {
    for (i in rech) {
      let slovoUPocetnojReci = rech[i];
      if (unetoSlovo.toUpperCase() === slovoUPocetnojReci.toUpperCase()) {
        if (
          divovi_slova[i].innerText.toUpperCase() === unetoSlovo.toUpperCase()
        ) {
          console.log(`Slovo ${unetoSlovo.toUpperCase()} je vec uneto`);
          this.value = "";
          showAlert("OVO SLOVO JE VEC UNETO", false);
        } else {
          console.log("Dodato je novo slovo u rec: ", unetoSlovo);
          divovi_slova[i].innerText = unetoSlovo.toUpperCase();
          this.value = "";
          uneto.push(unetoSlovo);
          showAlert("BRAVO", true);
          brojacTacnih++;
        }
      }
    }

    if (brojacTacnih === rech.length) {
      showAlert("POBEDILI STE", true);
      document.getElementById("br_brojac").innerText = 0;
      document.getElementById("unos").disabled = true;
      document.getElementById("konacno").disabled = true;
    }

    if (!rech.includes(unetoSlovo)) {
      this.value = "";
      var text = document.getElementById("koriscena").innerText;
      document.getElementById(
        "koriscena"
      ).innerText += unetoSlovo.toUpperCase();
      showAlert("NE POSTOJI SLOVO U RECI", false);
      brojPokusaja();
    }
  } else {
    this.value = "";
    showAlert("GAME OVER ", false);
    document.getElementById("unos").disabled = true;
    document.getElementById("konacno").disabled = true;
  }
});
document.getElementById("konacno").addEventListener("change", function(event) {
  this.setAttribute("placeholder", "pokusajte konacno");
  let text = event.target.value;

  if (brojac > 0) {
    brojPokusaja();
    var divovi_slova = document.querySelectorAll(".slova");
    if (text.toUpperCase() === rech.toUpperCase()) {
      showAlert("POBEDILI STE", true);
      divovi_slova.forEach((e, i) => {
        for (var j = 0; j < rech.length; j++) {
          if (i === j) {
            divovi_slova[i].innerText = rech.charAt(j).toUpperCase();
          }
        }
      });
      document.getElementById("br_brojac").innerText = 0;
      document.getElementById("unos").disabled = true;
      document.getElementById("konacno").disabled = true;
    } else {
      brojPokusaja();
      showAlert("PROMASILI STE REC", false);
      this.value = "";
    }
  } else {
    showAlert("GAME OVER", false);
  }
});
