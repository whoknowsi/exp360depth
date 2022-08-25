// const Init = async () => {
//     const results = await fetch("./data/data.json")
//     const data = await results.json()
//     InitCode(data)
// }

// Init()

// const InitCode = async (data) => {
//     await CreateScene(data)
// }

// const CreateScene = async (data) => {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);

//     renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     if (device == "mobile" || device == "tablet") render.antialias = false
        
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     document.body.style.touchAction = 'none';

//     if (device == "desktop") {
//         cursor = CreateVisualCursor()
//         scene.add(cursor)
//     }

//     structure = await CreateStructure(data)
//     scene.add(structure)

//     let skySpots = CreateSkySpots(data)
//     scene.add(skySpots)
//     camera.position.set(currentSky.position.x, currentSky.position.y, currentSky.position.z)

//     render()
//     addEvents() 
// }

// const CreateVisualCursor = () => {

//     let geometryInner = new THREE.RingGeometry(.1825, .13, 32)
//     let materialInner = new THREE.MeshLambertMaterial({
//         opacity: .5,
//         color: new THREE.Color(0xffffff),
//         side: 2,
//         transparent: true
//     })

//     let group = new THREE.Group()
//     group.add(new THREE.Mesh(geometryInner, materialInner))

//     return group
// }

// const CreateStructure = async (data) => {
//     const modelLoader = new THREE.GLTFLoader()
//     const gltf = await modelLoader.loadAsync("./data/model.glb")
//     var geometry = gltf.scene.children[gltf.scene.children.length-1].geometry

    
//     currentSky = data.skySpots.find((skySpot) => skySpot.current)
//     currentSky = {
//         id: currentSky.id,
//         position: new THREE.Vector3(currentSky.position.x, currentSky.position.y, currentSky.position.z)
//     }

//     // let imagesTiles = []
//     // let imagesSides = []

//     // const urls =  [ 'px', 'nx', 'py', 'ny', 'pz', 'nz' ]
//     // for (let i = 0; i < 6; i++) {
//     //     const positionName = urls[i]
//     //     for (let k = 0; k < 4; k++) {
//     //         const name = "2k-2k-1-" + positionName + "-" + k + ".jpg"
//     //         var canvas = document.createElement('canvas');
//     //         canvas.width  = 2048;
//     //         canvas.height = 2048;
//     //         var ctx = canvas.getContext("2d");
//     //         var img = new Image();

//     //         img.onload = function () {

//     //             //    (img)
//     //             // // step 1 - resize to 50%
//     //             // var canvas = document.createElement('canvas'),
//     //             // ctx = canvas.getContext('2d');
//     //             // canvas.width = 4096;
//     //             // canvas.height = 2048;
                
//     //             // //                   source region         dest. region
//     //             // ctx.drawImage(img, 0, 0, 512, 512, 0, 0, 4096, 2048);

//     //             // imagesTiles[k] = img

//     //             // let textureCubeLoader = new THREE.CubeTextureLoader()
//     //             // let textureCube = textureCubeLoader.load([[0].src, imagesTiles[1].src, imagesTiles[2].src, imagesTiles[3].src, imagesTiles[4].src, imagesTiles[5].src])
//     //             // console.log(imagesTiles)
//     //             // structure.material.uniforms.skybox.value = textureCube
//     //             texture = img
//     //         }
//     //         img.src = "./data/tiles/" + currentSky.id + "/tiles/" + name
//     //         // console.log(img)
//     //         // imagesTiles.push(img)
//     //     }
//     // }


//     // const vs = `
//     // varying vec3 vTexCoord1;
//     //     varying vec3 vTexCoord2;
//     //     uniform vec3 objPosition1;
//     //     uniform vec3 objPosition2;
        
//     //     void main() {
//     //         vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
//     //         vTexCoord1 = position - objPosition1;
//     //         vTexCoord1.x = -vTexCoord1.x;
//     //         vTexCoord2 = position - objPosition2;
//     //         vTexCoord2.x = -vTexCoord2.x;
            
//     //         gl_Position = projectionMatrix * mvPosition;
//     //     }
//     //     `
//     //     const fs = `
//     //     uniform samplerCube skybox;	
//     //     uniform samplerCube skybox2;
//     //     varying vec3 vTexCoord1;
//     //     varying vec3 vTexCoord2;
//     //     uniform float alpha1;
//     //     uniform float alpha2;

//     //     void main() {
//     //         gl_FragColor = (textureCube(skybox, vTexCoord1.xyz) * alpha1) + (textureCube(skybox2, vTexCoord2.xyz) * alpha2);     
//     //     }
//     // `



//     const vs = `
//         void main() {
//             vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
//             gl_Position = projectionMatrix * mvPosition;
//         }
//         `
//         const fs = `
//         uniform sampler2D textures;	

//         void main() {
//             gl_FragColor = texture(textures, vec2(10.0, 1.0));     
//         }
//     `

//     var gl = renderer.getContext();
//     var position = new THREE.Vector2(0,0);

    
    
//     // const textureCubeLoader = new THREE.CubeTextureLoader()
//     // textureCubeLoader.setPath( "./data/tiles/" + currentSky.id + "/preview/")
//     // let textureCube = textureCubeLoader.load([ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ])
//     let texture = new THREE.TextureLoader().load("./data/tiles/" + currentSky.id + "/preview/px.jpg")
//     console.log(texture)

//     let material = new THREE.ShaderMaterial({
//         uniforms: {
//             textures: { value: texture },
//         },
//         vertexShader: vs,
//         fragmentShader: fs,
//         side: 0,
//         transparent: true,
//     });
//     material.format = THREE.RGBAFormat

//     let mesh = new THREE.Mesh(geometry, material)
//     return mesh
// }

// function CreateSkySpots(data) {
//     let group = new THREE.Group()

//     data.skySpots.forEach(skySpot => {
//         group.add(CreateSkySpot(skySpot))
//     })

//     return group
// }

// function CreateSkySpot(data) {
//     let group = new THREE.Group()
//     // let geometryOutter = new THREE.RingGeometry(.2, .19, 32)
//     // let materialOutter = new THREE.MeshBasicMaterial({
//     //     opacity: .8,
//     //     color: new THREE.Color(0xffffff),
//     //     side: 2,
//     //     transparent: true
//     // })

//     let geometryInner = new THREE.RingGeometry(.1825, .13, 32)
//     let materialInner = new THREE.MeshBasicMaterial({
//         opacity: .5,
//         color: new THREE.Color(0xffffff),
//         side: 2,
//         transparent: true
//     })

//     // group.add(new THREE.Mesh(geometryOutter, materialOutter))
//     group.add(new THREE.Mesh(geometryInner, materialInner))

//     group.userData = { 
//         id: data.id,
//         position: new THREE.Vector3(data.position.x, data.position.y, data.position.z)
//     }

//     console.log(data)
//     group.position.set(data.position.x, 0.1,  data.position.z)
//     group.rotation.set(Math.PI/2, 0, 0)

//     skySpots.push(group)
//     return group
// }

// function addEvents() {

//     if(device == "mobile" || device == "tablet") {
//         document.body.addEventListener('touchstart', onPointerDown)
//         document.addEventListener('touchmove', onPointerMove)
//     } else if(device == "desktop") {
//         document.addEventListener('pointermove', onPointerMove)
//         document.body.addEventListener('pointerdown', onPointerDown)
//         document.addEventListener('dragover', (event) => {
//             event.preventDefault()
//             event.dataTransfer.dropEffect = 'copy'
//         })
//         document.addEventListener('dragenter', () => document.body.style.opacity = 0.5 )
//         document.addEventListener('dragleave', () =>  document.body.style.opacity = 1)
    
//     }

//     window.addEventListener("resize", function () {
//         let width = window.innerWidth;
//         let height = window.innerHeight;
//         renderer.setSize(width, height);
//         camera.aspect = width / height;
//         camera.updateProjectionMatrix();
//     });
    
// }

// function onPointerDown( event ) {
//     if ( event.isPrimary === false ) return

//     isUserInteracting = true

//     if(device == "mobile" || device == "tablet") {
//         onTouchDownMouseX = event.changedTouches[0].clientX
//         onTouchDownMouseY = event.changedTouches[0].clientY
    
//         onTouchDownLon = lon
//         onTouchDownLat = lat
    
//     } else if(device == "desktop") {
//         onPointerDownMouseX = event.clientX
//         onPointerDownMouseY = event.clientY
    
//         onPointerDownLon = lon
//         onPointerDownLat = lat    
//     }

//     startCamRotation = {
//         x: lon,
//         y: lat
//     }

//     document.addEventListener('pointerup', onPointerUp)
//     document.addEventListener('touchend', onPointerUp)
// }

// function onPointerMove(event) {
//     if(device == "desktop") {
//         pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//         pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
//         raycaster.setFromCamera(pointer, camera)
//         let intersection = raycaster.intersectObject(structure)
//         if(intersection.length == 0) { return }
//         CursorManagment(intersection[0])

//         if ( event.isPrimary === false || !isUserInteracting) return

//         lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon
//         lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat

//     } else if(device == "mobile" || device == "tablet") {
//         touch.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 - 1;
//         touch.y = -(event.changedTouches[0].pageY / window.innerHeight) * 2 + 1;

//         if ( event.isPrimary === false || !isUserInteracting) return
//         lon = ( onTouchDownMouseX - event.touches[0].clientX ) * 0.1 + onTouchDownLon
//         lat = ( event.touches[0].clientY - onTouchDownMouseY ) * 0.1 + onTouchDownLat
//     }

    


// }

// function onPointerUp(event) {
//     if ( event.isPrimary === false ) return

//     isUserInteracting = false

//     let userClick = CheckIfUserClick()
//     if (userClick) {
//         HandleRaycasterIntersection()
//     }

//     document.removeEventListener( 'pointerup', onPointerUp )
// }

// function CheckIfUserClick() {
//     return startCamRotation.x == lon && startCamRotation.y == lat
// }

// function render(t) {
//     requestAnimationFrame(render)
//     TWEEN.update(t)

//     lat = Math.max( - 85, Math.min( 85, lat ) )
//     phi = THREE.MathUtils.degToRad( 90 - lat )
//     theta = THREE.MathUtils.degToRad( lon )

//     const x = 500 * Math.sin( phi ) * Math.cos( theta )
//     const y = 500 * Math.cos( phi )
//     const z = 500 * Math.sin( phi ) * Math.sin( theta )
//     camera.lookAt( x, y, z );

//     renderer.render(scene, camera)  
// }

























const Init = async () => {
    const results = await fetch("./data/data.json")
    const data = await results.json()
    document.readyState !== 'loading'
        ? InitCode(data)
        : document.addEventListener('DOMContentLoaded', InitCode(data))
}

Init()

const InitCode = async (data) => {
    await CreateScene(data)
}

const CreateScene = async (data) => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    if (device == "mobile" || device == "tablet") render.antialias = false
        
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.body.style.touchAction = 'none';

    if (device == "desktop") {
        cursor = CreateVisualCursor()
        scene.add(cursor)
    }

    structure = await CreateStructure(data)
    structure.renderOrder = 2
    scene.add(structure)

    skySpots = CreateSkySpots(data)
    scene.add(skySpots)
    camera.position.set(currentSky.position.x, currentSky.position.y, currentSky.position.z)

    hotSpots = CreateHotSpots(data)
    scene.add(hotSpots)

    scene.add(new THREE.AmbientLight(0xffffff))

    createSky()

    render()
    addEvents() 
    loading = false
}

const CreateVisualCursor = () => {

    let geometryInner = new THREE.RingGeometry(.1825, .13, 32)
    let materialInner = new THREE.MeshLambertMaterial({
        opacity: .5,
        color: new THREE.Color(0xffffff),
        side: 2,
        transparent: true
    })

    let group = new THREE.Group()
    let mesh = new THREE.Mesh(geometryInner, materialInner)
    mesh.renderOrder = 3
    group.add(mesh)

    return group
}

const CreateStructure = async (data) => {
    const modelLoader = new THREE.GLTFLoader()
    const gltf = await modelLoader.loadAsync("./data/model.glb")
    var geometry = gltf.scene.children[gltf.scene.children.length-1].geometry

    const textureLoader = new THREE.CubeTextureLoader()
    currentSky = data.skySpots.find((skySpot) => skySpot.current)
    currentSky = {
        id: currentSky.id,
        position: new THREE.Vector3(currentSky.position.x, currentSky.position.y, currentSky.position.z)
    }

    textureLoader.setPath( "./data/tiles/" + currentSky.id + "/")
    const textureCube = await textureLoader.loadAsync( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] )
    const vs = `
        varying vec3 vTexCoord1;
        varying vec3 vTexCoord2;
        uniform vec3 objPosition1;
        uniform vec3 objPosition2;

        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
            vTexCoord1 = position - objPosition1;
            vTexCoord1.x = -vTexCoord1.x;
            vTexCoord2 = position - objPosition2;
            vTexCoord2.x = -vTexCoord2.x;
            
            gl_Position = projectionMatrix * mvPosition;
        }
    `
    const fs = `
        uniform samplerCube skybox;	
        uniform samplerCube skybox2;
        varying vec3 vTexCoord1;
        varying vec3 vTexCoord2;
        uniform float alpha1;
        uniform float alpha2;

        void main() {
            gl_FragColor = (textureCube(skybox, vTexCoord1.xyz) * alpha1) + (textureCube(skybox2, vTexCoord2.xyz) * alpha2);     
        }
    `

    let material = new THREE.ShaderMaterial({
        uniforms: {
            skybox: { value: textureCube },
            skybox2: { value: textureCube },
            objPosition1: { value: currentSky.position},
            objPosition2: { value: currentSky.position},
            alpha1: { value: 0.0 },
            alpha2: { value: 0.0 }
        },
        vertexShader: vs,
        fragmentShader: fs,
        side: 0,
        transparent: true,
    });
    material.format = THREE.RGBAFormat

    let mesh = new THREE.Mesh(geometry, material)
    return mesh
}

function CreateSkySpots(data) {
    let group = new THREE.Group()

    data.skySpots.forEach(skySpot => {
        group.add(CreateSkySpot(skySpot))
    })

    return group
}

function CreateSkySpot(skySpot) {
    let group = new THREE.Group()

    let geometryInner = new THREE.RingGeometry(.1825, .13, 32)
    let materialInner = new THREE.MeshBasicMaterial({
        opacity: .5,
        color: new THREE.Color(0xffffff),
        side: 0,
        transparent: true
    })

    // group.add(new THREE.Mesh(geometryOutter, materialOutter))
    let mesh = new THREE.Mesh(geometryInner, materialInner)
    mesh.renderOrder = 3
    group.add(mesh)

    group.userData = { 
        id: skySpot.id,
        position: new THREE.Vector3(skySpot.position.x, skySpot.position.y, skySpot.position.z)
    }

    group.position.set(skySpot.position.x, 0.1,  skySpot.position.z)
    group.rotation.set(Math.PI/2, 0, 0)

    return group
}

function CreateHotSpots(data) {
    let group = new THREE.Group()

    data.hotSpots.forEach(hotSpot => {
        group.add(CreateHotSpot(hotSpot))
    })

    return group
}

function CreateHotSpot(hotSpot) {
    const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: .99, transparent: true } );

    const points = [];
    points.push(new THREE.Vector3(hotSpot.startPosition.x, hotSpot.startPosition.y, hotSpot.startPosition.z))
    points.push(new THREE.Vector3(hotSpot.endPosition.x, hotSpot.endPosition.y, hotSpot.endPosition.z))
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.renderOrder = 3
    scene.add(line)

    let circleGroup = new THREE.Group()
    circleGroup.userData = {
        title: hotSpot.title,
        description: hotSpot.description,
        image: hotSpot.image
    }

    
    let geometryColoredRing = new THREE.RingGeometry(.04, .08, 32)
    let materialColoredRing = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xb50070),
        transparent: true,
        opacity: .99
    })

    let coloredRing = new THREE.Mesh(geometryColoredRing, materialColoredRing)
    coloredRing.renderOrder = 5
    // let geometryInnerRing = new THREE.RingGeometry(.00, .04, 32)
    // let materialInnerRing = new THREE.MeshBasicMaterial({
    //     color: new THREE.Color(0xffffff),
    //     transparent: true,
    //     opacity: .99
    // })
    // let InnerRing = new THREE.Mesh(geometryInnerRing, materialInnerRing)

    let geometryOuterRing = new THREE.CircleGeometry(.1, 32)
    let materialOuterRing = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        transparent: true,
        opacity: .99
    })
    let WhiteBackground = new THREE.Mesh(geometryOuterRing, materialOuterRing)
    WhiteBackground.position.z = -0.01

    circleGroup.add(coloredRing)
    //circleGroup.add(InnerRing)
    circleGroup.add(WhiteBackground)
    circleGroup.position.set(hotSpot.endPosition.x, hotSpot.endPosition.y, hotSpot.endPosition.z)
    circleGroup.renderOrder = 3

    return circleGroup
}




function addEvents() {

    let canvas = document.querySelector("canvas")
    if(device == "mobile" || device == "tablet") {
        canvas.addEventListener('touchstart', onPointerDown)
        canvas.addEventListener('touchmove', onPointerMove)
        canvas.addEventListener('touchend', onPointerUp)
    } else if(device == "desktop") {
        canvas.addEventListener('pointermove', onPointerMove)
        canvas.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('pointerup', onPointerUp)

    }

    window.addEventListener("resize", function () {
        let width = window.innerWidth
        let height = window.innerHeight
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    })

    canvas.addEventListener("wheel", event => {
        isUserZooming = true
        let amount = Math.sign(event.deltaY) * 5
        let adjust = amount + camera.fov
        if (adjust < minFov) { adjust = minFov }
        if (adjust > maxFov) { adjust = maxFov }
        camera.fov = adjust
        camera.updateProjectionMatrix()
    })
    
}

function onPointerDown( event ) {
    if ( event.isPrimary === false ) return

    if(cameraIntertiaTween) {
        cameraIntertiaTween.stop()
        isCameraMovingByIntertia = false
    }

    isUserInteracting = true

    if(device == "mobile" || device == "tablet") {

        touch.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 - 1;
        touch.y = -(event.changedTouches[0].pageY / window.innerHeight) * 2 + 1; 

        if (event.touches.length === 2) {
            pinchStart(event)
            return
        }

        onTouchDownMouseX = event.changedTouches[0].clientX
        onTouchDownMouseY = event.changedTouches[0].clientY
    
        onTouchDownLon = lon
        onTouchDownLat = lat

    } else if(device == "desktop") {
        onPointerDownMouseX = event.clientX
        onPointerDownMouseY = event.clientY
    
        onPointerDownLon = lon
        onPointerDownLat = lat    
    }

    startCamRotation = {
        x: lon,
        y: lat
    }

    cameraRotation = {
        lon: lon,
        lat: lat
    }
    time = Date.now()

    // if(cameraAnimating) {
    //     cameraContainer.emit("pause-anim")
    //     cameraAnimating = false
    //     clearTimeout(myTimeOut)
    // }

    
}

function onPointerMove(event) {

    let rotationSpeed = camera.fov/800

    if(device == "desktop") {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(pointer, camera)
        let structureIntersection = raycaster.intersectObject(structure)
        let hotSpotIntersection = raycaster.intersectObjects(hotSpots.children)
        if(structureIntersection.length == 0 && hotSpotIntersection.length == 0) { return }

        if(hotSpotIntersection.length > 0) {
            if(hotSpotIntersection[0].object.parent) {
                ShowPanelInfo(hotSpotIntersection[0].object.parent)
            }           
        } else if(currentShowedHotSpot && !hotSpotIsClicked && !isUserOverModal) {
            HidePanelInfo()
        }
        //Mover a render!!!!!
        
        CursorManagment(structureIntersection[0])

        if ( event.isPrimary === false || !isUserInteracting) return

        lon = ( onPointerDownMouseX - event.clientX ) * rotationSpeed + onPointerDownLon
        lat = ( event.clientY - onPointerDownMouseY ) * rotationSpeed + onPointerDownLat

    } else if(device == "mobile" || device == "tablet") {

        touch.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 - 1;
        touch.y = -(event.changedTouches[0].pageY / window.innerHeight) * 2 + 1;

        if (event.touches.length === 2) {
            pinchMove(event)
            return
        }
        
        if ( event.isPrimary === false || !isUserInteracting) return
        lon = ( onTouchDownMouseX - event.touches[0].clientX ) * rotationSpeed + onTouchDownLon
        lat = ( event.touches[0].clientY - onTouchDownMouseY ) * rotationSpeed + onTouchDownLat
    }
}

function onPointerUp(event) {
    isUserInteracting = false
    if(isUserOverModal) { return }

    if(deltaRotation.lon != 0 || deltaRotation.lat !=0) {
        cameraIntertiaTween = new TWEEN.Tween({ 
            lon: lon, 
            lat: lat
        })
        .onStart( () => {
            isCameraMovingByIntertia = true
        })
        .to({ 
            lon: lon + 120*deltaRotation.lon/deltaTime, 
            lat: lat + 120*deltaRotation.lat/deltaTime, 
        }, 1500)
        .onUpdate((coords) => {
            lon = coords.lon
            lat = coords.lat
        })
        .easing(TWEEN.Easing.Quintic.Out)
        .onComplete(() => {
            isCameraMovingByIntertia = false
        })
        cameraIntertiaTween.start()
    }

    if(event.isPrimary === false) return

    if((device == "mobile" || device == "tablet")) {
        let finishZoomig = event.touches.length === 0
        
        if(zoomingOnMobile && finishZoomig) {
            zoomingOnMobile = false
            return
        } 
        if(zoomingOnMobile) {
            return
        }
    }

    let userClick = CheckIfUserClick()
    if (userClick) {
        HandleRaycasterIntersection()
    }
}

function CheckIfUserClick() {
    return startCamRotation.x == lon && startCamRotation.y == lat
}

function render(t) {
    requestAnimationFrame(render)
    TWEEN.update(t)

    lat = Math.max( - 85, Math.min( 85, lat ) )
    phi = THREE.MathUtils.degToRad( 90 - lat )
    theta = THREE.MathUtils.degToRad( lon )

    const x = 500 * Math.sin( phi ) * Math.cos( theta )
    const y = 500 * Math.cos( phi )
    const z = 500 * Math.sin( phi ) * Math.sin( theta )
    camera.lookAt( x, y, z );


    if(isUserInteracting) {
        if(time < Date.now()-10) {            
            let newTime = Date.now()
            let newRotation = {
                lon: lon, 
                lat: lat,
            }
            deltaRotation = {
                lon: lon - cameraRotation.lon,
                lat: lat - cameraRotation.lat
            }
            deltaTime = newTime - time 
            cameraRotation = newRotation
            time = newTime
        }
    }

    let hasToLoadTiles = ((deltaRotation.lon != 0 || deltaRotation.lat != 0) && isUserInteracting) || isUserZooming || isCameraMovingByIntertia
    if(hasToLoadTiles) {
        if(isUserZooming) { isUserZooming = false }
        LoadTiles()
    }

    if(hotSpots) {
        for (let i = 0; i < hotSpots.children.length; i++) {
            const hotSpot = hotSpots.children[i];
            hotSpot.lookAt(camera.position)
        }
    }

    if(currentShowedHotSpot) {
        MovePanel(currentShowedHotSpot)
    }
    

    renderer.render(scene, camera) 
}

function createSky() {
    sky = new THREE.Group();

    const textureLoader = new THREE.TextureLoader()
    let meshCount = 0

    let urls = ["px", "nx", "py", "ny", "pz", "nz"];
    let panelData = [
        {
            position: new THREE.Vector3(0, 0, -200),
            rotation: new THREE.Vector3(0, Math.PI, 0)
        },
        {
            position: new THREE.Vector3(0, 0, 200),
            rotation: new THREE.Vector3(0, 0, 0)
        },
        {
            position: new THREE.Vector3(0, 200, 0),
            rotation: new THREE.Vector3(-Math.PI/2, 0, Math.PI/2)
        },
        {
            position: new THREE.Vector3(0, -200, 0),
            rotation: new THREE.Vector3(Math.PI/2, 0, -Math.PI/2)
        }
        ,
        {
            position: new THREE.Vector3(200, 0, 0),
            rotation: new THREE.Vector3(0, Math.PI/2, 0)
        }
        ,
        {
            position: new THREE.Vector3(-200, 0, 0),
            rotation: new THREE.Vector3(0, -Math.PI/2, 0)
        }
    ]

    panelPositions = [
        new THREE.Vector3(-100, 100, 0),
        new THREE.Vector3(100, 100, 0),
        new THREE.Vector3(-100, -100, 0),
        new THREE.Vector3(100, -100, 0),
    ]

    for (let i = 0; i < 6; i++) {
        const panelGroup = new THREE.Group()

        const panelMaterial = new THREE.MeshStandardMaterial( { visible: false } )

        panelGroup.rotation.x = panelData[i].rotation.x
        panelGroup.rotation.y = panelData[i].rotation.y
        panelGroup.rotation.z = panelData[i].rotation.z

        panelGroup.position.x = panelData[i].position.x
        panelGroup.position.y = panelData[i].position.y
        panelGroup.position.z = panelData[i].position.z

        for (let k = 0; k < 4; k++) {
            const tileGeometry = new THREE.PlaneGeometry(200, 200)
            const tileMaterial = new THREE.MeshPhongMaterial({
                side: 1,
                opacity: 1,
                transparent: true,
                map: new THREE.TextureLoader().load("./data/tiles/tiles/1k-" + currentSky.id + "-" + urls[i] + "-" + k + ".jpg")
            })
            const tile = new THREE.Mesh(tileGeometry, tileMaterial)
            tile.position.set(panelPositions[k].x, panelPositions[k].y, panelPositions[k].z)
            panelGroup.add(tile)
        }

        sky.add(panelGroup)
        meshCount++

        if(meshCount == 6) {
            
            sky.scale.x = -1
            sky.position.y = 1.6
            sky.rotation.y = Math.PI/2
            scene.add(sky)
        }
        
    }
}