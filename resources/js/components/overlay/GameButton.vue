<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = withDefaults(
    defineProps<{
        icon?: string;
        size?: 'sm' | 'md' | 'lg'; // lado do quadrado
        class?: string; // classes extras
    }>(),
    {
        icon: '⚙️',
        size: 'md',
        class: '',
    },
);

const { icon } = toRefs(props);

// Sempre quadrado: define pela largura + aspect-square
const widthClass = computed(
    () =>
        ({
            sm: 'w-14', // 56px
            md: 'w-16', // 64px
            lg: 'w-20', // 80px
        })[props.size] ?? 'w-16',
);

// Tamanho do ícone por tamanho do botão
const iconSizeClass = computed(() => (props.size === 'lg' ? 'text-3xl' : props.size === 'sm' ? 'text-xl' : 'text-2xl'));
</script>

<template>
    <button
        class="group pointer-events-auto relative cursor-pointer transition-transform outline-none select-none active:scale-[.99]"
        :class="[widthClass, 'aspect-square', props.class]"
    >
        <!-- borda externa/ombra -->
        <span class="absolute inset-0 rounded-2xl bg-black/40 shadow-[inset_0_0_0_2px_rgba(0,0,0,0.4)]"></span>

        <!-- bezel (moldura) -->
        <span
            class="absolute inset-1 rounded-2xl bg-[#2c2f45] shadow-[0_8px_0_#121426,0_10px_18px_rgba(0,0,0,.6)] transition-shadow group-active:shadow-[0_3px_0_#121426,0_6px_10px_rgba(0,0,0,.6)]"
        ></span>

        <!-- face -->
        <span class="absolute inset-2 rounded-2xl bg-gradient-to-b from-gray-300 to-gray-500 shadow-inner"></span>

        <!-- brilho superior -->
        <span class="absolute top-3 right-3 left-3 h-2 rounded-full bg-white/45 opacity-80 blur-[2px]"></span>

        <!-- conteúdo -->
        <span class="relative z-10 flex h-full w-full items-center justify-center text-white">
            <span class="drop-shadow-[0_1px_0_rgba(0,0,0,.6)]" :class="iconSizeClass">
                {{ icon }}
            </span>
        </span>
    </button>
</template>
