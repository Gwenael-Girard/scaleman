<template>
    <div class="grid">
        <transition-group><slot></slot></transition-group>
    </div>
</template>

<script>
export default {
    name: "Grid",

    props: {
        elementWidth: {
            type: String,
        },

        gap: {
            type: String,
            required: false,
            default: "0",
        },

        rowsMax: {
            type: String,
        }
    }
}
</script>

<style scoped lang="scss">
$card-width: v-bind(elementWidth);
$gap: v-bind(gap);
$rows-max: v-bind(rowsMax);

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, $card-width);
    padding-inline: $gap;
    gap: $gap;
    justify-content: center;
    max-width: calc($card-width * $rows-max + $gap * ($rows-max - 1));
    margin-inline: auto;
}
</style>