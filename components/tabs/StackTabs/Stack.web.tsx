import { Stack } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';

const StackNav = () => {
    const { height } = useWindowDimensions();
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
            <Stack.Screen
                name="escuela/add"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
            <Stack.Screen
                name="escuela/edit/[id]"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
            <Stack.Screen
                name="escuela/delete/[id]"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
            <Stack.Screen
                name="estudiante/add"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
            <Stack.Screen
                name="estudiante/edit/[id]"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
            <Stack.Screen
                name="estudiante/delete/[id]"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'formSheet',
                    sheetAllowedDetents: height > 700 ? [0.60] : 'fitToContents',
                    sheetGrabberVisible: true,
                    sheetCornerRadius: 12,
                    headerBlurEffect: 'dark',
                    contentStyle: {
                        borderColor: '#ffffff'
                    }
                }}
            />
        </Stack>
    );
};

export default StackNav;