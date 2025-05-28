import { db } from "../../admin_fire.js";

export const write = async (location, data) => {
  try { 
    const ref = db.ref(location); 
    await ref.set(data);
   console.log(`Data successfully written to ${location}`);
  } catch (error) {
    console.error(`Error writing data to ${location}:`, error);
    throw error;
  }
};

export const read = async (location) => {
  try {
    const ref = db.ref(location);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      console.log(`Data successfully read from ${location}`);
      return snapshot.val();
    } else {
      console.log(`No data found at ${location}`);
      return null;
    }
  } catch (error) {
    console.error(`Error reading data from ${location}:`, error);
    throw error;
  }
};

export const update = async (location, newData) => {
  try {
    const ref = db.ref(location);
    await ref.update(newData);
    console.log(`Data successfully updated at ${location}`);
  } catch (error) {
    console.error(`Error updating data at ${location}:`, error);
    throw error;
  }
};