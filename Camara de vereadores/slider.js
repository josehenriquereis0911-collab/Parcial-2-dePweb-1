let radio_btn = document.querySelectorAll("input[name='radio-btn']");
let primeiro_btn = document.querySelector("label[for='radio1']");
primeiro_btn.style.backgroundColor = "#fff";

let atual = 1;

function change(evento){
    document.querySelectorAll(".navigation-manual label").forEach(lbl => {
        lbl.style.backgroundColor = "transparent";
    })

    let radio_atual = evento.target;
    let id = `label[for='${radio_atual.id}']`;
    let label = document.querySelector(id);
    
    label.style.backgroundColor = "#fff";

    atual = parseInt(radio_atual.id.slice(-1), 10);
    
}

radio_btn.forEach(btn => {
    btn.addEventListener("change", change);
});

const meuTimer = setInterval(() => {
    if(atual == 4){
        atual = 1;
    }
    else{
        atual += 1;
    }
    // let label_atual = document.querySelector(`label[for='${String(atual)}']`);
    let radio = document.querySelector(`#radio${atual}`);
    console.log(`clicado = ${atual}`)
    radio.checked = true;
    radio.dispatchEvent(new Event("change"));
    
    
}, 10000);
