export const  round = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

export const  round5 = (x) =>
{
    return Math.ceil(x/5)*5;
}


export const round1 = (value) => {
 return Math.round((value * 100000) / 100000);
}