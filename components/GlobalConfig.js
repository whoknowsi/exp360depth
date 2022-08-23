let camera, scene, renderer
let structure, sky, cursor
let loading = true
let raycaster = new THREE.Raycaster()


let isChangingSky = false
let isUserInteracting = false,
				onPointerDownMouseX = 0, onPointerDownMouseY = 0,
                onTouchDownMouseX = 0, onTouchDownMouseY = 0,
				lon = 0, onPointerDownLon = 0, onTouchDownLon = 0,
				lat = 0, onPointerDownLat = 0, onTouchDownLat = 0,
				phi = 0, theta = 0;

let minFov = 30, maxFov = 130
let zoomingOnMobile = false

const touch = new THREE.Vector2()
const pointer = new THREE.Vector2()
const temporalRaycaster = new THREE.Raycaster()
const height = 1.6
const skyHeight = .2
const maxTraslationSky = 40
let zooming = false
let currentSky
let firstRender = false
let currentFov = 80
const skySpots = []
const hotSpotsObj3D = []
let scaling = false
const tilesSky1 = []
const panelsSky2 = []
let loadedTiles = []
let imagesName = ["px", "nx", "py", "ny", "pz", "nz"]
let grid = [
    {
        row: 1,
        column: 1
    },
    {
        row: 1,
        column: 2
    },
    {
        row: 2,
        column: 1
    },
    {
        row: 2,
        column: 2
    },
]

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}

const device = deviceType()

// let onPointerMove = (evt) => {
//     pointer.x = (evt.clientX / window.innerWidth) * 2 - 1;
//     pointer.y = - (evt.clientY / window.innerHeight) * 2 + 1;
// }

// let onTouchMove = (evt) => {
//     touch.x = (evt.changedTouches[0].pageX / window.innerWidth) * 2 - 1;
//     touch.y = -(evt.changedTouches[0].pageY / window.innerHeight) * 2 + 1;
// }