import Login from './login.js'

export function getPage(page)
{
 switch (page.toLowerCase())
 {
    case "login":
        return new Login();
    default:
        comsole.log("Class not defined");
 }
}