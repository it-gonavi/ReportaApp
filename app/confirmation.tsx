import React from 'react';
import { Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle2, CalendarDays, Zap } from 'lucide-react-native';
import { PrimaryButton, Screen } from '../src/components/kit';
import { colors } from '../src/theme/tokens';

export default function Confirmation() {
 const router=useRouter();
 return <Screen className="pt-20">
   <View className="items-center">
     <Image source={require('../assets/icons/png/success-medallion.png')} style={{width:180,height:180}}/>
     <Text className="text-3xl font-extrabold text-white mt-12">¡Reporte enviado!</Text>
     <Text className="text-center text-base mt-3 mb-9" style={{color:colors.muted}}>Tu reporte ha sido registrado en el sistema del NOC.</Text>
   </View>
   <View className="rounded-2xl border border-outline bg-surface p-5" style={{gap:16}}>
     <View><Text style={{color:colors.muted,fontSize:13}}>Número de reporte</Text><Text className="font-bold text-xl text-white mt-1">#10428</Text></View>
     <View className="h-px bg-outline"/>
     <View className="flex-row" style={{gap:10}}><Zap size={22} color={colors.electric}/><View><Text style={{color:colors.muted,fontSize:13}}>Tipo de evento</Text><Text className="font-semibold text-white">Corte de electricidad</Text></View></View>
     <View className="h-px bg-outline"/>
     <View className="flex-row" style={{gap:10}}><CalendarDays size={22} color="#E8F5FF"/><View><Text style={{color:colors.muted,fontSize:13}}>Fecha y hora</Text><Text className="font-semibold text-white">8 oct. 2024 · 10:24 a. m.</Text></View></View>
   </View>
   <View className="mt-7" style={{gap:12}}>
     <PrimaryButton title="Ver mi reporte" onPress={()=>router.replace('/report/10428')}/>
     <PrimaryButton title="Reportar otro evento" secondary onPress={()=>router.replace('/new-report')}/>
   </View>
 </Screen>;
}
