<template>
    <input ref="fileInput" type="file" hidden accept="image/*" @change="fileInputChange">
    <div class="p-5 flex flex-row gap-2 items-center">
        <span class="text-3xl font-medium flex-1">textify-bg</span>
    </div>
    <div class="flex h-[620px] flex-row gap-2 p-5">
        <div class="flex-1 flex flex-col gap-2">
            <div class="flex flex-row gap-2">
                <UButton label="Pick Image" @click="pickImage" />
                <UButton label="Start Process" @click="processImage" />
            </div>
            <ALayer class="flex-1" :raw-image="rawImage" :background-image="backgroundImage" :front-image="frontImage"
                :text-bg="textBg" />
        </div>
        <div class="flex flex-col w-[300px] gap-3">
            <UInput v-model="textBg" placeholder="Text in background" size="lg" />
            <div class="flex flex-col gap-3">
                <span class="text-sm">Text Vertical Position</span>
                <USlider />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement>()

const rawImage = ref<string>()
const backgroundImage = ref<string>()
const frontImage = ref<string>()
const textBg = ref('')

function pickImage() {
    fileInput.value!.click()
}

function fileInputChange() {
    const file = fileInput.value?.files
    if (file) {
        rawImage.value = URL.createObjectURL(file.item(0)!)
    }
}

const isReady = ref()

async function processImage() {
    if (!rawImage.value) {
        return
    }

    const modelType = await loadModel()
    isReady.value = true
    const p = await imageRemover(rawImage.value, modelType)
    backgroundImage.value = p.originalImg.toString()
    frontImage.value = p.processedImg
}
</script>