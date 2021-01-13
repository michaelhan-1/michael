            String name = "user1@tenant.onmicrosoft.com";
            String password = "password";
           
            SecureString securePassword = new SecureString();
            foreach (char c in password.ToCharArray())
            {
                securePassword.AppendChar(c);
            }
            String sharingLink = "https://tenant.sharepoint.com/sites/michael";

            var credentials = new SharePointOnlineCredentials(name, securePassword);
            var authCookie = credentials.GetAuthenticationCookie(new Uri(sharingLink));
            var cookieContainer = new CookieContainer();
            cookieContainer.SetCookies(new Uri(sharingLink), authCookie);
            var request = (HttpWebRequest)WebRequest.Create(sharingLink);
            request.CookieContainer = cookieContainer;

            var result = (HttpWebResponse)request.GetResponse();
