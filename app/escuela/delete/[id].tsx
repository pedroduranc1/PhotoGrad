import { View, Text } from 'react-native'
import React from 'react'
import useEscuelaStore from '@/store/useEscuelaStore'
import { H3, H4, P } from '@/components/ui/typography'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import remove from '@/api/Escuelas/delete'
import AntDesign from '@expo/vector-icons/AntDesign'

const Delete = () => {
    const { id } = useLocalSearchParams();
    const Escuelas = useEscuelaStore((state) => state.escuelas)

    const router = useRouter();

    const deleteEscuela = useEscuelaStore((state) => state.deleteEscuela);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: remove,
        onSuccess: () => {
            // Invalidar y refetch las queries relacionadas con las escuelas
            deleteEscuela(Escuelas.find(escuela => escuela.id === id)?.id!!);
            queryClient.invalidateQueries({ queryKey: ['escuelas'] });
            router.dismiss()
        },
        onError: (error) => {
            console.error('Error al eliminar la escuela:', error);
        },
    });
    return (
        <View className='mt-5 px-3 relative gap-3'>
            <View className='web:w-[40%] web:mx-auto h-full  p-3'>
                <View className='absolute hidden web:block top-3 right-3'>
                    <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
                </View>
            
            <H3 className='text-center'>Estas Seguro?</H3>
            <H4 className='text-center'>Escuela: {Escuelas.find(escuela => escuela.id === id)?.nombre}</H4>
            <P className='text-center text-gray-400'>Al eliminar esta escuela no hay marcha atras</P>

            <Button 
            className='bg-red-500 mt-4 disabled:bg-red-500/70' 
            disabled={deleteMutation.isPending}
            onPress={() => { deleteMutation.mutate(Escuelas.find(escuela => escuela.id === id)?.id!!) }}>
                {
                    deleteMutation.isPending 
                    ? <Text className='text-white font-bold'>Eliminando...</Text> 
                    : <Text className='text-white font-bold'>Eliminar {Escuelas.find(escuela => escuela.id === id)?.nombre}</Text>
                }
                
            </Button>
            </View>
        </View>
    )
}

export default Delete