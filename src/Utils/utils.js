export const dateConverter = (isotime) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


   const dateObj = new Date (isotime)

   const dayStr = weekday[dateObj.getDay()];
   const dayDate = dateObj.getDate();
   const mon = month[dateObj.getMonth()]
   const year = dateObj.getFullYear();
   const hour = dateObj.getHours();
   const minute = dateObj.getMinutes();

   return `${dayStr} ${dayDate}-${mon}-${year}, ${hour}:${minute}`;
}


