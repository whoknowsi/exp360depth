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
        
        document.querySelector("canvas").addEventListener("wheel", event => {
            if(IsMoving()) { return }
            zooming = true
            let amount = Math.sign(event.deltaY) * 5
            
            currentFov = Number(self.camera.getAttribute('camera').fov)
            let adjust = amount + currentFov
            if (adjust < self.data.min) { adjust = self.data.min }
            if (adjust > self.data.max) { adjust = self.data.max }

            self.camera.setAttribute('camera', 'fov', adjust)
        })

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

const pinchStart = (evt, fov) => {
    prevFov = fov
    startPoints = Math.hypot(
        evt.touches[0].pageX - evt.touches[1].pageX,
        evt.touches[0].pageY - evt.touches[1].pageY)
}

const pinchMove = (evt, min, max, camera) => {
    if(IsMoving()) { return }
    zooming = true

    var dist = Math.hypot(
        evt.touches[0].pageX - evt.touches[1].pageX,
        evt.touches[0].pageY - evt.touches[1].pageY)

    let currentFovNormalized = MapInterval(prevFov, min, max, evt.target.scrollWidth - startPoints, 0 - startPoints)
    let normalized = MapInterval(currentFovNormalized + dist - startPoints, 0 - startPoints, evt.target.scrollWidth - startPoints, max, min)
    currentFov = normalized
    camera.setAttribute('camera', 'fov', normalized)
}
