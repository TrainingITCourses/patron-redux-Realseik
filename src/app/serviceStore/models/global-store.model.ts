export interface Global {
    statuses: any[];
    types: any[];
    agencies: any[];
    launches: any[];
    criterios: string[];
    valores: any[];
}

export const globalInitialState: Global = {
    statuses: [],
    types: [],
    agencies: [],
    launches: [],
    criterios: ['Estado', 'Agencia', 'Tipo'],
    valores: []
};
