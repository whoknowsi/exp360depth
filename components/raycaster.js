let intersectingStructure

AFRAME.registerComponent('raycaster-element', {
    dependencies: ['raycaster'],

    init: function () {
        this.camera = document.querySelector("a-camera").components.camera.camera
        this.cursor = document.querySelector("#cursor")
        this.raycaster = new THREE.Raycaster()
        this.structure = document.querySelector(".structure").object3D

        if(device == "desktop") {
            this.el.addEventListener('mousedown', () => OnMouseDown())
            this.el.addEventListener('mouseup', () => OnMouseUp())
        }
        else if(device == "tablet" || device == "mobile") {
            this.el.addEventListener('mousedown', (evt) => {
                OnMouseDown()
            })
            this.el.addEventListener('mouseup', () => OnMouseUp())
        }   
    },
    tick: function() {

        if(device == "mobile" || device == "tablet") { return }

        this.raycaster.setFromCamera(pointer, this.camera)
        let intersection = this.raycaster.intersectObject(this.structure)
        // temporalRaycaster.setFromCamera(pointer, document.querySelector("a-camera").components.camera.camera)
        // let intersectionN = temporalRaycaster.intersectObject(document.querySelector(".structure").object3D)

        if(intersection.length == 0) { return }

        CursorManagment(intersection[0])

        return
    }
})


function CursorManagment(intersection) {
    let normal = intersection.face.normal;

    // let cameraRotationHorizontal = NormalizeAngleInRadians(document.querySelector("#cameraContainer").getAttribute("rotation").y)

    let correctedNormal = normal

    // if (normal.x < 0.99 && normal.x > -0.99 && (camera.rotation.x > (Math.PI / 2) && camera.rotation.x < (Math.PI * 3) / 2)) {
    //     correctedNormal = new THREE.Vector3(-normal.x, normal.y, normal.z)
    // }

    cursor.rotation.set(Math.PI/2 * correctedNormal.y, -Math.PI/2 * correctedNormal.x, Math.PI/2 * correctedNormal.z)
    cursor.position.set(intersection.point.x + .1* normal.x, intersection.point.y + normal.y*.1, intersection.point.z + normal.z*.1)
}


const HandleRaycasterIntersection = () => {
    let intersectionObj = GetIntersection()
    MoveToNextSky(intersectionObj)
    handleClick(intersectionObj)
}

const GetIntersection = () => {
    UpdateRaycaster()

    let structureIntersections = raycaster.intersectObject(structure)
    let hotSpotIntersections = []//raycaster.intersectObjects(hotSpotsObj3D)
    let hotSpotIntersection 

    if(hotSpotIntersections.length == 0 && structureIntersections.length == 0) { return null }
    else if (hotSpotIntersections.length == 0) {
        return {
            type: "structure",
            intersection: structureIntersections[0]
        }
    }
    else if(structureIntersections.length == 0) {
        for (let i = 0; i < hotSpotIntersections.length; i++) {
            const hotSpotComponent = hotSpotIntersections[i];
            if(hotSpotComponent.object.el.children.length != 0) { 
                hotSpotIntersection = hotSpotComponent
                break
            }
        }
        return {
            type: "hotSpot",
            intersection: hotSpotIntersection
        }
    }
    else if(structureIntersections[0].distance < hotSpotIntersections[0].distance) {
        return {
            type: "structure",
            intersection: structureIntersections[0]
        }
    }
    else if(structureIntersections[0].distance > hotSpotIntersections[0].distance) {
        for (let i = 0; i < hotSpotIntersections.length; i++) {
            const hotSpotComponent = hotSpotIntersections[i];
            if(hotSpotComponent.object.el.children.length != 0) { 
                hotSpotIntersection = hotSpotComponent
                break
            }
        }
        return {
            type: "hotSpot",
            intersection: hotSpotIntersection
        }
    }
    
    return null
}

function MoveToNextSky(intersectionObj) {
    if(intersectionObj == null) { return }
    if(intersectionObj.type != "structure") { return }

    let closetsSkySpot = GetClosetsSkyIntersectionPoint(intersectionObj.intersection)
    closetsSkySpot != null && ChangeSky(closetsSkySpot)
}

const GetClosetsSkyIntersectionPoint = (intersection) => {
    let closestSkySpotDistance = 100000
    let closetsSkySpot

    skySpots.forEach(skySpot => {
        let skyWorldPosition = new THREE.Vector3()
        skySpot.getWorldPosition(skyWorldPosition)
        let distanceBetweenIntersectionAndSkySpot = intersection.point.distanceTo(skyWorldPosition)
        if(distanceBetweenIntersectionAndSkySpot < closestSkySpotDistance) {
            closestSkySpotDistance = distanceBetweenIntersectionAndSkySpot
            closetsSkySpot = skySpot
        }
    })

    return closetsSkySpot
}   

const UpdateRaycaster = () => {
    if(device == "mobile" || device == "tablet") {
        raycaster.setFromCamera(touch, camera);
    }
    else if(device == "desktop") {
        raycaster.setFromCamera(pointer, camera);
    }
    return raycaster
}