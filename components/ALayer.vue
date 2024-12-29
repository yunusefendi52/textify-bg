<template>
    <div v-if="height <= 0 && width <= 0">

    </div>
    <template v-else>
        <Application :height="height" :width="width" :background-alpha="0">
            <sprite v-if="backgroundImage || rawImage" :texture="backgroundImage! || rawImage!" :height="height"
                :width="width" />
            <Text :anchor-x="0.5" :anchor-y="0.5" :x="width / 2" :y="height * verticalCenterPos" :style="{
                // fontFamily: 'Public Sans',
                fontStyle: 'italic',
                fontSize: fontSize,
                align: 'center',
                fill: '#ffda5a',
            }">{{ textBg || 'WELL' }}</Text>
            <sprite v-if="frontImage" :texture="frontImage" :height="height" :width="width" />
        </Application>
    </template>
</template>

<script setup lang="ts">
const height = ref(0)
const width = ref(0)

const props = defineProps<{
    rawImage: string | undefined,
    backgroundImage: string | undefined,
    frontImage: string | undefined,
    textBg: string | undefined,
    verticalCenterPos: number,
    fontSize: number,
}>()

watchEffect(() => {
    const image = props.rawImage
    if (image) {
        var img = new Image
        img.onload = function () {
            const size = getMaintainSize(img.naturalWidth, img.naturalHeight, 628)
            height.value = size.height
            width.value = size.width
        }
        img.src = image
    }
})
</script>