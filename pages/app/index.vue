<template>
    <input ref="fileInput" type="file" hidden accept="image/*" @change="fileInputChange">
    <div class="px-5 py-4 flex flex-row gap-2 items-center">
        <span class="text-3xl font-medium flex-1">textify-bg</span>
    </div>
    <div class="max-w-7xl m-auto">
        <div class="flex h-[620px] flex-row gap-2 p-5 justify-center">
            <div class="flex-1 flex flex-col gap-2">
                <div class="flex flex-row gap-2 items-center">
                    <UButton label="Pick Image" @click="pickImage" />
                    <UButton label="Start Process" @click="processImage" :loading="isLoading" />
                    <span v-if="isLoadingModel">Downloading processor</span>
                </div>
                <ALayer class="flex-1" :raw-image="rawImage" :background-image="backgroundImage"
                    :front-image="frontImage" :text-bg="textBg" :vertical-center-pos="verticalCenterPos"
                    :fontSize="fontSize" />
            </div>
            <div class="flex flex-col w-[300px] gap-4">
                <span class="text-xl font-bold">SETTINGS</span>
                <UInput v-model="textBg" placeholder="Text in background" size="lg" />
                <div class="flex flex-col gap-3">
                    <span class="text-sm">Center Vertical Position</span>
                    <USlider :step="0.05" :min="0" :max="1" v-model="verticalCenterPos" />
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-sm">Font Size</span>
                    <UInputNumber v-model="fontSize" />
                </div>
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
const verticalCenterPos = ref(0.2)
const fontSize = ref(132)

function pickImage() {
    fileInput.value!.click()
}

function fileInputChange() {
    const file = fileInput.value?.files
    if (file) {
        rawImage.value = URL.createObjectURL(file.item(0)!)
    }
}

const isLoading = ref()
const isLoadingModel = ref()

async function processImage() {
    if (!rawImage.value) {
        return
    }
    isLoading.value = true

    try {
        if (!isModelCached()) {
            isLoadingModel.value = true
        }
        const modelType = await loadModel()
        isLoadingModel.value = false
        const p = await imageRemover(rawImage.value, modelType)
        backgroundImage.value = p.originalImg.toString()
        frontImage.value = p.processedImg
    } finally {
        isLoadingModel.value = false
        isLoading.value = false
    }
}
</script>