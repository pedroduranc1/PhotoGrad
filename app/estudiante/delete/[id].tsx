import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import useEstudianteStore from '@/store/useEstudiantesStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import remove from '@/api/Estudiante/delete';
import { H3, H4, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';

const Delete = () => {

  const { id } = useLocalSearchParams();
  const Estudiantes = useEstudianteStore((state) => state.estudiantes)

  const router = useRouter();

  const deleteEstudiante = useEstudianteStore((state) => state.deleteEstudiante);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      // Invalidar y refetch las queries relacionadas con las escuelas
      deleteEstudiante(Estudiantes.find(estudiante => estudiante.id === id)?.id!!);
      queryClient.invalidateQueries({ queryKey: ['escuelas'] });
      router.dismiss()
    },
    onError: (error) => {
      console.error('Error al eliminar la escuela:', error);
    },
  });

  return (
    <View className='px-3 web:w-[40%] web:mx-auto relative mt-5'>
      <View className='absolute ios:hidden android:hidden  top-3 right-3'>
        <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
      </View>
      <H3 className='text-center'>Estas Seguro?</H3>
      <H4 className='text-center'>Escuela: {Estudiantes.find(escuela => escuela.id === id)?.nombre}</H4>
      <P className='text-center text-gray-400'>Al eliminar esta escuela no hay marcha atras</P>

      <Button
        className='bg-red-500 mt-4 disabled:bg-red-500/70'
        disabled={deleteMutation.isPending}
        onPress={() => { deleteMutation.mutate(Estudiantes.find(escuela => escuela.id === id)?.id!!) }}>
        {
          deleteMutation.isPending
            ? <Text className='text-white font-bold'>Eliminando...</Text>
            : <Text className='text-white font-bold'>Eliminar {Estudiantes.find(escuela => escuela.id === id)?.nombre}</Text>
        }

      </Button>
    </View>
  )
}

export default Delete