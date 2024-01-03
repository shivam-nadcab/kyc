import React, { useState } from 'react';
import { initializeApp } from '@react-native-firebase/app';

import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import { useNavigatcion } from '@react-navigation/native';


const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  const handleContinue = async () => {
    try {
      // Validate phone number format (you may customize this based on your requirements)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        console.log('Invalid phone number format');
        return;
      }

      // Format the phone number for Firebase (assuming it's a 10-digit US number)
      const formattedPhoneNumber = `+91${phoneNumber}`;

      // Send OTP using Firebase phone authentication
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      setPhoneNumber(''); // Clear the input after sending OTP

      // Navigate to the OTP screen with confirmation object as a parameter
      navigation.navigate('OTP', { confirmation });
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      // Handle error (show an alert, log, etc.)
    }
  };

  return (

    <LinearGradient colors={['#fffafa', '#fffafa', '#fffafa']} style={styles.linearGradient}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Continue with Phone</Text>
      </View>
      <View style={styles.imgContainer}>
        <LottieView source={require('../assets/animation/mobileOtp.json')} autoPlay loop style={styles.image} />
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={2}>
          You will receive a 6-digit code to verify next.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your number"
          placeholderTextColor="black"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: hp('5'),
    // marginBottom: hp('5'),

  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  image: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    // backgroundColor:'green',
    // marginTop:hp('5'),
    marginBottom: hp('5')
  },
  subtitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('50%'),
    // backgroundColor:'green',
    marginLeft: wp('25')
  },
  subtitle: {
    fontSize: 16,
    color: '#373737',
    marginBottom: hp('5'),
  },
  inputContainer: {
    display: 'flex',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp('100%'), // Adjusted the width to 80% of the screen width
    paddingHorizontal: wp('10%'), // Adjusted the paddingHorizontal to 10% of the screen width
  },

  input: {
    width: '70%', // Set the width of the input to 70% of the parent width
    height: 50,
    backgroundColor: 'rgba(155, 155, 155, 0.5)',
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '30%', // Set the width of the button to 30% of the parent width
    height: 50,

  },
  continueButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
