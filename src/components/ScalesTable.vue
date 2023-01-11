<template>
    <table>
        <thead>
        <tr>
            <th>Scale</th>
            <th>1</th>
            <th>1#</th>
            <th>2</th>
            <th>2#</th>
            <th>3</th>
            <th>4</th>
            <th>4#</th>
            <th>5</th>
            <th>5#</th>
            <th>6</th>
            <th>6#</th>
            <th>7</th>
            <th>8v</th>
            <th>Notes</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="scale in this.getScales"
            :class="{'highlight': this.selectedScale === this.getScales.indexOf(scale)}">
            <td class="scale-name" @click="getRow">{{ scale.nom }}</td>
            <td class="note"
                v-for="note in this.getNotesFromScale(this.getNotesFromKey(this.selectedNote), this.getScales.indexOf(scale))">
                {{ note }}
            </td>
            <td>{{
                    this.getNotesFromScale(this.getNotesFromKey(this.selectedNote), this.getScales.indexOf(scale)).filter((note) => note !== "-").join(" / ")
                }}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import scales from "@/datas/scales.json";
import notes from "@/datas/notes.json";

export default {
    name: "ScalesTable",

    data() {
        return {
            selectedNote: 0,
            selectedScale: 0,
        }
    },

    computed: {
        getScales() {
            return scales.scales;
        },

        getNotes() {
            return notes.notes
        }
    },

    methods: {
        getNotesFromKey(keyId) {
            let notesDuplicate = this.getNotes.concat(this.getNotes)
            return notesDuplicate.slice(keyId, keyId + 13)
        },

        getNotesFromScale(notesFromKey, scaleId) {
            let scaleNotes = this.getScales[scaleId].notes

            let notesFromScale = [];

            notesFromKey.forEach((note) => {
                notesFromScale.push(scaleNotes.indexOf(notesFromKey.indexOf(note)) === -1 ? "-" : note)
            })

            return notesFromScale
        },

        getRow(e) {
            this.selectedScale = this.getScales.indexOf(this.getScales.filter((scale) => scale.nom === e.target.innerText)[0])
        }
    },
}
</script>

<style scoped lang="scss">

table, th, td {
    border-collapse: collapse;
    border: 1px solid black;
}

thead {
    background-color: #2d2d2d;
    color: white;
}

tr {
    height: 32px;

    &.highlight {
        background-color: red;
    }
}

td.note {
    width: 32px;
    text-align: center;
}

td.scale-name {
    width: 200px;
}

</style>