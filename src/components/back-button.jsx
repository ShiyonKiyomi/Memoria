//Added File - Perez


import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { colors } from "../theme";
import Svg, { Path } from 'react-native-svg';


export default function BackButton(){
    const nav = useRouter();
   
    return(
        <Pressable onPress={ () => nav.back() } hitSlop={14}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
                <Path
                fill={colors.textBody}
                d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"
                />
            </Svg>
        </Pressable>
    )
}

