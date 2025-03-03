import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useEscuelaStore from '@/store/useEscuelaStore';
import { H3 } from '@/components/ui/typography';
import EscuelaForm from '@/components/form/escuela.form';
import AntDesign from '@expo/vector-icons/AntDesign';

const EditEscuela = () => {
    const { id } = useLocalSearchParams();
    const escuelaData = useEscuelaStore((state) => state.escuelas.find((escuela) => escuela.id === id));

    const router = useRouter();

    useEffect(() => {
        if (!escuelaData) {
            // Aquí puedes manejar el caso en que no se encuentre la escuela
            console.error(`No se encontró la escuela con ID: ${id}`);
        }
    }, [id, escuelaData]);

    return (
        <View className='mt-5 px-3  relative gap-3'>
            <View className='web:w-[40%] gap-4 web:mx-auto p-3'>
                <View className='absolute ios:hidden android:hidden  top-3 right-3'>
                    <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
                </View>
                <H3 className='font-bold text-center'>Actualizar Escuela</H3>
                <EscuelaForm escuela={escuelaData} />
            </View>


        </View>
    );
};

export default EditEscuela;