<template>
    <OverlayRoot>
        <TopBar id-label="ID: 498" balance="R$ 49,00" :sound-on="true" @click:profile="onProfile" @toggle:sound="onToggleSound" />
        <RightRail
            :buttons="[
                { id: 'ref', icon: '🪙' },
                { id: 'social', icon: '👥' },
                { id: 'support', icon: '❓' },
            ]"
            @select="onRightSelect"
        />
        <WinsFeed title="Esquilo Mania" session="Sessão: 0m 05s" :items="feedItems" />
    </OverlayRoot>
</template>

<script setup lang="ts">
const feedItems = [
    { user: '****872', text: 'Uau, que sorte!' },
    { user: '****720', text: 'Finalmente um prêmio bom!' },
    { user: '****535', text: 'Ganhou BRL500,00' },
    { user: '****850', text: 'Mais um dia de sorte.' },
    { user: '****661', text: 'Mais um dia de sorte.' },
];

function onProfile() {
    /* abre perfil */
}
function onToggleSound(next: boolean) {
    /* muta/desmuta */
}
function onRightSelect(id: string) {
    if (id === 'ref') {
        /* ... */
    }
    if (id === 'social') {
        /* ... */
    }
    if (id === 'support') {
        /* ... */
    }
}
</script>
