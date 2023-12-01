import { configure, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

export const setupValidationRules = () => {
  defineRule('required', required);
  defineRule('email', email);
  defineRule('password', value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/.test(value))
  defineRule('phone', value => /^(\+4|0)[0-9]{9}$/.test(value))
  defineRule('name', value => /^[a-zA-Z\s]*$/.test(value))

  // Other Vee-Validate configuration
  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    // generateMessage: localize(locale, ro.veeValidate), // generates an error message based on the `values` argument
  });
};
