import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { PaqueteInput } from '@/types/ValidationTypes';
import { Button } from '../ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fab from '../fab/Fab';
import EstudianteCard from '../card/Estudiante.card';


interface Props {
    data?: PaqueteInput
}

const ModalPaquete = ({ data }: Props) => {
    const [IS_OPEN, setIS_OPEN] = useState(false)

    
    return (
        <AlertDialog open={IS_OPEN}>
            <AlertDialogTrigger asChild>
                <TouchableOpacity onPress={() => setIS_OPEN(true)}>
                    

                </TouchableOpacity>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-1/2 relative'>
                <Button className='w-fit h-fit bg-transparent ml-auto ' onPress={() => setIS_OPEN(false)}>
                    <AntDesign name="closesquareo" size={24} color="black" />
                </Button>
                

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ModalPaquete