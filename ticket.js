const canvas = document.getElementById("ticket");
const ctx = canvas.getContext("2d");


const nombre = document.getElementById("nombre");
const ciudad = document.getElementById("ciudad");
const cancion = document.getElementById("cancion");
const fecha = document.getElementById("fecha");


let miembroActual = "jin";


const miembros = {

    rm: "assets/tickets/rm.png",
    jin: "assets/tickets/jin.png",
    suga: "assets/tickets/suga.png",
    jhope: "assets/tickets/jhope.png",
    jimin: "assets/tickets/jimin.png",
    v: "assets/tickets/v.png",
    jungkook: "assets/tickets/jk.png"

};



function generarTicket(){

    const fondo = new Image();


    fondo.onload = function(){

        console.log("Fondo cargado:", miembros[miembroActual]);


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const escala = Math.min(
            canvas.width / fondo.width,
            canvas.height / fondo.height
        );
        
        const ancho = fondo.width * escala;
        const alto = fondo.height * escala;
        
        const x = (canvas.width - ancho) / 2;
        const y = (canvas.height - alto) / 2;
        
        
        ctx.drawImage(
            fondo,
            x,
            y,
            ancho,
            alto
        );


        ctx.fillStyle = "#ff0055";
        ctx.font = "bold 35px Arial";
        ctx.textAlign = "center";

        ctx.fillStyle = "#ffffff";
        ctx.fillText(
            nombre.value.toUpperCase(),
            390,
            1367
        );

        ctx.fillStyle = "#ff0055";
        ctx.fillText(
            ciudad.value.toUpperCase(),
            340,
            1455
        );



        let fechaTexto = "";

        if(fecha.value){

            fechaTexto =
            fecha.value
            .split("-")
            .reverse()
            .join("/");

        }

        ctx.fillStyle = "#ff0055";
        ctx.fillText(
            fechaTexto,
            340,
            1524
        );


        ctx.fillStyle = "#ff0055";
        ctx.fillText(
            cancion.value.toUpperCase(),
            340,
            1594
        );


    };



    fondo.onerror = function(){

        console.error(
            "No se pudo cargar:",
            miembros[miembroActual]
        );


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle="white";
        ctx.font="30px Arial";

        ctx.fillText(
            "ERROR: Fondo no encontrado",
            400,
            800
        );

    };



    fondo.src = miembros[miembroActual];

}




// BOTONES DE MIEMBROS

document
.querySelectorAll(".member-btn")
.forEach(btn=>{


    btn.addEventListener(
        "click",
        ()=>{


            document
            .querySelectorAll(".member-btn")
            .forEach(b=>{
                b.classList.remove("active");
            });



            btn.classList.add("active");



            miembroActual =
            btn.dataset.member;



            generarTicket();


        }
    );


});

const botonIdioma = document.getElementById("idioma");

let ingles = false;


botonIdioma.addEventListener("click", ()=>{

    ingles = !ingles;


    document
    .querySelectorAll("[data-es]")
    .forEach(elemento=>{


        if(ingles){

            elemento.textContent =
            elemento.dataset.en;

        }else{

            elemento.textContent =
            elemento.dataset.es;

        }


    });


    botonIdioma.textContent =
    ingles
    ? "🌐 English"
    : "🌐 Español";


});







// ACTUALIZAR TEXTO

nombre.addEventListener(
    "input",
    generarTicket
);


ciudad.addEventListener(
    "input",
    generarTicket
);


cancion.addEventListener(
    "input",
    generarTicket
);


fecha.addEventListener(
    "input",
    generarTicket
);




// DESCARGAR PNG

document
.getElementById("download")
.addEventListener(
"click",
()=>{


    const link =
    document.createElement("a");


    link.download =
    `${nombre.value || "ticket"}-${miembroActual}.png`;



    link.href =
    canvas.toDataURL("image/png");



    link.click();


});




// CARGA INICIAL

generarTicket();