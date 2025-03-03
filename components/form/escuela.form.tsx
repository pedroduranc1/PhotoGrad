import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EscuelaInput } from '@/types/ValidationTypes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useEscuelaStore from '@/store/useEscuelaStore';
import crearEscuela from '@/api/Escuelas/create'; // Servicio para crear la escuela
import actualizarEscuela from '@/api/Escuelas/update'; // Servicio para actualizar la escuela
import { COLLECTIONS } from '@/constants/coleccions.fb';
import { useRouter } from 'expo-router';

type EscuelaFormProp = {
    escuela?: EscuelaInput;
};

const EscuelaForm = ({ escuela }: EscuelaFormProp) => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EscuelaInput>({
        defaultValues: {
            id: escuela?.id || '',
            nombre: escuela?.nombre || '',
            periodo: escuela?.periodo || '2024-2025',
            estudiantes: escuela?.estudiantes || 0,
            secciones: escuela?.secciones || 0,
        },
    });

    const queryClient = useQueryClient();
    const addEscuela = useEscuelaStore((state) => state.addEscuela);
    const updateEscuela = useEscuelaStore((state) => state.updateEscuela);

    const [IS_UPDATING, setIS_UPDATING] = useState(escuela ? true : false)

    // Mutación para crear o actualizar la escuela
    const mutation = useMutation({
        mutationFn: async (nuevaEscuela: EscuelaInput) => {
            if (IS_UPDATING) {
                // Llamar al servicio de actualizar escuela
                await actualizarEscuela(nuevaEscuela.id!!, nuevaEscuela);
                return nuevaEscuela.id!!;
            } else {
                return await crearEscuela(nuevaEscuela);
            }
        },
        onError: (error) => {
            console.error('Error al crear/actualizar la escuela:', error);
        },
    });

    const onSubmit: SubmitHandler<EscuelaInput> = (data: EscuelaInput) => {
        mutation.mutate(data, {
            onSuccess: (result) => {
                if (IS_UPDATING) {
                    updateEscuela(data); // Actualizar la escuela en el store
                } else {
                    addEscuela(data); // Agregar la nueva escuela al store
                    // Invalidar la caché de React Query (opcional, si usas React Query para obtener las escuelas)
                    queryClient.invalidateQueries({ queryKey: [COLLECTIONS.ESCUELAS] });
                }
                router.dismiss();
            },
        });
    };

    return (
        <View className='gap-4'>
            {/* Campo: Nombre */}
            <Controller
                control={control}
                name='nombre'
                rules={{
                    required: 'El nombre es obligatorio',
                    validate: (value) => value.trim() !== '' || 'El nombre no puede estar vacío',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Input
                            className={`${errors.nombre && 'border-red-500 bg-red-300 placeholder:text-white'}`}
                            placeholder='Nombre de la escuela'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.nombre && (
                            <Text className='text-red-500'>{errors.nombre.message}</Text>
                        )}
                    </View>
                )}
            />

            {/* Campo: Secciones */}
            <Controller
                control={control}
                name='secciones'
                rules={{
                    required: 'Las secciones son obligatorias',
                    validate: (value) => value > 0 || 'Las secciones no pueden ser cero',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Input
                            className={`${errors.secciones && 'border-red-500 bg-red-300 placeholder:text-white'}`}
                            keyboardType='number-pad'
                            placeholder='Secciones'
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(Number(text))}
                            value={value.toString()}
                        />
                        {errors.secciones && (
                            <Text className='text-red-500'>{errors.secciones.message}</Text>
                        )}
                    </View>
                )}
            />

            {/* Campo: Estudiantes */}
            <Controller
                control={control}
                name='estudiantes'
                rules={{
                    required: 'Los estudiantes son obligatorios',
                    validate: (value) => value > 0 || 'Los estudiantes no pueden ser cero',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Input
                            className={`${errors.estudiantes && 'border-red-500 bg-red-300 placeholder:text-white'}`}
                            keyboardType='number-pad'
                            placeholder='Estudiantes'
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(Number(text))}
                            value={value.toString()}
                        />
                        {errors.estudiantes && (
                            <Text className='text-red-500'>{errors.estudiantes.message}</Text>
                        )}
                    </View>
                )}
            />

            {/* Botón de enviar */}
            <Button
                onPress={handleSubmit(onSubmit)}
                className='bg-ph_primary'
                disabled={mutation.isPending} // Deshabilitar el botón mientras se carga
            >
                {mutation.isPending ? (
                    <Text className='font-bold text-white'>Creando...</Text> // Mostrar loader
                ) : (
                    <Text className='font-bold text-white'> {escuela ? 'Actualizar Escuela' : 'Crear Escuela'}</Text>
                )}
            </Button>
        </View>
    );
};

export default EscuelaForm;