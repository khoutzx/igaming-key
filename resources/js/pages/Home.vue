<script setup lang="ts"></script>

<template>
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

            <div id="canvasHolder">
                <canvas id="gameCanvas" width="768" height="1024"></canvas>
            </div>
        </div>
    </body>
</template>
