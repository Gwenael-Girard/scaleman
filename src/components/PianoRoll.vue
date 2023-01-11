<template>
    <div class="pianoroll-container">
        <span>{{this.getScales[this.scale].nom}}</span>
        <div class="pianoroll">

            <div v-for="note in this.getNotes"
                 :class="{
                    [note.replace('#', '-')]: true,
                    'note': true,
                    black:note.length > 1,
                    'highlighted': this.highlighted.indexOf(note)   !== -1,
                 }"
                 @click="playNote(note)"


            >{{note}}</div>
        </div>
    </div>
</template>

<script>

import scales from "@/datas/scales.json"
import notes from "@/datas/notes.json";
let notesSounds = []

export default {
    name: "PianoRoll",
    props: {
        scale: {
            type: Number,
            require: true,
        },
        keyNote: {
            type: Number,
            require: true,
        }
    },

    computed: {

        highlighted() {
            return this.getNotesFromScale(this.getNotesFromKey(this.keyNote), this.scale).filter((note) => note !== '-')
        },

        getScales() {
            return scales.scales;
        },

        getNotes() {
            return this.$store.state.notes
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

        playNote(note) {
            notesSounds.filter((obj) => obj.note === note)[0].audio.play()
        },
    },

    beforeMount() {
        this.getNotes.forEach((note) => {

            let myAudio = new Audio(require(`@/assets/sounds/notes/${this.getNotes.indexOf(note)}.mp3`))
            myAudio.loop = false;

            notesSounds.push({
                "note": note,
                "audio": myAudio,
            })
        })

        console.log(notesSounds)
    }
}
</script>

<style scoped lang="scss">

.pianoroll-container {
    width: fit-content;

    span {
        display: block;
        text-align: center;
        height: 32px;
        background-color: $accentDark;
        line-height: 32px;
        color: $white;
        font-weight: bold;
        border-left: 3px solid $black;
        border-right: 3px solid $black;
        border-top: 3px solid $black;
    }

    .pianoroll {

        $white_width: 50px;
        $black_width: 30px;
        $height: 150px;

        width: calc(7 * $white_width);
        height: $height;
        background-color: $white;
        display: flex;
        border-left: 2px solid $black;
        border-right: 2px solid $black;
        border-bottom: 2px solid $black;
        position: relative;

        * {
            user-select: none;
        }

        .note {
            height: 100%;
            width: $white_width;
            border: 1px solid $black;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            transition: all .025s ease-in-out;

            &:hover {
                cursor: pointer;
            }

            &:active {
                background-color: lighten($white, 10);
            }

            &.highlighted {
                background-color: $accent;

                &:active {
                    background-color: lighten($accent, 10);
                }
            }

            &.black {
                position: absolute;
                width: $black_width;
                height: 70%;
                top: 0;
                border-left: 2px solid $black;
                border-right: 2px solid $black;
                border-bottom: 2px solid $black;
                background-color: $black;
                color: $white;

                &:active {
                    background-color: lighten($black, 10);
                }

                &.highlighted {
                    background-color: $accentMid;

                    &:active {
                        background-color: lighten($accentMid, 10);
                    }
                }

                &.Db, &.C-{
                    left: calc($white_width * 1 - ($black_width / 2));
                }

                &.Eb, &.D-{
                    left: calc($white_width * 2 - ($black_width / 2));
                }

                &.Gb, &.F-{
                    left: calc($white_width * 4 - ($black_width / 2));
                }

                &.Ab, &.G-{
                    left: calc($white_width * 5 - ($black_width / 2));
                }

                &.Bb, &.A- {
                    left: calc($white_width * 6 - ($black_width / 2));
                }
            }
        }
    }
}
</style>