var helpers = {
    generateRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateRandomFloat: function (min, max) {
        return Math.random() * (max - min ) + min;
    },
    uploadDataUrl: function (blob, filename) {
        //http://blog.teamtreehouse.com/uploading-files-ajax

        var xhr = new XMLHttpRequest();

        // Open the connection.
        xhr.open('POST', 'saveimage', true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                // File(s) uploaded.
                console.log('uploadReady')
            } else {
                alert('An error occurred!');
            }
        };

        xhr.send(blob);
    },
    resizeHandler: function(camera, renderer) {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
    },
    onMouseMove: function (event, cameraMan) {
        if ( shared.controls.mouse === false ) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        cameraMan.rotation.y -= movementX * 0.006;
        cameraMan.rotation.x -= movementY * 0.006;

    },
    pointerLockHandler: function ( event, element ) {

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();

    },
    onPointerLockChange: function ( event, element ) {

        var $instructionsWrapper = document.getElementById('instructions-wrapper');
        var $controls = document.getElementById('controls');

        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ){
            shared.controls.mouse = true;

            shared.composer = helpers.createComposer(false);

            $instructionsWrapper.className = 'animated fadeOut';
            $controls.className = 'animated fadeOut';
        }
        else{
            shared.controls.mouse = false;

            shared.composer = helpers.createComposer(true);

            $instructionsWrapper.className = 'animated fadeIn';
            $controls.className = 'animated fadeIn';
        }

    },
    createComposer: function (blur){

        var composer = new THREE.EffectComposer(shared.renderer);
        composer.addPass(shared.shader.renderPass);

        if(blur){
            composer.addPass(shared.shader.hblur);
            composer.addPass(shared.shader.vblur);
        }

        composer.addPass(shared.shader.copyPass);

        return composer;

    }

};