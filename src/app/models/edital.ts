import { Link } from "./link";
import { Ong } from "./ong";

export interface Edital {
    id: string;
    numero?: number;
    ano?: number;
    descricao?: string;
    ong: Ong;
    aberto?: boolean;
    links?: Link[];
}