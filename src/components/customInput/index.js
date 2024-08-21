import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontConfig } from '../../theme'
import { Input, InputField, InputSlot, InputIcon } from '@gluestack-ui/themed'
import Icon from '../Icon'
import { TextInput } from 'react-native-paper';

const CustomInput = ({inputNotWrong=true, inputStyle={}, mode='outlined', fontStyle={}, activeBorderColor=Color.primaryMain, borderColor=Color.neutralZeroFive, 
value, iconLeft='', rightPress, leftPress, iconLeftColor, iconRight='', iconRightColor, borderRadius=5, ref=React.useRef(null), inputColor=Color.hitam,setValue, placeholder, backgroundColorFocus=Color.neutralZeroOne, type="text", children=<></>, size='lg', childLeft=<></>}) => {
    if(iconLeft != '' && iconRight != ''){
        return (
            <TextInput
            value={value}
            multiline={type == 'textarea' ? true : false}
            numberOfLines={type == 'textarea' ? 4 : 1}
              placeholder={placeholder}
              placeholderTextColor={Color.disable}
              mode={mode}
              error={!inputNotWrong}
              onChangeText={setValue}
              style={{backgroundColor: Color.neutralZeroOne,  marginVertical: 5, ...fontStyle}}
              outlineColor={value? Color.neutralZeroSeven : borderColor}
              textColor={inputColor}
              activeOutlineColor={activeBorderColor}
              secureTextEntry={type == 'password' ? true : false}
              left={<TextInput.Icon onPress={leftPress} icon={iconLeft} color={iconLeftColor} size={18} /> }
              right={<TextInput.Icon onPress={rightPress} icon={iconRight} color={iconRightColor} size={18} /> }  
            />
        )
    }else if(iconLeft == '' && iconRight != ''){
        return (
            <TextInput
            value={value}
            multiline={type == 'textarea' ? true : false}
            numberOfLines={type == 'textarea' ? 4 : 1}
              placeholder={placeholder}
              placeholderTextColor={Color.disable}
              mode={mode}
              error={!inputNotWrong}
              onChangeText={setValue}
              style={{backgroundColor: Color.neutralZeroOne, marginVertical: 5, ...fontStyle}}
              outlineColor={value? Color.neutralZeroSeven : borderColor}
              textColor={inputColor}
              
              activeOutlineColor={activeBorderColor}
              secureTextEntry={type == 'password' ? true : false}
              right={<TextInput.Icon onPress={rightPress} icon={iconRight} color={iconRightColor} size={18} /> }  
            />
        )
    }else if(iconLeft != '' && iconRight == ''){
        return (
            <TextInput
            value={value}
            multiline={type == 'textarea' ? true : false}
            numberOfLines={type == 'textarea' ? 4 : 1}
              placeholder={placeholder}
              placeholderTextColor={Color.disable}
              mode={mode}
              error={!inputNotWrong}
              onChangeText={setValue}
              style={{backgroundColor: Color.neutralZeroOne,  marginVertical: 5, ...fontStyle}}
              outlineColor={value? Color.neutralZeroSeven : borderColor}
              textColor={inputColor}
              activeOutlineColor={activeBorderColor}
              secureTextEntry={type == 'password' ? true : false}
              left={<TextInput.Icon onPress={leftPress} icon={iconLeft} color={iconLeftColor} size={18} /> }  
            />
        )
    }else{
        return (
            <TextInput
            value={value}
            multiline={type == 'textarea' ? true : false}
            numberOfLines={type == 'textarea' ? 4 : 1}
              placeholder={placeholder}
              placeholderTextColor={Color.disable}
              mode={mode}
              error={!inputNotWrong}
              onChangeText={setValue}
              style={{backgroundColor: Color.neutralZeroOne, marginVertical: 5, ...fontStyle, ...inputStyle}}
              outlineColor={value? Color.neutralZeroSeven : borderColor}
              textColor={inputColor}
              activeOutlineColor={activeBorderColor}
              secureTextEntry={type == 'password' ? true : false}
            />
        )
    }
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        ...FontConfig.bodyOne,
        height: 40
    },
})