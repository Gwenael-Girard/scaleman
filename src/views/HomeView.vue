<template>
    <div class="home">
        <div class="header">

            <select class="note-selector" v-model="this.selectedNote">
                <option v-for="note in this.getNotes" :value="this.getNotes.indexOf(note)">{{ note }}</option>
            </select>

            <span>Gamme de {{this.getNotes[this.selectedNote]}}</span>

            <NotationSwitch />
        </div>

        <div class="scales-piano-wrapper">
            <table>
                <thead>
                <tr class="header-row">
                    <th class="scale-name">Scale</th>
                    <th class="notes-list" v-for="note in this.getNotesFromKey(this.selectedNote)">{{note}}</th>
                    <th class="notes">Notes</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="scale in this.getScales" @click="getRow" :id="this.getScales.indexOf(scale)" :class="{'highlight': this.selectedScale === this.getScales.indexOf(scale)}">
                    <td class="scale-name">{{ scale.nom }}</td>
                    <td class="notes-list" v-for="note in this.getNotesFromScale(this.getNotesFromKey(this.selectedNote), this.getScales.indexOf(scale))">{{ note }}</td>
                    <td class="notes">{{ this.getNotesFromScale(this.getNotesFromKey(this.selectedNote), this.getScales.indexOf(scale)).filter((note) => note !== "-").join(" / ") }}</td>
                </tr>
                </tbody>
            </table>

            <PianoRoll :scale="this.selectedScale" :keyNote="this.selectedNote" />
        </div>
    </div>
</template>

<script>
import scales from "@/datas/scales.json";
import notes from "@/datas/notes.json";
import PianoRoll from "@/components/PianoRoll.vue";
import ToggleSwitch from "@/components/NotationSwitch.vue";
import NotationSwitch from "@/components/NotationSwitch.vue";

export default {
    name: 'HomeView',
    components: {NotationSwitch, ToggleSwitch, PianoRoll},

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
            return this.$store.state.notes
        },
    },

    methods: {
        getNotesFromKey(keyId) {

            let notesDuplicate = this.getNotes.concat(this.getNotes)
            return notesDuplicate.slice(keyId, keyId + 12)
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
            if(e.target.parentNode.nodeName === "TR") {
                this.selectedScale = parseInt(e.target.parentNode.id)
            }


        }
    },
}
</script>

<style lang="scss">

.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: fit-content;
    min-height: 100vh;
    margin-inline: auto;
    gap: 16px;
    padding: 16px;
}

.header {
    background-color: $accentDark;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 3px solid $black;
    text-align: center;
    padding: 8px;

    .note-selector {
        border-radius: 0;
        border: 3px solid black;
        background-color: $lightgray;
        height: 32px;
        width: 64px;
    }

    span {
        color: $white;
        font-weight: bold;
        font-size: 2em;
        margin-right: 32px;
    }
}

.scales-piano-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;

    @media screen and (max-width: 1210px) {
        flex-direction: column;
        align-items: center;
    }
}



table, th, td {
    border-collapse: collapse;
    border: 1px solid $black;
}

table {
    border: 3px solid $black;
}

thead {
    background-color: $accentDark;
    color: $white;
}

tr {
    height: 32px;

    &.highlight {
        background-color: $accent;
    }

    &:hover {
        cursor: pointer;
        background-color: $lightgray;

        &.highlight {
            background-color: $accent;
        }
    }

    &.header-row {
        &:hover {
            cursor: unset;
            background-color: unset;
        }
    }
}

td.notes-list {
    width: 32px;
    text-align: center;
}

td.notes, th.notes {
    width: 275px;
    border-left: 3px solid $black;
}

td.notes {
    padding-left: 8px;
}

td.scale-name, th.scale-name {
    width: 150px;
    border-right: 3px solid $black;
}

@media screen and (max-width: 844px) {
    th.notes-list, td.notes-list {
        display: none;
    }
}
</style>
