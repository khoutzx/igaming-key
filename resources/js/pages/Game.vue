<script setup lang="ts">
import Overlay from '@/components/overlay/Overlay.vue';
</script>

<template>
    <div id="mainLoader">0</div>
    <div id="mainHolder">
        <div id="notSupportHolder">
            <div class="notSupport">YOUR BROWSER ISN'T SUPPORTED.<br />PLEASE UPDATE YOUR BROWSER IN ORDER TO RUN THE GAME</div>
        </div>

        <div id="rotateHolder">
            <div class="mobileRotate">
                <div class="rotateImg"><img src="assets/rotate.png" /></div>
                <div class="rotateDesc">Rotate your device <br />to portrait</div>
            </div>
        </div>

        <div id="canvasHolder">
            <canvas id="gameCanvas" width="768" height="1024"></canvas>
            <Overlay />
        </div>
    </div>
</template>
