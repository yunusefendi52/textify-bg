<template>
    <UButton label="Pick Your Photo" @click="pickImage" />
    <UButton label="Draw" @click="draw" />
    <input ref="fileEl" type="file" accept="image/*" @change="previewFiles" hidden>
    <canvas ref="canvasEl"></canvas>
</template>

<script setup lang="ts">
const configKonva = {
    width: 200,
    height: 200
}
const configCircle = {
    x: 100,
    y: 100,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
}
const fileEl = ref<HTMLInputElement>()
const canvasEl = ref<HTMLCanvasElement>()
function previewFiles(_: Event) {
    const file = fileEl.value!.files![0]!
    var img = new Image;
    img.onload = function () {
        const ctx = canvasEl.value!.getContext("2d")!
        canvasEl.value!.height = img.naturalHeight
        canvasEl.value!.width = img.naturalWidth
        ctx.drawImage(img, 0, 0)
    }
    img.src = URL.createObjectURL(file);
}
function pickImage() {
    fileEl.value?.showPicker()
}

function draw() {
    const ctx = canvasEl.value!.getContext("2d")!;
    ctx.fillStyle = "green";
    ctx.fillText(text, x, y)
    ctx.clearRect(x, y, w, h)
}
</script>