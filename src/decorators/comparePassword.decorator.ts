import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'comparePassword', async: false })
export class ComparePassword implements ValidatorConstraintInterface {
  validate(
    confirmPassword: any, //variable que le asigna el valor de abajo del este decorador
    args: ValidationArguments,
  ): boolean | Promise<boolean> {
    console.log(args);
    console.log(confirmPassword);
    if (confirmPassword !== args.object[args.constraints[0]]) return false;
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Passwords do not match';
  }
}
