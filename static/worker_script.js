function workerProcedureHandler(
  procedures,
  postMessage,
) {
  return async (event) => {
    console.debug(
      `rpc ${event.data.id} received: ${JSON.stringify(event.data)}`,
    );

    try {
      const procedure = procedures[event.data.name];
      if (typeof procedure !== "function") {
        throw new Error(`procedure "${event.data.name}" doesn't exist`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await procedure(...event.data.args);

      console.debug(`rpc ${event.data.id} done: ${JSON.stringify(result)}`);

      postMessage(
        {
          id: event.data.id,
          result,
        },
        [],
      );
    } catch (err) {
      console.error(`rpc ${event.data.id} error: ${err}`);

      postMessage(
        {
          id: event.data.id,
          error: err,
        },
        [],
      );
    }
  };
}

self.onmessage = workerProcedureHandler({
  setupWorker(workedId) {
    console.debug("worker", workedId, "setup");
  },
  async compress(imageFile, { quality, maxWidth, maxHeight }) {
    const bitmap = await createImageBitmap(imageFile);
    let drawWidth = bitmap.width;
    let drawHeight = bitmap.height;

    // Resize image if overflow.
    const xOverflow = drawWidth - maxWidth;
    const yOverflow = drawHeight - maxHeight;
    if (xOverflow > 0 || yOverflow > 0) {
      const resizeOnX = xOverflow > yOverflow;
      if (resizeOnX) {
        drawHeight = Math.round(drawHeight * (maxWidth / drawWidth));
        drawWidth = maxWidth;
      } else {
        drawWidth = Math.round(drawWidth * (maxHeight / drawHeight));
        drawHeight = maxHeight;
      }
    }

    const offscreenCanvas = new OffscreenCanvas(drawWidth, drawHeight);
    const ctx = offscreenCanvas.getContext("2d");

    ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    ctx.drawImage(bitmap, 0, 0, drawWidth, drawHeight);

    const blob = await offscreenCanvas.convertToBlob({
      type: imageFile.type,
      quality: quality / 100,
    });

    return blob.arrayBuffer();
  },
}, self.postMessage.bind(self));
