<script setup lang="ts">
type RailBtn = { id: string; icon?: string; labels: string[] };

const props = withDefaults(
    defineProps<{
        buttons: RailBtn[];
        topClass?: string;
    }>(),
    { topClass: 'top-20 sm:top-[88px]' },
);

const emit = defineEmits<{ (e: 'select', id: string): void }>();
</script>

<template>
    <div :class="['pointer-events-none absolute right-3 flex flex-col items-end gap-3 sm:right-4', props.topClass]">
        <GameButton
            v-for="b in props.buttons"
            :key="b.id"
            :icon="b.icon ?? '⭐'"
            :labels="b.labels"
            size="lg"
            class="pointer-events-auto transition active:translate-y-[1px]"
            @click="emit('select', b.id)"
        />
    </div>
</template>
