export default class Login
{
  constructor()
  {
    this.locator={
    usernameText:'#userEmail',
    passwordText: '#userPassword',
    LoginBtn: '#login',
    dashBoardHome:'.btn.btn-custom[routerlink="/dashboard/"]',
    productName:'.body > app-root:nth-child(3) > app-dashboard:nth-child(2) > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(4)'
    }

  }
}
