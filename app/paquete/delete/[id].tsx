import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import remove from '@/api/Estudiante/delete';
import { H3, H4, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import usePaqueteStore from '@/store/usePaqueteStore';
import { COLLECTIONS } from '@/constants/coleccions.fb';

const Delete = () => {

  const { id } = useLocalSearchParams();
  const Paquetes = usePaqueteStore((state) => state.paquetes)

  const router = useRouter();

  const deletePaquete = usePaqueteStore((state) => state.deletePaquete);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      // Invalidar y refetch las queries relacionadas con las escuelas
      deletePaquete(Paquetes.find(paquete => paquete.id === id)?.id!!);
      queryClient.invalidateQueries({ queryKey: [COLLECTIONS.PAQUETES] });
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
      <H4 className='text-center'>Paquete: {Paquetes.find(paquete => paquete.id === id)?.nombre}</H4>
      <P className='text-center text-gray-400'>Al eliminar esta paquete no hay marcha atras</P>

      <Button
        className='bg-red-500 mt-4 disabled:bg-red-500/70'
        disabled={deleteMutation.isPending}
        onPress={() => { deleteMutation.mutate(Paquetes.find(paquete => paquete.id === id)?.id!!) }}>
        {
          deleteMutation.isPending
            ? <Text className='text-white font-bold'>Eliminando...</Text>
            : <Text className='text-white font-bold'>Eliminar {Paquetes.find(paquete => paquete.id === id)?.nombre}</Text>
        }

      </Button>
    </View>
  )
}

export default Delete