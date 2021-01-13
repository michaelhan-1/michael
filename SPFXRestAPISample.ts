    import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';
    import { IODataUser, IODataWeb } from '@microsoft/sp-odata-types';
    const spHttpClient: SPHttpClient = this.context.spHttpClient;
    const currentWebUrl: string = this.context.pageContext.web.absoluteUrl;
    
    //GET current web info
    spHttpClient.get(`${currentWebUrl}/_api/web/allProperties`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
    
        response.json().then((PropertyValues: any) => {
    
            console.log(PropertyValues);
        });
    });
