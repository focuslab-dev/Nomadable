async function convertFileToImageElm(file: File) {
  const imgElm = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader && typeof reader.result === "string") {
        const imgElm = document.createElement("img");
        imgElm.style.display = "none";
        imgElm.src = reader.result;
        resolve(imgElm);
      }
    };
    reader.readAsDataURL(file);
  });

  return imgElm;
}

const convertImageFilesToElements = async (
  files: File[]
): Promise<HTMLImageElement[]> => {
  const imageElms: any[] = [];

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.match("image")) {
      const imgElm = await convertFileToImageElm(files[i]);
      imageElms.push(imgElm);
    }
  }

  return imageElms;
};

const getFilesFromDropEvent = (event: any): File[] => {
  const files: File[] = [];

  if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < event.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[i].kind === "file") {
        const file = event.dataTransfer.items[i].getAsFile();
        files.push(file);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < event.dataTransfer.files.length; i++) {
      files.push(event.dataTransfer.files[i]);
    }
  }

  return files;
};

const resizeCanvas = (
  canvas: HTMLCanvasElement,
  maxPixel: number,
  imgElm: HTMLImageElement
): HTMLCanvasElement => {
  const biggerWidth =
    imgElm.width > imgElm.height ? imgElm.width : imgElm.height;
  const ratio = biggerWidth > maxPixel ? maxPixel / biggerWidth : 1;

  canvas.width = ratio * imgElm.width;
  canvas.height = ratio * imgElm.height;

  const dx = 0;
  const dy = 0;
  const dWidth = canvas.width;
  const dHeight = canvas.height;

  const canvasContext = canvas.getContext("2d");
  if (canvasContext !== null) {
    canvasContext.drawImage(imgElm, dx, dy, dWidth, dHeight);
  }

  return canvas;
};

const convertImgElmsToBase64s = (
  imgElm: HTMLImageElement,
  maxPixel?: number
): string => {
  let dataURL;

  if (!maxPixel) {
    dataURL = imgElm.src;
  } else {
    const canvas = document.createElement("canvas");
    const canvasResized = resizeCanvas(canvas, maxPixel, imgElm);
    dataURL = canvasResized.toDataURL("image/jpg");
  }

  return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
};

export {
  convertImageFilesToElements,
  getFilesFromDropEvent,
  convertImgElmsToBase64s,
};
