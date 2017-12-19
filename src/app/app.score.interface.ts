export interface Score {
    q1: number;
    q2: number;
    q3: number;
    sum: number;
}
export interface Paper {
    // nonc: number,
    // id: number,
    marks: Question[]
}

export interface Question {
    id: number,
    mark: number,
    compulsory: boolean
}