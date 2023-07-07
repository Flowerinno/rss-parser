import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidCategories', async: false })
export class IsValidCategoriesConstraint
  implements ValidatorConstraintInterface
{
  validate(categories: string | string[] | null) {
    if (!categories) {
      return true;
    }

    if (Array.isArray(categories) && categories.length > 1) {
      return categories.every((category) => typeof category === 'string');
    }

    return typeof categories === 'string';
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an array of strings, a string, or null.`;
  }
}
