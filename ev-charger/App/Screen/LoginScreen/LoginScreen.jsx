import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
       
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error("OAuth error", err);
          }
    }

  return (
    <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80
    }}>
        <Image source={require('../../../assets/assets/logo.png')}
        style={styles.logoImage}
        />
        <Image source={require('../../../assets/assets/ev-charging.png')} 
        style={styles.bgImage}
        />
        <View style={{
            padding:20
        }}>
            <Text style={styles.heading} >Your Ultimate EV chargin Station Finder App</Text>
            <Text style={styles.description}>Find EV charging station near you, plan trip and so much more in just one click</Text>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'Outfit',
                    fontSize: 17,
                    fontWeight: 'bold',
                }}>Login With Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage: {
        width: 100,
        height: 100,
        objectFit: 'contain'
    },
    bgImage: {
        width: '100%',
        height: 320,
        marginTop:20,
        objectFit: 'cover'
    },
    heading: {
        fontSize: 25,
        fontFamily: 'Outfit-bold',
        textAlign: 'center',
        marginTop: 'center',
    },
    description: {
        fontSize: 17,
        fontFamily: 'Outfit',
        textAlign: 'center',
        marginTop: 15,
        color: Colors.GRAY,
    },
    button:{
        padding: 16,
        display: 'flex',
        borderRadius: 20,
        marginTop: 70,
        backgroundColor: 'forestgreen',
    }
})