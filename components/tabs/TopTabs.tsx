import { View, Text } from 'react-native'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { H3 } from '../ui/typography';


const TopTabs = () => {
    const [value, setValue] = useState('pagados');
    return (
        <View>
            <Tabs
                value={value}
                onValueChange={setValue}
                className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
            >
                <TabsList className='flex-row w-full'>
                    <TabsTrigger value='pagados' className='flex-1'>
                        <Text>Pagos</Text>
                    </TabsTrigger>
                    <TabsTrigger value='faltan pagar' className='flex-1'>
                        <Text>Falta Pagar</Text>
                    </TabsTrigger>
                    <TabsTrigger value='sin pagar' className='flex-1'>
                        <Text>Sin Pagar</Text>
                    </TabsTrigger>


                </TabsList>
                <TabsContent value='pagados'>
                    <H3>Pagados</H3>
                </TabsContent>
                <TabsContent value='faltan pagar'>
                    <H3>Faltan pagar</H3>
                </TabsContent>
                <TabsContent value='sin pagar'>
                    <H3>Sin pagar</H3>
                </TabsContent>
            </Tabs>
        </View>
    )
}

export default TopTabs