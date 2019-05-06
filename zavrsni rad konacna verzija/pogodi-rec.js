var nizReci = ["ormar", "krevet","balon","televizor","telefon","medalja","lampa","autić",
"štampač","ranac","stolica","stočić","globus","hobotnica","kaktus","digitron","gitara",
"antena","torta","kućica"];
var rech = nizReci[Math.floor(Math.random() * nizReci.length)];
var novaRecBtn = document.getElementById('nova-rec-btn');
var brojac = 10;
var brojacTacnih = 0;

//dugme za novu rec koje reloaduje stranicu
novaRecBtn.addEventListener('click',()=>{
    window.location.reload();
})

//hvatamo div i smestamo vrednost brojaca
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
//ubacivanje slova iz reci u divove koji se nalaze u skrivenoj reci
for (i in rech) {
  var slovo = document.createElement("div");
  slovo.setAttribute("class", "slova");
  document.getElementById("skrivena_rec").appendChild(slovo);
}
//prikazivanje obavestenja i promena stila brojaca
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
//unos slova za pogadjanje reci
document.getElementById("unos").addEventListener("input", function(event) {
  let unetoSlovo = event.target.value;
  let uneto = [];
  var divovi_slova = document.querySelectorAll(".slova");
//ako je slovo uneto ispisi obavestenje
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
//ako je brojac pogodjenih jednak duzini reci, rec je pogodjena
    if (brojacTacnih === rech.length) {
      showAlert("POGODILI STE", true);
      document.getElementById("br_brojac").innerText = 0;
      document.getElementById("unos").disabled = true;
      document.getElementById("konacno").disabled = true;
    }
//ako slovo ne postoji u reci smesti ga u polje i ispisi obavestenje
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
//input za konacno sa eventom. ako je pogodjena rec popuni divove sa slovima i izabci obavestenje
document.getElementById("konacno").addEventListener("change", function(event) {
  this.setAttribute("placeholder", "pokusajte konacno");
  let text = event.target.value;

  if (brojac > 0) {
    brojPokusaja();
    var divovi_slova = document.querySelectorAll(".slova");
    if (text.toUpperCase() === rech.toUpperCase()) {
      showAlert("POGODILI STE", true);
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
