import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const EscuelaSkeleton = () => {
    return (
        <View className='w-full h-fit gap-2 mt-4'>
            <View className='w-full flex-row gap-2 '>
                <Skeleton className="w-14 h-10 bg-slate-300" />
                <Skeleton className="flex-1 h-10 bg-slate-300" />
            </View>

            <Skeleton className="flex-1 h-10 bg-slate-300" />

            <Skeleton className="w-1/2 h-10 bg-slate-300" />
        </View>
    )
}

export default EscuelaSkeleton