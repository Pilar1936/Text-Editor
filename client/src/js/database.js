import { openDB } from 'idb';
// Function to initialize the database
// Función para inicializar la base de datos
const initdb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        } else {
          console.log('jate database already exists');
        }
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
// Method to add content to the database
// Método para agregar contenido a la base de datos
export const putDb = async (content) => {
  try {
    console.log('database');
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ value: content }); // Se omite la clave primaria 'id' para que se autoincremente
    const result = await request;
    console.log("data saved, you did it!", result.value);
    await tx.done; 
  } catch (error) {
    console.error('Error saving content to database:', error);
    throw error;
  }
};
// Method to get all the contents of the database
// Método para obtener todo el contenido de la base de datos
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = await store.getAll();
    console.log('All content retrieved from database:', request);
    return request;
  } catch (error) {
    console.error('Error retrieving content from database:', error);
    throw error;
  }
};
// Initialize the database when loading the module
// Inicializar la base de datos al cargar el módulo
initdb();
