import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, Plus } from 'lucide-react-native';
import { Brand, BottomNav, CategoryTile, ReportRow, Screen, SearchBar, SectionHeading, reports } from '../src/components/kit';
import { colors, incidentKinds } from '../src/theme/tokens';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  const router=useRouter();
  return <View className="flex-1 bg-background">
    <Screen className="pt-4">
      <View className="mb-6 flex-row items-center justify-between">
        <View><Text className="text-sm text-white">Hola,</Text>
        <Text className="text-2xl font-bold text-white">María López</Text>
        <Text style={{color:colors.muted,fontSize:11}}>Centro de Operaciones (NOC)</Text></View>
        <View className="flex-row items-center" style={{gap:16}}>
          <Bell size={22} color="#FFF"/>
          <View className="h-10 w-10 items-center justify-center rounded-full" style={{backgroundColor:'#6881B6'}}>
            <Text className="font-bold text-white">ML</Text>
          </View>
        </View>
      </View>
      <SearchBar/>
      <Pressable onPress={()=>router.push('/new-report')} className="mt-5 overflow-hidden rounded-2xl">
        <LinearGradient colors={[colors.cyan,colors.blue]} start={{x:0,y:0}} end={{x:1,y:0}}
          style={{paddingHorizontal:17,minHeight:65,flexDirection:'row',alignItems:'center',gap:13}}>
          <View className="h-9 w-9 items-center justify-center rounded-full bg-white"><Plus size={22} color={colors.blue}/></View>
          <View className="flex-1"><Text className="text-base font-extrabold text-white">Nuevo reporte</Text>
          <Text style={{color:'#EAF9FF',fontSize:11,marginTop:2}}>Reporta un incidente en segundos</Text></View>
          <ChevronRight size={23} color="white"/>
        </LinearGradient>
      </Pressable>
      <SectionHeading title="Tipos de eventos" action="Ver todos" onAction={()=>router.push('/new-report')}/>
      <View className="flex-row" style={{gap:7}}>
        {incidentKinds.map(k=><CategoryTile kind={k.id} key={k.id} compact onPress={()=>router.push('/new-report')}/>)}
      </View>
      <SectionHeading title="Reportes recientes" action="Ver todos" onAction={()=>router.push('/report/10428')}/>
      {reports.map(report=><ReportRow key={report.id} report={report} onPress={()=>router.push(`/report/${report.id}`)}/>)}
    </Screen>
    <BottomNav/>
  </View>;
}
