<template>
    <article>{{ props.value }}</article>
    <div>
        <div v-if="isValidLink">
            <button class="outline" @click="handleOpenLinkButton">
                <linkIcon class="icon" />
                Open link
            </button>
        </div>
        <div>
            <button @click="handleSendButton">
                <tgIcon class="icon" />
                Send
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWebAppNavigation } from 'vue-tg';
import { isValidUrl } from '../helpers/url.ts';
import linkIcon from '../assets/link.svg'
import tgIcon from '../assets/telegram.svg'

const props = defineProps<{ value: string }>();
const isValidLink = computed(() => isValidUrl(props.value))

const { openLink, switchInlineQuery } = useWebAppNavigation()

function handleOpenLinkButton() {
    openLink(props.value, {
        try_instant_view: true
    })
}

function handleSendButton() {
    const inlineSendResultPrefix = "# "
    switchInlineQuery(`${inlineSendResultPrefix}${props.value}`)
}
</script>

<style scoped>
.icon {
    height: 20px;
    width: 20px;
}
</style>