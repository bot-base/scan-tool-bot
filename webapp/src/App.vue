<template>
  <QrScanner v-model="result" />
  <main v-if="result" class="container-fluid">
    <ScanResult :value="result" />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWebApp, useWebAppTheme, useWebAppClosingConfirmation } from 'vue-tg';
import QrScanner from './components/QrScanner.vue'
import ScanResult from './components/ScanResult.vue'

const result = ref()

const { ready } = useWebApp()
const { onThemeChanged, colorScheme } = useWebAppTheme()
const { enableClosingConfirmation } = useWebAppClosingConfirmation()

function updateTheme() {
  document.documentElement.setAttribute('data-theme', colorScheme.value)
}

watch(result, () => enableClosingConfirmation())
onThemeChanged(updateTheme)

updateTheme()
ready()
</script>