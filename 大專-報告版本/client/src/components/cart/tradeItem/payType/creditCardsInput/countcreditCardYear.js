const countCreditCardYear= ()=>{
    const creditCardYear=[]
    const yearArray = [];
    for (let i = 0; i < 10; i++) {
      const year = new Date().getFullYear() - 2000;
      yearArray.push(year+i)
      creditCardYear[i]={year:yearArray[i]}
    }
    return creditCardYear
}

const creditCardYear= countCreditCardYear()
export default creditCardYear