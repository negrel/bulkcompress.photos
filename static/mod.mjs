// import Vips from '/static/vendor/vips-es6.js';
//
// console.time("vips")
// const vips = await Vips();
// console.timeEnd("vips")
//
// console.log(vips)
//
// window.compress = async (imageFile, quality) => {
//   let image = vips.Image.newFromBuffer(await imageFile.arrayBuffer())
//   console.log(imageFile.type)
//
//   let result = null
//   switch (imageFile.type) {
//     case "image/png":
//       result = image.writeToBuffer('.png', {
//         Q: 1,
//         compression: 9,
//         filter: "sub",
//         palette: true,
//         bitdepth: 8,
//         interlace: false,
//       })
//       break
//
//     case "image/jpg", "image/jpeg":
//     default:
//       result = image.writeToBuffer('.jpg', { Q: quality })
//   }
//
//   image.delete()
//   return result
// }

// import { compress as photonCompress, PhotonImage } from "/vendor/photon.js";
// import { compress, Image } from "/vendor/img_compress.js";
//
// window.compress = async (imageFile, quality) => {
//   const array = new Uint8Array(await imageFile.arrayBuffer());
//   let image = Image.new_from_byteslice(array);
//
//   image = compress(image, quality);
//
//   const result = image.get_bytes(quality);
//   // image.free();
//
//   return result;
// };

// window.compress = async (imageFile, quality) => {
//   const array = new Uint8Array(await imageFile.arrayBuffer());
//   let image = PhotonImage.new_from_byteslice(array);
//
//   image = photonCompress(image, quality);
//
//   const result = image.get_bytes(quality);
//   image.free();
//
//   return result;
// };

const offscreenCanvas = new OffscreenCanvas(4096, 4096);

window.compress = async (imageFile, quality) => {
  const ctx = offscreenCanvas.getContext("2d");

  ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  const bitmap = await createImageBitmap(imageFile);
  offscreenCanvas.width = bitmap.width;
  offscreenCanvas.height = bitmap.height;
  ctx.drawImage(bitmap, 0, 0);

  const blob = await offscreenCanvas.convertToBlob({
    type: imageFile.type,
    quality: quality / 100,
  });
  return blob.arrayBuffer();

  // return new Promise((resolve, reject) => {
  //   offscreenCanvas.toBlob(async (blob) => {
  //     resolve(await blob.arrayBuffer())
  //   }, imageFile.type, quality / 100)
  // })
};
