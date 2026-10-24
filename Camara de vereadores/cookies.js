document.addEventListener("DOMContentLoaded", () => {
    // 1. Cookie: parte pra os termos de Cookies/LGPD
    if (!document.cookie.includes("cookieAceite=")) {
        document.cookie = "cookieAceite=Sim; max-age=" + 60*60*24*30 + "; path=/";
    }

    // 2. Cookie: Tema Preferido do site
    if (!document.cookie.includes("temaPreferido=")) {
        document.cookie = "temaPreferido=claro; max-age=" + 60*60*24*30 + "; path=/";
    }

    // 3. Cookie: Data e hora da ultima visita
    const agora = new Date().toLocaleDateString();
    document.cookie = "ultimaVisita=" + encodeURIComponent(agora) + "; max-age=" + 60*60*24*30 + "; path=/";

    // 4. Cookie: Contador dos acesso
    let cVisitas = document.cookie.split('; ').find(row => row.startsWith('totalAcessos='));
    let qtd = cVisitas ? parseInt(cVisitas.split('=')[1]) + 1 : 1;
    document.cookie = "totalAcessos=" + qtd + "; max-age=" + 60*60*24*30 + "; path=/";

    // 5. Cookie: Nome do último visitante (salva e preenche no input da Ouvidoria)
    const inputNome = document.querySelector("#nome");
    if (inputNome) {
        let cNome = document.cookie.split('; ').find(row => row.startsWith('nomeVisitante='));
        if (cNome) inputNome.value = decodeURIComponent(cNome.split('=')[1]);
        inputNome.addEventListener("input", (e) => {
            document.cookie = "nomeVisitante=" + encodeURIComponent(e.target.value) + "; max-age=" + 60*60*24*30 + "; path=/";
        });
    }
});