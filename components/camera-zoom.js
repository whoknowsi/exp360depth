let startPoints
let prevFov
AFRAME.registerComponent('camera-zoom', {
    schema: {
        min: { type: "number", default: 30 },
        max: { type: "number", default: 120 }
    },
    init: function () {
        let self = this
        let sceneEl = document.querySelector("a-scene")
        self.camera = sceneEl.querySelector("a-camera")
        

        document.querySelector(".a-canvas").addEventListener("touchstart", (evt) => {
            if (evt.touches.length === 2) {
                scaling = true
                pinchStart(evt, Number(self.camera.getAttribute('camera').fov))
            }
        })

        document.querySelector(".a-canvas").addEventListener("touchmove", (evt) => {
            if (scaling) {
                pinchMove(evt, self.data.min, self.data.max, self.camera)
            }
        })

        document.querySelector(".a-canvas").addEventListener("touchend", () => {

        })
    }
})

const pinchStart = (evt) => {
    zoomingOnMobile = true
    prevFov = camera.fov
    startPoints = Math.hypot(
        evt.touches[0].pageX - evt.touches[1].pageX,
        evt.touches[0].pageY - evt.touches[1].pageY)
}

const pinchMove = (evt) => {
    let dist = Math.hypot(
        evt.touches[0].pageX - evt.touches[1].pageX,
        evt.touches[0].pageY - evt.touches[1].pageY)

    let currentFovNormalized = MapInterval(prevFov, minFov, maxFov, evt.target.scrollWidth - startPoints, 0 - startPoints)
    let normalized = MapInterval(currentFovNormalized + dist - startPoints, 0 - startPoints, evt.target.scrollWidth - startPoints, maxFov, minFov)
    currentFov = normalized
    camera.fov = normalized
    camera.updateProjectionMatrix()
    LoadTiles()
}
