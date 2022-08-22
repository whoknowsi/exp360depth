let allSkies

AFRAME.registerComponent('change-sky', {
    schema: {
        target: {
            type: 'string'
        },
        rotation: {
            type: 'string'
        }
    },
    init: function () {
        let data = this.data;
        let el = this.el;


        el.addEventListener('click', () => ChangeSky(el, data))
        el.addEventListener('raycaster-intersected',  () => {
            // if (device == "mobile" || device == "tablet") {
            //     ChangeSky(el, data)
            // }
            el.firstChild.setAttribute("material", "opacity", .6)
        })
        el.addEventListener('raycaster-intersected-cleared', () => {
            el.firstChild.setAttribute("material", "opacity", .3)
        })
    }
})

function ChangeSky(targetSky) {
    if (isChangingSky || scaling) { return }
    let targetIsCurrentSky = (targetSky.userData.id == currentSky.id)
    if(targetIsCurrentSky) { return }

    MoveSky(targetSky.userData)

    // if(camera.fov != 80) {
    //     camera.components.animation__fov.data.from = currentFov
    //     currentFov = 80
    //     camera.emit("fov")
    //     setTimeout(() => {
    //         MoveSky(el, data)
    //     }, 300);
    // } else {
    //     MoveSky(el, data)
    // }
}

const MoveSky = (targetSky) => {
    const loader = new THREE.CubeTextureLoader()

    loader.setPath( "./data/tiles/" + targetSky.id + "/" )
    const textureCube = loader.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] )

    structure.material.uniforms.skybox2.value = textureCube
    structure.material.uniforms.objPosition2.value = targetSky.position

    const tween = new TWEEN.Tween({ 
        x: camera.position.x, 
        z: camera.position.z,
        opacity: 1})
    .onStart( () => {
        sky.visible = false
        isChangingSky = true

        loadedTiles = []

        currentSky = targetSky
        loadLowQualityTiles()
    })
    .to({ 
        x: targetSky.position.x, 
        z: targetSky.position.z,
        opacity: 0}, 1500)
    .onUpdate((coords) => {
        camera.position.x = coords.x
        camera.position.z = coords.z

        structure.material.uniforms.alpha1.value = coords.opacity
        structure.material.uniforms.alpha2.value = 1 - coords.opacity
    })
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onComplete(() => {
        structure.material.uniforms.skybox.value = textureCube
        structure.material.uniforms.alpha1.value = 0
        structure.material.uniforms.objPosition1.value = targetSky.position
        structure.material.uniforms.alpha2.value = 0
        
        sky.position.set(targetSky.position.x, targetSky.position.y, targetSky.position.z)
        sky.visible = true
        LoadTiles()

        isChangingSky = false
    })
    tween.start()
}

