import * as bcrypt from 'bcrypt';
import { IFilterItemDto } from 'src/config/interfaces/ReqFilterInterface';
import { Equal, LessThan, MoreThan } from 'typeorm';

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export function sorting(sort?: string, sortDirection?: number): any {
    const order: { [key: string]: any } = {};
    const sortOrder: string = sortDirection == 0 ? "ASC" : "DESC";
    sort ? order[sort] = sortOrder : {};
    return order;
}

export function filtering(filterItems: IFilterItemDto[]): any {
    const filters: { [key: string]: any } = {};
    filterItems.forEach((item: IFilterItemDto) => {
        const { propertyName, value, comparison } = item;
        switch (comparison) {
            case 0: // Equals
                filters[propertyName] = Equal(value);
                break;
            case 1: // Greater than
                filters[propertyName] = MoreThan(value);
                break;
            case 2: // Less than
                filters[propertyName] = LessThan(value);
                break
        }
    });
    return filters;
}