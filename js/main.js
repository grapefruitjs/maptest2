require([
    'vendor/gf', //NOTE: This expects gf.js to be in the `js/vendors` folder
    'resources'
], function(gf, resources) {
    var $game,
        game,
        txtLoading;

    function runGame() {
        // When this function runs, all resources in data/resources.js#startup() will
        // have been loaded. This is where you can:
        // - Create custom game states
        // - Bind user keys
        // - Use any resources you loaded
        // - Run your game!

        //gf.debug.show(window.GAME = game);

        var $sw = $('#switch'),
            $fullscreen = $('#fullscreen');

        //create a game state for each of the worlds
        resources.worlds.forEach(function(w) {
            var state = game.state.add(w),
                tilemap = state.world.add.tilemap(w);

            tilemap.spawnObjects();

            state.world.interactive = true;
            state.world.mousedown = mapDown;
            state.world.mouseup = mapUp;
            state.world.mousemove = mapMove;

            //for interactive maps
            //state.world.on('tile.mousedown', tileDown);
            //state.world.on('tile.mouseup', tileUp);

            //state.world.on('object.mousedown', objDown);
            //state.world.on('object.mouseup', objUp);

            $('<option/>', {
                value: w,
                text: w.substring(w.lastIndexOf('/') + 1).replace('.json', '') //get the filename with no extension
            }).appendTo($sw);
        });
        game.state.enable(resources.worlds[0]);

        $sw.on('change', function() {
            game.state.enable($sw.find(':selected').val());
        });

        $fullscreen.on('click', function() {
            game.requestFullscreen();
        });

        //hide loading text
        txtLoading.visible = false;
    }

    function mapDown(e) {
        this.drag = e.getLocalPosition(this.parent);
    }

    function mapUp() {
        this.drag = null;
    }

    function mapMove(e) {
        if(this.drag) {

            var pos = e.getLocalPosition(this.parent),
                dx = (pos.x - this.drag.x),
                dy = (pos.y - this.drag.y);

            //tile.layer.map.pan(dx, dy);
            this.pan(dx, dy);

            this.drag = pos;
        }
    }

    /*function tileDown(e) {
        e.tile.alpha = 0.5;
    }

    function tileUp(e) {
        e.tile.alpha = 1.0;
    }

    function objDown(e) {
        e.object.alpha = 0.5;
    }

    function objUp(e) {
        e.object.alpha = 1.0;
    }*/

    //updates the loading progress on the screen
    function loadProgress(val) {
        txtLoading.setText('Loading: ' + val + '%');
    }

    //is called when preload resources are ready, this will start loading startup resources
    function startup() {
        //setup loading text.
        txtLoading = new gf.Text('Loading: 0%');
        txtLoading.position.x = 225;
        txtLoading.position.y = 300;
        game.camera.add.obj(txtLoading);

        //load startup resources
        resources.startup(game, loadProgress, runGame);
    }

    //when DOM is ready, create the game instance and start loading stuffz
    $(function() {
        $game = $('#game');

        //set the default scale mode to nearest so all our textures scale pixely
        gf.Texture.SCALE_MODE.DEFAULT = gf.Texture.SCALE_MODE.NEAREST;

        //create game instance
        game = new gf.Game('game', {
            width: $game.width(),
            height: $game.height(),
            transparent: false,
            background: '#000',
            antialias: true,
            renderer: gf.RENDERER.AUTO
        });

        //start loading necessary preload files
        resources.preload(game, null, startup);

        //start render loop
        game.render();
    });
});
