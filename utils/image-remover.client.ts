import { AutoModel, AutoProcessor, env, PreTrainedModel, Processor, RawImage } from "@huggingface/transformers"

var model: PreTrainedModel | undefined
var processor: Processor | undefined

type ModelType = {
    model: PreTrainedModel
    processor: Processor
}

export function isModelCached() {
    return model && processor ? true : false
}

export async function loadModel(): Promise<ModelType> {
    // @ts-ignore
    if (!navigator.gpu) {
        throw new Error('WebGPU is not supported in this browser.')
    }

    if (!isModelCached()) {
        const model_id = 'briaai/RMBG-1.4'
        env.backends.onnx.wasm!.proxy = false
        model = await AutoModel.from_pretrained(model_id, {
            device: 'webgpu',
        })
        processor = await AutoProcessor.from_pretrained(model_id, {})
    }
    return {
        model: model!,
        processor: processor!,
    }
}

export async function imageRemover(imgUrl: string | URL, modelType: ModelType) {
    const { model, processor } = modelType
    const img = await RawImage.fromURL(imgUrl);
    const { pixel_values } = await processor!(img);
    const { output } = await model!({ input: pixel_values });
    const maskData = (
        await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(
            img.width,
            img.height,
        )
    ).data
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img.toCanvas(), 0, 0)
    const pixelData = ctx.getImageData(0, 0, img.width, img.height)
    for (let i = 0; i < maskData.length; ++i) {
        pixelData.data[4 * i + 3] = maskData[i]
    }
    ctx.putImageData(pixelData, 0, 0)
    return {
        originalImg: imgUrl,
        processedImg: canvas.toDataURL('image/png'),
    }
}