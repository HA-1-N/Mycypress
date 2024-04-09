export class HeroComponents{
    static COM_SEL = '.showcase-hero';
    constructor(component){
        this.component = component;
    }
    get cardTitle(){
        return this.component.find('.card__title');
    }
}

