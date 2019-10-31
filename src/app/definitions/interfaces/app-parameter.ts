/**
 * AppParameter represents the definition of an application parameter
 */
import { ParamCategory } from '../enums/param-category.enum';
import { ParamDataType } from '../enums/param-data-type.enum';

export interface AppParameter {
    // Name with the name of the parameter. It can not start with 'NALEJ'
    // It will be used to substitute it through the descriptor when application is deployed.
    name?: string;
    // Description with the description of the parameter.
    description?: string;
    // XPATH to access the parameter
    path?: string;
    // DataType with the value type (bool, integer, float, enum, string, password)
    type?: ParamDataType;
    // DefaultValue with the value by default of the field
    default_value?: string;
    // Category indicates if the parameter is basic or advanced
    category?: ParamCategory;
    // enumValues indicates, in case of an enum type parameter, the values allowed
    enum_values?: string[];
    // required indicates if the param must be filled to deploy an application
    required?: boolean;
}
