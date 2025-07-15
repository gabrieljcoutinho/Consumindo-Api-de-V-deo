const containerVideos = document.querySelector(".videos__container");

async function buscarEMostraraVideos(){
    try{
    const busca = await fetch("http://localhost:3000/videos");
    const videos = await busca.json();

        videos.forEach((video) => {

            if(video.categoria == ""){
                throw new Error("Vídeo não tem categoria " + video.titulo);
            }
            containerVideos.innerHTML +=  `
            <li class="video__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video>
                <img class="img-canal" src="${video.imagem}" alt="ILogo do Canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="cayegorias" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        })
    } catch(error){
        containerVideos.innerHTML = `<p class="error">Não foi possível carregar os vídeos? ${error}.</p>`;
    }
}

buscarEMostraraVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".video__item");

        if(barraDePesquisa.value != ""){
            for(let video of videos){
                let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
                let valorFiltro = barraDePesquisa.value.toLowerCase();

                if(titulo.includes(valorFiltro)){
                    video.style.display = "none";
                } else {
                    video.style.display = "block";
                }
            }
        } else{
            for(let video of videos){
                video.style.display = "block";
            }
        }

};

const botaoCategoria = document.querySelector(".superior__item");

botaoCategoria.forEach((botao) => {
        let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));

})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".video__item");

    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != "todos"){
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }

}