<script>
import { saveTime, deleteTime } from '../utils/time'

export default {
  props: {
    showSavedTimes: Boolean,
  },
  data() {
    return {
      inputTime: '',
      savedTimes: [],
    }
  },
  methods: {
    async saveTime() {
      if (!this.inputTime.trim()) {
        alert('Введите время')
        return
      }

      try {
        const json = await saveTime(this.inputTime)
        if (json.insertId) {
          this.savedTimes.unshift({ id: json.insertId, time: this.inputTime })
          this.$toast?.success(`Данные сохранены`, { position: 'top-right' })
          this.inputTime = ''
        } else {
          alert('Ошибка сохранения')
        }
      } catch (err) {
        console.error('Ошибка сети:', err)
        alert('Ошибка сети')
      }
    },
    async deleteTime(id) {
      try {
        const json = await deleteTime(id)
        if (json.affectedRows) {
          this.savedTimes = this.savedTimes.filter((item) => item.id !== id)
          this.$toast?.error(`Данные удаленыID ${id}`, { position: 'top-right' })
        } else {
          alert('Ошибка удаления')
        }
      } catch (err) {
        console.error('Ошибка сети:', err)
        alert('Ошибка сети')
      }
    },
  },
  async created() {
    try {
      const res = await fetch('http://localhost:5555/times')
      const json = await res.json()
      if (json.length) {
        this.savedTimes = json
      }
    } catch (err) {
      console.error('Ошибка загрузки сохранённых данных:', err)
    }
  },
}
</script>

<template>
  <div class="greetings">
    <input
      v-model="inputTime"
      type="text"
      placeholder="Введите значение"
      class="input-time"
    />
    <button @click="saveTime">Сохранить в БД</button>

    <h3 v-if="savedTimes.length && showSavedTimes">Сохранённые значения</h3>

    <div
      v-if="showSavedTimes"
      class="deleted-items"
      v-for="savedTime in savedTimes"
      :key="savedTime.id"
    >
      <div class="deleted-item">{{ savedTime.time }}</div>
      <button class="btn-sm bg-red" @click="() => deleteTime(savedTime.id)">
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-time {
  font-size: 1.5rem;
  padding: 8px;
  width: 200px;
  margin-bottom: 20px;
}

button {
  font-size: 1.5rem;
  margin: 30px;
  background-color: rgb(128, 184, 244);
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.btn-sm {
  margin: 10px;
  padding: 4px;
}

.bg-red {
  background-color: rgb(184, 93, 93);
}

.deleted-items {
  font-size: 1.7rem;
}

.deleted-item {
  width: 150px;
  display: inline-block;
}

.greetings {
  text-align: center;
}
</style>
