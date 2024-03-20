import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
};

// Method to add content to the database
export const putDb = async (content) => {
  try {
    console.log('database');
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add({ value: content });
    await tx.done;
    console.log('Content added to database:', content);
  } catch (error) {
    console.error('Error adding content to database:', error);
    throw error;
  }
};

// Method to get all the contents of the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    console.log('All content retrieved from database:', content);
    return content;
  } catch (error) {
    console.error('Error retrieving content from database:', error);
    throw error;
  }
};

// Initialize the database when loading the module
initdb();
