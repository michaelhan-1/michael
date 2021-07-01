     private static async Task<string> GetToken()
     {
         string applicationId = "client-id";
         string tenantId = "tenant.onmicrosoft.com";
         X509Certificate2 certificate = new X509Certificate2(@"C:\cer.pfx", "password");
         IConfidentialClientApplication confApp = ConfidentialClientApplicationBuilder.Create(applicationId)
         .WithAuthority($"https://login.microsoftonline.com/{tenantId}")
         .WithCertificate(certificate) 
         .Build();
         var scopes = new[] { "https://tenant.sharepoint.com/.default" };
         var authenticationResult = await confApp.AcquireTokenForClient(scopes).ExecuteAsync();
         return authenticationResult.AccessToken;
     }
     static async Task Main(string[] args)
     {
         string site = "https://tenant.sharepoint.com/sites/test";
         string token = await GetToken();
         Console.WriteLine(token);
         ClientContext ctx = new ClientContext(site);
         ctx.ExecutingWebRequest += (s, e) =>
         {
             e.WebRequestExecutor.RequestHeaders["Authorization"] = "Bearer " + token;
         };
         Web web = ctx.Web;
         ctx.Load(web);
         ctx.ExecuteQuery();
         Console.WriteLine(web.Title);
     }
