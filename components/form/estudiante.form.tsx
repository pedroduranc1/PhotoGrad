import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useEscuelaStore from '@/store/useEscuelaStore';
import { H3 } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import DropdownComponent from '@/components/dropdown/Dropdown';
import { Button } from '@/components/ui/button';
import { EstudianteInput } from '@/types/ValidationTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import crearEstudiante from '@/api/Estudiante/create';
import actualizarEstudiante from '@/api/Estudiante/update';
import { useRouter } from 'expo-router';
import { COLLECTIONS } from '@/constants/coleccions.fb';
import useEstudianteStore from '@/store/useEstudiantesStore';

interface Props {
  title: string;
  data?: EstudianteInput;
}

const EstudianteForm = ({ title, data }: Props) => {
  const [IS_UPDATING] = useState(!!data);
  const Escuelas = useEscuelaStore((state) => state.escuelas);

  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: data?.id || '',
      nombre: data?.nombre ? `${data.nombre}` : '',
      contacto: data?.contacto || '',
      escuelaId: data?.escuelaId || '', // Usar el id de la escuela
      gradoId: data?.grado.split(' ')[0] || '',
      seccion: data?.grado.split(' ')[2] || '',
    },
  });

  const queryClient = useQueryClient();
  const addEstudiante = useEstudianteStore((state) => state.addEstudiante);
  const updateEstudiante = useEstudianteStore((state) => state.updateEstudiante);

  const mutation = useMutation({
    mutationFn: async (nuevaEscuela: any) => {
      if (IS_UPDATING) {
        // Llamar al servicio de actualizar escuela
        const EstudiantesData = {
          id: nuevaEscuela.id,
          nombre: `${nuevaEscuela.nombre}`,
          contacto: nuevaEscuela.contacto,
          escuelaId: nuevaEscuela.escuelaId,
          grado: `${nuevaEscuela.gradoId} - ${nuevaEscuela.seccion}`,
        };
        await actualizarEstudiante(EstudiantesData.id!!, EstudiantesData);
        return EstudiantesData;
      } else {
        const EstudiantesData = {
          nombre: `${nuevaEscuela.nombre}`,
          contacto: nuevaEscuela.contacto,
          escuelaId: nuevaEscuela.escuelaId,
          grado: `${nuevaEscuela.gradoId} - ${nuevaEscuela.seccion}`,
        };
        return await crearEstudiante(EstudiantesData);
      }
    },
    onError: (error) => {
      console.error('Error al crear/actualizar la escuela:', error);
    },
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutation.mutate(data, {
      onSuccess: (result) => {
        if (IS_UPDATING) {
          updateEstudiante(data); // Actualizar la escuela en el store
        } else {
          addEstudiante(data); // Agregar la nueva escuela al store
          queryClient.invalidateQueries({ queryKey: [COLLECTIONS.ESTUDIANTES] });
        }
        router.dismiss();
      },
    });
  };

  return (
    <View className='gap-4 mt-10 px-3'>
      <H3 className='text-center'>{title}</H3>

      <Controller
        control={control}
        name="nombre"
        rules={{ required: 'El nombre es obligatorio' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder='Nombre del estudiante'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className={`${errors.nombre && 'border-red-500 bg-red-300 placeholder:text-white'}`}
          />
        )}
      />

      <Controller
        control={control}
        name="contacto"
        rules={{ required: 'El número de teléfono es obligatorio' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder='Número de teléfono'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className={`${errors.contacto && 'border-red-500 bg-red-300 placeholder:text-white'}`}
          />
        )}
      />

      <Controller
        control={control}
        name="escuelaId"
        rules={{ required: 'La escuela es obligatoria' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropdownComponent
            data={Escuelas}
            placeholder='Escuela'
            onBlur={onBlur}
            onChange={onChange}
            value={value} // Pasar el id de la escuela
          />
        )}
      />

      <View className='w-full h-fit flex-row gap-2'>
        <View className='w-2/3 h-full'>
          <Controller
            control={control}
            name="gradoId"
            rules={{ required: 'El grado es obligatorio' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DropdownComponent
                data={[
                  { nombre: '5to', id: '5to' },
                  { nombre: '6to', id: '6to' },
                  { nombre: 'Prescolar', id: 'prescolar' },
                ]}
                placeholder='Grado'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className='w-1/3 h-fit flex justify-center pr-2'>
          <Controller
            control={control}
            name="seccion"
            rules={{ required: 'La sección es obligatoria' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='A,B,C'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className={`${errors.seccion && 'border-red-500 bg-red-300 placeholder:text-white'}`}
              />
            )}
          />
        </View>
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        className='bg-ph_primary disabled:bg-ph_primary/50'
        disabled={mutation.isPending}
      >
        {IS_UPDATING ? (
          <>
            {mutation.isPending ? (
              <Text className='text-white font-bold'>Actualizando Estudiante...</Text>
            ) : (
              <Text className='text-white font-bold'>Actualizar Estudiante</Text>
            )}
          </>
        ) : (
          <>
            {mutation.isPending ? (
              <Text className='text-white font-bold'>Creando Estudiante...</Text>
            ) : (
              <Text className='text-white font-bold'>Crear Estudiante</Text>
            )}
          </>
        )}
      </Button>
    </View>
  );
};

export default EstudianteForm;