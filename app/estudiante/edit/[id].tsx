import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import useEstudianteStore from '@/store/useEstudiantesStore';
import EstudianteForm from '@/components/form/estudiante.form';
import { View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Editar = () => {
  const { id } = useLocalSearchParams();

  const estudianteData = useEstudianteStore((state) => state.estudiantes.find((estudiante) => estudiante.id === id));

  useEffect(() => {
    if (!estudianteData) {
      // Aquí puedes manejar el caso en que no se encuentre la escuela
      console.error(`No se encontró la escuela con ID: ${id}`);
    }
  }, [id, estudianteData]);

  const router = useRouter();

  return (
    <View className='mt-5 px-3 relative gap-3'>
      <View className='web:w-[40%] web:mx-auto h-full  p-3'>
        <View className='absolute hidden web:block top-3 right-3'>
          <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
        </View>
        <EstudianteForm title='Actualizar Estudiante' data={estudianteData} />

      </View>
    </View>
  )
}

export default Editar