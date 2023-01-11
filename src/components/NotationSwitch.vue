<template>
        <label class="toggle-switch">
            <input type="checkbox" v-model="this.switchState" @click="this.updateNotes">
            {{this.switchState ? "b" : "#"}}
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

$width: 32px;
$height: 32px;

.toggle-switch {
    background-color: $lightgray;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $height;
    width: $width;
    border: 3px solid $black;
    user-select: none;

    &:hover {
        cursor: pointer;
    }

    input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
}

</style>