<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userCode = route.params.code;
const guest = ref(null);

// Логика Таймера Отсчета
const targetDate = new Date("2026-08-29T13:30:00").getTime();
let timerInterval = null;

// Используем рефы вместо прямого обращения к DOM через document.getElementById
const countdown = ref({
  days: "00",
  hours: "00",
  minutes: "00",
});

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    if (timerInterval) clearInterval(timerInterval);
    return;
  }

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  countdown.value.days = d < 10 ? "0" + d : d.toString();
  countdown.value.hours = h < 10 ? "0" + h : h.toString();
  countdown.value.minutes = m < 10 ? "0" + m : m.toString();
}

onMounted(async () => {
  try {
    const response = await fetch(`data/guests.json`);
    const guests = await response.json();
    const foundGuest = guests.find((g) => g.code === userCode);
    guest.value = foundGuest;
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
  } catch (error) {
    console.error("Error fetching guest data:", error);
  }
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
function scrollToForm() {
  const element = document.getElementById("reg-form");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
function scrollToDetails() {
  const element = document.getElementById("event");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
function scrollToTransferForm() {
  const element = document.getElementById("transfer-form");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
</script>
<template>
  <div v-if="guest" class="invitation overflow-x-hidden">
    <div
      class="hero-block bg-[url(/hero.png)] relative bg-cover bg-center w-full h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <div class="bg-black/50 absolute inset-0"></div>
      <div class="letters relative z-10 w-full">
        <h1
          class="font-letters text-[70px] sm:text-[90px] md:text-[120px] lg:text-[150px] text-gold-light drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] flex justify-center items-center flex-wrap"
        >
          A
          <span
            class="inline-block translate-y-[20px] sm:translate-y-[30px] translate-x-[-20px] sm:translate-x-[-40px]"
            >B</span
          >
        </h1>
      </div>
      <div class="text-white mt-4 relative z-10 px-4">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold">
          {{ guest.name }}
        </h2>
        <p
          class="text-sm sm:text-base md:text-lg mt-2 max-w-[700px] mx-auto px-2"
        >
          В житті є моменти, які хочеться проживати разом з близькими людьми.
          Запрошуємо вас стати свідком створення нашої сім'ї та розділити це
          незабутнє свято з нами.
        </p>
      </div>
      <div
        class="hero-buttons mt-6 w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-10 px-4"
      >
        <button
          @click="scrollToForm"
          class="bg-gold-light border-2 border-gold-light hover:bg-gold-dark text-blue-dark2 hover:text-white py-2 px-4 rounded-md w-full sm:w-auto min-w-[180px] text-center"
        >
          Підтвердити участь
        </button>
        <button
          @click="scrollToDetails"
          class="bg-transparent border-2 border-white hover:bg-gold-dark text-white py-2 px-4 rounded-md w-full sm:w-auto min-w-[180px] text-center"
        >
          Деталі весілля
        </button>
      </div>
      <img
        src="/arrow-down.gif"
        alt=""
        class="max-w-[80px] sm:max-w-[100px] md:max-w-[120px] mt-6 sm:mt-9 relative z-10"
      />
    </div>

    <div
      class="w-full max-w-7xl mx-auto my-6 sm:my-10 px-4 py-8 sm:py-14 relative"
      id="event"
    >
      <!-- Декоративні кола - приховані на мобільних -->
      <div
        class="circle-blue w-[200px] h-[200px] md:w-[300px] md:h-[300px] absolute top-[-30px] left-[-30px] md:top-[-50px] md:left-[-50px] rounded-full bg-blue-dark blur-3xl z-10 hidden md:block"
      ></div>
      <div
        class="circle-blue w-[200px] h-[200px] md:w-[300px] md:h-[300px] absolute top-[50px] left-[30%] md:top-[100px] md:left-[35%] rounded-full bg-gold-light blur-3xl z-10 hidden md:block"
      ></div>
      <div
        class="circle-blue w-[200px] h-[200px] md:w-[300px] md:h-[300px] absolute top-[100px] left-[40%] md:top-[200px] md:left-[50%] rounded-full bg-blue-light blur-3xl z-10 hidden md:block"
      ></div>
      <div
        class="circle-blue w-[250px] h-[250px] md:w-[400px] md:h-[400px] absolute top-[-20px] right-[-30px] md:top-[-20px] md:right-[-50px] rounded-full bg-blue-light blur-3xl z-10 hidden md:block"
      ></div>

      <div
        class="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-4 relative z-20"
      >
        <div class="w-full md:w-1/2">
          <img
            src="/river.jpg"
            class="max-h-[400px] md:max-h-[500px] w-full max-w-[500px] mx-auto object-cover rounded-bl-[60px] sm:rounded-bl-[80px] rounded-tr-[60px] sm:rounded-tr-[80px] shadow-lg"
          />
        </div>

        <div
          class="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center"
        >
          <h2
            class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold mb-3 font-title text-blue-dark2 text-center md:text-left"
          >
            Деталі свята
          </h2>
          <p
            class="text-sm sm:text-base text-gray-700 leading-relaxed text-center md:text-left"
          >
            Свято нашої любові відбудеться в оточенні природи та святкової
            атмосфери. Ми подбали про те, щоб цей вечір був комфортним та
            незабутнім для кожного гостя.
          </p>

          <div
            class="mt-4 text-sm text-gray-600 space-y-2 text-center md:text-left"
          >
            <p>
              Місце проведення:
              <span class="font-medium text-gray-800">Ресторан "River"</span>
            </p>
            <p>
              Адреса:
              <span class="font-medium text-gray-800"
                >Уманський узвіз 9, м. Первомайськ</span
              >
            </p>
            <p>
              Дата:
              <span class="font-medium text-gray-800">29 серпня 2026 року</span>
            </p>
            <p>
              Час:
              <span class="font-medium text-gray-800">початок о 13:30</span>
            </p>

            <!-- Мобільний таймер -->
            <div class="timer md:hidden mt-6">
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-white/40 px-3 py-2 rounded-lg shadow">
                  <span
                    class="number font-subtitle text-3xl font-semibold text-gray-800 block"
                  >
                    {{ countdown.days }}
                  </span>
                  <span class="label text-xs text-gray-600">Днів</span>
                </div>
                <div class="bg-white/40 px-3 py-2 rounded-lg shadow">
                  <span
                    class="number font-subtitle text-3xl font-semibold text-gray-800 block"
                  >
                    {{ countdown.hours }}
                  </span>
                  <span class="label text-xs text-gray-600">Годин</span>
                </div>
                <div class="bg-white/40 px-3 py-2 rounded-lg shadow">
                  <span
                    class="number font-subtitle text-3xl font-semibold text-gray-800 block"
                  >
                    {{ countdown.minutes }}
                  </span>
                  <span class="label text-xs text-gray-600">Хвилин</span>
                </div>
              </div>
            </div>

            <!-- Десктопний таймер -->
            <div
              class="timer hidden md:flex md:items-center md:justify-center md:gap-4 md:mt-6"
            >
              <div
                class="time-block md:flex md:flex-col md:items-center md:bg-white/40 md:px-5 md:py-3 md:rounded-lg md:shadow"
              >
                <span
                  class="number font-subtitle md:text-7xl md:font-semibold md:text-gray-800"
                >
                  {{ countdown.days }}
                </span>
                <span class="label md:text-sm md:text-gray-600 md:mt-1"
                  >Днів</span
                >
              </div>
              <div class="separator md:text-4xl md:font-bold md:text-gray-600">
                :
              </div>
              <div
                class="time-block md:flex md:flex-col md:items-center md:bg-white/40 md:px-5 md:py-3 md:rounded-lg md:shadow"
              >
                <span
                  class="number font-subtitle md:text-7xl md:font-semibold md:text-gray-800"
                >
                  {{ countdown.hours }}
                </span>
                <span class="label md:text-sm md:text-gray-600 md:mt-1"
                  >Годин</span
                >
              </div>
              <div class="separator md:text-4xl md:font-bold md:text-gray-600">
                :
              </div>
              <div
                class="time-block md:flex md:flex-col md:items-center md:bg-white/40 md:px-5 md:py-3 md:rounded-lg md:shadow"
              >
                <span
                  class="number font-subtitle md:text-7xl md:font-semibold md:text-gray-800"
                >
                  {{ countdown.minutes }}
                </span>
                <span class="label md:text-sm md:text-gray-600 md:mt-1"
                  >Хвилин</span
                >
              </div>
            </div>
          </div>

          <div
            class="hero-buttons mt-6 w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-10"
          >
            <button
              @click="scrollToForm"
              class="text-center bg-gold-light hover:bg-gold-dark text-blue-dark2 hover:text-white py-2 px-4 rounded-md w-full sm:w-auto min-w-[180px] shadow-lg"
            >
              Підтвердити участь
            </button>
            <button
              @click="scrollToTransferForm"
              class="text-center bg-blue-light hover:bg-blue-dark hover:text-white text-blue-dark2 py-2 px-4 rounded-md w-full sm:w-auto min-w-[180px] shadow-lg"
            >
              Транспортування
            </button>
          </div>
        </div>
      </div>
      <iframe
        class="w-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2667.2241933343157!2d30.846213975912335!3d48.048008857393114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ce4914c9b035e3%3A0x706e4539e154373!2zUml2ZXIg0J_QtdGA0LLQvtC80LDQudGB0YzQug!5e0!3m2!1sru!2sua!4v1780785966991!5m2!1sru!2sua"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <div
      id="transfer-form"
      class="bg-linear-90 from-blue-dark to-gold-light py-8 sm:py-10 px-4 relative"
    >
      <div
        class="w-full md:max-w-[90%] lg:max-w-[70%] mx-auto flex justify-between items-center gap-6 md:gap-4 relative z-10 flex-col md:flex-row"
      >
        <div class="details p-4 sm:p-6">
          <h2
            class="font-title font-bold text-blue-dark2 text-2xl sm:text-3xl md:text-4xl mb-4 text-center md:text-left"
          >
            Увага!
          </h2>
          <p class="text-blue-dark2 text-sm sm:text-base mb-8 sm:mb-12">
            Для всіх охочих буде організовано трансфер з м. Південноукраїнськ до
            місця святкування та назад після завершення свята. Автобуси
            комфортні, тому, якщо вам потрібен трансфер, будь ласка, обов'язково
            зазначте це під час підтвердження своєї присутності. Заздалегідь
            щиро дякуємо!
          </p>
          <p class="text-blue-dark2 text-sm sm:text-base">
            Місце збору та час відправлення автобусів (попередня інформація,
            точне місце буде повідомлено згодом): <br />
            <span class="font-medium text-gray-800"
              >проспект Незалежності 10, м.Південноукраїнськ (біля Будинку
              Культури), 12:30</span
            >
          </p>
        </div>
        <iframe
          class="rounded-bl-[60px] sm:rounded-bl-[80px] rounded-tr-[60px] sm:rounded-tr-[80px] w-full h-64 sm:h-80 md:h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1015.1376370738786!2d31.17768920453194!3d47.82294908072274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cfbaef38c7ebfd%3A0x8b86731289ba6c1e!2z0KbQtdC90YLRgNCw0LvRjNC90LDRjyDQv9C70L7RidCw0LTRjCDQs9C-0YDQvtC00LAg0K7QttC90L7Rg9C60YDQsNC40L3RgdC60LA!5e0!3m2!1sru!2sua!4v1780346572503!5m2!1sru!2sua"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <div class="dress-code">
      <div class="w-full px-4 py-12 sm:py-16">
        <div class="max-w-7xl mx-auto text-center">
          <h2
            class="font-title font-bold text-blue-dark2 text-2xl sm:text-3xl md:text-4xl mb-4"
          >
            Дрес-код
          </h2>
          <p
            class="text-blue-dark2 text-sm sm:text-base max-w-[90%] sm:max-w-[80%] md:max-w-[60%] mx-auto"
          >
            Наше свято пройде в <strong>класичному стилі</strong>, тому ми
            будемо раді бачити вас в елегантних костюмах та сукнях. Буде чудово,
            якщо при виборі вбрання ви звернете увагу на кольорову гаму дня:
            <strong>пастельні відтінки блакитного та золотого</strong>. Ми
            неймовірно любимо українські традиції, проте для цього дня ми обрали
            європейський класичний стиль, тому просимо утриматися від вишиванок.
            Будемо також вдячні, якщо білий колір залишиться привілеєм
            нареченої.
          </p>
          <div
            class="colors flex items-center justify-center gap-3 sm:gap-4 mt-6 mb-10"
          >
            <div
              class="circle w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-dark border-2 border-blue-dark2/30"
            ></div>
            <div
              class="circle w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-light border-2 border-blue-dark2/30"
            ></div>
            <div
              class="circle w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold-dark border-2 border-blue-dark2/30"
            ></div>
            <div
              class="circle w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold-light border-2 border-blue-dark2/30"
            ></div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 max-w-6xl mx-auto"
          >
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:rotate-1 transition-transform duration-300"
            >
              <img
                src="/dress-code.jpg"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:-rotate-1 transition-transform duration-300"
            >
              <img
                src="/dress-code2.png"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:rotate-1 transition-transform duration-300"
            >
              <img
                src="/dress-codejpg.jpg"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:-rotate-1 transition-transform duration-300"
            >
              <img
                src="/dress-code4.jpg"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:-rotate-1 transition-transform duration-300"
            >
              <img src="/gold3.png" alt="" class="w-full h-auto object-cover" />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:rotate-1 transition-transform duration-300"
            >
              <img
                src="/dress-code5.jpg"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:-rotate-1 transition-transform duration-300"
            >
              <img
                src="/dress-code6.jpg"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:-rotate-1 transition-transform duration-300"
            >
              <img
                src="/blue-dress.png"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:rotate-1 transition-transform duration-300 block"
            >
              <img
                src="/dress-code7.jpg"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:-rotate-1 transition-transform duration-300 block"
            >
              <img
                src="/dress-gold.png"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
            <div
              class="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:rotate-1 transition-transform duration-300 block"
            >
              <img
                src="/dress-gold2.png"
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="details px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <div class="text-center mb-6 sm:mb-10">
        <h3
          class="text-2xl sm:text-3xl md:text-4xl font-title font-semibold text-blue-dark2 tracking-wide"
        >
          Ще кілька важливих деталей ✨
        </h3>
      </div>
      <div
        class="details-cards grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 max-w-7xl mx-auto"
      >
        <div
          class="details-card flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-blue-light backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 text-center sm:text-left"
        >
          <img
            src="/icons8-calling-50.png"
            alt="contact"
            class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
          />
          <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
            Ми будемо вдячні, якщо під час церемонії ви відкладете телефони та
            насолодитеся моментом разом із нами. Усі найкращі фото та відео
            збереже для нас професійна команда фотографа та відеографа.
          </p>
        </div>

        <div
          class="details-card flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-blue-dark backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 text-center sm:text-left"
        >
          <img
            src="/icons8-giveaway-50.png"
            alt="gift"
            class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
          />
          <p class="text-white leading-relaxed text-sm sm:text-base">
            Найцінніший подарунок для нас — це ваша присутність у цей особливий
            день. Ми будемо щиро раді будь-якому прояву вашої уваги та турботи.
            Якщо ж ви замислюєтесь над подарунком, то будемо вдячні за внесок у
            конверті, який допоможе нам здійснити наші спільні мрії.
          </p>
        </div>

        <div
          class="details-card flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-blue-light backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 text-center sm:text-left"
        >
          <img
            src="/icons8-partly-cloudy-day-50.png"
            alt="weather"
            class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
          />
          <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
            Оскільки церемонія та банкет будуть проходити на локації біля річки,
            радимо мати при собі легку кофту або шалик для вечірньої прохолоди.
          </p>
        </div>
      </div>
    </section>
    <section
      id="reg-form"
      class="bg-[url('/form-bg.jpg')] bg-cover bg-center py-12 sm:py-16 md:py-20 px-4 relative flex flex-col items-center justify-center min-h-[50vh]"
    >
      <div class="max-w-4xl w-full mx-auto">
        <div class="text-center mb-6 sm:mb-8 md:mb-10">
          <h3
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-title font-semibold text-blue-dark2 tracking-wide leading-tight"
          >
            Чекаємо на вас з нетерпінням!
          </h3>
        </div>

        <p
          class="text-blue-dark2 leading-relaxed text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center font-light mb-8 sm:mb-12"
        >
          Ми дуже раді, що ви будете поруч із нами у цей особливий день. Наша
          любов до вас безмежна, і ми не можемо дочекатися, щоб розділити це
          свято разом із вами. До зустрічі 29 серпня 2026 року!
        </p>

        <div
          class="text-center bg-white/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto border border-white/20 shadow-sm"
        >
          <p
            class="text-blue-dark2 font-medium text-sm sm:text-base md:text-lg mb-6"
          >
            Дуже будемо вдячні, якщо повідомите нам про вашу присутність
            заздалегідь ( <strong>до 01.08.2026</strong> ), щоб ми могли
            заздалегідь підготувати все для вас. Для підтвердження присутності,
            вказання кількості гостей та потреби в трансфері, будь ласка,
            зв'яжіться з нами за такими контактами:
          </p>

          <ul
            class="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-dark2 text-sm sm:text-base text-center md:text-left"
          >
            <li
              class="bg-white/60 p-4 rounded-xl space-y-2 border border-blue-dark2/10 shadow-sm"
            >
              <span
                class="block text-xs uppercase tracking-wider text-gold-dark font-semibold"
                >Наречена</span
              >
              <div class="space-y-1">
                <p class="font-medium">
                  <a
                    href="tel:+380683073076"
                    class="hover:text-gold-dark transition duration-200 block sm:inline"
                    >+38 (068) 307-30-76</a
                  >
                </p>
                <p class="text-xs sm:text-sm break-all">
                  <a
                    href="mailto:leznenkovioletta@gmail.com"
                    class="hover:underline opacity-90 transition"
                    >leznenkovioletta@gmail.com</a
                  >
                </p>
              </div>
            </li>

            <li
              class="bg-white/60 p-4 rounded-xl space-y-2 border border-blue-dark2/10 shadow-sm"
            >
              <span
                class="block text-xs uppercase tracking-wider text-gold-dark font-semibold"
                >Наречений</span
              >
              <div class="space-y-1">
                <p class="font-medium">
                  <a
                    href="tel:+380688206936"
                    class="hover:text-gold-dark transition duration-200 block sm:inline"
                    >+38 (068) 820-69-36</a
                  >
                </p>
                <p class="text-xs sm:text-sm break-all">
                  <a
                    href="mailto:artkeyn@gmail.com"
                    class="hover:underline opacity-90 transition"
                    >artkeyn@gmail.com</a
                  >
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section
      id="faq"
      class="max-w-2xl mx-auto px-4 mt-12 sm:mt-16 mb-8 sm:mb-12"
    >
      <div class="text-center mb-8 sm:mb-10">
        <h3
          class="text-2xl sm:text-3xl md:text-4xl font-title font-semibold text-blue-dark2 tracking-wide"
        >
          Часті питання
        </h3>
      </div>

      <div class="space-y-3 mb-12 sm:mb-18">
        <details
          class="group border border-blue-dark2/10 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-white/80 open:shadow-md open:shadow-amber-100/50"
        >
          <summary
            class="flex items-center justify-between font-medium text-gray-800 cursor-pointer list-none select-none focus:outline-none p-4"
          >
            <span
              class="text-sm sm:text-base md:text-lg pr-4 font-medium transition-colors group-hover:text-amber-600"
            >
              Який дрес-код на святі?
            </span>
            <span
              class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-blue-dark2/5 group-hover:bg-amber-100 p-2 rounded-full"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-dark2 group-hover:text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="mt-[2px] text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn p-4"
          >
            Класичний стиль — пастельні відтінки блакитного та золотого. Будемо
            вдячні, якщо білий колір залишиться привілеєм нареченої.
          </div>
        </details>

        <details
          class="group border border-blue-dark2/10 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-white/80 open:shadow-md open:shadow-amber-100/50"
        >
          <summary
            class="flex items-center justify-between font-medium text-gray-800 cursor-pointer list-none select-none focus:outline-none p-4"
          >
            <span
              class="text-sm sm:text-base md:text-lg pr-4 font-medium transition-colors group-hover:text-amber-600"
            >
              Чи можна приходити з дітьми?
            </span>
            <span
              class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-blue-dark2/5 group-hover:bg-amber-100 p-2 rounded-full"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-dark2 group-hover:text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="mt-[2px] text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn p-4"
          >
            Будемо раді бачити вас разом із родиною, тож просимо вказати точну
            кількість гостей, щоб ми могли все підготувати.
          </div>
        </details>

        <details
          class="group border border-blue-dark2/10 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-white/80 open:shadow-md open:shadow-amber-100/50"
        >
          <summary
            class="flex items-center justify-between font-medium text-gray-800 cursor-pointer list-none select-none focus:outline-none p-4"
          >
            <span
              class="text-sm sm:text-base md:text-lg pr-4 font-medium transition-colors group-hover:text-amber-600"
            >
              Чи є парковка/трансфер?
            </span>
            <span
              class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-blue-dark2/5 group-hover:bg-amber-100 p-2 rounded-full"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-dark2 group-hover:text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="mt-[2px] text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn p-4"
          >
            Парковка доступна біля ресторану. Також організовано трансфер з м.
            Південноукраїнськ. Якщо вам потрібен транспорт, будь ласка,
            попередньо повідомте про це.
          </div>
        </details>

        <details
          class="group border border-blue-dark2/10 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-white/80 open:shadow-md open:shadow-amber-100/50"
        >
          <summary
            class="flex items-center justify-between font-medium text-gray-800 cursor-pointer list-none select-none focus:outline-none p-4"
          >
            <span
              class="text-sm sm:text-base md:text-lg pr-4 font-medium transition-colors group-hover:text-amber-600"
            >
              Чи потрібні подарунки?
            </span>
            <span
              class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-blue-dark2/5 group-hover:bg-amber-100 p-2 rounded-full"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-dark2 group-hover:text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="mt-[2px] text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn p-4"
          >
            Найцінніший подарунок для нас — це ваша присутність у цей особливий
            день. Ми будемо щиро раді будь-якому прояву вашої уваги та турботи.
            Якщо ж ви замислюєтесь над подарунком, будемо вдячні за внесок у
            конверті, який допоможе нам здійснити наші спільні мрії.
          </div>
        </details>

        <details
          class="group border border-blue-dark2/10 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-white/80 open:shadow-md open:shadow-amber-100/50"
        >
          <summary
            class="flex items-center justify-between font-medium text-gray-800 cursor-pointer list-none select-none focus:outline-none p-4"
          >
            <span
              class="text-sm sm:text-base md:text-lg pr-4 font-medium transition-colors group-hover:text-amber-600"
            >
              Де зупинитися гостям з інших міст?
            </span>
            <span
              class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-blue-dark2/5 group-hover:bg-amber-100 p-2 rounded-full"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-dark2 group-hover:text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="mt-[2px] text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn p-4"
          >
            Якщо вам потрібне житло, будь ласка, заздалегідь повідомте про це
            наречених.
          </div>
        </details>

        <details
          class="group border border-blue-dark2/10 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-white/80 open:shadow-md open:shadow-amber-100/50"
        >
          <summary
            class="flex items-center justify-between font-medium text-gray-800 cursor-pointer list-none select-none focus:outline-none p-4"
          >
            <span
              class="text-sm sm:text-base md:text-lg pr-4 font-medium transition-colors group-hover:text-amber-600"
            >
              Як з нами зв’язатися, якщо виникнуть додаткові питання?
            </span>
            <span
              class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-blue-dark2/5 group-hover:bg-amber-100 p-2 rounded-full"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-dark2 group-hover:text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="mt-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn space-y-2 p-4"
          >
            <div class="flex flex-col sm:gap-6 gap-2">
              <p>
                <strong>Віолетта:</strong> <span> </span>
                <a
                  href="tel:+380683073076"
                  class="hover:text-amber-600 underline decoration-amber-200 transition-colors"
                  >+38 (068) 307-30-76</a
                >
                <span> </span>
                <span class="text-xs text-gray-400"> (Viber/Telegram)</span>
              </p>
              <p>
                <strong>Артур:</strong> <span> </span>
                <a
                  href="tel:+380688206936"
                  class="hover:text-amber-600 underline decoration-amber-200 transition-colors"
                  >+38 (068) 820-69-36</a
                >
                <span> </span>
                <span class="text-xs text-gray-400"> (Viber/Telegram)</span>
              </p>
            </div>
            <p class="pt-1 break-all">
              <strong>Email:</strong>
              <a
                href="mailto:leznenkovioletta@gmail.com"
                class="hover:text-amber-600 underline decoration-amber-200 transition-colors text-xs sm:text-sm break-all"
              >
                leznenkovioletta@gmail.com
              </a>
              <br />
              <a
                href="mailto:artkeyn@gmail.com"
                class="hover:text-amber-600 underline decoration-amber-200 transition-colors text-xs sm:text-sm break-all"
              >
                artkeyn@gmail.com
              </a>
            </p>
          </div>
        </details>
      </div>
    </section>

    <footer class="bg-blue-dark2 text-white py-8 sm:py-10 mt-8 sm:mt-12">
      <div
        class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
      >
        <div class="brand text-center md:text-left">
          <div
            class="letters relative w-full flex justify-center md:justify-start"
          >
            <h1
              class="font-letters text-[35px] sm:text-[40px] md:text-[55px] lg:text-[70px] text-gold-light leading-none"
            >
              A<span
                class="inline-block translate-y-[12px] sm:translate-y-[14px] translate-x-[-15px] sm:translate-x-[-18px]"
                >B</span
              >
            </h1>
          </div>
          <div class="text-xs sm:text-sm mt-2">
            &copy; 2026 Артур & Віолетта — усі права захищені.
          </div>
          <div class="text-xs text-gray-200 mt-2">Створено з любов'ю ❤️</div>
        </div>

        <div class="venue text-sm text-center md:text-left">
          <h4 class="font-medium text-white mb-2">Деталі заходу</h4>
          <div>Дата: <strong>29 серпня 2026 року</strong></div>
          <div>Час: <strong>13:30</strong></div>
          <div class="mt-2">Місце: <strong>Ресторан "River"</strong></div>
          <div class="break-all">
            Адреса:
            <a
              href="https://maps.google.com/?q=Уманський+узвіз+9+Первомайськ"
              target="_blank"
              class="underline text-xs sm:text-sm break-all"
            >
              Уманський узвіз 9, м. Первомайськ
            </a>
          </div>
        </div>

        <div class="contacts text-sm text-center md:text-left break-all">
          <h4 class="font-medium text-white mb-2">Контакти</h4>
          <div class="break-all">
            Телефон (Віолетта, Viber/Telegram):
            <a
              href="tel:+380683073076"
              class="underline text-xs sm:text-sm break-all"
              >+38 (068) 307-30-76</a
            >
          </div>
          <div class="break-all">
            Телефон (Артур, Viber/Telegram):
            <a
              href="tel:+380688206936"
              class="underline text-xs sm:text-sm break-all"
              >+38 (068) 820-69-36</a
            >
          </div>
          <div class="break-all">
            Email:
            <a
              href="mailto:leznenkovioletta@gmail.com"
              class="underline text-xs sm:text-sm break-all"
              >leznenkovioletta@gmail.com</a
            >
          </div>
          <div class="mt-3 flex gap-2 flex-col items-center md:items-start">
            <span class="mr-3">Соцмережі:</span>
            <div class="flex gap-3 flex-wrap justify-center md:justify-start">
              <a
                href="https://www.instagram.com/artkeyn_or?igsh=MWRyMG81eGl4Zmh1NA=="
                class="inline-block rounded hover:bg-white/10 text-sm"
              >
                📸 Instagram нареченого
              </a>
              <a
                href="https://www.instagram.com/_vita4ka?igsh=MThicXRydXIzbzdyYw=="
                class="inline-block rounded hover:bg-white/10 text-sm"
              >
                📸 Instagram нареченої
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <div
    v-else
    class="flex flex-col items-center justify-center min-h-[60vh] mt-8 sm:mt-12 md:mt-20 px-4 text-center"
  >
    <img
      src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2x1N3p2czBpM211OXk3NnhodmY1bDZiMm9sejl6Z25nYXozbzRoNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q/AOitRwIgx2wcOxZaIH/giphy.gif"
      alt="Not Found"
      class="mx-auto w-32 sm:w-40 md:w-48 lg:w-56"
    />
    <h1
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 mb-3"
    >
      Запрошення не знайдено
    </h1>
    <p class="text-sm sm:text-base md:text-lg text-gray-700 mb-4 max-w-xl">
      Вибачте, ми не змогли знайти запрошення з кодом "{{ userCode }}".
      <span class="block text-gray-500 text-xs sm:text-sm mt-2">
        Будь ласка, запитайте свій код у молодят чи спробуйте ще раз відкрити
        своє посилання на запрошення.
      </span>
    </p>
    <a
      href="/invitations/"
      class="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm sm:text-base"
      >Повернутися на головну сторінку</a
    >
  </div>
</template>

<style scoped>
/* Додаткові адаптивні стилі */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  button,
  a {
    touch-action: manipulation;
  }

  /* Покращення для тач-пристроїв */
  .hover\:rotate-1:hover,
  .hover\:-rotate-1:hover {
    transform: none;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Анімація для fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
