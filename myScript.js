// ----- Kod za ''Back to top button'' ----- //

document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded je event za kada se HTML dokument učita, bez čekanja na učitavanje slika,css-a, itd.
  
  var gototop = document.querySelector(".gototop"); 
 
  function check() {
      pageYOffset >= 400 && gototop.classList.add("visible"); //pageYOffset - provjerava za koliko pixela je scrollano na y osi u dokumentu, te ako je više ili jednako 400, dodaje klasu button-u
      pageYOffset < 400 && gototop.classList.remove("visible");
  }
  
  window.addEventListener("scroll", check); //Znači deklarirali smo elemente i funkciju, sada provjeravamo na event ''scroll'' koliko smo skrolali
  
  function scrollToTop() { //Deklariramo funkciju scrollToTop, koja skrola do 0px od vertikalne osi prozora
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  
  gototop.addEventListener("click", scrollToTop); //na click vrti funkciju gore navedenu
  
});


// ----- Kod za formular ----- //

// započinjemo s datumom, želimo da je najraniji dan danas, a najkasniji za godinu dana

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); 
var yyyy = today.getFullYear();
var yyyy2 = today.getFullYear() + 1;

today = yyyy + "-" + mm + "-" + dd;
var tomorrow = yyyy2 + "-" + mm + "-" + dd;

function todayDay() {
  document.getElementById("date").setAttribute("min", today);
  document.getElementById("date").setAttribute("max", tomorrow);
  document.getElementById("time").value = null;
}

// Nastavljamo s vremenom (uklanja sekunde, te postavlja automatski na lokalno vrijeme)

function prettyTime(){
  var date = new Date();
  var localTime = date.toLocaleTimeString();
  return localTime.replace(/:\d+/, " "); // hvata double digits i uklanja ih
}


// Nadalje za vrijeme - provjerava poklapa li se zadano vrijeme s radnim vremenom, te vremenom primanja rezervacija

function workingHours(){
  var chosenTime = document.forms.reserve.time.value;
  var min = document.forms.reserve.time.getAttribute("min");
  var max = document.forms.reserve.time.getAttribute("max");
  
  if(chosenTime<min || chosenTime>max){
    alert("Please refer to our WORKING HOURS below and review your time input. Keep in mind that our kitchen closes 1 HOUR before closing time.");
    document.forms.reserve.time.value = null;
    document.forms.reserve.time.focus();
  }
}

// Usklađivanje datuma i vremena (koji dan je korisnik izabrao, i na temelju toga postaviti min i max vremena, te poruka da ne radimo ako je korisnik izabrao nedjelju)

function DateTime(){
  var dateSelected = new Date(document.forms.reserve.date.value);
  var daySelected = dateSelected.getDay();
  
  switch(daySelected){
    case 0: alert("Resta is closed on Sundays. Please refer to our working hours below for choosing another date.");
            document.forms.reserve.date.value = null;
            document.forms.reserve.date.focus();
            break;
    
    case 1:
    case 2:
    case 3:
    case 4:
    case 5: document.forms.reserve.time.setAttribute("min", "18:00");
            document.forms.reserve.time.setAttribute("max", "22:00");
            break;
      
    case 6: document.forms.reserve.time.setAttribute("min", "19:00");
            document.forms.reserve.time.setAttribute("max", "24:00");
  }
}

// Ne želimo da nam korisnik piše u polje za stolove, već da odabere jedan od ponuđenih, također, želimo da se svakim klikom na polje pokažu sve opcije, a ne samo ona odabrana 

function showEverything() {
  document.forms.reserve.seats.value = null; // Svakim klikom na polje se resetira
}

function clearEverything(){
  document.forms.reserve.seats.value = null; // Svakim unosom bilo kakvog znaka se resetira (ne dozvoljava input u polje)
}

function tableCheck(){    // Recimo da korisnik izabere privatnu sobu, i 16 ljudi, ali se vrati nazad i izabere manji stol, želimo ga upozoriti da je previše ljudi
  
  var selectedTable = document.forms.reserve.seats.value;
  var tables = new Array("Window table","At the bar","Booth","Private room (up to 16 people)");
  var adults = Number(document.forms.reserve.adults.value);
  var children = Number(document.forms.reserve.children.value);
  var together = adults + children;   // Hvatamo values odabranog stola, djece i odraslih, te uspoređujemo i šaljemo alert ako je jedan od uvjeta ispunjen
  
  if((selectedTable==tables[0] && together>12) || (selectedTable==tables[1] && together>12) || (selectedTable==tables[2] && together>12)){
    alert("You party size is too big for the table chosen. Make sure that the number of people is below 12, or select a private room.");
    document.forms.reserve.children.value = null;
    document.forms.reserve.adults.value = null;
    document.forms.reserve.seats.value = null;
    document.forms.reserve.seats.focus();
  }
}

// Za broj osoba koji dolaze postavljeno je u html-u min i max, ali želimo obavijestiti goste da su upisali previše, ako jesu, odmah pri ispunjavanju (to uključuje i biranje previše ljudi, ali bez privatne sobe) + provjera jesu li djeca sama

function numberCheck() {
  var adults = Number(document.forms.reserve.adults.value);
  var children = Number(document.forms.reserve.children.value);
  var together = adults + children;
  var table = document.forms.reserve.seats.value;  // Hvatamo broj djece, odraslih te izabrani stol, te postavljamo uvjete dolje
  
  if(adults<1 && children>0){
    alert("Minimum of 1 adult present is required for making a reservation.");
    document.forms.reserve.adults.value = null;
    document.forms.reserve.adults.focus();
  } else if(adults==null && children>0){
    alert("Minimum of 1 adult present is required for making a reservation.");
    document.forms.reserve.adults.value = null;
    document.forms.reserve.adults.focus();
  } else if(adults>6 && table!="Private room (up to 16 people)"){
    alert("Number of ADULTS allowed per table is 6. Number of CHILDREN allowed per table is also 6. Please review your input, or select a private room for up to 16 people.");
    document.forms.reserve.adults.value = null;
    document.forms.reserve.adults.focus();
  } else if(adults<=6 && children>6 && table!="Private room (up to 16 people)"){
    alert("Number of ADULTS allowed per table is 6. Number of CHILDREN allowed per table is also 6. Please review your input, or select a private room for up to 16 people.");
    document.forms.reserve.children.value = null;
    document.forms.reserve.children.focus();
  } else if(together<=16 && table=="Private room (up to 16 people)"){
    document.forms.reserve.children.setAttribute("max", 15);
    document.forms.reserve.adults.setAttribute("max", 16);
  } else if(together>16 && table=="Private room (up to 16 people)"){
    alert("Number of people allowed in the private room is 16. Please review your input.");
    document.forms.reserve.children.value = null;
    document.forms.reserve.adults.value = null;
    document.forms.reserve.adults.focus();  
  }
}

// Provjera imena (prima samo slova, velika i mala i razmak između, ako slijede slova)

function nameCheck(){
  var name = document.forms.reserve.name.value;  // Hvatamo value imena, tj unos imena i provjeravamo podudara li se sa našim uvjetom (samo slova, velika i mala te razmak ako slijede opet slova - dakle dopušta ime i prezime, recimo)
  
  if(name.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)){ // \s je whitespace, ili razmak
    return true;
  } else {
    alert("Name must have alphabet characters only. Please review your input.")
    document.forms.reserve.name.value = null;
    document.forms.reserve.name.focus();
  }
}

// Provjera telefona! (10 znamenki, sa ili bez razmaka)

function phoneCheck(){
  var phone = document.forms.reserve.phone.value;
  
  /* mogu biti kombinacije:
      098 985 7735
      0989857735
      098.985.7735
      098-985-7735 */
  
  if(phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
    return true;
  } else {
    alert("Phone number requires 10 characters. Example: 123 456 7890")
    document.forms.reserve.phone.value = null;
    document.forms.reserve.phone.focus();
  }
}

// Provjera e-mail adrese! 

// Provjerava osnovne greške (ništa prije @, email bez @, bez razmaka nakon @, email adresa bez točke na kraju, te znakova nakon - osnovne greške)

function emailCheck(){
  var email = document.forms.reserve.email.value;
  
  if(email.match(/^\S+@\S+\.\S+$/)){
    return true;
  } else {
    alert("Invalid email address. Example: jdoe@example.org");
    document.forms.reserve.email.value = null;
    document.forms.reserve.email.focus();
  }
}

// Pop-up i zahvala, te generator za 'confirmation number'

function thankYou(){    // Mijenja klase izabranih elemenata, čime oni postaju vidljivi
  document.getElementById("overlay").setAttribute("class","overlay");
  document.getElementById("alert-box").setAttribute("class","alert-box");
}

window.onload = function (){    //Generira poruku koja se prikazuje unutar elementa izabranog, te se prikazuje nasumičan 7-znamenkasti broj 
  var number = "Your confirmation number is: RST";
  var digits = Math.floor(Math.random() * 9000000);
  document.getElementById("confirmation").innerHTML = number + digits;
}

// Kod za prevenciju odlaska sa stranice za rezervaciju bez upozorenja je u HTML kodu stranice

// Nakon zahvale, klikom na pozadinu(overlay element) se korisnik vraća na rezervaciju jer se klasa vidljivih elemenata opet mijenja u invisible, te se formular resetira

function backToNormal() {
  document.getElementById("overlay").setAttribute("class","invisible");
  document.getElementById("alert-box").setAttribute("class","invisible");
  document.forms.reserve.reset();
}


// ----- Kod za galerije -----

// Želimo provjeru src slike na koju se kliknulo, te na temelju vrijednosti da se doda vrijednost src-a slike koja će biti prikazana, i tako za sve slike na stranici


function openPicture(img){ // Putem this smo označili element koji je aktivirao funkciju, te iz nje izvlačimo src te ga postavljamo za src prikazane slike, također mijenjamo klasu kako bi se slika prikazala
  document.getElementById("zoom-in-gallery").setAttribute("class", "zoom-in-gallery");
  document.getElementById("zoom-in-gallery").setAttribute("src", img.src);
  document.getElementById("overlay").setAttribute("class", "overlay");
}

// Nakon prikaza slike, možemo sve vratiti u normalu postavkom na stare vrijednosti, samo trebamo stisnuti na overlay (tamnu pozadinu), čime se vraćaju klase invisible za vidljive elemente

function backToNormal2(){
  document.getElementById("overlay").setAttribute("class", "invisible");
  document.getElementById("zoom-in-gallery").setAttribute("class", "invisible");
}

// Želimo da se svakim klikom prikaže nova slika, mijenjamo src slike

function changePicture1(img){
  var source1 = ["mediji/mini-gallery/image-6.jpg", "mediji/mini-gallery/image-1.jpg",   "mediji/mini-gallery/image-2.jpg", "mediji/mini-gallery/image-3.jpg", "mediji/mini-gallery/image-5.jpg", "mediji/mini-gallery/image-4.jpg"];
  var source2 = ["mediji/restaurant/image-1.jpg", "mediji/restaurant/image-2.jpg", "mediji/restaurant/image-4.jpg", "mediji/restaurant/image-5.jpg", "mediji/restaurant/image-7.jpg", "mediji/restaurant/image-8.jpg", "mediji/restaurant/image-9.jpg", "mediji/restaurant/image-10.jpg"]; 
  var source3 = ["mediji/menu/image-2.jpg", "mediji/menu/image-6.jpg", "mediji/menu/image-3.1.jpg", "mediji/menu/image-5.jpg", "mediji/menu/image-7.jpg", "mediji/menu/image-5.2.jpg", "mediji/menu/image-5.1.jpg", "mediji/menu/image-8.jpg"];
  
  if(img.src.endsWith(source1[0])){
    img.src=source1[1];
  } else if(img.src.endsWith(source1[1])){
    img.src=source1[2];
  } else if(img.src.endsWith(source1[2])){
    img.src=source1[3];
  } else if(img.src.endsWith(source1[3])){
    img.src=source1[4];
  } else if(img.src.endsWith(source1[4])){
    img.src=source1[5];
  } else if(img.src.endsWith(source1[5])){
    img.src=source1[0];
  } 
  
    else if(img.src.endsWith(source2[0])){
    img.src=source2[1];
  } else if(img.src.endsWith(source2[1])){
    img.src=source2[2];
  } else if(img.src.endsWith(source2[2])){
    img.src=source2[3];
  } else if(img.src.endsWith(source2[3])){
    img.src=source2[4];
  } else if(img.src.endsWith(source2[4])){
    img.src=source2[5];
  } else if(img.src.endsWith(source2[5])){
    img.src=source2[6];
  } else if(img.src.endsWith(source2[6])){
    img.src=source2[7];
  } else if(img.src.endsWith(source2[7])){
    img.src=source2[0];
  } 
  
    else if(img.src.endsWith(source3[0])){
      img.src=source3[1];
  } else if(img.src.endsWith(source3[1])){
      img.src=source3[2];
  } else if(img.src.endsWith(source3[2])){
      img.src=source3[3];
  } else if(img.src.endsWith(source3[3])){
      img.src=source3[4];
  } else if(img.src.endsWith(source3[4])){
      img.src=source3[5];
  } else if(img.src.endsWith(source3[5])){
      img.src=source3[6];
  } else if(img.src.endsWith(source3[6])){
      img.src=source3[7];
  } else if(img.src.endsWith(source3[7])){
      img.src=source3[0];
  }
}