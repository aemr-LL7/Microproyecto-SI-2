import { clubsCollection } from './ruta/de/tu/archivo'; // Ajusta la ruta de importación según sea necesario

// Obtener los datos de los clubes una vez y almacenarlos en la constante clubes
export const obtenerClubes = async () => {
  const clubesSnapshot = await clubsCollection.get();
  console.log(clubesSnapshot);
  return clubesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

