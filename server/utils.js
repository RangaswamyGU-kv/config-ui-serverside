export const getCookie=(cname,cookies)=>{
    let name = cname + "=";
    let decodedCookie = cookies;
    let ca =decodedCookie && decodedCookie.split(';') || ''; 
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }