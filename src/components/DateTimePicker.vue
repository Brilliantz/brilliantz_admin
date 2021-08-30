<template>
    <v-row no-gutters>
        <v-col cols="6" class="pr-3">
            <v-dialog
                ref="dateDialog"
                v-model="dateModal"
                :return-value.sync="dateComputed"
                persistent
                width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="dateComputed"
                    :label="dateLabel"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="dateComputed"
                scrollable
                >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="red"
                    @click="dateModal = false"
                >
                    Batalkan
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dateDialog.save(dateComputed)"
                >
                    Simpan
                </v-btn>
                </v-date-picker>
            </v-dialog>
        </v-col>
        <v-col cols="6">
            <v-dialog
                ref="timeDialog"
                v-model="timeModal"
                :return-value.sync="timeComputed"
                persistent
                width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="timeComputed"
                    :label="timeLabel"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-time-picker
                v-if="timeModal"
                v-model="timeComputed"
                full-width
                format="24hr"
                >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="red"
                    @click="timeModal = false"
                >
                    Batalkan
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.timeDialog.save(timeComputed)"
                >
                    Simpan
                </v-btn>
                </v-time-picker>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'DateTimePicker',
    props: {
         date: String,
         time: String,
         dateLabel: String,
         timeLabel: String
    },
    data() {
        return {
            dateModal: false,
            timeModal: false
        }
    },
    computed: {
        dateComputed: {
            get() {
                return this.date
            },
            set(newDate) {
                this.$emit("update:date", newDate)
            }
        },
        timeComputed: {
            get() {
                return this.time
            },
            set(newTime) {
                this.$emit("update:time", newTime)
            }
        }
    }
}
</script>

<style>

</style>