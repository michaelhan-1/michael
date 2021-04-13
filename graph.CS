            string clientId = "<Client-ID>";
            string tenantID = "<Tenant-ID>";
            string clientSecret = "<Client-secret>";
            IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder
                                                                           .Create(clientId)
                                                                           .WithTenantId(tenantID)
                                                                           .WithClientSecret(clientSecret)
                                                                           .Build();

            ClientCredentialProvider authProvider = new ClientCredentialProvider(confidentialClientApplication);
            GraphServiceClient graphClient = new GraphServiceClient(authProvider);
