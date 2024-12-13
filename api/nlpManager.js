import fs from 'fs';
import csvParser from 'csv-parser';
import { NlpManager } from '@nlpjs/nlp';

const manager = new NlpManager({ languages: ['en'] });

// Load dataset from CSV
fs.createReadStream('path/to/your/dataset.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    const { Text, Intent } = row; // Assuming column names are 'Text' and 'Intent'
    manager.addDocument('en', Text, Intent);
  })
  .on('end', async () => {
    console.log('Dataset loaded. Training...');
    await manager.train();
    console.log('Training complete. Ready to process inputs.');

    // Test the trained model
    const response = await manager.process('en', 'morning prayer for guidance');
    console.log(`Intent: ${response.intent}, Confidence: ${response.score}`);
  });
