
interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

const data: Dictionary<number> = {
    a: 3,
    b: 4
};
