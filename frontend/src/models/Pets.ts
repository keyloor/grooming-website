export interface Pets {
    id: number;
    name: string;
    species?: string | null;
    size?: string | null;
    age: number;
    notes: string;
    breedName: string;
    ownerId: number;
}
