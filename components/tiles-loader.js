const LoadTiles = () => {
    console.log("loading tiles")
    for (let i = 0; i < sky.children.length; i++) {
        const side = sky.children[i];
        for (let k = 0; k < side.children.length; k++) {
            const tile = side.children[k];            
            let hasToBeRenderer = CheckIfHasToBeRender(tile)

            if (hasToBeRenderer) {
                let imgSrc

                if (camera.fov >= 60) {
                    imgSrc = "./data/tiles/tiles/1k-" + currentSky.id + "-" + imagesName[i] + "-" + k + ".jpg"
                } else if (camera.fov < 60 && camera.fov >= 40) {
                    imgSrc = "./data/tiles/tiles/2k-" + currentSky.id + "-" + imagesName[i] + "-" + k + ".jpg"
                } else if(camera.fov < 40) {
                    imgSrc = "./data/tiles/tiles/4k-" + currentSky.id + "-" + imagesName[i] + "-" + k + ".jpg"
                } 

                let isAlreadyLoaded = CheckIfTileIsLoaded(imgSrc)
                if (!isAlreadyLoaded) {
                    let img = new Image()
                    img.onload = () => {
                        THREE.Cache.add(imgSrc, img)
                        let loader = new THREE.TextureLoader()
                        loader.load(imgSrc, (texture) => {
                            tile.material.map = texture
                            tile.material.opacity = 1
                            tile.material.map.needsUpdate = true
                        })
                    }

                    img.src = imgSrc
                }
                loadedTiles.push(imgSrc)
            }
        }
    }
}

function loadLowQualityTiles() {

    console.log("loading low quality tiles")
    for (let i = 0; i < sky.children.length; i++) {
        const side = sky.children[i];
        for (let k = 0; k < side.children.length; k++) {
            const tile = side.children[k];
            
            let imgSrc = "./data/tiles/tiles/" + currentSky.id + "-" + imagesName[i] + "-" + k + ".jpg"

            let img = new Image()
            img.onload = () => {
                // THREE.Cache.add(imgSrc, img)
                
                let loader = new THREE.TextureLoader()
                loader.load(imgSrc, (texture) => {
                    tile.material.map = texture
                    tile.material.opacity = 1
                    tile.material.map.needsUpdate = true
                })
            }
            img.src = imgSrc
        }
    }
}

const CheckIfHasToBeRender = (tile) => {
    camera.updateMatrix()
    camera.updateMatrixWorld()

    var frustum = new THREE.Frustum();
    frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse))
    
    let intersection = frustum.intersectsObject(tile)
    return intersection
}


const CheckIfTileIsLoaded = (imgSrc) => {
    return loadedTiles.includes(imgSrc)
}