const onnx = require('onnxjs');

// Load the ONNX model
const session = new onnx.InferenceSession();
await session.loadModel("./resnet50.onnx");

// Preprocess image (resize, normalize, convert to tensor)
// Use a library like TensorFlow.js or manual preprocessing.

// Run inference
const inputTensor = new onnx.Tensor(preprocessedData, "float32", [1, 3, 224, 224]);
const output = await session.run([inputTensor]);

// Extract embedding from the output tensor
console.log("Image Embedding:", output.values());
