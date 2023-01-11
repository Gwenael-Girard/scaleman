<template>
        <label class="toggle-switch">
            <input type="checkbox" v-model="this.switchState" @click="this.updateNotes">
            <span class="slider"></span>
            <span class="label">#</span>
            <span class="label">b</span>
        </label>
</template>

<script>

import notes from '@/datas/notes.json'

export default {
    name: "NotationSwitch",
    data() {
        return {
            switchState: false,
        }
    },

    methods: {
        updateNotes() {
            this.$store.state.notes = this.switchState ? notes.notes_diese : notes.notes_bemol
        }
    }
}
</script>

<style scoped lang="scss">

$width: 58px;
$height: 32px;

.toggle-switch {
    background-color: $white;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $height;
    width: $width;
    border: 3px solid $black;
    user-select: none;

    .label {
        height: 100%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
    }

    .slider {
        position: absolute;
        aspect-ratio: 1;
        height: 100%;
        background-color: $accentLight;
    }

    input[type="checkbox"]:checked + span.slider {
        transform: translateX(100%);
    }

    &:hover {
        cursor: pointer;
        background-color: $lightgray;
    }

    input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
}

</style>