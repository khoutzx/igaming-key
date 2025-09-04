<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Welcome">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <title>Push Me Out</title>

        <!-- SEO Meta -->
        <meta
            name="description"
            content="Push Me Out is a HTML5 game, a prize vending game machine where you have to move the push rod under the gift within limited time."
        />
        <meta
            name="keywords"
            content="html5 game, arcade game, prize vending, push rod game, redemption game, gift machine, claw machine, push and pull, prize game, toy vending, arcade prize, time challenge, gift grab, arcade redemption"
        />
        <meta name="author" content="demonisblack" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://demonisblack.com/code/2016/pushmeout/game/" />
        <meta property="og:title" content="Push Me Out" />
        <meta
            property="og:description"
            content="Push Me Out is a HTML5 game, a prize vending game machine where you have to move the push rod under the gift within limited time."
        />
        <meta property="og:image" content="https://demonisblack.com/code/2016/pushmeout/game/share.jpg" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://demonisblack.com/code/2016/pushmeout/game/" />
        <meta name="twitter:title" content="Push Me Out" />
        <meta
            name="twitter:description"
            content="Push Me Out is a HTML5 game, a prize vending game machine where you have to move the push rod under the gift within limited time."
        />
        <meta name="twitter:image" content="https://demonisblack.com/code/2016/pushmeout/game/share.jpg" />

        <meta name="application-name" content="Push Me Out" />
        <meta name="author" content="demonisblack" />

        <!-- Favicons -->
        <link rel="icon" type="image/png" href="icons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="icons/favicon.svg" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
        <link rel="manifest" href="icons/site.webmanifest" />

        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/main.css" />
    </Head>
    <body>
        <!-- PERCENT LOADER START-->
        <div id="mainLoader">0</div>
        <!-- PERCENT LOADER END-->

        <!-- CONTENT START-->
        <div id="mainHolder">
            <!-- BROWSER NOT SUPPORT START-->
            <div id="notSupportHolder">
                <div class="notSupport">YOUR BROWSER ISN'T SUPPORTED.<br />PLEASE UPDATE YOUR BROWSER IN ORDER TO RUN THE GAME</div>
            </div>
            <!-- BROWSER NOT SUPPORT END-->

            <!-- ROTATE INSTRUCTION START-->
            <div id="rotateHolder">
                <div class="mobileRotate">
                    <div class="rotateImg"><img src="assets/rotate.png" /></div>
                    <div class="rotateDesc">Rotate your device <br />to portrait</div>
                </div>
            </div>
            <!-- ROTATE INSTRUCTION END-->

            <!-- CANVAS START-->
            <div id="canvasHolder">
                <canvas id="gameCanvas" width="768" height="1024"></canvas>
            </div>
            <!-- CANVAS END-->
        </div>
    </body>
</template>
