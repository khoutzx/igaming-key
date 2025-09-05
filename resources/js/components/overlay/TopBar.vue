<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        idLabel?: string;
        balance?: string;
        soundOn?: boolean;
    }>(),
    {
        idLabel: 'ID: —',
        balance: 'R$ 0,00',
        soundOn: true,
    },
);

const emit = defineEmits<{
    (e: 'click:profile'): void;
    (e: 'toggle:sound', next: boolean): void;
}>();

function toggleSound() {
    emit('toggle:sound', !props.soundOn);
}
</script>

<template>
    <div class="pointer-events-auto absolute top-0 right-0 left-0 h-16 w-full border-b border-white/20 bg-black/60 backdrop-blur-md">
        <div class="flex h-full w-full items-center justify-between px-3 sm:px-4">
            <!-- perfil/saldo -->
            <div class="flex items-center gap-3 text-white">
                <div class="grid h-10 w-10 place-items-center rounded-full bg-white/10">👤</div>
                <div class="leading-tight">
                    <div class="text-[11px] tracking-wide uppercase opacity-75">{{ idLabel }}</div>
                    <div class="font-bold text-yellow-300">{{ balance }}</div>
                </div>
            </div>

            <!-- som -->
            <button class="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1 text-white" @click="toggleSound">
                <span class="text-sm">{{ soundOn ? 'Som ativado' : 'Som mutado' }}</span>
                <span class="text-lg">{{ soundOn ? '🔊' : '🔇' }}</span>
            </button>
        </div>
    </div>
</template>
