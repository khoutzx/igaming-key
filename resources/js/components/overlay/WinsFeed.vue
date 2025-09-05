<script setup lang="ts">
type FeedItem = { user: string; text: string };
const props = withDefaults(
    defineProps<{
        title?: string;
        session?: string;
        items: FeedItem[];
        topClass?: string;
        widthClass?: string;
    }>(),
    {
        title: 'Jogo',
        session: 'Sessão: —',
        topClass: 'top-20 sm:top-[88px]',
        widthClass: 'w-[58%] max-w-[360px]',
    },
);
</script>

<template>
    <div :class="['pointer-events-auto absolute left-3 space-y-2 sm:left-4', topClass, widthClass]">
        <div class="flex items-center justify-between px-1 text-sm text-white/90">
            <span class="font-semibold">{{ title }}</span>
            <span class="opacity-80">{{ session }}</span>
        </div>

        <!-- primeiros itens (até 3) -->
        <template v-for="(it, idx) in items.slice(0, 3)" :key="'top-' + idx">
            <div class="rounded-2xl border border-white/15 bg-black/55 px-3 py-2 text-white shadow">
                <span class="font-bold text-yellow-300">{{ it.user }}</span>
                <span class="ml-2">{{ it.text }}</span>
            </div>
        </template>

        <!-- lista rolável dos restantes -->
        <div class="max-h-60 space-y-2 overflow-y-auto pr-1" v-if="items.length > 3">
            <div
                v-for="(it, idx) in items.slice(3)"
                :key="'rest-' + idx"
                class="rounded-2xl border border-white/15 bg-black/55 px-3 py-2 text-white shadow"
            >
                <span class="font-bold text-yellow-300">{{ it.user }}</span>
                <span class="ml-2">{{ it.text }}</span>
            </div>
        </div>
    </div>
</template>
