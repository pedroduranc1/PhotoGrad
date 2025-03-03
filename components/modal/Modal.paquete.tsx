import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import PaquetesForm from '../form/paquetes.form';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PaqueteInput } from '@/types/ValidationTypes';
import { Button } from '../ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { H3, H4, P } from '../ui/typography';
import usePaqueteStore from '@/store/usePaqueteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import remove from '@/api/Paquetes/delete';
import { COLLECTIONS } from '@/constants/coleccions.fb';
import Fab from '../fab/Fab';


interface Props {
    data?: PaqueteInput,
    typeOfModal: 'create' | 'update' | 'delete'
}

const ModalPaquete = ({ data, typeOfModal }: Props) => {
    const [IS_OPEN, setIS_OPEN] = useState(false)

    const Paquetes = usePaqueteStore((state) => state.paquetes)

    const deletePaquete = usePaqueteStore((state) => state.deletePaquete);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: remove,
        onSuccess: () => {
            // Invalidar y refetch las queries relacionadas con las escuelas
            deletePaquete(Paquetes.find(paquete => paquete.id === data?.id)?.id!!);
            queryClient.invalidateQueries({ queryKey: [COLLECTIONS.PAQUETES] });
            setIS_OPEN(false)
        },
        onError: (error) => {
            console.error('Error al eliminar la escuela:', error);
        },
    });

    return (
        <AlertDialog open={IS_OPEN}>
            <AlertDialogTrigger asChild>
                <TouchableOpacity onPress={() => setIS_OPEN(true)}>
                    {
                        typeOfModal === "create" && (<Fab onPress={() => { setIS_OPEN(true) }}>
                            <AntDesign
                                name="pluscircle"
                                size={42}
                                color="#28d18d"
                            />
                        </Fab>)
                    }

                    {
                        typeOfModal === "update" && (<MaterialIcons name="edit" size={24} color="black" />)
                    }

                    {
                        typeOfModal === "delete" && (<MaterialIcons name="delete" size={24} color="red" />)
                    }

                </TouchableOpacity>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-1/2 relative'>
                <Button className='w-fit h-fit bg-transparent ml-auto ' onPress={() => setIS_OPEN(false)}>
                    <AntDesign name="closesquareo" size={24} color="black" />
                </Button>
                {
                    typeOfModal === "create" && (
                        <PaquetesForm
                            title='Crear Paquete'
                            onFinshed={() => setIS_OPEN(false)}
                        />)
                }

                {
                    typeOfModal === "update" && (
                        <PaquetesForm
                            title='Editar Paquete'
                            data={data}
                            onFinshed={() => setIS_OPEN(false)}
                        />)
                }

                {
                    typeOfModal === "delete" && (
                        <View className='px-3   relative '>
                            <H3 className='text-center'>Estas Seguro?</H3>
                            <H4 className='text-center'>Paquete: {Paquetes.find(paquete => paquete.id === data?.id)?.nombre}</H4>
                            <P className='text-center text-gray-400'>Al eliminar esta paquete no hay marcha atras</P>

                            <Button
                                className='bg-red-500 mt-4 disabled:bg-red-500/70'
                                disabled={deleteMutation.isPending}
                                onPress={() => { deleteMutation.mutate(Paquetes.find(paquete => paquete.id === data?.id)?.id!!) }}>
                                {
                                    deleteMutation.isPending
                                        ? <Text className='text-white font-bold'>Eliminando...</Text>
                                        : <Text className='text-white font-bold'>Eliminar {Paquetes.find(paquete => paquete.id === data?.id)?.nombre}</Text>
                                }

                            </Button>
                        </View>)
                }

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ModalPaquete