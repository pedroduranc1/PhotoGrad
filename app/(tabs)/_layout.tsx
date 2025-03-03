
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text } from '~/components/ui/text';

export default function TabLayout() {
    const Seticons = (ruta: string, focused: boolean) => {
        if (ruta === 'index') {
          return <FontAwesome6 size={20} name="school" color={focused ? "#28d18d" : "#c8ccca"} />
        }
        if (ruta === 'estudiantes') {
          return <Fontisto size={20} name="person" color={focused ? "#28d18d" : "#c8ccca"} />
        }
        if (ruta === 'inicio') {
          return <Entypo size={20} name="home" color={focused ? "#28d18d" : "#c8ccca"} />
        }
        if (ruta === 'paquetes') {
          return <Feather size={20} name="package" color={focused ? "#28d18d" : "#c8ccca"} />
        }
        if (ruta === 'pagos') {
          return <MaterialIcons size={20} name="payments" color={focused ? "#28d18d" : "#c8ccca"} />
        }
      }
    return (
        <Tabs initialRouteName='inicio'

            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarIconStyle: styles.tabBarIcon,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: '#28d18d',
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Escuelas',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {Seticons('index', focused)}
                            <Text className={`first-letter:uppercase mt-1 text-[10px] ${focused ? "text-ph_primary" : "text-gray-500"}`}>{'Escuelas'}</Text>
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='estudiantes'
                options={{
                    title: 'Estudiantes',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {Seticons('estudiantes', focused)}
                            <Text className={`first-letter:uppercase mt-1 text-[10px] ${focused ? "text-ph_primary" : "text-gray-500"}`}>{'Estudiantes'}</Text>
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='inicio'
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {Seticons('index', focused)}
                            <Text className={`first-letter:uppercase mt-1 text-[10px] ${focused ? "text-ph_primary" : "text-gray-500"}`}>{'Inicio'}</Text>
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='paquetes'
                options={{
                    title: 'Paquetes',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {Seticons('paquetes', focused)}
                            <Text className={`first-letter:uppercase mt-1 text-[10px] ${focused ? "text-ph_primary" : "text-gray-500"}`}>{'Paquetes'}</Text>
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name='pagos'
                options={{
                    title: 'Pagos',
                    tabBarIcon: ({ focused }) => (
                        <>
                            {Seticons('pagos', focused)}
                            <Text className={`first-letter:uppercase mt-1 text-[10px] ${focused ? "text-ph_primary" : "text-gray-500"}`}>{'Pagos'}</Text>
                        </>
                    ),
                }}
            />
        </Tabs>
    );
}


const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        width: "90%",
        bottom: 20,
        left: 20,
        right: 20,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        elevation: 10,
        paddingBottom: 10,
        marginHorizontal: "5%",
    },
    tabBarIcon: {
        marginTop: 5,
        width:'100%',
        height:'100%'
    },
    tabBarLabel: {
        fontSize: 10,
        marginBottom: 5,
        display: "none"
    },
});