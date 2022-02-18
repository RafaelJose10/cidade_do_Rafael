var corpo;
var terreno = new Array();
var dme
var casas;

var div_construção, section_casa, imgSelecionado;

function adc_casa(r) {
    section_casa.style.display = r;
}

function desSelecionar(r) {
    imgSelecionado.style.display = r
    casas = undefined;
};

function tipocasa(tp) {
    section_casa.style.display = "none";
    casas = tp;
    imgSelecionado.src = 'casa' + tp + '.png';
    imgSelecionado.style.display = 'block';
}


window.addEventListener('load', () => {
    section_casa = window.document.querySelector('section#casa');
    imgSelecionado = window.document.querySelector('img#imgSelecionado');

    corpo = window.document.querySelector('section#corpo');

    dme = 100

    for (let C = 0; C < 15; C++) {
        var terreno2 = new Array();
        for (let c = 0; c < 15; c++) {
            var dados = {
                n: Math.round(Math.random() * 100),
                larg: dme,
                alt: dme,
                pxE: c * dme,
                pxD: c * dme + dme,
                pyC: C * dme,
                pyB: C * dme + dme,
                img: window.document.createElement('img'),
                atb: window.document.createAttribute('style'),
                src: ''
            };
            if (dados.n < 50) dados.src = 'grama.jpg'
            else dados.src = 'arvore.png';

            //===========
            dados.atb.value = `width: ${dados.larg}px; height: ${dados.alt}px; position: absolute; left: ${dados.pxE}px; top: ${dados.pyC}px; z-index: 2; `;
            dados.img.setAttributeNode(dados.atb);
            //===========
            dados.img.src = dados.src;
            // window.document.body.appendChild(dados.img);

            corpo.appendChild(dados.img);


            terreno2.push(dados);
        }
        terreno.push(terreno2);
    }
    console.log(terreno);



    var zom = window.document.querySelector('input#zom');

    zom.addEventListener('click', () => {
        // dme = 200;
        if (dme == 100) dme = 200, zom.value = '-zom'
        else dme = 100, zom.value = '+zom';
        for (let C in terreno) {
            for (let c in terreno[C]) {
                let ter = terreno[C][c]
                ter.larg = dme;
                ter.alt = dme;
                ter.pxE = c * dme;
                ter.pxD = c * dme + dme;
                ter.pyC = C * dme;
                ter.pyB = C * dme + dme

                ter.atb.value = `width: ${ter.larg}px; height: ${ter.alt}px; position: absolute; left: ${ter.pxE}px; top: ${ter.pyC}px; z-index: 2; `;
                ter.img.setAttributeNode(ter.atb);
            }
        }
    });

    for (let C in terreno) {
        for (let c in terreno[C]) {
            let te = terreno[C][c]
            te.img.onclick = () => {
                if (casas !== undefined) {
                    if (te.src !== "grama.jpg") {
                        if (te.src == 'arvore.png' || te.src == 'arvore_cortada_1.png') {
                            alert("corte a arvore primeiro");
                        } else {
                            alert("area ja ocupado");
                        }
                    } else {
                        te.img.src = 'casa' + casas + '.png';
                        te.src = casas + ".png";
                        // te.img.src = 'arvore_cortada.png'
                    }
                } else {
                    if (te.src == "arvore.png") {
                        te.img.src = 'arvore_cortada_1.png';
                        te.src = 'arvore_cortada_1.png';
                    } else if (te.src == "arvore_cortada_1.png") {
                        te.img.src = 'grama.jpg';
                        te.src = 'grama.jpg';
                    }
                }
                // te.alt = 250;
                // window.alert(te.src);


                //----------------------
                // terreno[C][c].img.remove();
                // terreno[C].splice(c, 1)
                //--------------------
                // let I = C;
                // let i = c;
                // terreno[I][i].img.src = '';
                // terreno[I][++i].img.src = '';
                // terreno[++I][i].img.src = '';
                // terreno[I][--i].img.src = '';
            }
        }
    }


});
