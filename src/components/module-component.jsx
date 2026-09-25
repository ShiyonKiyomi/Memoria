//Added File - Perez


import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme";
import { fontSizes, fontWeights } from "../theme";


export function BookEntry({path, id, book, title}) {
    const nav = useRouter();


    return(
        <Pressable onPress={() => nav.push(path)} hitSlop={12} style={styles.bookbutton}>
             <View style={styles.line} />
             <View style={styles.booktextarea}>
             <Text style={styles.idtext}>{book}</Text>
             <Text style={styles.titletext}>{title}</Text>
             </View>
        </Pressable>
    )
}


//Ignore this, unfinished function
export function ModuleEntry({path, id, module, title}){
    const nav = useRouter();


    return(
        <Pressable onPress={() => nav.push(path)} hitSlop={12} style={styles.modulebutton}>
            <View style={styles.moduleimage}/>
            <View style={styles.moduletextarea}>
            <Text style={styles.idtext}>MODULE {module}</Text>
            <Text style={styles.titletext}>{title}</Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    line: {
        justifyContent: 'center',
        margin: 10,
        height: '80%',
        width: '1%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },


    bookbutton: {
        height: '12%',
        width: '90%',
        backgroundColor: colors.primaryTint8,
        margin: 15,
        flexDirection: 'row',
        borderRadius: 16,


    },


    modulebutton: {
        height: '30%',
        width: '42%',
        flexDirection: 'column',
        borderRadius: 16,
        margin: 10,
    },


    //Placeholder for now
    moduleimage: {
        height: '55%',
        width: '100%',
        backgroundColor: '#A665DF59',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },


    booktextarea: {
        alignSelf: 'center',
        flexDirection: 'column',
        height: '80%',
        width: '90%',
        paddingBottom: 10,
    },


    moduletextarea: {
        height: '45%',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },


    idtext: {
        color: colors.textMuted,
        fontWeight: fontWeights.medium,
    },


    titletext: {
        color: colors.textDark,
        fontSize: fontSizes.cardTitle,
        fontWeight: fontWeights.medium,
    }
})

