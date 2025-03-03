import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { H3 } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'

interface Props {
    item: {
        id: string,
        nombre: string,
        paquete: string[]
    }
}

const PaqueteCard = ({ item }: Props) => {

    const router = useRouter();

    return (
        <View>
            <H3 className='mb-2'>{item.nombre}</H3>

            <FlatList
                data={item.paquete}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Badge className='bg-white border-input border mr-2 w-fit px-4 h-8 flex items-center justify-center'>
                        <Text className='text-[10px] web:text-lg font-bold'>{item}</Text>
                    </Badge>
                )}
            />

            <View className='flex flex-row mt-3 gap-2 justify-end'>
                <TouchableOpacity onPress={() => router.push(`/paquete/edit/${item.id}`)}>
                    <MaterialIcons name="edit" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/paquete/delete/${item.id}`)}>
                    <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaqueteCard