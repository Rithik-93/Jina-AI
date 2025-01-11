// import * as tf from '@tensorflow/tfjs';

// class ImageEmbeddingSystem {
//   constructor() {
//     this.model = null;
//     this.embeddings = [];
//     this.imageUrls = [];
//   }

//   async initialize() {
//     // Load MobileNet model
//     this.model = await tf.loadLayersModel(
//       'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/feature_vector/2/default/1',
//       { fromTFHub: true }
//     );
//   }

//   async preprocessImage(imageUrl) {
//     // Load the image
//     const img = await this.loadImage(imageUrl);
    
//     // Convert image to tensor and preprocess
//     const tensor = tf.browser.fromPixels(img)
//       .resizeBilinear([224, 224]) // MobileNet expects 224x224 images
//       .toFloat()
//       .expandDims();
    
//     // Normalize values to [-1, 1]
//     return tensor.div(127.5).sub(1);
//   }

//   loadImage(url) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//       img.src = url;
//     });
//   }

//   async getEmbedding(imageUrl) {
//     if (!this.model) {
//       throw new Error('Model not initialized. Call initialize() first.');
//     }

//     const tensor = await this.preprocessImage(imageUrl);
    
//     // Generate embedding
//     const embedding = tf.tidy(() => {
//       return this.model.predict(tensor);
//     });

//     // Convert to array and cleanup
//     const embeddingArray = await embedding.data();
//     tensor.dispose();
//     embedding.dispose();

//     return Array.from(embeddingArray);
//   }

//   async addImage(imageUrl) {
//     const embedding = await this.getEmbedding(imageUrl);
//     this.embeddings.push(embedding);
//     this.imageUrls.push(imageUrl);
//   }

//   async addImages(imageUrls) {
//     for (const url of imageUrls) {
//       await this.addImage(url);
//     }
//   }

//   cosineSimilarity(embedding1, embedding2) {
//     const dotProduct = embedding1.reduce((sum, a, i) => sum + a * embedding2[i], 0);
//     const norm1 = Math.sqrt(embedding1.reduce((sum, a) => sum + a * a, 0));
//     const norm2 = Math.sqrt(embedding2.reduce((sum, a) => sum + a * a, 0));
//     return dotProduct / (norm1 * norm2);
//   }

//   async search(queryImageUrl, k = 5) {
//     const queryEmbedding = await this.getEmbedding(queryImageUrl);
    
//     // Calculate similarities
//     const similarities = this.embeddings.map((embedding, index) => ({
//       imageUrl: this.imageUrls[index],
//       similarity: this.cosineSimilarity(queryEmbedding, embedding)
//     }));

//     // Sort by similarity and get top k results
//     return similarities
//       .sort((a, b) => b.similarity - a.similarity)
//       .slice(0, k);
//   }
// }

// // Example usage
// async function demo() {
//   try {
//     // Initialize the system
//     const embeddingSystem = new ImageEmbeddingSystem();
//     await embeddingSystem.initialize();
    
//     // Add some images to the database
//     const imageUrls = [
//       'https://example.com/image1.jpg',
//       'https://example.com/image2.jpg',
//       'https://example.com/image3.jpg'
//     ];
//     await embeddingSystem.addImages(imageUrls);
    
//     // Search for similar images
//     const queryImageUrl = 'https://example.com/query.jpg';
//     const results = await embeddingSystem.search(queryImageUrl, 3);
    
//     // Display results
//     console.log('Search Results:');
//     results.forEach((result, i) => {
//       console.log(`Match ${i + 1}:`);
//       console.log(`Image URL: ${result.imageUrl}`);
//       console.log(`Similarity: ${result.similarity.toFixed(4)}\n`);
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }