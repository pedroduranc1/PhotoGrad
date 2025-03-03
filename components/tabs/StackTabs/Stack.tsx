import { Stack } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';

const routes = [
    {
        name: '(tabs)',
        component: require('@/app/(tabs)').default,
    },
    {
        name: 'escuela/add',
        component: require('@/app/escuela/add').default,
    },
    {
        name: 'escuela/edit/[id]',
        component: require('@/app/escuela/edit/[id]').default,
    },
    {
        name: 'escuela/delete/[id]',
        component: require('@/app/escuela/delete/[id]').default,
    },
    {
        name: 'estudiante/add',
        component: require('@/app/estudiante/add').default,
    },
    {
        name: 'estudiante/[id]',
        component: require('@/app/estudiante/[id]').default,
    },
    {
        name: 'estudiante/edit/[id]',
        component: require('@/app/estudiante/edit/[id]').default,
    },
    {
        name: 'estudiante/delete/[id]',
        component: require('@/app/estudiante/delete/[id]').default,
    },
    {
        name: 'paquete/add',
        component: require('@/app/paquete/add').default,
    },
    {
        name: 'paquete/edit/[id]',
        component: require('@/app/paquete/edit/[id]').default,
    },
    {
        name: 'paquete/delete/[id]',
        component: require('@/app/paquete/delete/[id]').default,
    },
]

const StackNav = () => {
    const { height } = useWindowDimensions()
    return (
        <Stack>
            {
                routes.map((route) => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        options={{
                            headerShown: false,
                            presentation: Platform.OS === 'web' ? 'card' : 'formSheet',
                            sheetAllowedDetents: height > 700 ? route.name.includes('/delete') ? [0.35] : [0.60] : 'fitToContents',
                            sheetGrabberVisible: true,
                            sheetCornerRadius: 12,
                            headerBlurEffect: 'dark',
                            contentStyle: {
                                borderColor: '#ffffff'
                            }
                        }}
                    />))
            }
        </Stack>
    )
}

export default StackNav