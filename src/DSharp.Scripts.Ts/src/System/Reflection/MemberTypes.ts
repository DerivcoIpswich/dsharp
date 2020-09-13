export enum MemberTypes {
    constructor = 1,
    event = 2,
    field = 4,
    method = 8,
    property = 16,
    typeInfo = 32,
    custom = 64,
    nestedType = 128,
    all = constructor | event | field | method | property | typeInfo | nestedType,
}