<template>
  <div class="dropdown" @click="toggleDropdown" :id="dropdownId">
    <div class="dropdown-header">
      <span>{{ modelValue }}</span>
      <i class="arrow" :class="{ open: isOpen }"></i>
    </div>
    <ul v-if="isOpen" class="dropdown-list">
      <li
        v-for="currency in CURRENCIES"
        :key="currency"
        :class="{ active: currency === modelValue }"
        @click.stop="selectCurrency(currency)"
      >
        {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { CURRENCIES } from '@/config/currencies';
import { ref, watch, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const generateId = () => {
  return 'dropdown-' + Math.random().toString(36).slice(2, 11);
};

const dropdownId = ref(generateId());
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectCurrency = (currency: string) => {
  emit('update:modelValue', currency);
  isOpen.value = false;
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (!CURRENCIES.includes(newVal)) {
      emit('update:modelValue', CURRENCIES[0]);
    }
  },
);
const handleClickOutside = (event: Event) => {
  const parent = (event.target as HTMLElement).closest(`#${dropdownId.value}`);
  if (!parent) {
    isOpen.value = false;
  }
};
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
  cursor: pointer;
  user-select: none;
  color: black;
  height: 45px;
}

.dropdown-header {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  height: 100%;
}

.dropdown-header:hover {
  border-color: #888;
}

.arrow {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(45deg);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 5px 0 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.dropdown-list li {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-list li:hover,
.dropdown-list li.active {
  background-color: #f0f0f0;
  font-weight: bold;
}

.dropdown-list li.active {
  color: #007bff;
}
</style>
