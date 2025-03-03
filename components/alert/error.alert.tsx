import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { Text } from '../ui/text';
import { useQuery } from '@tanstack/react-query';
import { COLLECTIONS } from '@/constants/coleccions.fb';

interface Props {
    msg: string,
}

const ErrorAlert = ({ msg }: Props) => {

   const {refetch} = useQuery({
        queryKey:[COLLECTIONS.ESCUELAS]
    })

    return (
        <Alert icon={() => <MaterialIcons name="error-outline" size={24} color="black" />} variant='destructive' className='max-w-xl'>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
                {msg}
            </AlertDescription>
            <TouchableOpacity
                onPress={() => refetch()} // Reintentar la carga
                className="bg-red-500 flex justify-center items-center px-4 py-2 rounded">
                <Text className="text-white">Reintentar</Text>
            </TouchableOpacity>
        </Alert>
    )
}
{/* <Alert icon={Terminal} className='max-w-xl'>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can use a terminal to run commands on your computer.
        </AlertDescription>
      </Alert>
      <Alert icon={AlertTriangle} variant='destructive' className='max-w-xl'>
        <AlertTitle>Danger!</AlertTitle>
        <AlertDescription>
          High voltage. Do not touch. Risk of electric shock. Keep away from children.
        </AlertDescription>
      </Alert> */}
export default ErrorAlert