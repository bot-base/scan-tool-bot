<template>
  <MainButton :disabled="loading" :progress="loading" :color="themeParams.secondary_bg_color"
    :text-color="themeParams.text_color" :text="messages.qrScanner.openScanner" @click="openScanner" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  MainButton,
  useWebAppQrScanner,
  useWebAppTheme,
  useWebAppHapticFeedback,
} from 'vue-tg';
import { useI18n } from '../composable/useI18n.ts'

const result = defineModel()
const loading = ref(false);

const { impactOccurred } = useWebAppHapticFeedback();
const { onQrTextReceived, showScanQrPopup, closeScanQrPopup } =
  useWebAppQrScanner();
const { themeParams } = useWebAppTheme()
const { messages } = useI18n()

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
