import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import estrelas from './cosmos.jpg'

import texturaSol from '../three/img/sol.png'
import texturaMercurio from '../three/img/mercurio.jpg'
import texturaVenus from '../three/img/venus.jpg'
import texturaterra from '../three/img/terra.jpg'
import texturaMarte from '../three/img/marte.jpg'
import texturajupiter from '../three/img/jupiter.jpg'
import texturanetuno from '../three/img/netuno.jpg'
import texturasaturno from '../three/img/saturno.jpg'
import texturaaneis from '../three/img/aneis.png'




const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbita = new OrbitControls(camera, renderer.domElement)

camera.position.set(-19, 140, 200)
orbita.update();

const luz = new THREE.AmbientLight(0x333333);
cena.add(luz)

const texturaDeCubo = new THREE.CubeTextureLoader();
cena.background = texturaDeCubo.load([
    estrelas,
    estrelas,
    estrelas,
    estrelas,
    estrelas,
    estrelas
])

const textura = new THREE.TextureLoader();

const solGeo = new THREE.SphereGeometry(16, 30, 30);
const solMat = new THREE.MeshBasicMaterial({
    map: textura.load(texturaSol)
});
const sol = new THREE.Mesh(solGeo, solMat)
cena.add(sol)

const luzSolar = new THREE.PointLight(0xffffff, 3, 370);
cena.add(luzSolar)


function criarPlanetas(tamanho, texture, posicao) {
    const geo = new THREE.SphereGeometry(tamanho, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textura.load(texture)
    });
    const orbita = new THREE.Object3D()
    cena.add(orbita)
    const mesh = new THREE.Mesh(geo, mat)
    orbita.add(mesh)
    mesh.position.x = posicao
    return { mesh, orbita }
}







const mercury = criarPlanetas(3.2, texturaMercurio, 28)
cena.add(mercury)
const venus = criarPlanetas(3.5, texturaVenus, 40)
cena.add(venus)
const terra = criarPlanetas(4.5, texturaterra, 53)
cena.add(terra)
const marte = criarPlanetas(4, texturaMarte, 71)
cena.add(marte)
const jupiter = criarPlanetas(10, texturajupiter, 91)
cena.add(jupiter)











const saturnoGeo = new THREE.SphereGeometry(6, 30, 30);
const saturnoMat = new THREE.MeshStandardMaterial({
    map: textura.load(texturasaturno)
});
const saturnoObt = new THREE.Object3D()
cena.add(saturnoObt)
const saturno = new THREE.Mesh(saturnoGeo, saturnoMat)
saturnoObt.add(saturno)
saturno.position.x = 120


const aneisSaturnoGeo = new THREE.RingGeometry(8, 17, 50)
const aneisSaturnoMat = new THREE.MeshBasicMaterial({
    map: textura.load(texturaaneis),
    side: THREE.DoubleSide
});
const aneisSaturno = new THREE.Mesh(aneisSaturnoGeo, aneisSaturnoMat)
saturnoObt.add(aneisSaturno)
aneisSaturno.position.x = 120
aneisSaturno.rotation.x = -0.5 * Math.PI

const netuno = criarPlanetas(7.8, texturanetuno, 170)
cena.add(netuno)

function animate() {
    sol.rotateY(0.009)
    mercury.mesh.rotateY(0.075)
    mercury.orbita.rotateY(0.014)
    venus.mesh.rotateY(0.005)
    venus.orbita.rotateY(0.007)
    terra.mesh.rotateY(0.09)
    terra.orbita.rotateY(0.0082)
    marte.mesh.rotateY(0.09)
    marte.orbita.rotateY(0.0072)
    jupiter.mesh.rotateY(0.04)
    jupiter.orbita.rotateY(0.0042)
    saturno.rotateY(0.005)
    saturnoObt.rotateY(0.004)
    netuno.mesh.rotateY(0.06)
    netuno.orbita.rotateY(0.006)

    renderer.render(cena, camera)
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.set(window.innerWidth, window.innerHeight)
})