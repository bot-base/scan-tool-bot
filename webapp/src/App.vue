<template>
  <div class="layout">
    <qrcode-stream :track="onTrack" @decode="onDecode" @init="onInit">
      <div class="layout loading" v-if="loading">
        <v-progress-circular :size="100" :width="10" color="grey" indeterminate></v-progress-circular>
      </div>
    </qrcode-stream>
    <v-snackbar v-model="result" :multiline="true" :timeout="-1" :top="true">
      {{ result }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { WebApp } from "@grammyjs/web-app";
import { QrcodeStream } from "vue-qrcode-reader";

const loading = ref(true);
const theme = ref(WebApp.themeParams);
const result = ref();
const error = ref();

const onDecode = (data) => {
  result.value = data;

  WebApp.MainButton.setParams({
    text: 'SAVE',
    color: theme.value.button_color,
    is_active: true,
  })
  WebApp.MainButton.hideProgress()
};

const onInit = async (promise) => {
  try {
    await promise;

    WebApp.MainButton.setParams({
      text: 'Point camera at QR code',
      color: theme.value.hint_color,
      is_active: false,
      is_visible: true
    })
    WebApp.MainButton.showProgress()
  } catch (err) {
    if (err.name === "NotAllowedError") {
      error.value = "Error: You need to grant camera access permission";
    } else if (err.name === "NotFoundError") {
      error.value = "Error: No camera on this device";
    } else if (err.name === "NotSupportedError") {
      error.value = "Error: Secure context required (HTTPS, localhost)";
    } else if (err.name === "NotReadableError") {
      error.value = "Error: Is the camera already in use?";
    } else if (err.name === "OverconstrainedError") {
      error.value = "Error: Installed cameras are not suitable";
    } else if (err.name === "StreamApiNotSupportedError") {
      error.value = "Error: Stream API is not supported in this browser";
    } else if (err.name === "InsecureContextError") {
      error.value =
        "Error: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
    } else {
      error.value = `Error: Camera error (${err.name})`;
    }
    setTimeout(() => WebApp.close(), 5000)
  } finally {
    loading.value = false;
  }
};

const onTrack = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "grey";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
};

const onSave = () => {
  WebApp.sendData(result.value)
}

watch(error, async (newValue, oldValue) => {
  WebApp.MainButton.setParams({
    text: newValue,
    color: '#ff0000',
    is_active: false,
    is_visible: true
  })
})

onMounted(() => {
  WebApp.onEvent('mainButtonClicked', onSave)
})

onBeforeUnmount(() => {
  WebApp.offEvent('mainButtonClicked', onSave)
})
</script>

<style scoped>
.layout {
  height: var(--tg-viewport-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  color: var(--tg-theme-text-color);
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
</style>
