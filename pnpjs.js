
//Get all subwebs
$pnp.sp.site.rootWeb.webs.get().then(function(data){
    console.log(data)
})

//get all document libraries in the web
$pnp.sp.site.getDocumentLibraries("http://sp16/sites/michael").then(function(data){
    console.log(data)
})

//Get all files for a library

let getFiles = (folderUrl) => {
    $pnp.sp.web.getFolderByServerRelativeUrl(folderUrl)
        .expand("Folders, Files").get().then(r => {
            r.Folders.forEach(item => {
                getFiles(item.ServerRelativeUrl);
            })
            r.Files.forEach(item => {
                console.log(item.ServerRelativeUrl);
            })
        });
}

getFiles("/sites/michael/Documents");
