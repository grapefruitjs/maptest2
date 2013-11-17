define(['vendor/gf'], function(gf) {
    function _setup(game, progress, complete) {
        if(progress)
            game.load.on('progress', progress);

        game.load.once('complete', function() {
            if(progress)
                game.load.off('progress', progress);

            if(complete)
                complete();
        });
    }

    var resources = {
        /**
         * Items required for the preloader to display
         */
        preload: function(game, progress, complete) {
            if(complete)
                complete();
        },
        /**
         * Items required for the initial startup of the game
         */
        startup: function(game, progress, complete) {
            _setup(game, progress, complete);

            resources.worlds.forEach(function(w) {
                game.load.tilemap(w, w, null, gf.FILE_FORMAT.JSON);
            });

            game.load.start();
        },
        worlds: [
            /*'assets/maps/5x5Object.json',
            'assets/maps/drawObjects.json',
            'assets/maps/Isometric_32x16_nooffset.json',
            'assets/maps/Isometric_32x16_with_offset_x.json',
            'assets/maps/Isometric_32x16_with_offset_x_y_even.json',
            'assets/maps/Isometric_32x16_with_offset_x_y_odd.json',
            'assets/maps/Isometric_64_32_with_offset_y.json',
            'assets/maps/Isometric_64_32_with_offset_y_evensize.json',
            'assets/maps/isometric_grass_and_water.json',
            'assets/maps/isometricBlocks.json',
            'assets/maps/Large_isometricBlocks.json',
            'assets/maps/Large_isometricBlocks_wObject.json',*/
            'assets/maps/Ortho_1_32__32.json',
            'assets/maps/Ortho_1_32__32_objects.json',
            'assets/maps/darkworld.json'
        ]
    };

    return resources;
});