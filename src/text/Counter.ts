// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CounterObject {
  [property: string] : number
}

type CounterType = CounterObject | string[] | string;


export default class Counter {
  public wordCount: CounterObject = {};
  public element: Array<Array<string | number>> ;
  constructor (textInput: CounterType){
    if (Array.isArray(textInput)){
      this.wordCountFromArray(textInput);

    } else if (typeof textInput === "string"){
      let toArray = textInput.split('');
      this.wordCountFromArray(toArray);

    } else {
      this.wordCount = textInput;
    }
    //create order list in Ascending order
    this.createOrderedElement();

  }

  public update(updateInput: CounterType): void {
    const updateCounter = new Counter(updateInput);

    for (const key in updateCounter.wordCount){
      if ( key in this.wordCount){
        this.wordCount[key] += updateCounter.wordCount[key];
      } else {
        this.wordCount[key] = updateCounter.wordCount[key];
      }
    }
    this.createOrderedElement();
  }

  private wordCountFromArray(textArray: string[]) : void {
    for (let index = 0; index < textArray.length; index++){
      let elem = textArray[index];
      if (elem in this.wordCount){
        this.wordCount[elem] += 1;
      } else {
        this.wordCount[elem] = 1;
      }
    }
  }

  private createOrderedElement() : void {

    this.element = Object.keys(this.wordCount)
      .sort((a, b) => {
        return this.wordCount[b] - this.wordCount[a];
      })
      .map((x) => [ x, this.wordCount[x] ]);
  }

  public mostCommon(count: number): Array<Array<string | number>> {
    return this.element.slice(0, count);
  }
}


