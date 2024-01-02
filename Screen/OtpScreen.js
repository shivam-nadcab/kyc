// OTP.js
import React, { useState } from 'react';
import { initializeApp } from '@react-native-firebase/app';

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const OtpScreen = ({ route }) => {
    const { confirmation } = route.params;
    const [otp, setOtp] = useState('');

    const handleVerify = async () => {
        try {
            // Verify the entered OTP
            const credential = auth.PhoneAuthProvider.credential(
                confirmation.verificationId,
                otp
            );
            await auth().signInWithCredential(credential);

            // If verification is successful, display an alert
            Alert.alert('Success', 'OTP is correct!', [
                {
                    text: 'OK',
                    onPress: () => {
                        // Navigate to the next screen or perform any other action
                    },
                },
            ]);
        } catch (error) {
            // If verification fails, display an error message
            console.error('Error verifying OTP:', error.message);
            Alert.alert('Error', 'Invalid OTP. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Your OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="black"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    input: {
        width: '70%',
        height: 50,
        backgroundColor: 'rgba(155, 155, 155, 0.5)',
        borderRadius: 5,
        color: 'black',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    verifyButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: '30%',
        height: 50,
    },
    verifyButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OtpScreen;
