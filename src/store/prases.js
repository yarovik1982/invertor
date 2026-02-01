import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePrasesStore = defineStore('prases', {
   state: () => ({
      phrases: {
         life: [
            { ru: "Я проснулся рано утром", eng: "I woke up early in the morning", audio: '/public/audio/life/1.mp3' },
            { ru: "Мне нужно приготовить завтрак", eng: "I need to make breakfast", audio: '/public/audio/life/2.mp3' },
            { ru: "Я убираю комнату", eng: "I am cleaning the room", audio: '/public/audio/life/3.mp3' },
            { ru: "Я мою посуду", eng: "I am washing the dishes", audio: '/public/audio/life/4.mp3' },
            { ru: "Мне нужно вынести мусор", eng: "I need to take out the trash", audio: '/public/audio/life/5.mp3' },
            { ru: "Я включаю стиральную машину", eng: "I am turning on the washing machine", audio: '/public/audio/life/6.mp3' },
            { ru: "Я глажу одежду", eng: "I am ironing the clothes", audio: '/public/audio/life/7.mp3' },
            { ru: "Я читаю книгу дома", eng: "I am reading a book at home", audio: '/public/audio/life/8.mp3' },
            { ru: "Я отдыхаю на диване", eng: "I am relaxing on the couch", audio: '/public/audio/life/9.mp3' },
            { ru: "Я готовлю ужин", eng: "I am cooking dinner", audio: '/public/audio/life/10.mp3' },
         ],
         travels: [
            { ru: "Мне нужно купить билет", eng: "I need to buy a ticket", audio:"/public/audio/travels/1.mp3" },
            { ru: "Где находится аэропорт", eng: "Where is the airport", audio:"/public/audio/travels/2.mp3" },
            { ru: "Во сколько вылет", eng: "What time is the departure", audio:"/public/audio/travels/3.mp3" },
            { ru: "Мне нужно вызвать такси", eng: "I need to call a taxi", audio:"/public/audio/travels/4.mp3" },
            { ru: "Как добраться до отеля", eng: "How do I get to the hotel", audio:"/public/audio/travels/5.mp3" },
            { ru: "Я хочу забронировать номер", eng: "I want to book a room", audio:"/public/audio/travels/6.mp3" },
            { ru: "Где находится остановка", eng: "Where is the bus stop", audio:"/public/audio/travels/7.mp3" },
            { ru: "Сколько стоит билет", eng: "How much is the ticket", audio:"/public/audio/travels/8.mp3" },
            { ru: "Мне нужен план города", eng: "I need a city map", audio:"/public/audio/travels/9.mp3" },
            { ru: "Я ищу туристическую информацию", eng: "I am looking for tourist information", audio:"/public/audio/travels/10.mp3" },
         ],
         work: [
            { ru: "Мне нужно отправить письмо", eng: "I need to send an email", audio:"/public/audio/work/1.mp3" },
            { ru: "У нас сегодня встреча", eng: "We have a meeting today", audio:"/public/audio/work/2.mp3" },
            { ru: "Мне нужно закончить задачу", eng: "I need to finish the task", audio:"/public/audio/work/3.mp3" },
            { ru: "Я работаю над проектом", eng: "I am working on a project", audio:"/public/audio/work/4.mp3" },
            { ru: "Мне нужно обсудить детали", eng: "I need to discuss the details", audio:"/public/audio/work/5.mp3" },
            { ru: "Когда дедлайн", eng: "When is the deadline", audio:"/public/audio/work/6.mp3" },
            { ru: "Я отправил отчёт", eng: "I sent the report", audio:"/public/audio/work/7.mp3" },
            { ru: "Мне нужно созвониться с коллегой", eng: "I need to call a colleague", audio:"/public/audio/work/8.mp3" },
            { ru: "Я проверяю документы", eng: "I am checking the documents", audio:"/public/audio/work/9.mp3" },
            { ru: "Мы начинаем новую задачу", eng: "We are starting a new task", audio:"/public/audio/work/10.mp3" },
         ],
         shoping: [
            { ru: "Сколько стоит эта вещь", eng: "How much is this item", audio:"/public/audio/shopung/1.mp3" },
            { ru: "Где находится примерочная", eng: "Where is the fitting room", audio:"/public/audio/shopung/2.mp3" },
            { ru: "У вас есть другой размер", eng: "Do you have another size", audio:"/public/audio/shopung/3.mp3" },
            { ru: "Я хочу купить это", eng: "I want to buy this", audio:"/public/audio/shopung/4.mp3" },
            { ru: "Можно оплатить картой", eng: "Can I pay by card", audio:"/public/audio/shopung/5.mp3" },
            { ru: "Где находится касса", eng: "Where is the checkout", audio:"/public/audio/shopung/6.mp3" },
            { ru: "У вас есть скидки", eng: "Do you have discounts", audio:"/public/audio/shopung/7.mp3" },
            { ru: "Я хочу вернуть товар", eng: "I want to return the item", audio:"/public/audio/shopung/8.mp3" },
            { ru: "У вас есть это в другом цвете", eng: "Do you have this in another color", audio:"/public/audio/shopung/9.mp3" },
            { ru: "Я просто смотрю", eng: "I am just looking", audio:"/public/audio/shopung/10.mp3" },
         ]
      },
      progress: {
         life: 0,
         travels: 0,
         work: 0,
         shoping: 0,
      },
      currentEngPhrase:[],
   }),
   getters: {
      currentPhrase: (state) => {
         return (category) => {
            const index = state.progress[category]
            const list = state.phrases[category]

            if (!list || !list[index]) return null

            return list[index]
         }
      }
   },
   actions: {
      nextPhrase(category) {
         const max = this.phrases[category].length - 1

         if (this.progress[category] < max) {
            this.progress[category]++
         }
      },
      resetProgress(category) {
         this.progress[category] = 0
      },

   }
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(usePrasesStore, import.meta.hot))
}
