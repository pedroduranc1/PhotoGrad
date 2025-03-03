import { View, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    children: React.ReactNode;
    swipeReload?: () => void; // Método opcional para recargar la data
}



const SafeArea = ({ children, swipeReload }: Props) => {
    const { top } = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        if (swipeReload) {
            setRefreshing(true);
            swipeReload();
            setRefreshing(false);
        }
    }, [swipeReload]);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={{ marginTop: top }} className='flex-1'>
                {children}
            </View>
        </ScrollView>
    );
};

export default SafeArea;