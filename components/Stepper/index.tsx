import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'

import variables from '../../common/styles/variables'
import styles from './styles'
const stepperStyles = StyleSheet.create<any>(styles)

export interface StepperProps {
  style?: ViewStyle
  operatorStyle?: ViewStyle
  operatorIconColor?: string

  min?: number
  max?: number
  value?: number | string
  step?: number
  editable?: boolean
  onChange?: Function
}
export interface StepperState {
}

export class Stepper extends Component<StepperProps, StepperState> {
  private textInputValue = ''
  private currentInputValue = ''
  private textInputKey = 0
  static defaultProps = {
    operatorIconColor: variables.mtdGrayDarker,
    min: 1,
    max: 5,
    step: 1,
    editable: false
  }
  constructor (props) {
    super(props)
  }

  onDecrease = () => {
    const { value, min } = this.props
    if (this.isEmpty(value)) {
      this.changeValue(min, 0, 'decrease');
      return;
    }
    this.changeValue(value, -this.props.step, 'decrease')
  }
  onIncrease = () => {
    const { value, min } = this.props
    if (this.isEmpty(value)) {
      this.changeValue(min, 0, 'increase');
      return;
    }
    this.changeValue(value, this.props.step, 'increase')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const { value } = this.props
      const expectedTextValue = this.isEmpty(value) ? '' : String(value)
      const currentTextValue = this.textInputValue.trim()
      if (currentTextValue !== expectedTextValue) {
        this.textInputValue = expectedTextValue
        this.textInputKey += 1
        this.forceUpdate()
      }
    }
  }

  onChangeText = (value) => {
    this.currentInputValue = value
    let newValue
    if (!value) {
      newValue = ''
    } else {
      newValue = Number(value)
      if (isNaN(newValue)) {
        newValue = ''
      }
    }

    this.changeValue(newValue, this.props.step, 'input')
  }

  handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { min = 1, max = 5 } = this.props;
    let inputValue = this.currentInputValue;
    let numValue: number | null = null;
    let targetValue: number | null = null;

    if (inputValue === undefined || inputValue === null || (typeof inputValue === 'string' && inputValue.trim() === '')) {
      targetValue = min;
    } else {
      numValue = Number(inputValue);
      if (isNaN(numValue)) {
        targetValue = min;
      } else {
        if (numValue > max) {
          targetValue = max;
        } else if (numValue < min) {
          targetValue = min;
        } else {
          targetValue = null;
        }
      }
    }

    this.currentInputValue = '';

    if (targetValue !== null) {
      const targetValueStr = String(targetValue)
      this.textInputValue = targetValueStr
      this.textInputKey += 1
      this.changeValue(targetValue, 0, 'blur');
    }
  };

  changeValue = (value, step = 1, action) => {
    const { max, min } = this.props
    let newValue
    if (value === '') {
      newValue = ''
    } else {
      if (action === 'input') {
        newValue = value
      } else {
        newValue = value + step
      }

      if (action === 'increase' || action === 'decrease' || action === 'blur') {
        if (typeof newValue === 'number' && !isNaN(newValue)) {
          if (newValue > max) {
            newValue = max
          }

          if (newValue < min) {
            newValue = min
          }
        }
      }
    }

    this.props.onChange && this.props.onChange(newValue, this.props.value, action)
  }
  isEmpty(value) {
    return value == null || value === ''
  }

  render () {
    let { value, editable, style, operatorStyle, operatorIconColor, max, min } = this.props
    let increasable
    let decreasable
    let numValue = value

    if (this.isEmpty(value)) {
      increasable = true
      decreasable = true
    } else {
      numValue = Number(value)
      if (isNaN(numValue)) {
        numValue = 0
      }
      increasable = Boolean(numValue < max)
      decreasable = Boolean(numValue > min)
    }

    let textInputValue = this.isEmpty(value) ? '' : String(numValue)
    
    if (textInputValue !== this.textInputValue) {
      this.textInputValue = textInputValue
    } else if (textInputValue !== '' && textInputValue.trim() === this.textInputValue.trim()) {
      textInputValue += ' '
      this.textInputValue = textInputValue
    }
    
    const finalTextInputValue = textInputValue.trim()

    return (
      <View style={[stepperStyles.container, style]}>
        <TouchableOpacity
          activeOpacity={variables.mtdOpacity}
          onPress={this.onDecrease}
          disabled={!decreasable}>

          <View
            style={[
              stepperStyles.ctrl,
              operatorStyle,
              !decreasable ? stepperStyles.disabled : null
            ]}>
            <View
              style={[
                stepperStyles.ctrlSymbolHor,
                { backgroundColor: operatorIconColor }
              ]}>
            </View>
          </View>
        </TouchableOpacity>

        <TextInput
          key={`stepper-input-${this.textInputKey}`}
          style={[
            stepperStyles.input,
          ]}
          value={finalTextInputValue}
          onChangeText={this.onChangeText}
          onFocus={() => {
            const currentValue = this.props.value
            this.currentInputValue = this.isEmpty(currentValue) ? '' : String(currentValue)
          }}
          onBlur={this.handleInputBlur}
          editable={editable}
          keyboardType='numeric'
        />
        <TouchableOpacity
          activeOpacity={variables.mtdOpacity}
          onPress={this.onIncrease}
          disabled={!increasable}>
         <View
          style={[
            stepperStyles.ctrl,
            operatorStyle,
            !increasable ? stepperStyles.disabled : null
          ]}>
          <View style={[
            stepperStyles.ctrlSymbolHor,
            {
              backgroundColor: operatorIconColor
            }
          ]}></View>
          <View style={[
            stepperStyles.ctrlSymboVer,
            {
              backgroundColor: operatorIconColor
            }
          ]}></View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
}
