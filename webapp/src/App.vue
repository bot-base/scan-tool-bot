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
import { useI18n } from './composable/useI18n.ts'

const result = ref()

const { ready } = useWebApp()
const { onThemeChanged, colorScheme } = useWebAppTheme()
const { enableClosingConfirmation } = useWebAppClosingConfirmation()
const { changeLocale } = useI18n()

function setLocale() {
  const browserLanguageCode = navigator.language.slice(0, 2).toLowerCase()
  changeLocale(browserLanguageCode)
}

function updateTheme() {
  document.documentElement.setAttribute('data-theme', colorScheme.value)
}

watch(result, () => enableClosingConfirmation())
onThemeChanged(updateTheme)

setLocale()
updateTheme()
ready()
</script>