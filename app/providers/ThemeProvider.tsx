import { useEffect } from "react";
import { useColorScheme as useSystemScheme } from "react-native";
import { useColorScheme as useTailwindColorScheme } from "nativewind";

export default function ThemeProvider({children}: {children: React.ReactNode}){
    const systemScheme:any = useSystemScheme()
    const {setColorScheme}=useTailwindColorScheme()
 
    useEffect(()=>{
        setColorScheme(systemScheme)
    },[systemScheme])

    return <>{children}</>
}

