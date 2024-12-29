<template>
    <div>
         <!-- Need something like layering in image editor -->
        <div class="border-t-red-300">
            <div class="absolute">
                <img :src="backgroundImage || rawImage" draggable="false" ondragstart="return false;" width="400">
            </div>
            <div class="absolute" :style="{
                left: '7%',
                // transform: 'translate(-50%, -50%)',
                top: '300px',
                // 'position': 'absolute',
                // 'margin-left': 'auto',
                // 'margin-right': 'auto',
                // 'left': '0',
                // 'right': '0',
                // 'text-align': 'center',
                // zIndex: 2,
                color: 'red',
                // textAlign: 'center',
                // backgroundColor: 'red',
                // zIndex: 0, 
            }">
                <span class="text-xl select-none">{{ 'textBg' }}</span>
            </div>
            <div class="absolute">
                <img :src="frontImage" draggable="false" ondragstart="return false;" width="400">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { rawImage, frontImage, backgroundImage, } = defineProps<{
    rawImage: string | undefined,
    backgroundImage: string | undefined,
    frontImage: string | undefined,
    textBg: string | undefined,
}>()
</script>