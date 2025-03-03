import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { H3, H4, P } from '@/components/ui/typography'
import useEstudianteStore from '@/store/useEstudiantesStore'
import useEscuelaStore from '@/store/useEscuelaStore'

const Estudiante = () => {
    const { id } = useLocalSearchParams()
    const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

    const Estudiante = useEstudianteStore((state) => state.estudiantes.find(estudiante => estudiante.id === id))
    const Escuela = useEscuelaStore((state) => state.escuelas.find(escuela => escuela.id === Estudiante?.escuelaId))

    return (
        <View className='w-full h-full  '>
            <View className='bg-gray-500/30 pb-3 rounded-b-3xl flex items-center pt-5 w-full h-fit'>
                <Image
                    source={{uri:GITHUB_AVATAR_URI}}
                    className='rounded-full'
                    style={{
                        width:130,
                        height:130,
                        objectFit:'cover',
                    }}
                />

                <H3>{Estudiante?.nombre}</H3>

                <P className='mt-3'>Informacion Personal</P>

                <View className='flex flex-row px-4 mt-3 justify-between w-full h-fit'>
                    <H4 className='text-[14px]'>Escuela: {Escuela?.nombre}</H4>
                    <H4 className='text-[14px]'>Grado: {Estudiante?.grado}</H4>
                </View>
                <View className='flex flex-row px-4 mt-1 justify-between w-full h-fit'>
                    <H4 className='text-[14px]'>Periodo: {Escuela?.periodo}</H4>
                    <H4 className='text-[14px]'>Contacto: {Estudiante?.contacto}</H4>
                </View>
            </View>

            <H3 className='mt-3 px-3 text-center'>Paquete</H3>
            <H3 className='mt-3 px-3 text-center'>Pagos</H3>

        </View>
    )
}

export default Estudiante