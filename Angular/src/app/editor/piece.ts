export class Piece {
    m_red : number;
    m_green : number;
    m_blue : number;
    
    constructor(rouge : number, vert : number, bleu : number) {
        this.m_red = rouge;
        this.m_green = vert;
        this.m_blue = bleu;
    }
    
    getRed() {
        return this.m_red;
    }
    
    getGreen() {
        return this.m_green;
    }
    
    getBlue() {
        return this.m_blue;
    }
}