<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="." />
        <meta name="keywords" content="" />

        <link rel="icon" type="image/png" href="icons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="icons/favicon.svg" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
        <link rel="manifest" href="icons/site.webmanifest" />
        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/main.css" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <script src="//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="js/vendor/mobile-detect.js"></script>
        <script src="js/vendor/createjs.min.js"></script>
        <script src="js/vendor/TweenMax.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/canvas.js"></script>
        <script src="js/game.js"></script>
        <script src="js/sound.js"></script>
        <script src="js/mobile.js"></script>
        <script src="js/main.js"></script>
        <script src="js/loader.js"></script>
        <script src="js/init.js"></script>
    </body>
</html>
