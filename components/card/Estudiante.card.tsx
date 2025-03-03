import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { EstudianteInput } from '@/types/ValidationTypes'
import { H3, P } from '../ui/typography'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import useEscuelaStore from '@/store/useEscuelaStore'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'

interface EstudianteCardProps {
    item: EstudianteInput,
    editable?: boolean
}

const EstudianteCard = ({ item, editable }: EstudianteCardProps) => {
    const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';
    const Escuelas = useEscuelaStore((state) => state.escuelas)

    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/estudiante/${item.id}`)}
            className='w-60 mx-4 py-2 h-full'>
            <View className='flex flex-row gap-x-4 items-start'>
                <Avatar alt="Zach Nugent's Avatar">
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                        <Text>ZN</Text>
                    </AvatarFallback>
                </Avatar>
                <H3 className='truncate'>{item.nombre}</H3>
            </View>
            <View className='mt-3 flex-row justify-between'>
                <View className='flex-row gap-2 items-center'>
                    <FontAwesome6 size={14} name="school" color={"#000000"} />
                    <P>{Escuelas.find((escuela) => escuela.id === item.escuelaId)?.nombre}</P>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <FontAwesome6 name="door-open" size={14} color="black" />
                    <P>{item.grado}</P>
                </View>
            </View>
            <View className='mt-auto flex-row gap-x-2 items-center'>
                {editable && (
                    <View className='flex-1 flex-row gap-2 justify-end'>
                        <TouchableOpacity onPress={() => router.push(`/estudiante/edit/${item.id}`)}>
                            <MaterialIcons name="edit" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push(`/estudiante/delete/${item.id}`)}>
                            <MaterialIcons name="delete" size={18} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default EstudianteCard