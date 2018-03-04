export class Piece {
    m_style : string;
    m_id : string;
    
    constructor(style : string, id : string) {
        this.m_style = style;
        this.m_id = id;
    }
    
    getStyle() {
        return this.m_style;
    }
    
    getId() {
        return this.m_id;
    }
}