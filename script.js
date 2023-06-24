import * as THREE from 'three'
import { Box2, DirectionalLight, DoubleSide, TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';


import cosmos from './cosmos.jpg'
import minecraft from './minecraft.jpg'
import cima from './cima.jpg'

const renderer = new THREE.WebGL1Renderer();

const canvas = renderer.domElement;

// isso aqui faz a sombras do three funcionarem, ai vc precisa dizer pra ele o que faz sombra
// e o que recebe sombra
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const cena = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10, 30, 30)

//caixa rodante
const esqueletoCaixa = new THREE.BoxGeometry();
const peleCaixa = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const caixa = new THREE.Mesh(esqueletoCaixa, peleCaixa)
cena.add(caixa)

//bagulho que faz você mexer a câmera
const orbita = new OrbitControls(camera, renderer.domElement)
orbita.update()

//chão branco
const planoGeometrico = new THREE.PlaneGeometry(30, 30)
const planoMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: DoubleSide
})
const plano = new THREE.Mesh(planoGeometrico, planoMaterial)
cena.add(plano)

plano.rotation.x = -0.5 * Math.PI

const planoGeometrico2 = new THREE.PlaneGeometry(10, 10, 10, 10)
const planoMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
})
const plano2 = new THREE.Mesh(planoGeometrico2, planoMaterial2)
cena.add(plano2)

plano2.position.set(10, 10, 15)
plano2.geometry.attributes.position.array[0] -= 10 * Math.random();
plano2.geometry.attributes.position.array[1] -= 10 * Math.random();
plano2.geometry.attributes.position.array[2] -= 10 * Math.random();
const ultimoPonto = plano2.geometry.attributes.position.array.lenght - 1
plano2.geometry.attributes.position.array[ultimoPonto] -= 10 * Math.random();


//isso aqui é código que faz o plano receber sombra 
plano.receiveShadow = true;

//isso aqui é código que faz o caixa receber sombra 
caixa.receiveShadow = true

//linhas que ajudam a enxergar bacaninha 
const malha = new THREE.GridHelper(30)
cena.add(malha)

//eixo x, y e z 
const eixo = new THREE.AxesHelper(5);
cena.add(eixo)


//bola azul
const esqueletoBola = new THREE.SphereGeometry(4, 50, 50)
const peleBola = new THREE.MeshStandardMaterial({
    color: 0x000ff0,
    wireframe: false
})
const bola = new THREE.Mesh(esqueletoBola, peleBola)
cena.add(bola)

bola.position.set(-10, 10, 0)

// isso aqui faz a bola criar sombra
bola.castShadow = true

// LUZ AMBIENTE

const luzAmbiente = new THREE.AmbientLight(0x3333333);
cena.add(luzAmbiente)


// // LUZ DIRECIONAL 


// const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8)
// cena.add(luzDirecional)
// luzDirecional.position.set(-70, 50, 0)
// // isso aqui faz a luz direcional fazer luz 
// luzDirecional.castShadow = true;
// luzDirecional.shadow.camera.bottom = -12
// luzDirecional.shadow.camera.top = 15

// const eixoLuzDirecional= new THREE.CameraHelper(luzDirecional.shadow.camera)
// cena.add(eixoLuzDirecional)
// const eixoDaLuz = new THREE.DirectionalLightHelper(luzDirecional, 5)
// cena.add(eixoDaLuz)

// LUZ HOLOFOTE (MUITO DIRECIONAL)

const holofote = new THREE.SpotLight(0xffffff)
cena.add(holofote)
holofote.position.set(-100, 100, 0)
holofote.castShadow = true;
holofote.angle = 0.09;

const eixoHolofote = new THREE.SpotLightHelper(holofote)
cena.add(eixoHolofote)

// cena.fog = new THREE.Fog(0xffffff, 0, 200);
cena.fog = new THREE.FogExp2(0xffffff, 0.01)


const textura = new THREE.TextureLoader();
//renderer.setClearColor('../img/estrelas.png')
cena.background = textura.load(cosmos)
const texturaDeCubo = new THREE.CubeTextureLoader();
cena.background = texturaDeCubo.load([
    cosmos,
    cosmos,
    cosmos,
    cosmos,
    cosmos,
    cosmos,
])




//caixa 2
const caixaGeometrica2 = new THREE.BoxGeometry(4, 4, 4)
const materialCaixa2 = new THREE.MeshStandardMaterial({
    //  map: mine.load(minecraft) 
})
const facesCaixa = [
    new THREE.MeshStandardMaterial({ map: textura.load(minecraft) }),
    new THREE.MeshStandardMaterial({ map: textura.load(minecraft) }),
    new THREE.MeshStandardMaterial({ map: textura.load(cima) }),
    new THREE.MeshStandardMaterial({ map: textura.load(minecraft) }),
    new THREE.MeshStandardMaterial({ map: textura.load(minecraft) }),
    new THREE.MeshStandardMaterial({ map: textura.load(minecraft) }),
]
const caixa2 = new THREE.Mesh(caixaGeometrica2, facesCaixa)
cena.add(caixa2)
caixa2.position.set(0, 10, 5);
caixa2.castShadow = true
caixa2.receiveShadow = true
// caixa2.material.map = mine.load(minecraft)

//mudador de cor automático
const gui = new dat.GUI();
const opcoes = {
    Corbola: '#ffea00',
    wireframe: false,
    velocidade: 0.01,
    angle: 0.09,
    penumbra: 0,
    intensity: 1
}

gui.addColor(opcoes, 'Corbola').onChange(function (e) {
    bola.material.color.set(e)
})

gui.add(opcoes, 'wireframe').onChange(function (e) {
    bola.material.wireframe = e
})
gui.add(opcoes, 'velocidade', 0, 0.09);
gui.add(opcoes, 'angle', 0, 1);
gui.add(opcoes, 'penumbra', 0, 1);
gui.add(opcoes, 'intensity', 0, 1)


let pulo = 0;

const posicaoMouse = new THREE.Vector2();

window.addEventListener('mousemove', function (event) {
    const canvasBounds = canvas.getBoundingClientRect();
    posicaoMouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    posicaoMouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
});

const CriadorRaio = new THREE.Raycaster();
const idbola = bola.id

caixa2.name = 'caixa'

//animação da caixa rodante
function animate(time) {
    caixa.rotation.x = time / 1000
    caixa.rotation.y = time / 1000

    pulo += opcoes.velocidade
    bola.position.y = 10 * Math.abs(Math.sin(pulo))

    caixa2.position.y = 10 * Math.abs(Math.sin(pulo))

    holofote.angle = opcoes.angle
    holofote.penumbra = opcoes.penumbra
    holofote.intensity = opcoes.intensity
    eixoHolofote.update()

    CriadorRaio.setFromCamera(posicaoMouse, camera);
    const intersects = CriadorRaio.intersectObjects(cena.children);
    console.log(intersects);

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === idbola) {
            intersects[i].object.material.color.set(0xff0000);
        }

        if (intersects[i].object.name === 'caixa') {
            caixa2.rotation.x = time / 1000
            caixa2.rotation.y = time / 1000
        }
    }

    plano2.position.set(10, 10, 15)
    
    plano2.geometry.attributes.position.array[0] = 10 * Math.random();
    plano2.geometry.attributes.position.array[1] = 10 * Math.random();
    plano2.geometry.attributes.position.array[2] = 10 * Math.random();
    plano2.geometry.attributes.position.array[ultimoPonto] = 10 * Math.random();

    renderer.render(cena, camera)
}

renderer.setAnimationLoop(animate)