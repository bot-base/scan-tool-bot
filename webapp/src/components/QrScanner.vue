<template>
  <MainButton :disabled="loading" :progress="loading" :color="themeParams.secondary_bg_color" text="Open Scanner"
    @click="openScanner" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  MainButton,
  useWebAppQrScanner,
  useWebAppTheme,
  useWebAppHapticFeedback,
} from 'vue-tg';

const result = defineModel()
const loading = ref(false);

const { impactOccurred } = useWebAppHapticFeedback();
const { onQrTextReceived, showScanQrPopup, closeScanQrPopup } =
  useWebAppQrScanner();
const { themeParams } = useWebAppTheme()

function openScanner() {
  loading.value = true;
  try {
    showScanQrPopup({});
  } catch {
    // handle error if popup is already open
  }
  setTimeout(() => {
    loading.value = false;
  }, 3000);
}

function onResult({ data }: { data: string }) {
  impactOccurred('heavy');
  result.value = data
  closeScanQrPopup();
}

onQrTextReceived(onResult);

openScanner()
</script>
