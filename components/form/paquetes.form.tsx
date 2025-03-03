import { TextInput, View, Text, Platform } from 'react-native';
import React, { useState } from 'react';
import { H3 } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreatePaquete from "@/api/Paquetes/create";
import UpdatePaquete from "@/api/Paquetes/update";
import { COLLECTIONS } from '@/constants/coleccions.fb';
import { useRouter } from 'expo-router';
import usePaqueteStore from '@/store/usePaqueteStore';
import { PaqueteInput } from '@/types/ValidationTypes';

interface Props {
    title: string,
    data?: PaqueteInput,
    onFinshed?: () => void;
}

const PaquetesForm = ({ title, data, onFinshed }: Props) => {
    console.log(data);
    const router = useRouter();
    const [IS_UPDATING] = useState(data ? true : false);

    interface FormValues {
        id: string;
        nombre: string;
        paquete: string[];
    }

    const addPaquete = usePaqueteStore((state) => state.addPaquete);
    const updatePaquete = usePaqueteStore((state) => state.updatePaquete);

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            id: data?.id || '',
            nombre: data?.nombre || '',
            paquete: Array.isArray(data?.paquete) ? data.paquete.map((paquetes: string) => `- ${paquetes}\n`) : []
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (nuevoPaquete: PaqueteInput) => {
            console.log(nuevoPaquete)
            if (IS_UPDATING) {
                await UpdatePaquete(nuevoPaquete.id, nuevoPaquete);
            } else {
                await CreatePaquete(nuevoPaquete);
            }
        },
        onError: (error) => {
            console.error('Error al crear/actualizar el paquete:', error);
        },
    });

    const onSubmit: SubmitHandler<any> = (data: any) => {
        // Asegúrate de que `data.paquete` sea un array
        const paqueteArray = Array.isArray(data.paquete)
            ? data.paquete // Si ya es un array, úsalo directamente
            : typeof data.paquete === 'string'
                ? data.paquete.split('\n').map((item: string) => item.trim().replaceAll("- ","")) // Si es una cadena, divídela en un array
                : []; // Si no es ni un array ni una cadena, usa un array vacío

        // Crear el objeto PaqueteInfo
        let PaqueteInfo = {
            id: data.id,
            nombre: data.nombre,
            paquete: paqueteArray
                .filter((paquete: any) => paquete !== "" && paquete !== undefined) // Filtra elementos vacíos o undefined
                .map((paquete: any) => paquete.trim()), // Elimina espacios en blanco alrededor de cada elemento
        };

        // Ejecutar la mutación
        mutation.mutate(PaqueteInfo, {
            onSuccess: () => {
                if (IS_UPDATING) {
                    updatePaquete(PaqueteInfo); // Actualizar el paquete en el store
                } else {
                    addPaquete(PaqueteInfo); // Agregar el nuevo paquete al store
                    queryClient.invalidateQueries({ queryKey: [COLLECTIONS.PAQUETES] });
                }
                if (Platform.OS === "web") {
                    if (onFinshed) {
                        onFinshed(); // Llamar a la función onFinshed si existe
                    }
                } else {
                    router.dismiss(); // Cerrar el modal en mobile
                }
            },
        });
    };

    return (
        <View className='gap-4 web:mt-0 mt-10 px-3'>
            <H3 className='text-center'>{title}</H3>
            <Controller
                control={control}
                name="nombre"
                rules={{ required: 'El nombre es obligatorio' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder='Nombre del paquete'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${errors.nombre && 'border-red-500 bg-red-300 placeholder:text-white'}`}
                    />
                )}
            />
            <Controller
                control={control}
                name="paquete"
                rules={{ required: 'El nombre es obligatorio' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={Array.isArray(value) ? value.join("\n") : value} // Convierte el array a una cadena con saltos de línea
                        multiline
                        numberOfLines={6}
                        className='border-input border rounded-md h-40 placeholder:flex placeholder:items-start text-xl px-3 text-gray-500'
                    />
                )}
            />

            <Button
                onPress={handleSubmit(onSubmit)}
                className='bg-ph_primary disabled:bg-ph_primary/50'
                disabled={mutation.isPending}
            >
                {
                    IS_UPDATING
                        ? (
                            <>
                                {mutation.isPending
                                    ? <Text className='text-white font-bold'>Actualizando Paquete...</Text>
                                    : <Text className='text-white font-bold'>Actualizar Paquete</Text>}
                            </>
                        )
                        : (
                            <>
                                {mutation.isPending
                                    ? <Text className='text-white font-bold'>Creando Paquete...</Text>
                                    : <Text className='text-white font-bold'>Crear Paquete</Text>}
                            </>
                        )
                }
            </Button>
        </View>
    );
};

export default PaquetesForm;