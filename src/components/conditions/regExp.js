// cheatography.com   search regular expression cheat sheet
//regex101.com for 
export const nameRex = RegExp(/^[a-zA-Z\s]{2,15}$/);
export const emailRex = RegExp(/^\w+([-]?\w+)*@\w+([-]\w+)*(\.\w{2,3})$/)
export const phoneRex = RegExp(/^([+358][4|5][0-9]{1})[-\s]?([0-9]{8})$/)
//export const phoneRex = RegExp(/^([+358][4|5][0-9]{1})[-\s]?([0-9]{7})$/)
export const positionRex = RegExp(/^[a-zA-Z\s]{7,25}$/)
//export const positionRex = RegExp(/^[a-zA-Z\s]{7,25}$/)
