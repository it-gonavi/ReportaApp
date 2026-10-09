import React from 'react';
import {
  Image, ImageBackground, Pressable, ScrollView, Text, TextInput, View,
  type ImageSourcePropType, type TextInputProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft, ArrowRight, Bell, Check, ChevronRight, CloudRain,
  Droplet, FileText, Home, MapPin, Plus, Search, UserRound, Zap, Route,
} from 'lucide-react-native';
import { colors, incidentKinds, type IncidentKind } from '../theme/tokens';

const assets = {
  logo: require('../../assets/images/noc-original-mark-transparent.png'),
  hero: require('../../assets/images/photo-city-onboarding.png'),
  eventPower: require('../../assets/images/event-electricity-dashboard.png'),
  eventWater: require('../../assets/images/event-water-dashboard.png'),
  eventRoad: require('../../assets/images/event-road-dashboard.png'),
  eventTree: require('../../assets/images/event-tree-dashboard.png'),
  map: require('../../assets/maps/map-report.png'),
  trackingMap: require('../../assets/maps/map-status.png'),
} as const;
export { assets };

export function Screen({ children, scroll = true, className = '' }: {
  children: React.ReactNode; scroll?: boolean; className?: string;
}) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {scroll ? (
        <ScrollView className="flex-1" contentContainerClassName={`px-6 pb-9 ${className}`}
          keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : <View className={`flex-1 px-6 ${className}`}>{children}</View>}
    </SafeAreaView>
  );
}

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <View className="flex-row items-center" style={{ gap: 10 }}>
      <Image source={assets.logo} style={{ width: large ? 65 : 42, height: large ? 65 : 42 }} resizeMode="contain" />
      <View>
        <Text className="font-extrabold tracking-tight text-white" style={{ fontSize: large ? 36 : 26, lineHeight: large ? 39 : 28 }}>NOC</Text>
        <Text style={{ color: colors.text, fontSize: large ? 10 : 8 }}>Centro de Operaciones</Text>
      </View>
    </View>
  );
}

export function PrimaryButton({ title, onPress, secondary = false, disabled = false }: {
  title: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.55 : 1 }}>
      {secondary ? (
        <View className="h-14 items-center justify-center rounded-2xl border border-outline bg-surface">
          <Text className="font-semibold text-white">{title}</Text>
        </View>
      ) : (
        <LinearGradient colors={[colors.cyan, colors.blue, '#0871F9']} start={{x:0,y:0}} end={{x:1,y:0}}
          style={{ minHeight: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
          <Text className="text-base font-bold text-white">{title}</Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </LinearGradient>
      )}
    </Pressable>
  );
}

export function Field({ label, multiline, ...props }: TextInputProps & { label: string }) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-white">{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        selectionColor={colors.cyan}
        multiline={multiline}
        className={`rounded-xl border border-outline bg-surface px-4 py-3 text-sm text-white ${multiline ? 'min-h-28' : 'min-h-14'}`}
        style={multiline ? { textAlignVertical: 'top' } : undefined}
        {...props}
      />
    </View>
  );
}

export function CategoryIcon({ kind, size = 25 }: {kind: IncidentKind; size?: number}) {
  const p = incidentKinds.find(k => k.id === kind)!;
  if (kind === 'electric') return <Zap size={size} fill={p.tint} color={p.tint} strokeWidth={1.5}/>;
  if (kind === 'water') return <Droplet size={size} fill={p.tint} color="#77AEFF" strokeWidth={1.5}/>;
  if (kind === 'road') return <Route size={size} color={p.tint} strokeWidth={3}/>;
  return <CloudRain size={size} color={p.tint} strokeWidth={2.8}/>;
}

export function CategoryTile({ kind, selected, onPress, compact = false }: {
  kind: IncidentKind; selected?: boolean; onPress?: () => void; compact?: boolean;
}) {
  const p = incidentKinds.find(k => k.id === kind)!;
  return (
    <Pressable onPress={onPress} className="flex-1 rounded-xl items-center justify-center"
      style={{ backgroundColor: p.bg, borderColor: selected ? p.tint : '#233B58', borderWidth: selected ? 1.5 : 0.75,
        minHeight: compact ? 83 : 100, minWidth: 65, gap: 10 }}>
      <CategoryIcon kind={kind} size={compact ? 25 : 30}/>
      <Text style={{ color: colors.text, fontWeight: '600', fontSize: compact ? 11 : 12 }}>{p.name}</Text>
    </Pressable>
  );
}

export function SectionHeading({ title, action, onAction }: {title: string;action?: string;onAction?:()=>void}) {
  return (
    <View className="mt-6 mb-3 flex-row justify-between items-center">
      <Text className="text-base font-bold text-white">{title}</Text>
      {action ? <Pressable onPress={onAction}><Text className="text-xs text-cyan">{action}</Text></Pressable> : null}
    </View>
  );
}

export type Status = 'En proceso' | 'Abierto' | 'En revisión' | 'Resuelto';
export const reports = [
  { id: '10428', title: 'Corte de electricidad', address: 'Av. Principal, Zona Centro', time: 'Hace 12 min', status: 'En proceso' as Status, photo: assets.eventPower, kind: 'electric' as IncidentKind },
  { id: '10429', title: 'Inundación en calle', address: 'Calle 12, Sector Norte', time: 'Hace 1 hora', status: 'Abierto' as Status, photo: assets.eventWater, kind: 'water' as IncidentKind },
  { id: '10430', title: 'Semáforo fuera de servicio', address: 'Av. Libertad y 5 de Mayo', time: 'Hace 3 horas', status: 'En revisión' as Status, photo: assets.eventRoad, kind: 'road' as IncidentKind },
  { id: '10431', title: 'Árbol caído', address: 'Av. Robles, Col. Centro', time: 'Hace 5 horas', status: 'Resuelto' as Status, photo: assets.eventTree, kind: 'climate' as IncidentKind },
];

export function StatusPill({ status }: {status: Status}) {
  const styles = {
    'En proceso': [colors.warning, '#3B310A'],
    'Abierto': ['#75B4FF', '#0D458D'],
    'En revisión': ['#FFD2AD', '#A94B09'],
    'Resuelto': ['#B5FDE4', '#0B765E'],
  } as const;
  const [fg, bg] = styles[status];
  return <View style={{ borderRadius: 30, backgroundColor: bg, paddingVertical: 5, paddingHorizontal: 8 }}>
    <Text style={{ color: fg, fontWeight: '700', fontSize: 10 }} numberOfLines={1}>{status}</Text>
  </View>;
}

export function ReportRow({ report, onPress }: {report: typeof reports[number];onPress?:()=>void}) {
  return (
    <Pressable onPress={onPress} className="mb-2.5 flex-row items-center rounded-xl bg-surface p-2.5" style={{ gap: 9 }}>
      <Image source={report.photo} style={{height: 54, width: 54, borderRadius: 9}} resizeMode="cover"/>
      <View className="flex-1" style={{gap: 3}}>
        <Text numberOfLines={1} className="text-xs font-bold text-white">{report.title}</Text>
        <Text numberOfLines={1} style={{color:colors.muted,fontSize:10}}>{report.address}</Text>
        <Text style={{color:colors.muted,fontSize:10}}>{report.time}</Text>
      </View>
      <StatusPill status={report.status}/>
    </Pressable>
  );
}

export function SearchBar() {
  return (
    <View className="h-12 flex-row items-center rounded-3xl bg-surface px-4" style={{gap:12}}>
      <Search size={20} color={colors.text}/>
      <TextInput placeholder="Buscar reportes, zonas, direcciones..." className="flex-1 text-xs text-white"
        placeholderTextColor={colors.muted}/>
    </View>
  );
}

export function AppTopBar({ title, back = true }: {title:string;back?:boolean}) {
  const router=useRouter();
  return (
    <View className="mb-7 mt-3 h-10 flex-row items-center justify-between">
      {back ? <Pressable onPress={() => router.back()} hitSlop={12}><ArrowLeft size={22} color="white"/></Pressable> : <View style={{width:22}}/>}
      <Text className="text-base font-bold text-white">{title}</Text><View style={{width:22}}/>
    </View>
  );
}

export function ReportSteps({ step }: {step: 1|2|3}) {
  const steps=['Evento','Detalles','Confirmar'];
  return <View className="flex-row justify-between mb-7">
    {steps.map((label,index)=><View className="items-center flex-1" key={label}>
      <View className="h-8 w-8 rounded-full items-center justify-center"
        style={{backgroundColor:index+1<=step?colors.blue:'#273A56'}}>
        <Text className="font-bold text-white">{index+1}</Text>
      </View>
      <Text style={{color:index+1<=step?colors.cyan:colors.muted,marginTop:7,fontSize:11}}>{label}</Text>
    </View>)}
  </View>;
}

export function LocationMap({ tracking = false, onPress }: {tracking?:boolean;onPress?:()=>void}) {
  return <Pressable onPress={onPress} className="overflow-hidden rounded-2xl border border-outline">
    <Image source={tracking?assets.trackingMap:assets.map} resizeMode="cover" style={{width:'100%',height:tracking?190:145}}/>
  </Pressable>;
}

export function BottomNav({ active = 'Inicio' }: {active?:'Inicio'|'Reportes'|'Mapa'|'Perfil'}) {
  const router=useRouter();
  const tabs = [
    {name:'Inicio',icon:Home,to:'/dashboard'},
    {name:'Reportes',icon:FileText,to:'/dashboard'},
    {name:'Nuevo',icon:Plus,to:'/new-report'},
    {name:'Mapa',icon:MapPin,to:'/dashboard'},
    {name:'Perfil',icon:UserRound,to:'/dashboard'},
  ] as const;
  return <View className="flex-row items-center justify-around border-t border-outline pt-3 pb-3 bg-background">
    {tabs.map(tab=>{
      const Icon=tab.icon; const isNew=tab.name==='Nuevo'; const isActive=tab.name===active;
      return <Pressable key={tab.name} onPress={()=>router.push(tab.to as any)} className="items-center justify-center" style={{width:56,gap:5}}>
        {isNew ? <LinearGradient colors={[colors.blue,colors.cyan]}
          style={{height:48,width:48,borderRadius:26,alignItems:'center',justifyContent:'center'}}>
          <Plus color="white" size={27}/>
        </LinearGradient> : <Icon color={isActive?colors.cyan:colors.muted} size={20} />}
        {!isNew&&<Text style={{fontSize:10,color:isActive?colors.cyan:colors.muted}}>{tab.name}</Text>}
      </Pressable>
    })}
  </View>;
}

export function Timeline() {
 const events=[
  {label:'Reporte recibido', detail:'El incidente fue registrado.',date:'8 oct. 2024 · 10:24 a. m.',active:true},
  {label:'En proceso',detail:'Se asignó un equipo de respuesta.',date:'8 oct. 2024 · 10:40 a. m.',active:true},
  {label:'En resolución',detail:'Equipo en la zona.',date:'Pendiente',active:false},
 ];
 return <View className="mt-2">{events.map((e,i)=><View key={e.label} className="flex-row" style={{gap:14,minHeight:83}}>
  <View className="items-center" style={{width:18}}>
    <View style={{width:17,height:17,borderRadius:9,backgroundColor:e.active?(i===0?colors.blue:colors.warning):'#465B7D',borderWidth:3,borderColor:'#A8DFFF'}}/>
    {i<events.length-1&&<View style={{flex:1,width:2,backgroundColor:i===0?colors.warning:'#465B7D'}}/>}
  </View>
  <View className="flex-1 pb-3">
    <Text style={{fontWeight:'700',color:i===1?colors.warning:colors.text}}>{e.label}</Text>
    <Text style={{color:colors.muted,fontSize:12,marginTop:4}}>{e.detail}</Text>
    <Text style={{color:colors.muted,fontSize:11,marginTop:4}}>{e.date}</Text>
  </View>
 </View>)}</View>
}
