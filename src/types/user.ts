// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };
//
// type Required<T> = {
//     [P in keyof T]-?: T[P];
// };
//
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface User {
    id: number;
    age: number;
    name: string;
}

// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>;

// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<User, 'id' | 'age'>;

// 相当于: type PickUser = { age: number; name: string; }
type OmitUser = Omit<User, 'id'>;
