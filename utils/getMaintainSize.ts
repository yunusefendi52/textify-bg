export function getMaintainSize(
    originalWidth: number,
    originalHeight: number,
    newHeight: number
): { width: number; height: number } {
    if (originalWidth <= 0 || originalHeight <= 0 || newHeight <= 0) {
        throw new Error("All dimensions must be greater than zero.");
    }

    const aspectRatio = originalWidth / originalHeight;
    const newWidth = newHeight * aspectRatio;

    return {
        width: newWidth,
        height: newHeight,
    };
}